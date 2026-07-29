import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen w-full bg-brand-bg-dark text-brand-text-primary font-sans relative flex flex-col transition-colors duration-300">
      <Header />
      
      <section className="flex-grow flex flex-col px-4 sm:px-8 py-16 lg:py-24 max-w-[800px] mx-auto w-full relative z-10">
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-brand-purple/5 blur-[120px] rounded-full -z-10 pointer-events-none" />

        <div className="mb-12 border-b border-brand-border pb-8">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-brand-text-primary mb-4">Terms & Conditions</h1>
          <p className="text-lg text-brand-text-secondary font-medium">Last updated: July 20, 2026</p>
        </div>

        <div className="prose prose-invert prose-brand max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-brand-text-primary mb-4">1. Introduction</h2>
            <p className="text-brand-text-secondary leading-relaxed">
              Welcome to SortStory ("we", "our", "us"). By accessing or using our website, platform, and visualization tools, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-text-primary mb-4">2. Use of Services</h2>
            <p className="text-brand-text-secondary leading-relaxed mb-4">
              SortStory provides interactive educational visualizations for data structures and algorithms. Our platform is provided for educational, non-commercial use, unless explicitly authorized through a separate business agreement.
            </p>
            <ul className="list-disc pl-6 text-brand-text-secondary space-y-2 marker:text-brand-accent">
              <li>You agree not to disrupt or interfere with the security or performance of our platform.</li>
              <li>You may not attempt to reverse engineer or scrape data from our visualization engines.</li>
              <li>Your use must comply with all applicable local, national, and international laws.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-text-primary mb-4">3. Intellectual Property</h2>
            <p className="text-brand-text-secondary leading-relaxed">
              All content, including but not down to code snippets, animations, graphical elements, logos, and written curriculum, are the exclusive property of Adnan Mangaonkar and SortStory. They are protected by copyright and intellectual property laws. You may not reproduce or distribute this content without express written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-text-primary mb-4">4. User Accounts (If Applicable)</h2>
            <p className="text-brand-text-secondary leading-relaxed">
              Certain features may require you to create an account. You are responsible for safeguarding your login credentials and for all activities that occur under your account. We reserve the right to suspend or terminate accounts that violate these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-text-primary mb-4">5. Disclaimer of Warranties</h2>
            <p className="text-brand-text-secondary leading-relaxed">
              The services are provided on an "as-is" and "as available" basis. We make no warranties, either express or implied, about the reliability, accuracy, or availability of the visualizations or curriculum.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-text-primary mb-4">6. Limitation of Liability</h2>
            <p className="text-brand-text-secondary leading-relaxed">
              To the maximum extent permitted by law, SortStory shall not be liable for any indirect, incidental, or consequential damages resulting from your use of or inability to use the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-text-primary mb-4">7. Changes to Terms</h2>
            <p className="text-brand-text-secondary leading-relaxed">
              We reserve the right to modify these Terms and Conditions at any time. Significant changes will be communicated via a notice on our platform. Your continued use of the service after such changes constitutes your acceptance of the new terms.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-brand-text-primary mb-4">8. Contact</h2>
            <p className="text-brand-text-secondary leading-relaxed">
              If you have any questions or concerns regarding these Terms and Conditions, please contact us via Adnan OS.
            </p>
          </section>
        </div>

      </section>
    </main>
  );
}
