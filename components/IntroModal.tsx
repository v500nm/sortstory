"use client";

export interface IntroModalProps {
  close: () => void;
}

export default function IntroModal({ close }: IntroModalProps) {
  const handleClose = () => {
    localStorage.setItem("sortviz_intro", "true");
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-brand-bg-light rounded-xl shadow-2xl max-w-2xl w-full p-8 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-brand-text-secondary hover:text-brand-text-primary transition-colors"
        >
          <svg
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="18" x2="6" y1="6" y2="18"></line>
            <line x1="6" x2="18" y1="6" y2="18"></line>
          </svg>
        </button>

        <div className="text-center mb-6">
          <h2 className="text-3xl font-serif-display italic text-brand-accent mb-2">
            Welcome to Sorting Visualizer
          </h2>
          <p className="text-brand-text-secondary">
            An interactive tool to understand sorting algorithms visually
          </p>
        </div>

        <div className="space-y-4 text-brand-text-secondary">
          <div className="flex items-start gap-3">
            <div className="bg-brand-purple/20 p-2 rounded-lg mt-1">
              <svg
                className="text-brand-purple"
                fill="none"
                height="20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect height="7" width="7" x="3" y="3"></rect>
                <rect height="7" width="7" x="14" y="3"></rect>
                <rect height="7" width="7" x="3" y="14"></rect>
                <rect height="7" width="7" x="14" y="14"></rect>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-brand-text-primary mb-1">
                Choose Your Algorithm
              </h3>
              <p>Select from popular sorting algorithms like Bubble Sort, Quick Sort, Merge Sort, and more.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-brand-yellow/20 p-2 rounded-lg mt-1">
              <svg
                className="text-brand-yellow"
                fill="none"
                height="20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-brand-text-primary mb-1">
                Watch it Sort
              </h3>
              <p>See real-time visualization with color-coded bars showing comparisons, swaps, and sorted elements.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-brand-green/20 p-2 rounded-lg mt-1">
              <svg
                className="text-brand-green"
                fill="none"
                height="20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-brand-text-primary mb-1">
                Learn the Details
              </h3>
              <p>Understand time complexity, space complexity, and view pseudocode for each algorithm.</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleClose}
          className="w-full mt-8 bg-brand-purple hover:bg-purple-500 text-black font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}