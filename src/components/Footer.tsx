import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight">
                Book<span className="text-blue-400 font-extrabold">Swap</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Connecting book lovers through the joy of sharing. Rehome pre-loved volumes, borrow
              great stories, and build vibrant reading communities one book at a time.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-600 hover:text-white flex items-center justify-center text-xs font-bold cursor-pointer transition-colors" title="Twitter / X">
                𝕏
              </span>
              <span className="w-8 h-8 rounded-full bg-slate-800 hover:bg-pink-600 hover:text-white flex items-center justify-center text-xs font-bold cursor-pointer transition-colors" title="Instagram">
                📷
              </span>
              <span className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-800 hover:text-white flex items-center justify-center text-xs font-bold cursor-pointer transition-colors" title="Facebook">
                f
              </span>
              <span className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-500 hover:text-white flex items-center justify-center text-xs font-bold cursor-pointer transition-colors" title="LinkedIn">
                in
              </span>
            </div>
          </div>

          {/* Explore column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => navigateTo('browse')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Browse Books
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('map')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Nearby Books
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('add-book')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  List a Book
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('browse')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Book Clubs
                </button>
              </li>
            </ul>
          </div>

          {/* Community column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Community
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Reading Groups
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Community Reviews
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Top Readers & Lenders
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Local Book Meetups
                </span>
              </li>
            </ul>
          </div>

          {/* Support column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Support
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Help Center</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Safety Tips</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <span>© 2026 BookSwap. Made with ❤️ for book lovers everywhere.</span>
          <span className="inline-flex items-center gap-1.5 font-medium text-slate-300">
            📚 12,840 books shared and counting!
          </span>
        </div>
      </div>
    </footer>
  );
};
