import React from 'react';
import { useApp } from '../context/AppContext';
import { BookCard } from '../components/BookCard';
import {
  ArrowLeft,
  Heart,
  Share2,
  MapPin,
  Star,
  BookOpen,
  Calendar,
  Layers,
  Globe2,
  Barcode,
  MessageSquare,
  ShieldCheck,
  Send,
  PlusCircle,
} from 'lucide-react';

export const BookDetailPage: React.FC = () => {
  const {
    selectedBook,
    books,
    navigateTo,
    toggleWishlist,
    openRequestModal,
    openMessageModal,
    openReviewModal,
    showToast,
  } = useApp();

  if (!selectedBook) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-slate-800">Book Not Found</h2>
        <p className="text-slate-500 text-sm">The selected book is no longer available.</p>
        <button onClick={() => navigateTo('browse')} className="btn btn-primary">
          Back to Browse Library
        </button>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Book link copied to clipboard!', 'info');
  };

  const similarBooks = books
    .filter((b) => b.id !== selectedBook.id && (b.genre === selectedBook.genre || b.type === selectedBook.type))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb / Back button */}
      <div>
        <button
          onClick={() => navigateTo('browse')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Library Catalog</span>
        </button>
      </div>

      {/* Main Book Detail Container */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Cover & Quick Specs */}
          <div className="md:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden bg-slate-100 shadow-xl border border-slate-200 aspect-3/4 max-h-120 mx-auto">
              <img
                src={selectedBook.coverImage}
                alt={selectedBook.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1.5 text-xs font-bold rounded-lg bg-white/95 text-slate-900 shadow-md backdrop-blur-md uppercase tracking-wider">
                  {selectedBook.type}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => toggleWishlist(selectedBook.id)}
                  className={`p-2.5 rounded-full shadow-md backdrop-blur-md transition-all cursor-pointer ${
                    selectedBook.isWishlisted
                      ? 'bg-rose-500 text-white'
                      : 'bg-white/90 text-slate-600 hover:text-rose-500'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${selectedBook.isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs">
              <div className="flex items-center gap-2.5">
                <Globe2 className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Language</div>
                  <div className="font-bold text-slate-800">{selectedBook.language || 'English'}</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Year</div>
                  <div className="font-bold text-slate-800">{selectedBook.year || '2020'}</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Pages</div>
                  <div className="font-bold text-slate-800">{selectedBook.pages || '320'} pages</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Barcode className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">ISBN</div>
                  <div className="font-bold text-slate-800 truncate max-w-28">
                    {selectedBook.isbn || 'N/A'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Author, Terms, Owner, Actions */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {selectedBook.genre}
                </span>
                <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-md">
                  Condition: {selectedBook.condition.toUpperCase()}
                </span>
                <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {selectedBook.distance} km from you ({selectedBook.locationName})
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                {selectedBook.title}
              </h1>
              <p className="text-base text-slate-600 font-medium">by {selectedBook.author}</p>

              {/* Description */}
              <div className="pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Book Summary & Notes
                </h3>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {selectedBook.description}
                </p>
              </div>

              {/* Exchange Terms Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5 space-y-2 mt-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>Exchange Modality & Terms</span>
                </div>
                {selectedBook.type === 'lend' && (
                  <div className="text-xs text-slate-600 space-y-1">
                    <p>
                      <strong>Loan Duration:</strong> {selectedBook.lendingDuration || '2 to 3 weeks'}
                    </p>
                    <p>
                      <strong>Terms:</strong> Borrower agrees to handle with care and return promptly at agreed location.
                    </p>
                  </div>
                )}
                {selectedBook.type === 'swap' && (
                  <div className="text-xs text-slate-600 space-y-1">
                    <p>
                      <strong>Swap Preference:</strong>{' '}
                      {selectedBook.swapPreferences || 'Open to non-fiction or psychological thrillers.'}
                    </p>
                    <p>
                      <strong>Terms:</strong> Mutual permanent exchange of physical books.
                    </p>
                  </div>
                )}
                {selectedBook.type === 'give' && (
                  <div className="text-xs text-slate-600 space-y-1">
                    <p className="text-amber-800 font-bold">
                      🎁 100% Free Community Gift
                    </p>
                    <p>Pass the story forward! Free to any community reader who will cherish it.</p>
                  </div>
                )}
                {selectedBook.type === 'sell' && (
                  <div className="flex items-center justify-between text-xs text-slate-700">
                    <div>
                      <p className="font-bold text-rose-700 text-sm">Price: ₹{selectedBook.price || 199}</p>
                      <p className="text-slate-500">Payment via UPI or Cash upon physical meetup</p>
                    </div>
                    <span className="text-lg font-black text-rose-600">₹{selectedBook.price || 199}</span>
                  </div>
                )}
              </div>

              {/* Owner Info Box */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex items-center justify-between gap-4 mt-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-blue-700 text-white font-bold text-sm flex items-center justify-center shrink-0">
                    {selectedBook.owner.avatar}
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-medium">Lender / Re-Homer</div>
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span>{selectedBook.owner.name}</span>
                      <span className="text-[11px] text-emerald-700 font-semibold">
                        • {selectedBook.owner.statusText || 'Available'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span className="flex items-center gap-1 text-amber-600 font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" /> {selectedBook.owner.rating}
                      </span>
                      <span>• {selectedBook.owner.reviewCount} community exchanges</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => openMessageModal({ owner: selectedBook.owner, bookTitle: selectedBook.title })}
                  className="btn btn-outline btn-sm bg-white text-xs font-semibold shrink-0"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                  <span>Message</span>
                </button>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-3">
              <button
                onClick={() => openRequestModal(selectedBook)}
                className="btn btn-primary btn-lg flex-1 shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base font-bold"
              >
                <Send className="w-4 h-4" />
                <span>Request This Book</span>
              </button>
              <button
                onClick={() => toggleWishlist(selectedBook.id)}
                className={`btn btn-lg border transition-all ${
                  selectedBook.isWishlisted
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'btn-outline'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${selectedBook.isWishlisted ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline">
                  {selectedBook.isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                </span>
                <span className="text-xs bg-slate-100 px-1.5 py-0.5 rounded-full font-bold ml-1">
                  {selectedBook.wishlistCount}
                </span>
              </button>
              <button
                onClick={handleShare}
                className="btn btn-outline btn-lg"
                title="Share book link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Community Reviews Section */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
              Community Reviews & Ratings
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified feedback from readers who read or exchanged this book
            </p>
          </div>
          <button
            onClick={() => openReviewModal(selectedBook.id)}
            className="btn btn-outline btn-sm text-xs font-bold flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Write a Review</span>
          </button>
        </div>

        {selectedBook.reviews.length === 0 ? (
          <div className="text-center py-10 space-y-2">
            <p className="text-sm font-semibold text-slate-700">No community reviews yet</p>
            <p className="text-xs text-slate-400">
              Be the first to review this book or share your exchange experience!
            </p>
            <button
              onClick={() => openReviewModal(selectedBook.id)}
              className="btn btn-outline btn-sm mt-2"
            >
              Write First Review ⭐
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedBook.reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                      {rev.avatar}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{rev.author}</div>
                      <div className="text-[10px] text-slate-400">{rev.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-amber-500 text-xs">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Similar Books */}
      {similarBooks.length > 0 && (
        <section className="space-y-6">
          <h3 className="font-serif text-2xl font-bold text-slate-900">
            Similar Community Books You May Like
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {similarBooks.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
