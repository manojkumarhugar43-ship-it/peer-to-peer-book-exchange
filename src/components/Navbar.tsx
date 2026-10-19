import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Bell,
  BookOpen,
  Menu,
  X,
  Compass,
  MessageSquare,
  Bookmark,
  User,
  LogOut,
  PlusCircle,
  CheckCircle2,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    user,
    isLoggedIn,
    login,
    logout,
    notifications,
    unreadNotifCount,
    markAllNotifsRead,
    filters,
    setFilters,
    openAuthModal,
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close notifications dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFilters((prev) => ({ ...prev, searchQuery: val }));
    if (currentPage !== 'browse') {
      navigateTo('browse');
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => navigateTo('home')}
          className="flex items-center gap-2.5 text-slate-900 group cursor-pointer focus:outline-none"
          aria-label="BookSwap Home"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-slate-900">
            Book<span className="text-blue-700 font-extrabold">Swap</span>
          </span>
        </button>

        {/* Global Live Search */}
        <div className="hidden md:flex flex-1 max-w-md relative items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="search"
            value={filters.searchQuery}
            onChange={handleSearchChange}
            placeholder="Search books, authors, genres…"
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-full focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
            aria-label="Search books"
          />
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-1 text-sm font-semibold text-slate-600">
          <li>
            <button
              onClick={() => navigateTo('home')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                currentPage === 'home'
                  ? 'text-blue-700 bg-blue-50/80 font-bold'
                  : 'hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => navigateTo('browse')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                currentPage === 'browse'
                  ? 'text-blue-700 bg-blue-50/80 font-bold'
                  : 'hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Browse
            </button>
          </li>
          <li>
            <button
              onClick={() => navigateTo('map')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                currentPage === 'map'
                  ? 'text-blue-700 bg-blue-50/80 font-bold'
                  : 'hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Nearby
            </button>
          </li>
          <li>
            <button
              onClick={() => navigateTo('messages')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentPage === 'messages'
                  ? 'text-blue-700 bg-blue-50/80 font-bold'
                  : 'hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Messages
            </button>
          </li>
        </ul>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* List Book CTA */}
          <button
            onClick={() => navigateTo('add-book')}
            className="btn btn-accent btn-sm shadow-sm hover:shadow"
            id="nav-add-book-btn"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ List Book</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadNotifCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-900">Notifications</span>
                    {unreadNotifCount > 0 && (
                      <span className="text-[11px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">
                        {unreadNotifCount} new
                      </span>
                    )}
                  </div>
                  <button
                    onClick={markAllNotifsRead}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline cursor-pointer"
                  >
                    Mark all read
                  </button>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400">
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          if (n.linkPage) navigateTo(n.linkPage);
                          setIsNotifOpen(false);
                        }}
                        className={`p-3.5 text-xs hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 ${
                          n.unread ? 'bg-blue-50/50' : ''
                        }`}
                      >
                        <div
                          className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${
                            n.unread ? 'bg-blue-600' : 'bg-transparent'
                          }`}
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900">{n.title}</p>
                          <p className="text-slate-600 mt-0.5">{n.message}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Auth / Profile */}
          {isLoggedIn && user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateTo('profile')}
                className="w-9 h-9 rounded-full bg-blue-700 text-white font-bold text-xs flex items-center justify-center ring-2 ring-blue-100 hover:ring-blue-300 transition-all cursor-pointer"
                title={`${user.name} - View Profile`}
              >
                {user.avatar}
              </button>
              <button
                onClick={logout}
                className="hidden sm:inline-flex p-2 text-slate-500 hover:text-red-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => openAuthModal('login')}
                className="btn btn-ghost btn-sm"
              >
                Log In
              </button>
              <button
                onClick={() => openAuthModal('signup')}
                className="btn btn-primary btn-sm hidden sm:inline-flex"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <div className="mb-3">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="search"
                value={filters.searchQuery}
                onChange={handleSearchChange}
                placeholder="Search books, authors, genres…"
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
          </div>
          <button
            onClick={() => {
              navigateTo('home');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2.5 ${
              currentPage === 'home' ? 'text-blue-700 bg-blue-50' : 'text-slate-700'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Home
          </button>
          <button
            onClick={() => {
              navigateTo('browse');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2.5 ${
              currentPage === 'browse' ? 'text-blue-700 bg-blue-50' : 'text-slate-700'
            }`}
          >
            <Compass className="w-4 h-4" /> Browse Library
          </button>
          <button
            onClick={() => {
              navigateTo('map');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2.5 ${
              currentPage === 'map' ? 'text-blue-700 bg-blue-50' : 'text-slate-700'
            }`}
          >
            <Compass className="w-4 h-4" /> Nearby Books
          </button>
          <button
            onClick={() => {
              navigateTo('messages');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2.5 ${
              currentPage === 'messages' ? 'text-blue-700 bg-blue-50' : 'text-slate-700'
            }`}
          >
            <MessageSquare className="w-4 h-4" /> Messages
          </button>
          <button
            onClick={() => {
              navigateTo('wishlist');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2.5 ${
              currentPage === 'wishlist' ? 'text-blue-700 bg-blue-50' : 'text-slate-700'
            }`}
          >
            <Bookmark className="w-4 h-4" /> Wishlist
          </button>
          <button
            onClick={() => {
              navigateTo('profile');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2.5 ${
              currentPage === 'profile' ? 'text-blue-700 bg-blue-50' : 'text-slate-700'
            }`}
          >
            <User className="w-4 h-4" /> Profile
          </button>

          <hr className="border-slate-200 my-2" />

          {isLoggedIn ? (
            <button
              onClick={() => {
                logout();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm text-red-600 font-semibold flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Log Out ({user?.name})
            </button>
          ) : (
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => {
                  openAuthModal('login');
                  setIsMobileMenuOpen(false);
                }}
                className="btn btn-outline flex-1 btn-sm"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  openAuthModal('signup');
                  setIsMobileMenuOpen(false);
                }}
                className="btn btn-primary flex-1 btn-sm"
              >
                Sign Up Free
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
