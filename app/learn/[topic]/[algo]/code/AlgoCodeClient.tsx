"use client";

import React from "react";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import CodeViewer from "@/components/learn/CodeViewer";
import InitialMountLoader from "@/components/loaders/InitialMountLoader";
import LearnLoader from "@/components/loaders/LearnLoader";
import { formatAlgoName } from "@/lib/utils";

interface Props {
  topic: string;
  algo: string;
}

export default function AlgoCodeClient({ topic, algo }: Props) {
  const formattedTopic = topic.replace(/-/g, " ");
  const formattedAlgo = formatAlgoName(algo);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Learn", href: "/learn" },
    { label: formattedTopic, href: `/learn#${topic}` },
    { label: formattedAlgo, href: `/learn/${topic}/${algo}` },
    { label: "Code Implementations", active: true },
  ];

  return (
    <main className="min-h-screen w-full bg-brand-bg-dark text-brand-text-primary font-sans relative flex flex-col">
      <InitialMountLoader>
        <LearnLoader />
      </InitialMountLoader>
      <Header />

      <div className="w-full max-w-[1300px] mx-auto px-4 py-6 sm:px-6 sm:py-8 md:p-8 overflow-y-auto space-y-6">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Dedicated Code Viewer */}
        <CodeViewer topic={topic} algo={algo} />
      </div>
    </main>
  );
}
