import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { BookCard } from '../components/BookCard';
import { ExchangeType, BookCondition } from '../types';
import { LayoutGrid, List, MapPin, X, SlidersHorizontal, BookX } from 'lucide-react';

const ALL_GENRES = [
  'Fiction',
  'Sci-Fi',
  'History',
  'Self-Help',
  'Psychology',
  'Business',
  'Finance',
  'Classic',
  'Memoir',
  'Mythology',
  'Regional',
  'Mystery',
  'Romance',
  'Thriller',
  'Biography',
  'Science',
];

export const BrowsePage: React.FC = () => {
  const { books, filters, setFilters, clearAllFilters, navigateTo } = useApp();

  const handleTypeChipClick = (type: ExchangeType | '') => {
    if (!type) {
      setFilters((prev) => ({ ...prev, types: [] }));
    } else {
      setFilters((prev) => ({
        ...prev,
        types: prev.types.includes(type)
          ? prev.types.filter((t) => t !== type)
          : [type],
      }));
    }
  };

  const handleGenreToggle = (genre: string) => {
    setFilters((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre],
    }));
  };

  const handleConditionToggle = (cond: BookCondition) => {
    setFilters((prev) => ({
      ...prev,
      conditions: prev.conditions.includes(cond)
        ? prev.conditions.filter((c) => c !== cond)
        : [...prev.conditions, cond],
    }));
  };

  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setFilters((prev) => ({ ...prev, maxDistance: val }));
  };

  const filteredBooks = useMemo(() => {
    let result = [...books];

    // Search query filter
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.genre.toLowerCase().includes(q) ||
          b.language.toLowerCase().includes(q)
      );
    }

    // Exchange type filter
    if (filters.types.length > 0) {
      result = result.filter((b) => filters.types.includes(b.type));
    }

    // Genre filter
    if (filters.genres.length > 0) {
      result = result.filter((b) => filters.genres.includes(b.genre));
    }

    // Condition filter
    if (filters.conditions.length > 0) {
      result = result.filter((b) => filters.conditions.includes(b.condition));
    }

    // Distance filter
    result = result.filter((b) => b.distance <= filters.maxDistance);

    // Sorting
    switch (filters.sortBy) {
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'distance':
        result.sort((a, b) => a.distance - b.distance);
        break;
      case 'popular':
        result.sort((a, b) => (b.wishlistCount || 0) - (a.wishlistCount || 0));
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return result;
  }, [books, filters]);

  const hasActiveFilters =
    filters.types.length > 0 ||
    filters.genres.length > 0 ||
    filters.conditions.length > 0 ||
    filters.maxDistance < 20 ||
    !!filters.searchQuery;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Left Sidebar Filters */}
        <aside className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-700" />
              <h3 className="font-serif font-bold text-lg text-slate-900">Filters</h3>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs font-semibold text-blue-700 hover:text-blue-900 hover:underline cursor-pointer"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Exchange Type Chips */}
          <div>
            <div className="form-label mb-2.5">Exchange Type</div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => handleTypeChipClick('')}
                className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                  filters.types.length === 0
                    ? 'bg-blue-700 border-blue-700 text-white shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleTypeChipClick('lend')}
                className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                  filters.types.includes('lend')
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                📖 Lend
              </button>
              <button
                onClick={() => handleTypeChipClick('swap')}
                className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                  filters.types.includes('swap')
                    ? 'bg-purple-600 border-purple-600 text-white shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                🔄 Swap
              </button>
              <button
                onClick={() => handleTypeChipClick('give')}
                className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                  filters.types.includes('give')
                    ? 'bg-amber-600 border-amber-600 text-white shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                🎁 Give
              </button>
              <button
                onClick={() => handleTypeChipClick('sell')}
                className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                  filters.types.includes('sell')
                    ? 'bg-rose-600 border-rose-600 text-white shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                🏷️ Sell/Buy
              </button>
            </div>
          </div>

          {/* Genre Checkboxes */}
          <div>
            <div className="form-label mb-2.5">Genre</div>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {ALL_GENRES.map((g) => (
                <label
                  key={g}
                  className="flex items-center gap-2.5 text-xs text-slate-700 hover:text-slate-900 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={filters.genres.includes(g)}
                    onChange={() => handleGenreToggle(g)}
                    className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 accent-blue-600"
                  />
                  <span>{g}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Condition Checkboxes */}
          <div>
            <div className="form-label mb-2.5">Condition</div>
            <div className="space-y-2">
              <label className="flex items-center gap-2.5 text-xs text-slate-700 hover:text-slate-900 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={filters.conditions.includes('new')}
                  onChange={() => handleConditionToggle('new')}
                  className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 accent-blue-600"
                />
                <span>✨ New — Brand new condition</span>
              </label>
              <label className="flex items-center gap-2.5 text-xs text-slate-700 hover:text-slate-900 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={filters.conditions.includes('good')}
                  onChange={() => handleConditionToggle('good')}
                  className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 accent-blue-600"
                />
                <span>👍 Good — Minor wear</span>
              </label>
              <label className="flex items-center gap-2.5 text-xs text-slate-700 hover:text-slate-900 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={filters.conditions.includes('fair')}
                  onChange={() => handleConditionToggle('fair')}
                  className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 accent-blue-600"
                />
                <span>👌 Fair — Visible wear / notes</span>
              </label>
            </div>
          </div>

          {/* Distance Slider */}
          <div>
            <div className="flex items-center justify-between form-label mb-2">
              <span>Max Distance</span>
              <span className="font-bold text-blue-700 lowercase">
                Within {filters.maxDistance} km
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={20}
              value={filters.maxDistance}
              onChange={handleDistanceChange}
              className="w-full accent-blue-700 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-semibold">
              <span>1 km</span>
              <span>10 km</span>
              <span>20 km</span>
            </div>
          </div>

          {/* Quick Map Link */}
          <button
            onClick={() => navigateTo('map')}
            className="btn btn-outline btn-block text-xs font-bold flex items-center justify-center gap-2"
          >
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>📍 View on Map</span>
          </button>
        </aside>

        {/* Main Browse Results Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Header Bar */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-2xl font-bold text-slate-900">Browse Books</h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Showing{' '}
                <strong className="text-slate-800 font-bold">{filteredBooks.length}</strong> books
                {filters.searchQuery && (
                  <span>
                    {' '}
                    for "<strong>{filters.searchQuery}</strong>"
                  </span>
                )}
              </p>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              {/* Sort Select */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-semibold">Sort:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      sortBy: e.target.value as any,
                    }))
                  }
                  className="form-control py-1 px-2.5 text-xs font-semibold"
                >
                  <option value="newest">Newest First</option>
                  <option value="distance">Nearest First</option>
                  <option value="popular">Most Popular</option>
                  <option value="title">Title A-Z</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, viewMode: 'grid' }))}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    filters.viewMode === 'grid'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, viewMode: 'list' }))}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    filters.viewMode === 'list'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Tags */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Active:</span>
              {filters.searchQuery && (
                <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-semibold border border-blue-200">
                  Search: "{filters.searchQuery}"
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-blue-900"
                    onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
                  />
                </span>
              )}
              {filters.types.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full font-semibold border border-slate-200"
                >
                  Type: {t}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-slate-900"
                    onClick={() => handleTypeChipClick(t)}
                  />
                </span>
              ))}
              {filters.genres.map((g) => (
                <span
                  key={g}
                  className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full font-semibold border border-slate-200"
                >
                  Genre: {g}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-slate-900"
                    onClick={() => handleGenreToggle(g)}
                  />
                </span>
              ))}
              <button
                onClick={clearAllFilters}
                className="text-xs text-slate-500 hover:text-red-600 font-semibold underline ml-1 cursor-pointer"
              >
                Reset
              </button>
            </div>
          )}

          {/* Books Grid / List / Empty State */}
          {filteredBooks.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <BookX className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-800">
                No books matched your criteria
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try widening your distance radius, removing genre filters, or searching for a different author or title.
              </p>
              <button onClick={clearAllFilters} className="btn btn-outline btn-sm">
                Clear All Filters
              </button>
            </div>
          ) : filters.viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} viewMode="grid" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} viewMode="list" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
