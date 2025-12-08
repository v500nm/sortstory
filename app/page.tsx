"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Landing() {
  const router = useRouter();

  return (
    <main className="bg-brand-bg-dark text-brand-text-primary font-sans antialiased">

      {/* CONTAINER */}
      <div className="container mx-auto px-6 lg:px-8">

        {/* HEADER */}
        <header className="py-6 flex justify-between items-center">
          <a className="text-2xl font-serif-display italic text-white" href="#">
            SortStory
          </a>

          <nav className="hidden md:flex items-center space-x-6">
            <a className="text-brand-text-secondary hover:text-brand-text-primary transition-colors" href="#features">
              Features
            </a>
            <a className="text-brand-text-secondary hover:text-brand-text-primary transition-colors" href="#algorithms">
              Algorithms
            </a>
            <a className="text-brand-text-secondary hover:text-brand-text-primary transition-colors" href="#">
              About
            </a>
          </nav>
        </header>

        {/* HERO SECTION */}
        <section className="text-center py-20 lg:py-32">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            SortStory: Visualize Algorithms, Master Concepts
          </h1>

          <p className="mt-6 text-lg md:text-xl text-brand-text-secondary max-w-3xl mx-auto">
            An interactive playground to see sorting algorithms in action. Understand complex data
            structures through intuitive, step-by-step visualizations.
          </p>

          {/* CTA BTN */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="w-full sm:w-auto text-black bg-brand-purple hover:bg-purple-500 font-semibold rounded-md py-3 px-8 text-lg flex items-center gap-2"
              onClick={() => router.push("/sort")}
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          {/* BAR CHART PREVIEW */}
          <div className="mt-16 bg-brand-bg-light p-6 rounded-xl shadow-lg max-w-5xl mx-auto border border-brand-border">
            <div className="flex items-end justify-center gap-2 h-64">
              {[
                100, 95, 90, 85, 80, 75, 70, 65, 60, 55,
                50, 45, 40, 35, 30, 25, 20, 15, 10, 5,
              ].map((h, i) => (
                <div
                  key={i}
                  className={`
                    w-5 rounded-t 
                    ${i < 5 ? "bg-brand-green"
                      : i === 5 ? "bg-brand-yellow"
                      : i === 6 ? "bg-brand-purple"
                      : "bg-brand-gray"
                    }
                  `}
                  style={{ height: `${h}%` }}
                ></div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="py-20 lg:py-24" id="features">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Why SortStory?
            </h2>
            <p className="mt-4 text-lg text-brand-text-secondary">
              Everything you need to demystify sorting algorithms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Interactive Visualizations"
              description="Watch algorithms sort data in real-time. Pause, resume, and step through each comparison and swap."
              iconPath="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
            />

            <FeatureCard
              title="Detailed Explanations"
              description="Clear descriptions, pseudocode, and complexity breakdowns for every algorithm."
              iconPath="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
              iconExtra="<polyline points='14 2 14 8 20 8'></polyline>"
            />

            <FeatureCard
              title="Customizable Inputs"
              description="Control dataset size and speed. Test algorithms on various data arrangements."
              iconPath="M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z"
            />
          </div>
        </section>

        {/* ALGORITHMS SECTION */}
        <section className="py-20 lg:py-24 text-center" id="algorithms">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Explore a Variety of Algorithms
          </h2>

          <p className="mt-4 text-lg text-brand-text-secondary max-w-2xl mx-auto">
            From the simplest to the more complex, dive in and see how they differ.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-3 md:gap-4">
            {[
              "Bubble Sort",
              "Selection Sort",
              "Insertion Sort",
              "Merge Sort",
              "Quick Sort",
              "Heap Sort",
              "and more...",
            ].map((alg, i) => (
              <span
                key={i}
                className="bg-brand-bg-light text-brand-text-primary text-sm font-medium px-4 py-2 rounded-full border border-brand-border"
              >
                {alg}
              </span>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-8 mt-16 border-t border-brand-border">
          <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
            <p className="text-brand-text-secondary text-sm">
              © {new Date().getFullYear()} SortStory. All rights reserved.
            </p>

            <div className="flex space-x-6 mt-4 sm:mt-0">
              {["About Us", "Contact", "Privacy Policy"].map((link, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-sm text-brand-text-secondary hover:text-brand-text-primary transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </main>
  );
}

/* ------------------------ FEATURE CARD COMPONENT ------------------------ */

function FeatureCard({
  title,
  description,
  iconPath,
  iconExtra,
}: {
  title: string;
  description: string;
  iconPath: string;
  iconExtra?: string;
}) {
  return (
    <Card className="bg-brand-bg-light p-8 rounded-xl shadow-lg border border-brand-border">
      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-brand-bg-dark mb-5">
        <svg
          className="text-brand-purple"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          dangerouslySetInnerHTML={{
            __html: `<path d="${iconPath}" />${iconExtra ?? ""}`,
          }}
        />
      </div>

      <h3 className="text-xl font-semibold text-brand-text-primary">{title}</h3>
      <p className="mt-2 text-brand-text-secondary">{description}</p>
    </Card>
  );
}
