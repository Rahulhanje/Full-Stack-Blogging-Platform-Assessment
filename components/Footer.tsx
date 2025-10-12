'use client';

import Link from 'next/link';
import { useAuth } from '../lib/useAuth';

export function Footer() {
  const { user } = useAuth();
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                BlogCraft
              </h3>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6 max-w-md">
              A modern blogging platform where creativity meets technology. Share your thoughts, 
              inspire others, and build a community around your ideas with our beautiful, 
              fast, and intuitive platform.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="w-10 h-10 bg-slate-700/50 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </Link>
              <Link href="#" className="w-10 h-10 bg-slate-700/50 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </Link>
              <Link href="#" className="w-10 h-10 bg-slate-700/50 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Home</Link></li>
              <li><Link href="/blog" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Blog</Link></li>
              <li><Link href="/categories" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Categories</Link></li>
              {user && (
                <li><Link href="/dashboard" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Dashboard</Link></li>
              )}
              {!user && (
                <>
                  <li><Link href="/auth/signin" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Sign In</Link></li>
                  <li><Link href="/auth/signup" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Sign Up</Link></li>
                </>
              )}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Features</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                <span className="text-slate-300">Create Posts</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                <span className="text-slate-300">Manage Categories</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                <span className="text-slate-300">Markdown Support</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
                <span className="text-slate-300">Responsive Design</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-center md:text-left">
              © 2025 BlogCraft. Built with ❤️ using Next.js, TypeScript, and modern web technologies.
            </p>
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}