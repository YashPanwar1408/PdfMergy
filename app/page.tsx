
'use client';

import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, X, Loader2 } from 'lucide-react';
import PDFMerger from 'pdf-merger-js';

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [isMerging, setIsMerging] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles.filter(file => file.type === 'application/pdf')]);
    // Later, you would handle the actual merge and upload here
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    multiple: true,
  });

  const removeFile = (fileName: string) => {
    setFiles(files.filter(file => file.name !== fileName));
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    setIsMerging(true);
    try {
      const merger = new PDFMerger();
      for (const file of files) {
        await merger.add(file);
      }
      await merger.save('merged_document.pdf'); // This will trigger download in the browser
      setFiles([]); // Optionally clear files after successful merge
    } catch (error) {
      console.error('Error merging PDFs:', error);
      // Handle error appropriately in UI, e.g., show a notification
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <section className="py-16 px-4 md:py-24 bg-gradient-to-br from-sky-50 to-indigo-100 dark:from-gray-900 dark:to-slate-900">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                Merge PDF Files <span className="text-blue-600 dark:text-blue-500">Effortlessly</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl">
                Combine multiple PDF documents into a single, organized file in seconds. Drag and drop your files to get started.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5">
                      Get Started Free
                    </button>
                  </SignInButton>
                  <a href="#features" className="w-full sm:w-auto px-8 py-3 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out text-center">
                    Learn More
                  </a>
                </SignedOut>
                <SignedIn>
                  {/* Removed Go to Dashboard button, users will use the dropzone directly */}
                  <button 
                    onClick={() => document.getElementById('dropzone')?.click()} 
                    className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5">
                    Upload PDFs
                  </button>
                </SignedIn>
              </div>
            </div>
            <div className="flex-1 mt-10 md:mt-0">
              <div 
                {...getRootProps()} 
                id="dropzone"
                className={`relative w-full h-80 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-300 ease-in-out 
                  ${isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 bg-white dark:bg-gray-800/50'}`}>
                <input {...getInputProps()} />
                <UploadCloud className={`w-16 h-16 mb-4 ${isDragActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}`} />
                {isDragActive ? (
                  <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">Drop the files here ...</p>
                ) : (
                  <p className="text-lg text-gray-600 dark:text-gray-400">Drag & drop some PDF files here, or click to select files</p>
                )}
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Only *.pdf files will be accepted</p>
              </div>
              {files.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">Selected Files:</h4>
                  <ul className="space-y-2 max-h-40 overflow-y-auto pr-2">
                    {files.map(file => (
                      <li key={file.name} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-md shadow-sm">
                        <div className="flex items-center space-x-2 overflow-hidden">
                          <FileText className="w-5 h-5 text-blue-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700 dark:text-gray-300 truncate" title={file.name}>{file.name}</span>
                        </div>
                        <button onClick={() => removeFile(file.name)} className="text-red-500 hover:text-red-700 dark:hover:text-red-400 ml-2 flex-shrink-0">
                          <X className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                  {files.length > 1 && (
                     <button 
                      onClick={handleMerge}
                      disabled={isMerging}
                      className="w-full mt-4 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                       {isMerging ? (
                         <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Merging...</>
                       ) : (
                         `Merge ${files.length} PDFs`
                       )}
                     </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-50">Why Choose Our PDF Merger</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">Powerful features designed to make PDF merging simple and efficient</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Lightning Fast</h3>
              <p className="text-gray-700 dark:text-gray-400">Merge multiple PDFs in seconds with our optimized processing engine.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">100% Secure</h3>
              <p className="text-gray-700 dark:text-gray-400">Your files are processed securely. We prioritize your privacy and data security.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Easy to Use</h3>
              <p className="text-gray-700 dark:text-gray-400">Simple drag & drop interface. No complicated steps, just merge and download.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 px-4 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-50">What Our Users Say</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">Hear from satisfied users who have simplified their PDF tasks with PDFMergy.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <p className="text-gray-700 dark:text-gray-300 mb-6 italic">&quot;PDFMergy is a lifesaver! I used to spend so much time trying to combine PDFs with clunky software. Now it&apos;s just drag, drop, and done. Highly recommend!&quot;</p>
              <div className="flex items-center">
                {/* Placeholder for user avatar - replace with actual image or initials component */}
                <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xl mr-4">JD</div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">Jane Doe</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Freelance Designer</p>
                </div>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <p className="text-gray-700 dark:text-gray-300 mb-6 italic">&quot;Simple, fast, and secure. Exactly what I needed for merging confidential documents. The interface is super intuitive.&quot;</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-xl mr-4">MS</div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">Mark Smith</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Small Business Owner</p>
                </div>
              </div>
            </div>
            {/* Testimonial 3 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <p className="text-gray-700 dark:text-gray-300 mb-6 italic">&quot;As a student, I&apos;m constantly dealing with PDFs. PDFMergy has made my study workflow so much more efficient. And itvs free for basic use!&quot;</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-xl mr-4">AL</div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">Alex Lee</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">University Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Billing/Pricing Section */}
      <section id="pricing" className="py-16 px-4 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-50">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">Choose the plan thatvs right for you. Get started for free.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {/* Free Plan */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col justify-between transform hover:-translate-y-1 transition-all duration-300">
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Free</h3>
                <p className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-1">$0<span className="text-lg font-normal text-gray-600 dark:text-gray-400">/month</span></p>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Perfect for occasional use.</p>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300 mb-8">
                  <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>Merge up to 5 PDFs</li>
                  <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>Up to 10MB file size</li>
                  <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>Basic support</li>
                </ul>
              </div>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">Get Started</button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <button className="w-full px-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg cursor-not-allowed" disabled>Current Plan</button>
              </SignedIn>
            </div>
            {/* Pro Plan (Example) */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-2 border-blue-500 flex flex-col justify-between transform hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Pro</h3>
                  <span className="text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded-full">POPULAR</span>
                </div>
                <p className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-1">$9<span className="text-lg font-normal text-gray-600 dark:text-gray-400">/month</span></p>
                <p className="text-gray-600 dark:text-gray-400 mb-6">For power users and professionals.</p>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300 mb-8">
                  <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>Unlimited PDF merges</li>
                  <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>Up to 100MB file size</li>
                  <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>Priority support</li>
                  <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>No advertisements</li>
                </ul>
              </div>
              <button className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">Choose Pro</button>
            </div>
            {/* Enterprise Plan (Example) */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col justify-between transform hover:-translate-y-1 transition-all duration-300">
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Enterprise</h3>
                <p className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-1">Custom</p>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Tailored for your organizationvs needs.</p>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300 mb-8">
                  <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>All Pro features</li>
                  <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>Custom integrations</li>
                  <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>Dedicated account manager</li>
                  <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>Volume discounts</li>
                </ul>
              </div>
              <a href="/contact" className="w-full block text-center px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/50 font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out">Contact Sales</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 dark:bg-blue-700">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Merge Your PDFs?</h2>
          <p className="text-xl text-blue-50 dark:text-blue-100 max-w-2xl mx-auto mb-8">Join thousands of satisfied users who simplify their document workflow every day.</p>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-10 py-4 bg-white hover:bg-gray-100 text-blue-600 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 text-lg">
                Get Started Now
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
             <button 
                onClick={() => document.getElementById('dropzone')?.click()} 
                className="px-10 py-4 bg-white hover:bg-gray-100 text-blue-600 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 text-lg inline-block">
                Upload Your PDFs
              </button>
          </SignedIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-100 dark:bg-slate-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-700 dark:text-gray-400">© {new Date().getFullYear()} PDFMergy. All rights reserved.</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Terms</a>
              <a href="#" className="text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Privacy</a>
              <a href="#" className="text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
