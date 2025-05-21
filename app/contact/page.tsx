import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-3xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl md:text-6xl">
            Contact <span className="text-blue-600 dark:text-blue-500">Us</span>
          </h1>
          <p className="mt-6 text-xl text-gray-700 dark:text-gray-300">
            We&apos;d love to hear from you! Reach out with any questions or feedback.
          </p>
        </header>

        <section className="bg-white dark:bg-slate-800 shadow-xl rounded-lg p-8 md:p-12 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-8 text-center">
            Get in Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                <input type="text" name="name" id="name" autoComplete="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                <input type="email" name="email" id="email" autoComplete="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                <textarea id="message" name="message" rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50"></textarea>
              </div>
              <div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                  Send Message
                </button>
              </div>
            </form>
            <div className="space-y-6 pt-0 md:pt-2">
              <div className="flex items-start">
                <Mail className="flex-shrink-0 h-6 w-6 text-blue-600 dark:text-blue-400 mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Email</h3>
                  <a href="mailto:support@pdfmergy.com" className="text-blue-600 dark:text-blue-400 hover:underline">support@pdfmergy.com</a>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="flex-shrink-0 h-6 w-6 text-blue-600 dark:text-blue-400 mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Phone</h3>
                  <p className="text-gray-700 dark:text-gray-300">+91 8882999461 (Mon-Fri, 9am-5pm)</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="flex-shrink-0 h-6 w-6 text-blue-600 dark:text-blue-400 mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Address</h3>
                  <p className="text-gray-700 dark:text-gray-300">123 Delhi, India</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 text-center">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            We aim to respond to all inquiries within 24 business hours.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;