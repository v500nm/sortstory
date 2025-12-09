import Link from "next/link";
export default function Home() {
  return (
    <div className="container mx-auto px-4 lg:px-6">
      <header className="py-4 flex justify-between items-center">
        <Link href="#" className="text-2xl font-serif-display italic text-white">
          SortStory
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="#features" className="text-brand-text-secondary hover:text-brand-text-primary transition-colors">
            Features
          </Link>
          <Link href="#algorithms" className="text-brand-text-secondary hover:text-brand-text-primary transition-colors">
            Algorithms
          </Link>
          <Link href="#" className="text-brand-text-secondary hover:text-brand-text-primary transition-colors">
            About
          </Link>
        </nav>
      </header>

      <main>
        <section className="text-center py-14 lg:py-24">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            SortStory: Visualize Algorithms, Master Concepts
          </h1>
          <p className="mt-6 text-lg md:text-xl text-brand-text-secondary max-w-2xl mx-auto">
            An interactive playground to see sorting algorithms in action. Understand complex data structures through intuitive, step-by-step visualizations.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">


<Link
  href="/sort"
  className="w-full sm:w-auto text-black font-semibold rounded-md py-3 px-8 transition-colors bg-brand-purple hover:bg-purple-500 text-lg flex items-center justify-center gap-2"
>
  Get Started
  <svg
    className="lucide lucide-arrow-right"
    fill="none"
    height="20"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2.5"
    viewBox="0 0 24 24"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </svg>
</Link>

          </div>
          <div className="mt-16 bg-brand-bg-light p-6 rounded-xl shadow-lg max-w-5xl mx-auto border border-brand-border">
            <div className="flex items-end justify-center gap-2 h-64">
              <div className="w-5 rounded-t bg-brand-green" style={{ height: '100%' }}></div>
              <div className="w-5 rounded-t bg-brand-green" style={{ height: '95%' }}></div>
              <div className="w-5 rounded-t bg-brand-green" style={{ height: '90%' }}></div>
              <div className="w-5 rounded-t bg-brand-green" style={{ height: '85%' }}></div>
              <div className="w-5 rounded-t bg-brand-green" style={{ height: '80%' }}></div>
              <div className="w-5 rounded-t bg-brand-yellow" style={{ height: '75%' }}></div>
              <div className="w-5 rounded-t bg-brand-purple" style={{ height: '70%' }}></div>
              <div className="w-5 rounded-t bg-brand-gray" style={{ height: '65%' }}></div>
              <div className="w-5 rounded-t bg-brand-gray" style={{ height: '60%' }}></div>
              <div className="w-5 rounded-t bg-brand-gray" style={{ height: '55%' }}></div>
              <div className="w-5 rounded-t bg-brand-gray" style={{ height: '50%' }}></div>
              <div className="w-5 rounded-t bg-brand-gray" style={{ height: '45%' }}></div>
              <div className="w-5 rounded-t bg-brand-gray" style={{ height: '40%' }}></div>
              <div className="w-5 rounded-t bg-brand-gray" style={{ height: '35%' }}></div>
              <div className="w-5 rounded-t bg-brand-gray" style={{ height: '30%' }}></div>
              <div className="w-5 rounded-t bg-brand-gray" style={{ height: '25%' }}></div>
              <div className="w-5 rounded-t bg-brand-gray" style={{ height: '20%' }}></div>
              <div className="w-5 rounded-t bg-brand-gray" style={{ height: '15%' }}></div>
              <div className="w-5 rounded-t bg-brand-gray" style={{ height: '10%' }}></div>
              <div className="w-5 rounded-t bg-brand-gray" style={{ height: '5%' }}></div>
            </div>
          </div>
        </section>

        <section className="py-14 lg:py-18" id="features">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Why SortStory?</h2>
            <p className="mt-4 text-lg text-brand-text-secondary">
              Everything you need to demystify sorting algorithms.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-brand-bg-light p-8 rounded-xl shadow-lg border border-brand-border">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-brand-bg-dark mb-5">
                <svg
                  className="text-brand-purple"
                  fill="none"
                  height="28"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="28"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-brand-text-primary">Interactive Visualizations</h3>
              <p className="mt-2 text-brand-text-secondary">
                Watch algorithms sort data in real-time. Pause, resume, and step through the process to understand every comparison and swap.
              </p>
            </div>
            <div className="bg-brand-bg-light p-8 rounded-xl shadow-lg border border-brand-border">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-brand-bg-dark mb-5">
                <svg
                  className="text-brand-purple"
                  fill="none"
                  height="28"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="28"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" x2="8" y1="13" y2="13"></line>
                  <line x1="16" x2="8" y1="17" y2="17"></line>
                  <line x1="10" x2="8" y1="9" y2="9"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-brand-text-primary">Detailed Explanations</h3>
              <p className="mt-2 text-brand-text-secondary">
                Access clear, concise information about each algorithm, including its time and space complexity, and step-by-step pseudocode.
              </p>
            </div>
            <div className="bg-brand-bg-light p-8 rounded-xl shadow-lg border border-brand-border md:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-brand-bg-dark mb-5">
                <svg
                  className="text-brand-purple"
                  fill="none"
                  height="28"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="28"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect height="7" width="7" x="3" y="3"></rect>
                  <rect height="7" width="7" x="14" y="3"></rect>
                  <rect height="7" width="7" x="3" y="14"></rect>
                  <rect height="7" width="7" x="14" y="14"></rect>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-brand-text-primary">Customizable Inputs</h3>
              <p className="mt-2 text-brand-text-secondary">
                Control the size of the dataset and the visualization speed to tailor your learning experience. Test algorithms on different data arrangements.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24 text-center" id="algorithms">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Explore a Variety of Algorithms</h2>
          <p className="mt-4 text-lg text-brand-text-secondary max-w-2xl mx-auto">
            From the simplest to the more complex, we've got you covered. Dive in and see how they differ.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-3 md:gap-4">
            <span className="bg-brand-bg-light text-brand-text-primary text-sm font-medium px-4 py-2 rounded-full border border-brand-border">
              Bubble Sort
            </span>
            <span className="bg-brand-bg-light text-brand-text-primary text-sm font-medium px-4 py-2 rounded-full border border-brand-border">
              Selection Sort
            </span>
            <span className="bg-brand-bg-light text-brand-text-primary text-sm font-medium px-4 py-2 rounded-full border border-brand-border">
              Insertion Sort
            </span>
            <span className="bg-brand-bg-light text-brand-text-primary text-sm font-medium px-4 py-2 rounded-full border border-brand-border">
              Merge Sort
            </span>
            <span className="bg-brand-bg-light text-brand-text-primary text-sm font-medium px-4 py-2 rounded-full border border-brand-border">
              Quick Sort
            </span>
            <span className="bg-brand-bg-light text-brand-text-primary text-sm font-medium px-4 py-2 rounded-full border border-brand-border">
              Heap Sort
            </span>
            <span className="bg-brand-bg-light text-brand-text-secondary text-sm font-medium px-4 py-2 rounded-full border border-brand-border">
              and more...
            </span>
          </div>
        </section>
      </main>

      <footer className="py-8 mt-16 border-t border-brand-border">
        <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <p className="text-brand-text-secondary text-sm">© 2024 SortStory. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="#" className="text-sm text-brand-text-secondary hover:text-brand-text-primary transition-colors">
              About Us
            </Link>
            <Link href="#" className="text-sm text-brand-text-secondary hover:text-brand-text-primary transition-colors">
              Contact
            </Link>
            <Link href="#" className="text-sm text-brand-text-secondary hover:text-brand-text-primary transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}