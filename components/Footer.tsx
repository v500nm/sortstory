import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-brand-border bg-brand-bg-dark/80 backdrop-blur-xl mt-auto z-40">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left Side: Copyright & Credits */}
        <div className="flex flex-col md:flex-row items-center gap-2 text-xs font-medium text-brand-text-secondary">
          <p>© {new Date().getFullYear()} SortStory.</p>
          <span className="hidden md:inline text-brand-border">•</span>
          <p>
            Developed by{" "}
            <a 
              href="https://adnan-mangaonkar.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-brand-accent hover:text-brand-purple transition-colors font-bold tracking-wide"
            >
              Adnan Mangaonkar
            </a>
          </p>
        </div>

        {/* Center/Right Side: Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold tracking-wider text-brand-text-secondary uppercase">
          <Link href="/privacy" className="hover:text-brand-accent transition-colors">Privacy Policy</Link>
        </div>

      </div>
    </footer>
  );
}
