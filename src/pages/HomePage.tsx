import React from 'react';
import { useApp } from '../context/AppContext';
import { BookCard } from '../components/BookCard';
import {
  BookOpen,
  RefreshCw,
  Gift,
  DollarSign,
  ArrowRight,
  BookMarked,
  Search,
  MessageCircle,
  Award,
  Sparkles,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { books, navigateTo, openIntentModal, openAuthModal, setFilters } = useApp();

  const handleTypeSelect = (type: 'lend' | 'swap' | 'give' | 'sell') => {
    setFilters((prev) => ({ ...prev, types: [type] }));
    navigateTo('browse');
  };

  const featuredBooks = books.slice(0, 6);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 bg-gradient-to-b from-blue-50/70 via-indigo-50/20 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span>✦ Peer-to-Peer Literary Exchange</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.12]">
                Share Books,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600">
                  Share Stories
                </span>
                ,<br />
                Build Community
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Lend, borrow, swap, or discover pre-loved books with readers in your neighborhood.
                Every book carries a living history — connect with local readers and pass the story
                forward.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => navigateTo('browse')}
                  className="btn btn-primary btn-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  id="hero-browse-btn"
                >
                  Explore Library Catalog
                </button>
                <button
                  onClick={() => navigateTo('add-book')}
                  className="btn btn-outline btn-lg bg-white shadow-xs hover:shadow"
                  id="hero-list-btn"
                >
                  + List Your Books
                </button>
                <button
                  onClick={openIntentModal}
                  className="btn btn-accent btn-lg shadow-sm"
                  id="hero-intent-btn"
                >
                  ❖ Set Your Reading Goal
                </button>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200/80 max-w-lg">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
                    12,840
                  </div>
                  <div className="text-xs text-slate-500 font-semibold mt-0.5 uppercase tracking-wider">
                    Books Listed
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 font-serif">
                    4,200+
                  </div>
                  <div className="text-xs text-slate-500 font-semibold mt-0.5 uppercase tracking-wider">
                    Active Members
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-purple-700 font-serif">
                    8,500
                  </div>
                  <div className="text-xs text-slate-500 font-semibold mt-0.5 uppercase tracking-wider">
                    Exchanges Done
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual & Floating Cards */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-md">
                {/* Main Hero Photo */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/5 bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800"
                    alt="Books in a cozy literary setting"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="text-xs font-semibold text-blue-200">Local Exchange Network</p>
                    <p className="font-serif text-lg font-bold">Discover Your Next Favorite Read</p>
                  </div>
                </div>

                {/* Floating card 1: Give away */}
                <div className="absolute -top-4 -left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce [animation-duration:4s]">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg shadow-xs">
                    🎁
                  </div>
                  <div>
                    <div className="text-[11px] font-medium text-slate-500">Ananya gave away</div>
                    <div className="text-xs font-bold text-slate-900">Psychology of Money</div>
                  </div>
                </div>

                {/* Floating card 2: Swap */}
                <div className="absolute -bottom-5 -right-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-pulse">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center text-lg shadow-xs">
                    🔄
                  </div>
                  <div>
                    <div className="text-[11px] font-medium text-slate-500">Arjun wants to swap</div>
                    <div className="text-xs font-bold text-slate-900">Atomic Habits</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (4 steps) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="how-it-works-title">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 inline-block px-3 py-1 rounded-full mb-2">
            How It Works
          </p>
          <h2 id="how-it-works-title" className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Exchange Books in 4 Simple Steps
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Our platform makes it effortless to share books with your community
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 relative hover:shadow-md transition-shadow">
            <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center mb-4">
              1
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <BookMarked className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-1.5">List Your Books</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Catalog books you would like to lend, swap, gift, or sell with title, edition, and condition notes.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 relative hover:shadow-md transition-shadow">
            <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center mb-4">
              2
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-1.5">Discover Books</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Explore verified community bookshelves nearby by author, genre, language, or distance radius.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 relative hover:shadow-md transition-shadow">
            <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center mb-4">
              3
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-1.5">Connect & Arrange</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Coordinate exchange terms and convenient meetup spots with fellow verified book lovers.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 relative hover:shadow-md transition-shadow">
            <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center mb-4">
              4
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-1.5">Read & Review</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Enjoy your new volume, return borrowed books in pristine care, and earn community trust ratings.
            </p>
          </div>
        </div>
      </section>

      {/* Exchange Types */}
      <section className="bg-slate-50 py-16 border-y border-slate-200" aria-labelledby="exchange-types-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 inline-block px-3 py-1 rounded-full mb-2">
              Exchange Types
            </p>
            <h2 id="exchange-types-title" className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Choose How You Share
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Flexible exchange modalities tailored to every reader's bookshelf
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Lend */}
            <div
              onClick={() => handleTypeSelect('lend')}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-emerald-800 mb-2">Lend</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Share books temporarily. Choose your lending duration and help fellow readers discover treasured titles.
                </p>
              </div>
              <button className="btn btn-primary btn-sm mt-6 w-full text-xs">
                Browse Lending Volumes →
              </button>
            </div>

            {/* Swap */}
            <div
              onClick={() => handleTypeSelect('swap')}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-purple-300 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-purple-800 mb-2">Swap</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Trade finished books directly for new stories on your wishlist. A mutual barter between bibliophiles.
                </p>
              </div>
              <button className="btn btn-sm mt-6 w-full text-xs bg-purple-600 hover:bg-purple-700 text-white">
                Browse Swaps →
              </button>
            </div>

            {/* Give */}
            <div
              onClick={() => handleTypeSelect('give')}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-amber-300 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Gift className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-amber-900 mb-2">Give Away</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Spread literary joy! Gift books you have cherished to readers who will treasure them next.
                </p>
              </div>
              <button className="btn btn-sm mt-6 w-full text-xs bg-amber-600 hover:bg-amber-700 text-white">
                Browse Free Books →
              </button>
            </div>

            {/* Sell */}
            <div
              onClick={() => handleTypeSelect('sell')}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-rose-300 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-rose-800 mb-2">Sell & Buy</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Find collector editions at fair prices or rehome pre-loved volumes directly in your local area.
                </p>
              </div>
              <button className="btn btn-sm mt-6 w-full text-xs bg-rose-600 hover:bg-rose-700 text-white">
                Browse Books for Sale →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="featured-books-title">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 inline-block px-3 py-1 rounded-full mb-2">
              Featured Books
            </p>
            <h2 id="featured-books-title" className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Popular Right Now
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Highly sought-after books available in your community
            </p>
          </div>
          <button
            onClick={() => navigateTo('browse')}
            className="btn btn-outline btn-sm self-start sm:self-auto flex items-center gap-1.5"
          >
            <span>View All Books</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigateTo('browse')}
            className="btn btn-outline btn-lg"
          >
            View All Books in Catalog →
          </button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-8 sm:p-14 text-center shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Ready to Start Your Book Journey?
            </h2>
            <p className="text-sm sm:text-base text-blue-100 max-w-lg mx-auto leading-relaxed">
              Join thousands of readers already exchanging books in their communities. Build friendships, explore new genres, and keep stories alive.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => openAuthModal('signup')}
                className="btn btn-lg bg-white text-blue-700 hover:bg-blue-50 font-bold shadow-md cursor-pointer"
              >
                🚀 Get Started Free
              </button>
              <button
                onClick={() => navigateTo('browse')}
                className="btn btn-lg bg-transparent border-white/50 text-white hover:bg-white/10 font-bold cursor-pointer"
              >
                Browse Books First
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
