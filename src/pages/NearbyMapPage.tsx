import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Book } from '../types';
import { MapPin, Search, Navigation, Compass, Star, ArrowRight, ExternalLink } from 'lucide-react';

export const NearbyMapPage: React.FC = () => {
  const { books, navigateTo, openRequestModal } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activePinBook, setActivePinBook] = useState<Book | null>(books[0] || null);
  const [selectedRadius, setSelectedRadius] = useState(15);

  const nearbyBooks = books
    .filter((b) => b.distance <= selectedRadius)
    .filter(
      (b) =>
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.locationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.distance - b.distance);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-slate-900">Nearby Community Books</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Discover pre-loved books and active lenders right around your neighborhood
          </p>
        </div>

        {/* Radius Filter */}
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-2xl border border-slate-200 text-xs shadow-xs">
          <Navigation className="w-3.5 h-3.5 text-blue-600" />
          <span className="font-semibold text-slate-600">Radius:</span>
          {[5, 10, 15, 20].map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRadius(r)}
              className={`px-2 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                selectedRadius === r
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {r} km
            </button>
          ))}
        </div>
      </div>

      {/* Main Map + Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[720px]">
        {/* Left Sidebar List */}
        <aside className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col h-full overflow-hidden">
          <div className="pb-4 border-b border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-base text-slate-900">
                Books Nearby ({nearbyBooks.length})
              </h3>
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                Within {selectedRadius} km
              </span>
            </div>

            {/* Search location or book */}
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search area, title, or author…"
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none"
              />
            </div>
          </div>

          {/* Results List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 py-2 pr-1 space-y-1">
            {nearbyBooks.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                No books found within {selectedRadius} km. Try expanding the radius.
              </div>
            ) : (
              nearbyBooks.map((book) => {
                const isSelected = activePinBook?.id === book.id;
                return (
                  <div
                    key={book.id}
                    onClick={() => setActivePinBook(book)}
                    className={`p-3 rounded-2xl transition-all cursor-pointer flex gap-3 ${
                      isSelected
                        ? 'bg-blue-50/80 border border-blue-200 shadow-xs'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-12 h-16 object-cover rounded-lg shrink-0 bg-slate-100 shadow-xs"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-1.5 py-0.2 rounded">
                          {book.type}
                        </span>
                        <span className="text-[11px] font-bold text-slate-500 flex items-center gap-0.5">
                          <MapPin className="w-3 h-3 text-slate-400" /> {book.distance} km
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-slate-900 text-xs truncate mt-1">
                        {book.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate">by {book.author}</p>
                      <div className="text-[10px] text-slate-400 mt-1 truncate">
                        📍 {book.locationName}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </aside>

        {/* Right Map Canvas */}
        <div className="lg:col-span-8 bg-slate-100 border border-slate-200 rounded-3xl relative overflow-hidden shadow-inner h-full flex flex-col justify-between">
          {/* Stylized Simulated Map Background Grid with Roads and Landmarks */}
          <div className="absolute inset-0 bg-[#e5e9ec] overflow-hidden pointer-events-none">
            {/* Soft map grid lines */}
            <svg className="w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#cbd5e1" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              {/* Simulated Road networks */}
              <path
                d="M -50,150 Q 200,120 400,280 T 900,400"
                fill="none"
                stroke="#ffffff"
                strokeWidth="14"
              />
              <path
                d="M 150,-50 Q 300,300 250,750"
                fill="none"
                stroke="#ffffff"
                strokeWidth="12"
              />
              <path
                d="M 500,-50 Q 550,250 850,750"
                fill="none"
                stroke="#ffffff"
                strokeWidth="10"
              />
              <path
                d="M -50,450 Q 350,480 750,300 T 1200,350"
                fill="none"
                stroke="#ffffff"
                strokeWidth="12"
              />
              {/* Park green zone */}
              <circle cx="280" cy="220" r="110" fill="#d1fae5" opacity="0.6" />
              {/* Lake blue zone */}
              <circle cx="680" cy="520" r="130" fill="#dbeafe" opacity="0.6" />
            </svg>

            {/* Neighborhood Labels */}
            <div className="absolute top-12 left-1/4 text-[11px] font-bold text-slate-500 uppercase tracking-widest bg-white/60 px-2 py-0.5 rounded shadow-xs">
              Indiranagar Hub
            </div>
            <div className="absolute top-1/3 right-1/4 text-[11px] font-bold text-slate-500 uppercase tracking-widest bg-white/60 px-2 py-0.5 rounded shadow-xs">
              MG Road / Church St
            </div>
            <div className="absolute bottom-24 left-1/3 text-[11px] font-bold text-slate-500 uppercase tracking-widest bg-white/60 px-2 py-0.5 rounded shadow-xs">
              Koramangala 4th Block
            </div>
            <div className="absolute bottom-16 right-1/4 text-[11px] font-bold text-slate-500 uppercase tracking-widest bg-white/60 px-2 py-0.5 rounded shadow-xs">
              HSR Layout Sector 2
            </div>
          </div>

          {/* Map Top Bar Controls */}
          <div className="relative z-10 p-4 flex items-center justify-between">
            <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-700" />
              <span>Interactive Book Map — Bengaluru Community</span>
            </div>
            <div className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-md border border-slate-200 text-[11px] font-bold text-emerald-700">
              ● Live Radar Active
            </div>
          </div>

          {/* Interactive Pins on Map */}
          <div className="relative flex-1">
            {nearbyBooks.map((book) => {
              const isSelected = activePinBook?.id === book.id;
              const leftPercent = book.coordinates.xPercent;
              const topPercent = book.coordinates.yPercent;

              return (
                <div
                  key={book.id}
                  style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
                  onClick={() => setActivePinBook(book)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                >
                  <div
                    className={`relative p-1 rounded-full shadow-lg transition-transform ${
                      isSelected
                        ? 'scale-125 bg-blue-700 ring-4 ring-blue-300'
                        : 'bg-white hover:scale-110 hover:bg-blue-50 ring-2 ring-slate-400'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                        isSelected ? 'text-white' : 'text-slate-800'
                      }`}
                    >
                      {book.type === 'lend' && '📖'}
                      {book.type === 'swap' && '🔄'}
                      {book.type === 'give' && '🎁'}
                      {book.type === 'sell' && '🏷️'}
                    </div>
                  </div>
                  {/* Pin label */}
                  <div
                    className={`mt-1 text-[10px] font-bold px-2 py-0.5 rounded shadow-md whitespace-nowrap text-center ${
                      isSelected
                        ? 'bg-blue-800 text-white'
                        : 'bg-white/90 text-slate-800 backdrop-blur-xs group-hover:bg-white'
                    }`}
                  >
                    {book.title.slice(0, 16)}…
                  </div>
                </div>
              );
            })}
          </div>

          {/* Floating Selected Book Preview Card at Bottom of Map */}
          {activePinBook && (
            <div className="relative z-30 p-4">
              <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 max-w-xl mx-auto">
                <div className="flex items-center gap-3.5 w-full sm:w-auto">
                  <img
                    src={activePinBook.coverImage}
                    alt={activePinBook.title}
                    className="w-14 h-18 object-cover rounded-xl shadow-xs shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold">
                      <span className="uppercase text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded">
                        {activePinBook.type}
                      </span>
                      <span className="text-slate-500">
                        • {activePinBook.distance} km ({activePinBook.locationName})
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-slate-900 text-sm mt-0.5 line-clamp-1">
                      {activePinBook.title}
                    </h4>
                    <p className="text-xs text-slate-500">by {activePinBook.author}</p>
                    <div className="flex items-center gap-1 text-[11px] text-amber-600 font-semibold mt-1">
                      <Star className="w-3 h-3 fill-current" /> {activePinBook.owner.name} ({activePinBook.owner.rating}★)
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => navigateTo('detail', activePinBook.id)}
                    className="btn btn-outline btn-sm flex-1 sm:flex-none text-xs"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => openRequestModal(activePinBook)}
                    className="btn btn-primary btn-sm flex-1 sm:flex-none text-xs shadow-xs"
                  >
                    Request Book
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
