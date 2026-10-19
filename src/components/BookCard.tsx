import React from 'react';
import { Book } from '../types';
import { useApp } from '../context/AppContext';
import { Heart, MapPin, Star, ArrowRight } from 'lucide-react';

interface BookCardProps {
  book: Book;
  viewMode?: 'grid' | 'list';
}

export const BookCard: React.FC<BookCardProps> = ({ book, viewMode = 'grid' }) => {
  const { navigateTo, toggleWishlist, openRequestModal } = useApp();

  const getTypeBadge = (type: Book['type'], price?: number) => {
    switch (type) {
      case 'lend':
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-xs flex items-center gap-1">
            <span>📖</span> Lend
          </span>
        );
      case 'swap':
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-purple-100 text-purple-800 border border-purple-200 shadow-xs flex items-center gap-1">
            <span>🔄</span> Swap
          </span>
        );
      case 'give':
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-amber-100 text-amber-900 border border-amber-200 shadow-xs flex items-center gap-1">
            <span>🎁</span> Free
          </span>
        );
      case 'sell':
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-rose-100 text-rose-800 border border-rose-200 shadow-xs flex items-center gap-1">
            <span>🏷️</span> ₹{price || 199}
          </span>
        );
      default:
        return null;
    }
  };

  const getConditionLabel = (condition: Book['condition']) => {
    switch (condition) {
      case 'new':
        return '✨ New';
      case 'good':
        return '👍 Good';
      case 'fair':
        return '👌 Fair';
      default:
        return condition;
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-5 hover:border-slate-300 hover:shadow-md transition-all group">
        {/* Cover */}
        <div
          className="relative w-full sm:w-36 h-48 sm:h-auto rounded-xl overflow-hidden shrink-0 bg-slate-100 cursor-pointer"
          onClick={() => navigateTo('detail', book.id)}
        >
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-2 left-2">{getTypeBadge(book.type, book.price)}</div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  {book.genre}
                </span>
                <h3
                  onClick={() => navigateTo('detail', book.id)}
                  className="font-serif text-lg sm:text-xl font-bold text-slate-900 mt-1 cursor-pointer hover:text-blue-700 transition-colors line-clamp-1"
                >
                  {book.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">by {book.author}</p>
              </div>

              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(book.id)}
                className={`p-2 rounded-full border transition-all cursor-pointer ${
                  book.isWishlisted
                    ? 'bg-rose-50 border-rose-200 text-rose-500'
                    : 'bg-white border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-200'
                }`}
                title="Save to wishlist"
              >
                <Heart className={`w-4 h-4 ${book.isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
              {book.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-500">
              <span className="bg-slate-100 px-2 py-0.5 rounded font-medium text-slate-700">
                {getConditionLabel(book.condition)}
              </span>
              <span className="flex items-center gap-1 font-medium text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {book.distance} km ({book.locationName})
              </span>
              {book.year && <span>• {book.year}</span>}
              {book.language && <span>• {book.language}</span>}
            </div>
          </div>

          {/* Bottom row: owner + actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-3 border-t border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">
                {book.owner.avatar}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">{book.owner.name}</div>
                <div className="text-[11px] text-amber-600 flex items-center gap-1 font-semibold">
                  <Star className="w-3 h-3 fill-current" /> {book.owner.rating} ({book.owner.reviewCount})
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateTo('detail', book.id)}
                className="btn btn-outline btn-sm text-slate-700"
              >
                Details
              </button>
              <button
                onClick={() => openRequestModal(book)}
                className="btn btn-primary btn-sm shadow-xs"
              >
                Request Book
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 hover:shadow-lg transition-all group flex flex-col justify-between">
      <div>
        {/* Cover image wrap */}
        <div
          className="relative h-56 bg-slate-100 overflow-hidden cursor-pointer"
          onClick={() => navigateTo('detail', book.id)}
        >
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {/* Badge */}
          <div className="absolute top-2.5 left-2.5 z-10">
            {getTypeBadge(book.type, book.price)}
          </div>

          {/* Wishlist button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(book.id);
            }}
            className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-sm ${
              book.isWishlisted
                ? 'bg-rose-500 text-white'
                : 'bg-white/80 hover:bg-white text-slate-600 hover:text-rose-500'
            }`}
            title="Wishlist"
          >
            <Heart className={`w-4 h-4 ${book.isWishlisted ? 'fill-current' : ''}`} />
          </button>

          {/* Condition banner at bottom of image */}
          <div className="absolute bottom-2 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[11px] px-2 py-0.5 rounded font-medium">
            {getConditionLabel(book.condition)}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">
              {book.genre}
            </span>
            <span className="text-slate-500 font-medium flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              {book.distance} km
            </span>
          </div>

          <h3
            onClick={() => navigateTo('detail', book.id)}
            className="font-serif text-base sm:text-lg font-bold text-slate-900 cursor-pointer hover:text-blue-700 transition-colors line-clamp-1"
          >
            {book.title}
          </h3>
          <p className="text-xs text-slate-500 font-medium">by {book.author}</p>

          <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
            {book.description}
          </p>

          {/* Owner Info */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
            <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
              {book.owner.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-800 truncate">{book.owner.name}</p>
            </div>
            <div className="text-[11px] font-bold text-amber-600 flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-current" />
              {book.owner.rating}
            </div>
          </div>
        </div>
      </div>

      {/* Card Action footer */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 flex items-center gap-2">
        <button
          onClick={() => navigateTo('detail', book.id)}
          className="btn btn-outline btn-sm flex-1 text-xs"
        >
          Details
        </button>
        <button
          onClick={() => openRequestModal(book)}
          className="btn btn-primary btn-sm flex-1 text-xs shadow-xs"
        >
          Request
        </button>
      </div>
    </div>
  );
};
