import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, MessageSquare } from 'lucide-react';

export const QuickMessageModal: React.FC = () => {
  const { isMessageModalOpen, closeMessageModal, messageTarget, startConversationWith, navigateTo } =
    useApp();
  const [text, setText] = useState('');

  if (!isMessageModalOpen || !messageTarget) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const convId = startConversationWith(
      messageTarget.owner,
      messageTarget.bookTitle || 'Book Inquiry',
      'lend',
      text.trim()
    );
    closeMessageModal();
    setText('');
    navigateTo('messages', undefined, convId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-7 animate-in zoom-in-95 duration-200">
        <button
          onClick={closeMessageModal}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-xl text-slate-900">
              Message {messageTarget.owner.name}
            </h3>
            {messageTarget.bookTitle && (
              <p className="text-xs text-slate-500">re: {messageTarget.bookTitle}</p>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label" htmlFor="quick-msg-text">
              Your Message
            </label>
            <textarea
              id="quick-msg-text"
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Hi! Is this book still available? I would like to coordinate meetup details…"
              required
              className="form-control"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={closeMessageModal}
              className="btn btn-ghost flex-1 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1 py-2 shadow-md flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Message ✉️</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
