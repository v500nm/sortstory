"use client";

export default function IntroModal({ close }) {

  function dontShowAgain() {
    localStorage.setItem("sortviz_intro", "true");
    close();
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white w-[450px] p-6 rounded-xl shadow-xl text-center space-y-4 animate-in zoom-in">
        <h2 className="text-2xl font-bold">Welcome to SortViz 🎉</h2>

        <p className="text-gray-600">
          Explore 17+ sorting algorithms, visualize step-by-step animation,
          measure running time, swaps, cycles, and learn how sorting truly works.
        </p>

        <ul className="text-sm text-left bg-gray-100 p-3 rounded-lg">
          <li>• Use Sidebar to select sorting category & algorithm</li>
          <li>• Use Shuffle to randomize array</li>
          <li>• Sort button to start</li>
          <li>• Pause, Resume, Stop any time</li>
          <li>• Metrics appear live below visualization</li>
        </ul>

        <div className="flex justify-between">
          <button onClick={dontShowAgain} className="px-4 py-2 bg-gray-300 rounded-lg">
            Don’t show again
          </button>
          <button onClick={close} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Get Started 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
