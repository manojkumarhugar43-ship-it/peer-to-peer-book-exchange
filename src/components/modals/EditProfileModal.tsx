import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, UserCheck } from 'lucide-react';

export const EditProfileModal: React.FC = () => {
  const { isEditProfileModalOpen, closeEditProfileModal, user, updateProfile } = useApp();

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setBio(user.bio);
      setCity(user.city);
    }
  }, [user]);

  if (!isEditProfileModalOpen || !user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      bio,
      city,
      avatar: name
        .split(' ')
        .map((p) => p[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || user.avatar,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-7 animate-in zoom-in-95 duration-200">
        <button
          onClick={closeEditProfileModal}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-serif text-2xl font-bold text-slate-900 mb-1">Edit Profile</h2>
        <p className="text-xs text-slate-500 mb-5">
          Update how fellow readers see you in the community
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label" htmlFor="edit-name">
              Display Name
            </label>
            <input
              id="edit-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
              className="form-control"
            />
          </div>

          <div>
            <label className="form-label" htmlFor="edit-bio">
              Bio
            </label>
            <textarea
              id="edit-bio"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell others about your reading interests and exchange habits…"
              className="form-control"
            />
          </div>

          <div>
            <label className="form-label" htmlFor="edit-city">
              City / Location
            </label>
            <input
              id="edit-city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Bengaluru, Karnataka"
              className="form-control"
            />
          </div>

          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={closeEditProfileModal}
              className="btn btn-ghost flex-1 py-2.5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1 py-2.5 shadow-md flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
