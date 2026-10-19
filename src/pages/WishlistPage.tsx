import React from 'react';
import { useApp } from '../context/AppContext';
import { BookCard } from '../components/BookCard';
import { Bookmark, Heart, Compass } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { books, navigateTo } = useApp();
  const wishlistedBooks = books.filter((b) => b.isWishlisted);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-slate-900">My Wishlist</h1>
          <p className="text-sm text-slate-500 mt-1">
            Books you would love to borrow, swap, or read next
          </p>
        </div>
        <button
          onClick={() => navigateTo('browse')}
          className="btn btn-primary btn-sm self-start sm:self-auto"
        >
          + Add More Books
        </button>
      </div>

      {wishlistedBooks.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-7 h-7" />
          </div>
          <h2 className="font-serif text-xl font-bold text-slate-800">Your Wishlist is Empty</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Whenever you find a book you would like to read later, tap the heart icon to save it here for instant access!
          </p>
          <button
            onClick={() => navigateTo('browse')}
            className="btn btn-outline btn-sm mt-2 flex items-center gap-1.5 mx-auto"
          >
            <Compass className="w-4 h-4 text-blue-600" />
            <span>Explore Community Library</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};
