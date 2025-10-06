import { NextResponse } from "next/server";
import { z } from "zod";
import querystring from "node:querystring";
import { VercelKV } from "@vercel/kv";
import type { SpotifyResponse } from "@/types/spotify";

const getEnv = () => ({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
  kvRestApiUrl: process.env.KV_REST_API_URL,
  kvRestApiToken: process.env.KV_REST_API_TOKEN,
});

const getRedis = (kvRestApiUrl: string, kvRestApiToken: string) => {
  return new VercelKV({
    url: kvRestApiUrl,
    token: kvRestApiToken,
  });
};

const getAccessToken = async (
  clientId: string,
  clientSecret: string,
  refreshToken: string
) => {
  const basicToken = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
};

const getLastSong = async (redis: VercelKV): Promise<SpotifyResponse> => {
  try {
    const lastSpotifySong = (await redis.get("last-spotify-song")) as
      | SpotifyResponse
      | undefined;
    if (lastSpotifySong) {
      return { ...lastSpotifySong, isListening: false } as SpotifyResponse;
    }
  } catch {}
  return { isListening: false, name: null };
};

const getSpotifyStatus = async (
  clientId: string,
  clientSecret: string,
  refreshToken: string,
  redis: VercelKV
): Promise<SpotifyResponse> => {
  const accessTokenResponse = await getAccessToken(clientId, clientSecret, refreshToken);
  const accessToken = accessTokenResponse?.access_token;
  if (!accessToken) return getLastSong(redis);

  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok || response.status === 204) {
      return getLastSong(redis);
    }

    const data = await response.json();

    const spotifySchema = z.object({
      item: z.object({
        album: z.object({
          images: z
            .object({
              url: z.string(),
            })
            .array(),
        }),
        name: z.string(),
        external_urls: z.object({
          spotify: z.string(),
        }),
        artists: z
          .object({
            name: z.string(),
            external_urls: z.object({
              spotify: z.string(),
            }),
          })
          .array(),
      }),
      currently_playing_type: z.literal("track"),
      is_playing: z.boolean(),
    });

    const validation = spotifySchema.safeParse(data);
    if (!validation.success) {
      return getLastSong(redis);
    }

    const parsed = validation.data;

    const spotifyStatus: SpotifyResponse = {
      isListening: true,
      href: parsed.item.external_urls.spotify,
      name: parsed.item.name,
      thumbnailUrl: parsed.item.album.images[1].url,
      artists: parsed.item.artists.map((artist) => ({
        name: artist.name,
        href: artist.external_urls.spotify,
      })),
    };

    await redis.set("last-spotify-song", spotifyStatus).catch(() => {});
    return spotifyStatus;
  } catch {
    return getLastSong(redis);
  }
};

export async function GET() {
  const {
    clientId,
    clientSecret,
    refreshToken,
    kvRestApiUrl,
    kvRestApiToken,
  } = getEnv();

  const isConfigured =
    clientId && clientSecret && refreshToken && kvRestApiUrl && kvRestApiToken;

  if (!isConfigured) {
    return NextResponse.json({ isListening: false, name: null });
  }

  let redis: VercelKV;
  try {
    redis = getRedis(kvRestApiUrl!, kvRestApiToken!);
  } catch {
    return NextResponse.json({ isListening: false, name: null });
  }

  try {
    const cached = await redis.get("spotify-cache");
    if (cached) {
      return NextResponse.json(cached);
    }

    const spotifyStatus = await getSpotifyStatus(
      clientId!,
      clientSecret!,
      refreshToken!,
      redis
    );
    await redis.setex("spotify-cache", 30, spotifyStatus).catch(() => {});

    return NextResponse.json(spotifyStatus);
  } catch {
    return NextResponse.json({ isListening: false, name: null });
  }
}