import React from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, RefreshCw, Gift, DollarSign, ArrowRight, X } from 'lucide-react';

export const IntentModal: React.FC = () => {
  const { isIntentModalOpen, closeIntentModal, handleIntentSelection } = useApp();

  if (!isIntentModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 text-center animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={closeIntentModal}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="inline-flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="font-serif text-xl font-bold tracking-tight text-slate-900">
            Book<span className="text-blue-700">Swap</span>
          </span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
          What would you like to do today?
        </h2>
        <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
          Select your goal to find the best books and options in your community
        </p>

        {/* 4 Intent Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 text-left">
          {/* Sell */}
          <div
            onClick={() => handleIntentSelection('sell')}
            className="group p-5 rounded-2xl border border-rose-100 bg-rose-50/40 hover:bg-rose-50 hover:border-rose-300 hover:shadow-md transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-sm">
                <DollarSign className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                Earn Money
              </span>
            </div>
            <h3 className="font-bold text-base text-slate-900 group-hover:text-rose-600 transition-colors">
              Sell Books
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              List your pre-loved books for cash in your neighborhood
            </p>
          </div>

          {/* Buy & Borrow */}
          <div
            onClick={() => handleIntentSelection('buy')}
            className="group p-5 rounded-2xl border border-blue-100 bg-blue-50/40 hover:bg-blue-50 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                Great Reads
              </span>
            </div>
            <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-700 transition-colors">
              Buy & Borrow
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Discover secondhand books at bargain prices or borrow nearby
            </p>
          </div>

          {/* Swap */}
          <div
            onClick={() => handleIntentSelection('swap')}
            className="group p-5 rounded-2xl border border-purple-100 bg-purple-50/40 hover:bg-purple-50 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-sm">
                <RefreshCw className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                Direct Barter
              </span>
            </div>
            <h3 className="font-bold text-base text-slate-900 group-hover:text-purple-700 transition-colors">
              Swap Books
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Trade finished books directly with fellow community readers
            </p>
          </div>

          {/* Gift / Free */}
          <div
            onClick={() => handleIntentSelection('gift')}
            className="group p-5 rounded-2xl border border-amber-100 bg-amber-50/40 hover:bg-amber-50 hover:border-amber-300 hover:shadow-md transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-sm">
                <Gift className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                100% Free
              </span>
            </div>
            <h3 className="font-bold text-base text-slate-900 group-hover:text-amber-700 transition-colors">
              Gift / Free
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Give away books or claim free community donations
            </p>
          </div>
        </div>

        {/* Skip button */}
        <div className="mt-8">
          <button
            onClick={closeIntentModal}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            Skip & Explore Everything <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
