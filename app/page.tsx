"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Landing() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex flex-col items-center justify-center text-white px-6 text-center">

      {/* LOGO */}
      <div className="mb-6">
        <Image
          src="/assets/sortviz.png"
          alt="SortViz Logo"
          width={160}
          height={160}
          className="drop-shadow-xl mx-auto"
        />
      </div>

      {/* TITLE */}
      <h1 className="text-5xl font-extrabold tracking-wide drop-shadow-lg">
        SortViz
      </h1>

      <p className="mt-4 text-lg opacity-90 max-w-xl">
        Visualize 17+ Sorting Algorithms with Real-Time Animation,
        Pause/Resume Control, and Algorithm Categories.
      </p>

      {/* CTA */}
      <button
        onClick={() => router.push("/sort")}
        className="mt-8 bg-white text-blue-700 font-semibold text-lg px-8 py-3 rounded-xl shadow-xl hover:scale-110 hover:bg-blue-100 transition-all duration-300"
      >
        🚀 Get Started
      </button>

      {/* FOOTER */}
      <footer className="absolute bottom-4 text-sm opacity-80">
        © {new Date().getFullYear()} SortViz · Built by Adnan Shafiq Mangaonkar
      </footer>
    </main>
  );
}
