import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookCard } from '../components/BookCard';
import {
  User,
  Star,
  MapPin,
  Calendar,
  BookOpen,
  RefreshCw,
  Gift,
  PlusCircle,
  Edit3,
  Trash2,
  CheckCircle,
  Clock,
  Heart,
  MessageSquare,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const {
    user,
    myBooks,
    requests,
    books,
    deleteBook,
    updateBookStatus,
    updateRequestStatus,
    navigateTo,
    openEditProfileModal,
    openRequestModal,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'listings' | 'requests' | 'wishlist' | 'reviews'>(
    'listings'
  );

  const wishlistedBooks = books.filter((b) => b.isWishlisted);

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-slate-800">Please Log In</h2>
        <p className="text-slate-500 text-sm">
          Log in or sign up to view and manage your community profile, books, and requests.
        </p>
        <button onClick={() => navigateTo('home')} className="btn btn-primary">
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Profile Header Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-600 text-white font-serif font-bold text-2xl flex items-center justify-center shadow-lg ring-4 ring-blue-50">
              {user.avatar}
            </div>
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                  {user.name}
                </h1>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Verified Member
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl leading-relaxed">
                {user.bio}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {user.city}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> {user.joinedDate}
                </span>
                <span className="flex items-center gap-1 font-bold text-amber-600">
                  <Star className="w-3.5 h-3.5 fill-current" /> {user.rating} Community Trust Score
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={openEditProfileModal}
            className="btn btn-outline btn-sm text-xs font-bold flex items-center gap-1.5 shrink-0"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70 text-center sm:text-left">
            <span className="text-xs text-slate-500 font-semibold uppercase">Books Listed</span>
            <div className="text-2xl font-serif font-bold text-slate-900 mt-0.5">
              {myBooks.length}
            </div>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70 text-center sm:text-left">
            <span className="text-xs text-slate-500 font-semibold uppercase">Lending History</span>
            <div className="text-2xl font-serif font-bold text-emerald-700 mt-0.5">
              {user.booksLentCount}
            </div>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70 text-center sm:text-left">
            <span className="text-xs text-slate-500 font-semibold uppercase">Completed Swaps</span>
            <div className="text-2xl font-serif font-bold text-purple-700 mt-0.5">
              {user.booksSwappedCount}
            </div>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70 text-center sm:text-left">
            <span className="text-xs text-slate-500 font-semibold uppercase">Books Gifted</span>
            <div className="text-2xl font-serif font-bold text-amber-700 mt-0.5">
              {user.booksDonatedCount}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto gap-2">
        <button
          onClick={() => setActiveTab('listings')}
          className={`py-3 px-4 font-bold text-sm border-b-2 transition-all shrink-0 cursor-pointer ${
            activeTab === 'listings'
              ? 'border-blue-700 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          My Listed Books ({myBooks.length})
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`py-3 px-4 font-bold text-sm border-b-2 transition-all shrink-0 cursor-pointer ${
            activeTab === 'requests'
              ? 'border-blue-700 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          My Requests & Exchanges ({requests.length})
        </button>
        <button
          onClick={() => setActiveTab('wishlist')}
          className={`py-3 px-4 font-bold text-sm border-b-2 transition-all shrink-0 cursor-pointer ${
            activeTab === 'wishlist'
              ? 'border-blue-700 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          My Wishlist ({wishlistedBooks.length})
        </button>
      </div>

      {/* Tab 1: Listings */}
      {activeTab === 'listings' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-xl text-slate-900">Your Active Bookshelf</h2>
            <button
              onClick={() => navigateTo('add-book')}
              className="btn btn-primary btn-sm flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ List New Book</span>
            </button>
          </div>

          {myBooks.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-serif font-bold text-lg text-slate-800">
                You haven't listed any books yet
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Share books you have read to earn karma, build trust, and swap for new stories.
              </p>
              <button onClick={() => navigateTo('add-book')} className="btn btn-primary btn-sm mt-2">
                List Your First Book
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myBooks.map((b) => (
                <div
                  key={b.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between"
                >
                  <div className="p-4 flex gap-3.5">
                    <img
                      src={b.coverImage}
                      alt={b.title}
                      className="w-16 h-22 object-cover rounded-lg shrink-0 shadow-xs bg-slate-100"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded">
                        {b.type}
                      </span>
                      <h4 className="font-serif font-bold text-slate-900 text-sm truncate mt-1">
                        {b.title}
                      </h4>
                      <p className="text-xs text-slate-500">by {b.author}</p>
                      <div className="mt-2 text-xs font-semibold text-emerald-700">
                        Status: <span className="capitalize">{b.status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button
                      onClick={() => navigateTo('detail', b.id)}
                      className="text-blue-700 font-bold hover:underline"
                    >
                      View Page →
                    </button>
                    <button
                      onClick={() => deleteBook(b.id)}
                      className="text-red-500 hover:text-red-700 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Requests & Exchanges */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          <h2 className="font-serif font-bold text-xl text-slate-900">Exchange Coordination</h2>
          {requests.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-xs text-slate-400">
              No active exchange proposals right now
            </div>
          ) : (
            <div className="space-y-3">
              {requests.map((r) => (
                <div
                  key={r.id}
                  className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={r.bookCover}
                      alt={r.bookTitle}
                      className="w-14 h-18 object-cover rounded-lg shrink-0 shadow-xs"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                          {r.type}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            r.status === 'accepted'
                              ? 'bg-emerald-100 text-emerald-800'
                              : r.status === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {r.status.toUpperCase()}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-slate-900 text-sm sm:text-base mt-1">
                        {r.bookTitle}
                      </h4>
                      <p className="text-xs text-slate-500">
                        Owner: <strong>{r.ownerName}</strong> • Meetup: {r.meetupArea}
                      </p>
                      {r.message && (
                        <p className="text-xs text-slate-600 mt-1 italic">"{r.message}"</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => navigateTo('messages')}
                      className="btn btn-outline btn-sm text-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-blue-600" /> Chat
                    </button>
                    {r.status === 'pending' && (
                      <button
                        onClick={() => updateRequestStatus(r.id, 'accepted')}
                        className="btn btn-primary btn-sm text-xs"
                      >
                        Accept
                      </button>
                    )}
                    {r.status === 'accepted' && (
                      <button
                        onClick={() => updateRequestStatus(r.id, 'completed')}
                        className="btn btn-accent btn-sm text-xs"
                      >
                        Mark Completed
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Wishlist */}
      {activeTab === 'wishlist' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-xl text-slate-900">Saved Books</h2>
            <button onClick={() => navigateTo('browse')} className="btn btn-outline btn-sm">
              + Browse More
            </button>
          </div>

          {wishlistedBooks.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-xs text-slate-400">
              Your wishlist is empty. Tap the heart on any book to save it for later!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistedBooks.map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
