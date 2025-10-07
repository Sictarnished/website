import Footer from "@/components/Footer";

export default function Home() {
  const skills = [
    { name: "TypeScript", level: 90 },
    { name: "React / Next.js", level: 88 },
    { name: "TailwindCSS", level: 85 },
    { name: "C++", level: 70 },
    { name: "Python", level: 65 },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500 text-white font-sans flex items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left: Hero */}
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24 rounded-full p-[3px] bg-gradient-to-tr from-yellow-300 via-white/60 to-pink-200 shadow-xl animate-pulse">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-800/30 to-white/10 backdrop-blur-sm flex items-center justify-center">
                {/* Minimal avatar illustration */}
                <svg viewBox="0 0 64 64" width="56" height="56" className="drop-shadow">
                  <defs>
                    <linearGradient id="g1" x1="0" x2="1">
                      <stop offset="0" stopColor="#fff3" />
                      <stop offset="1" stopColor="#ffffff22" />
                    </linearGradient>
                  </defs>
                  <circle cx="32" cy="22" r="10" fill="#fef3c7" />
                  <rect x="12" y="36" rx="8" width="40" height="16" fill="#fde68a" />
                  <circle cx="24" cy="20" r="2" fill="#111827" opacity="0.85" />
                  <circle cx="40" cy="20" r="2" fill="#111827" opacity="0.85" />
                  <path d="M22 28c3 4 14 4 18 0" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                </svg>
              </div>
            </div>

            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                Hi, I’m <span className="text-yellow-300">Federico</span>
              </h1>
              <p className="text-sm text-white/90 mt-1">16 years old - Dreamer & Developer</p>
            </div>
          </div>

          <p className="text-white/90 text-lg sm:text-xl max-w-xl">
            I create elegant, fast web experiences with <span className="font-semibold">Next.js</span> and{" "}
            <span className="font-semibold">TypeScript</span>. I also love video editing, game design, and experimental science.
          </p>

          <div className="flex gap-3">
            <a
              href="mailto:federico@example.com"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-2 rounded-full text-sm font-medium shadow-sm transition"
            >
              ✉️ Contact Me
            </a>
            <a
              href="https://github.com/Sictarnished"
              className="inline-flex items-center gap-2 bg-yellow-300 text-slate-900 px-5 py-2 rounded-full text-sm font-semibold shadow-md transition hover:scale-105"
            >
              🧾 Projects
            </a>
          </div>

          <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/80">
            <span className="bg-white/10 px-3 py-2 rounded-full border border-white/20">Nerdie</span>
            <span className="bg-white/10 px-3 py-2 rounded-full border border-white/20">Movie lover</span>
            <span className="bg-white/10 px-3 py-2 rounded-full border border-white/20">Kingdom Hearts Fan</span>
          </div>
        </section>

        {/* Right: Card */}
        <aside className="bg-white/8 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-yellow-300 font-bold text-lg">Skills</h3>
              <p className="text-white/80 text-sm mt-1">Tools and languages I use most often</p>
            </div>

            <div className="text-right text-sm text-white/60">
              <div>
                English Level: <span className="font-semibold">B2</span>
              </div>
              <div className="mt-2">
                Age: <span className="font-semibold">16</span>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {skills.map((s) => (
              <div
                key={s.name}
                className="bg-white/6 p-3 rounded-xl border border-white/6 hover:scale-105 transition-transform duration-300"
              >
                <div className="flex justify-between items-center mb-1">
                  <div className="text-sm font-medium">{s.name}</div>
                  <div className="text-xs text-white/70">{s.level}%</div>
                </div>
                <div className="w-full h-2 bg-white/6 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${s.level}%` }}
                    className="h-full bg-gradient-to-r from-yellow-300 to-pink-400 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-white/80">
              <div className="font-semibold">Passions</div>
              <div className="text-white/70 text-xs">Experiments, video editing, streaming, and endless creativity</div>
            </div>

            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center shadow-lg hover:rotate-6 transition-transform duration-500">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <path d="M12 3v6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 15v6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 12h6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 12h6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </aside>
      </div>

      <Footer />

      {/* Footer small */}
      <footer className="absolute bottom-6 left-0 right-0 flex justify-center text-xs text-white/70">
        © 2025 Federico — Built with ❤️ using Next.js, Tailwind & React
      </footer>
    </main>
  );
}
