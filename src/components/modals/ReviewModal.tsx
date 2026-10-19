import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Star } from 'lucide-react';

export const ReviewModal: React.FC = () => {
  const { isReviewModalOpen, closeReviewModal, reviewingBookId, addReview } = useApp();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  if (!isReviewModalOpen || !reviewingBookId) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    addReview(reviewingBookId, rating, comment.trim());
    setComment('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-7 animate-in zoom-in-95 duration-200">
        <button
          onClick={closeReviewModal}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-serif text-2xl font-bold text-slate-900 mb-1">Write a Review</h2>
        <p className="text-xs text-slate-500 mb-5">
          Share your experience with this book and community exchange
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Your Rating</label>
            <div className="flex items-center gap-1.5 py-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 ${
                      (hoverRating || rating) >= star
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-200'
                    }`}
                  />
                </button>
              ))}
              <span className="text-sm font-bold text-amber-600 ml-2">
                {hoverRating || rating} / 5
              </span>
            </div>
          </div>

          <div>
            <label className="form-label" htmlFor="review-comment">
              Your Review
            </label>
            <textarea
              id="review-comment"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Was the book in good condition? How was the exchange experience with the lender/swapper?…"
              required
              className="form-control"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={closeReviewModal}
              className="btn btn-ghost flex-1 py-2.5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1 py-2.5 shadow-md"
            >
              Submit Review ⭐
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
