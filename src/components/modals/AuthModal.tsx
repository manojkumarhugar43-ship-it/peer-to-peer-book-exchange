import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, BookOpen, ShieldCheck } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authModalTab, openAuthModal, login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || 'demo@bookswap.com', name || 'Manoj Kumar');
    setEmail('');
    setPassword('');
    setName('');
  };

  const handleDemoLogin = () => {
    login('manoj@bookswap.com', 'Manoj Kumar');
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center mx-auto mb-2.5 shadow-md">
            <BookOpen className="w-5 h-5" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-slate-900">Welcome to BookSwap</h2>
          <p className="text-xs text-slate-500 mt-1">Connect with verified book readers nearby</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => openAuthModal('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              authModalTab === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => openAuthModal('signup')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              authModalTab === 'signup' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Sign Up Free
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authModalTab === 'signup' && (
            <div>
              <label className="form-label" htmlFor="signup-name">
                Full Name
              </label>
              <input
                id="signup-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Manoj Kumar"
                required
                className="form-control"
              />
            </div>
          )}

          <div>
            <label className="form-label" htmlFor="auth-email">
              Email Address
            </label>
            <input
              id="auth-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="form-control"
            />
          </div>

          <div>
            <label className="form-label" htmlFor="auth-password">
              Password
            </label>
            <input
              id="auth-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block btn-lg mt-2">
            {authModalTab === 'login' ? 'Log In' : 'Create Account'}
          </button>

          {/* Quick Demo Login Shortcut */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2 px-3 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-blue-200"
            >
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              Quick Demo Login as Active Reader
            </button>
          </div>

          <div className="relative my-4 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <span className="relative bg-white px-2 text-[11px] text-slate-400 font-medium">
              or continue with
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="btn btn-outline btn-sm text-xs font-semibold"
            >
              🌐 Google
            </button>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="btn btn-outline btn-sm text-xs font-semibold"
            >
              🍎 Apple
            </button>
          </div>

          <p className="text-center text-xs text-slate-500 pt-3">
            {authModalTab === 'login' ? (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => openAuthModal('signup')}
                  className="text-blue-700 font-bold hover:underline"
                >
                  Sign up free →
                </button>
              </>
            ) : (
              <>
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  className="text-blue-700 font-bold hover:underline"
                >
                  Log in →
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};
