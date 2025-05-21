import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-3xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl md:text-6xl">
            About <span className="text-blue-600 dark:text-blue-500">PDFMergy</span>
          </h1>
          <p className="mt-6 text-xl text-gray-700 dark:text-gray-300">
            Learn more about our mission to simplify your document workflows.
          </p>
        </header>

        <section className="bg-white dark:bg-slate-800 shadow-xl rounded-lg p-8 md:p-12 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Our Story
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              PDFMergy was born out of a simple need: a straightforward, secure, and fast way to combine PDF files without unnecessary complexity. We noticed that many existing tools were either too cumbersome, laden with ads, or raised concerns about data privacy.
            </p>
            <p>
              Our goal is to provide a user-friendly platform that respects your time and your data. Whether you&apos;re a student, a professional, or anyone in between, PDFMergy is designed to make your document management tasks easier.
            </p>
            <p>
              We believe in the power of simplicity and efficiency. That&apos;s why we&apos;ve focused on creating an intuitive drag-and-drop interface and an optimized processing engine that delivers results in seconds.
            </p>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-800 shadow-xl rounded-lg p-8 md:p-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Our Commitment
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              <strong>Security:</strong> We prioritize the security of your files. All processing is done securely, and we don&apos;t store your files longer than necessary.
            </p>
            <p>
              <strong>Speed:</strong> Our optimized engine ensures that your PDFs are merged quickly, so you can get back to what matters most.
            </p>
            <p>
              <strong>Ease of Use:</strong> We&apos;ve designed PDFMergy to be incredibly easy to use. No complicated steps, just straightforward PDF merging.
            </p>
            <p>
              <strong>Continuous Improvement:</strong> We are always looking for ways to improve PDFMergy and add features that our users will love. Your feedback is invaluable to us.
            </p>
          </div>
        </section>

        <section className="mt-12 text-center">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Thank you for choosing PDFMergy. Wevre excited to help you streamline your PDF tasks!
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;