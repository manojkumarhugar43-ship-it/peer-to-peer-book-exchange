import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ExchangeType, BookCondition } from '../types';
import { Camera, Upload, X, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

const SAMPLE_COVERS = [
  'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=600',
];

export const AddBookPage: React.FC = () => {
  const { addBook, navigateTo, showToast } = useApp();

  const [type, setType] = useState<ExchangeType>('lend');
  const [price, setPrice] = useState<string>('199');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('Fiction');
  const [condition, setCondition] = useState<BookCondition>('good');
  const [year, setYear] = useState('2021');
  const [pages, setPages] = useState('280');
  const [language, setLanguage] = useState('English');
  const [isbn, setIsbn] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState(SAMPLE_COVERS[0]);
  const [swapPref, setSwapPref] = useState('');
  const [lendDuration, setLendDuration] = useState('2 weeks');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
        showToast('Cover photo uploaded!', 'info');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) {
      showToast('Please enter both title and author.', 'warning');
      return;
    }

    const newBook = addBook({
      title: title.trim(),
      author: author.trim(),
      genre,
      condition,
      type,
      price: type === 'sell' ? Number(price) || 199 : undefined,
      year: Number(year) || 2021,
      pages: Number(pages) || 280,
      language,
      isbn: isbn.trim(),
      description: description.trim() || 'A well-loved book looking for its next reader in our community.',
      coverImage,
      swapPreferences: type === 'swap' ? swapPref.trim() : undefined,
      lendingDuration: type === 'lend' ? lendDuration : undefined,
    });

    navigateTo('detail', newBook.id);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-slate-900">List a Book</h1>
          <p className="text-sm text-slate-500 mt-1">
            Share a book with your community — lend it, swap it, or give it away!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Exchange Type Selector */}
          <div>
            <label className="form-label mb-2.5">
              Exchange Type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Lend */}
              <label
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center text-center ${
                  type === 'lend'
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value="lend"
                  checked={type === 'lend'}
                  onChange={() => setType('lend')}
                  className="sr-only"
                />
                <span className="text-2xl mb-1">📖</span>
                <span className="font-bold text-sm text-slate-900">Lend</span>
                <span className="text-[11px] text-slate-500 mt-0.5">Temporary loan</span>
              </label>

              {/* Swap */}
              <label
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center text-center ${
                  type === 'swap'
                    ? 'border-purple-600 bg-purple-50/70 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value="swap"
                  checked={type === 'swap'}
                  onChange={() => setType('swap')}
                  className="sr-only"
                />
                <span className="text-2xl mb-1">🔄</span>
                <span className="font-bold text-sm text-slate-900">Swap</span>
                <span className="text-[11px] text-slate-500 mt-0.5">Trade for another</span>
              </label>

              {/* Give Away */}
              <label
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center text-center ${
                  type === 'give'
                    ? 'border-amber-600 bg-amber-50/70 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value="give"
                  checked={type === 'give'}
                  onChange={() => setType('give')}
                  className="sr-only"
                />
                <span className="text-2xl mb-1">🎁</span>
                <span className="font-bold text-sm text-slate-900">Give Away</span>
                <span className="text-[11px] text-slate-500 mt-0.5">Free to claim</span>
              </label>

              {/* Sell */}
              <label
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center text-center ${
                  type === 'sell'
                    ? 'border-rose-600 bg-rose-50/70 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value="sell"
                  checked={type === 'sell'}
                  onChange={() => setType('sell')}
                  className="sr-only"
                />
                <span className="text-2xl mb-1">🏷️</span>
                <span className="font-bold text-sm text-slate-900">Sell</span>
                <span className="text-[11px] text-slate-500 mt-0.5">Sell for cash</span>
              </label>
            </div>

            {/* If Sell: price input */}
            {type === 'sell' && (
              <div className="mt-4 p-4 rounded-2xl bg-rose-50/70 border border-rose-200 animate-in fade-in duration-150">
                <label className="form-label" htmlFor="selling-price">
                  Selling Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  id="selling-price"
                  type="number"
                  min="1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 199"
                  required
                  className="form-control"
                />
              </div>
            )}

            {/* If Swap: preference input */}
            {type === 'swap' && (
              <div className="mt-4 p-4 rounded-2xl bg-purple-50/70 border border-purple-200 animate-in fade-in duration-150">
                <label className="form-label" htmlFor="swap-preference">
                  Books you desire in exchange (Optional)
                </label>
                <input
                  id="swap-preference"
                  type="text"
                  value={swapPref}
                  onChange={(e) => setSwapPref(e.target.value)}
                  placeholder="e.g. Deep Work or non-fiction books"
                  className="form-control"
                />
              </div>
            )}

            {/* If Lend: duration */}
            {type === 'lend' && (
              <div className="mt-4 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 animate-in fade-in duration-150">
                <label className="form-label" htmlFor="lending-duration">
                  Standard Lending Duration
                </label>
                <select
                  id="lending-duration"
                  value={lendDuration}
                  onChange={(e) => setLendDuration(e.target.value)}
                  className="form-control"
                >
                  <option>1 week</option>
                  <option>2 weeks (Recommended)</option>
                  <option>3 weeks</option>
                  <option>1 month</option>
                </select>
              </div>
            )}
          </div>

          {/* Book Metadata Grid */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100">
              Book Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label" htmlFor="book-title">
                  Book Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="book-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. The Great Gatsby"
                  required
                  className="form-control"
                />
              </div>

              <div>
                <label className="form-label" htmlFor="book-author">
                  Author <span className="text-red-500">*</span>
                </label>
                <input
                  id="book-author"
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. F. Scott Fitzgerald"
                  required
                  className="form-control"
                />
              </div>

              <div>
                <label className="form-label" htmlFor="book-genre">
                  Genre
                </label>
                <select
                  id="book-genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="form-control"
                >
                  <option>Fiction</option>
                  <option>Sci-Fi</option>
                  <option>History</option>
                  <option>Self-Help</option>
                  <option>Psychology</option>
                  <option>Business</option>
                  <option>Finance</option>
                  <option>Classic</option>
                  <option>Memoir</option>
                  <option>Mythology</option>
                  <option>Regional</option>
                  <option>Mystery</option>
                  <option>Romance</option>
                  <option>Thriller</option>
                  <option>Biography</option>
                  <option>Science</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="form-label" htmlFor="book-condition">
                  Condition <span className="text-red-500">*</span>
                </label>
                <select
                  id="book-condition"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as BookCondition)}
                  className="form-control"
                >
                  <option value="new">✨ New — Like brand new</option>
                  <option value="good">👍 Good — Minor wear</option>
                  <option value="fair">👌 Fair — Visible wear</option>
                </select>
              </div>

              <div>
                <label className="form-label" htmlFor="book-year">
                  Publication Year
                </label>
                <input
                  id="book-year"
                  type="number"
                  min="1900"
                  max="2026"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="e.g. 2021"
                  className="form-control"
                />
              </div>

              <div>
                <label className="form-label" htmlFor="book-pages">
                  Number of Pages
                </label>
                <input
                  id="book-pages"
                  type="number"
                  min="1"
                  value={pages}
                  onChange={(e) => setPages(e.target.value)}
                  placeholder="e.g. 280"
                  className="form-control"
                />
              </div>

              <div>
                <label className="form-label" htmlFor="book-language">
                  Language
                </label>
                <select
                  id="book-language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="form-control"
                >
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Tamil</option>
                  <option>Telugu</option>
                  <option>Kannada</option>
                  <option>Malayalam</option>
                  <option>Bengali</option>
                  <option>Marathi</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="form-label" htmlFor="book-isbn">
                  ISBN (Optional)
                </label>
                <input
                  id="book-isbn"
                  type="text"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                  placeholder="e.g. 978-0743273565"
                  className="form-control"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="form-label" htmlFor="book-description">
              Book Summary / Personal Notes
            </label>
            <textarea
              id="book-description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a short summary of the book, its edition, condition details, or personal remarks for the reader…"
              className="form-control"
            />
          </div>

          {/* Cover Photo / Preset Selection */}
          <div>
            <label className="form-label">Cover Image / Photo</label>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border border-slate-200 rounded-2xl bg-slate-50">
                <img
                  src={coverImage}
                  alt="Cover preview"
                  className="w-20 h-28 object-cover rounded-xl shadow-xs shrink-0 bg-white"
                />
                <div className="space-y-2 text-center sm:text-left flex-1">
                  <div className="text-xs font-semibold text-slate-800">
                    Upload your own book photo or select a library preset below:
                  </div>
                  <label className="btn btn-outline btn-sm bg-white cursor-pointer inline-flex items-center gap-2">
                    <Camera className="w-3.5 h-3.5 text-blue-600" />
                    <span>Upload Book Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>

              {/* Sample Covers Carousel */}
              <div className="flex items-center gap-2 overflow-x-auto py-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
                  Presets:
                </span>
                {SAMPLE_COVERS.map((cov, idx) => (
                  <img
                    key={idx}
                    src={cov}
                    alt={`Preset ${idx + 1}`}
                    onClick={() => setCoverImage(cov)}
                    className={`w-12 h-16 object-cover rounded-lg shrink-0 cursor-pointer transition-all border-2 ${
                      coverImage === cov
                        ? 'border-blue-600 scale-105 shadow-md'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="btn btn-primary btn-lg flex-1 shadow-md font-bold text-base cursor-pointer"
            >
              🚀 List This Book
            </button>
            <button
              type="button"
              onClick={() => navigateTo('browse')}
              className="btn btn-ghost btn-lg text-slate-500 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
