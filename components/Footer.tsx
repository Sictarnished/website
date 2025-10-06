import { Suspense } from "react";
import Spotify from "./Spotify";
import SpotifySkeleton from "./skeletons/Spotify";

export default function Footer() {
  return (
    <div className="flex flex-col gap-5">
      <p>Check out the last song I was vibing to on Spotify:</p>
      <Suspense fallback={<SpotifySkeleton />}>
        <Spotify />
      </Suspense>
    </div>
  );
}