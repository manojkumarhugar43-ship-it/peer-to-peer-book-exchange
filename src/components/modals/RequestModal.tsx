import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, MapPin, ShieldCheck } from 'lucide-react';

export const RequestModal: React.FC = () => {
  const { isRequestModalOpen, closeRequestModal, requestingBook, submitRequest } = useApp();

  const [duration, setDuration] = useState('2 weeks');
  const [offeredBook, setOfferedBook] = useState('');
  const [paymentMode, setPaymentMode] = useState('📱 UPI (GPay / PhonePe / Paytm) on Meetup');
  const [message, setMessage] = useState('');
  const [meetupArea, setMeetupArea] = useState('');

  if (!isRequestModalOpen || !requestingBook) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitRequest({
      bookId: requestingBook.id,
      type: requestingBook.type,
      duration: requestingBook.type === 'lend' ? duration : undefined,
      offeredBook: requestingBook.type === 'swap' ? offeredBook : undefined,
      price: requestingBook.type === 'sell' ? requestingBook.price : undefined,
      paymentMode: requestingBook.type === 'sell' ? paymentMode : undefined,
      message: message || `Hi! I would love to ${requestingBook.type} "${requestingBook.title}".`,
      meetupArea: meetupArea || requestingBook.locationName,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-7 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <button
          onClick={closeRequestModal}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-serif text-2xl font-bold text-slate-900 mb-4">Request Book</h2>

        {/* Book snippet */}
        <div className="flex items-center gap-3.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 mb-4">
          <img
            src={requestingBook.coverImage}
            alt={requestingBook.title}
            className="w-14 h-18 object-cover rounded-lg shrink-0 shadow-xs"
          />
          <div className="min-w-0">
            <h4 className="font-serif font-bold text-slate-900 text-sm truncate">
              {requestingBook.title}
            </h4>
            <p className="text-xs text-slate-500">by {requestingBook.author}</p>
            <div className="mt-1 flex items-center gap-2 text-[11px] font-semibold">
              <span className="uppercase text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">
                {requestingBook.type}
              </span>
              <span className="text-slate-500 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                {requestingBook.distance} km away
              </span>
            </div>
          </div>
        </div>

        {/* Owner profile card */}
        <div className="flex items-center gap-3 bg-blue-50/70 border border-blue-100 p-3 rounded-2xl mb-5">
          <div className="w-9 h-9 rounded-full bg-blue-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
            {requestingBook.owner.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-medium text-slate-500">Lender / Owner Profile</div>
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <span>{requestingBook.owner.name}</span>
              <span className="text-emerald-700 text-[11px] font-semibold">
                • 🟢 {requestingBook.owner.statusText || 'Available'}
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Lend options */}
          {requestingBook.type === 'lend' && (
            <div>
              <label className="form-label" htmlFor="borrow-duration">
                How long do you need it?
              </label>
              <select
                id="borrow-duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="form-control"
              >
                <option value="1 week">1 week</option>
                <option value="2 weeks">2 weeks (Standard)</option>
                <option value="3 weeks">3 weeks</option>
                <option value="1 month">1 month</option>
              </select>
            </div>
          )}

          {/* Swap options */}
          {requestingBook.type === 'swap' && (
            <div>
              <label className="form-label" htmlFor="swap-book-offer">
                Book you are offering in exchange
              </label>
              <input
                id="swap-book-offer"
                type="text"
                value={offeredBook}
                onChange={(e) => setOfferedBook(e.target.value)}
                placeholder="e.g. Deep Work by Cal Newport"
                required
                className="form-control"
              />
              {requestingBook.swapPreferences && (
                <p className="text-[11px] text-purple-700 bg-purple-50 p-2 rounded-lg mt-1.5 border border-purple-100">
                  💡 <strong>Owner desires:</strong> {requestingBook.swapPreferences}
                </p>
              )}
            </div>
          )}

          {/* Sell options */}
          {requestingBook.type === 'sell' && (
            <div className="space-y-3">
              <div className="bg-rose-50 border border-rose-100 p-3.5 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-rose-900">Price to Pay</div>
                  <div className="text-[11px] text-slate-500">
                    Pay directly to owner on pickup or meetup
                  </div>
                </div>
                <span className="text-xl font-extrabold text-rose-700">
                  ₹{requestingBook.price || 199}
                </span>
              </div>

              <div>
                <label className="form-label">Payment Preference</label>
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="form-control"
                >
                  <option>📱 UPI (GPay / PhonePe / Paytm) on Meetup</option>
                  <option>💵 Cash on Delivery / Meetup</option>
                  <option>💳 Bank Transfer</option>
                </select>
              </div>
            </div>
          )}

          {/* Message textarea */}
          <div>
            <label className="form-label" htmlFor="request-message">
              Message to owner
            </label>
            <textarea
              id="request-message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Introduce yourself and explain why you would like this book…"
              className="form-control"
            />
          </div>

          {/* Meetup area */}
          <div>
            <label className="form-label" htmlFor="preferred-meetup">
              Preferred meet-up area
            </label>
            <input
              id="preferred-meetup"
              type="text"
              value={meetupArea}
              onChange={(e) => setMeetupArea(e.target.value)}
              placeholder={`e.g. near ${requestingBook.locationName}, metro station, local cafe…`}
              className="form-control"
            />
          </div>

          <div className="pt-3 flex gap-3">
            <button
              type="button"
              onClick={closeRequestModal}
              className="btn btn-ghost flex-1 py-2.5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1 py-2.5 shadow-md flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Request 🚀</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
