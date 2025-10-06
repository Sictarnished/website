"use client";
import { motion } from "framer-motion";
import { Suspense } from "react";
import Spotify from "../components/Spotify";
import Image from "next/image";
import SpotifySkeleton from "../components/skeletons/Spotifyskel";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200 dark:from-gray-900 dark:via-indigo-950 dark:to-gray-800 text-gray-900 dark:text-gray-100 font-sans flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center pt-20 sm:pt-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Federico
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto">
            16-year-old developer, gamer, and creative mind. Always chasing innovation, creativity, and a bit of chaos ✨
          </p>
        </motion.div>
      </section>

      {/* Info Sections */}
      <main className="flex flex-col items-center gap-10 sm:gap-12 mt-20 px-6 pb-20">
        {[
          {
            title: "Passions",
            text: "Video games (especially Kingdom Hearts) proud fan of Jackass, technology, programming, content creation, and scientific experiments. I love exploring the intersection between creativity and logic.",
            color: "from-purple-500 to-indigo-500",
          },
          {
            title: "Programming Skills",
            text: "TypeScript, JavaScript, HTML, CSS, Next.js, Tailwind, Svelte, Astro, React, C++, and Godot Engine. Always eager to learn and build something new.",
            color: "from-blue-500 to-cyan-400",
          },
          {
            title: "Certifications & Activities",
            text: "Cambridge English B2. Frequent attendee at conferences at the University of Messina and an active participant in Linux Day events.",
            color: "from-emerald-500 to-lime-400",
          },
          {
            title: "Favorite Quote",
            text: `"The heart may be weak, and sometimes it may even give in. But I've learned that deep down, there's a light that never goes out." – Kingdom Hearts`,
            color: "from-pink-500 to-rose-500",
          },
        ].map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.2 }}
            viewport={{ once: true }}
            className={`max-w-3xl w-full bg-gradient-to-r ${section.color} p-[2px] rounded-2xl shadow-xl`}
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">{section.title}</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{section.text}</p>
            </div>
          </motion.div>
        ))}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/10 backdrop-blur-md py-6 text-center text-sm text-gray-600 dark:text-gray-400">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <p>Built with ❤️ using Next.js, Tailwind & Framer Motion. Thanks for visiting!</p>
          <div className="flex gap-4">
            <a
              href="https://github.com/Sictarnished"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://vercel.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition-colors"
            >
              Vercel
            </a>
            <a
              href="https://tailwindcss.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition-colors"
            >
              Tailwind
            </a>
          </div>
        </motion.div>
        <Footer />
      </footer>
    </div>
  );
}
