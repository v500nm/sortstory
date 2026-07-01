import Header from "@/components/Header";

export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen w-full bg-brand-bg-dark text-brand-text-primary font-sans relative flex flex-col">
      <Header />
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-12 md:py-24 flex-grow">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">Privacy Policy</h1>
        
        <div className="space-y-6 text-brand-text-secondary leading-relaxed">
          <p>
            Welcome to SortStory. We respect your privacy and are committed to protecting it. This Privacy Policy explains our practices regarding any information collected when you use our interactive algorithm visualization platform.
          </p>

          <h2 className="text-xl font-semibold text-brand-text-primary mt-8">1. Information We Collect</h2>
          <p>
            SortStory is designed to be a frictionless, purely client-side application. We <strong>do not</strong> require you to create an account, and we <strong>do not</strong> collect personally identifiable information (PII) such as your name, email address, or location.
          </p>

          <h2 className="text-xl font-semibold text-brand-text-primary mt-8">2. Local Storage</h2>
          <p>
            We use your browser's local storage solely to improve your user experience. For example, we store your preference for Dark or Light mode, and we remember if you've dismissed the introductory tutorial modals. This data never leaves your device.
          </p>

          <h2 className="text-xl font-semibold text-brand-text-primary mt-8">3. Analytics</h2>
          <p>
            We may use basic, anonymized analytics (such as Vercel Analytics) to monitor website performance and page views. This helps us understand which algorithms are most popular and allows us to prioritize future updates. No tracking cookies are used to follow you across the internet.
          </p>

          <h2 className="text-xl font-semibold text-brand-text-primary mt-8">4. Contact</h2>
          <p>
            If you have any questions about this Privacy Policy or the SortStory platform, feel free to reach out to the developer at <a href="https://adnan-mangaonkar.com" className="text-brand-accent hover:underline">adnan-mangaonkar.com</a>.
          </p>

          <p className="pt-8 text-xs font-mono opacity-50">
            Last Updated: July 2026
          </p>
        </div>
      </div>
    </main>
  );
}
