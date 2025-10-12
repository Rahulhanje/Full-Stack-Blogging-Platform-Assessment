import Link from 'next/link';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-900/20 dark:via-transparent dark:to-purple-900/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float-delayed"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-32">
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight animate-fade-in">
                Share Your Stories
                <br />
                <span className="text-slate-800 dark:text-slate-200">with the World</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed animate-fade-in-up">
                A modern blogging platform where creativity meets technology. Create, manage, and share your thoughts 
                with our beautiful, fast, and intuitive platform built for the next generation of writers.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up-delayed">
              <Link href="/blog" className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-blue-500/25 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40">
                <div className="flex items-center space-x-2">
                  <span>Explore Stories</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </Link>
              <Link href="/dashboard" className="group glass-card px-8 py-4 rounded-xl text-lg font-semibold text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50 hover:border-purple-300 dark:hover:border-purple-600 transform transition-all duration-300 hover:scale-105">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  <span>Start Writing</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 bg-gradient-to-b from-white/50 to-slate-50/50 dark:from-slate-800/50 dark:to-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
              Everything You Need to Blog
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Powerful features designed to help you create, manage, and share your content with the world
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group glass-card p-8 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 hover:border-blue-300 dark:hover:border-blue-600 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">Easy Writing</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Write with markdown support and real-time preview. Focus on your content while we handle the formatting and styling.
              </p>
            </div>
            
            <div className="group glass-card p-8 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 hover:border-green-300 dark:hover:border-green-600 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-500/25 group-hover:shadow-xl group-hover:shadow-green-500/40 transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">Smart Categories</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Organize your posts with flexible categories and tags. Make your content easy to discover and navigate for your readers.
              </p>
            </div>
            
            <div className="group glass-card p-8 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 hover:border-purple-300 dark:hover:border-purple-600 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/25 group-hover:shadow-xl group-hover:shadow-purple-500/40 transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">Lightning Fast</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Built with Next.js 15 and modern technologies for blazing fast performance, excellent SEO, and amazing user experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-purple-600/80 to-pink-600/80"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center text-white space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Ready to Start Your
            <br />
            Blogging Journey?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
            Join thousands of writers who trust BlogCraft to share their stories with the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard" className="bg-white text-purple-600 hover:bg-slate-100 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex items-center justify-center space-x-2">
                <span>Create Your First Post</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </Link>
            <Link href="/blog" className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 rounded-xl text-lg font-semibold transform transition-all duration-300 hover:scale-105">
              Browse Stories
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    
  );
}
