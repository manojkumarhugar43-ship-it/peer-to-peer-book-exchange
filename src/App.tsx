import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BrowsePage } from './pages/BrowsePage';
import { BookDetailPage } from './pages/BookDetailPage';
import { NearbyMapPage } from './pages/NearbyMapPage';
import { MessagesPage } from './pages/MessagesPage';
import { ProfilePage } from './pages/ProfilePage';
import { AddBookPage } from './pages/AddBookPage';
import { WishlistPage } from './pages/WishlistPage';
import { IntentModal } from './components/modals/IntentModal';
import { AuthModal } from './components/modals/AuthModal';
import { RequestModal } from './components/modals/RequestModal';
import { QuickMessageModal } from './components/modals/QuickMessageModal';
import { ReviewModal } from './components/modals/ReviewModal';
import { EditProfileModal } from './components/modals/EditProfileModal';
import { ToastContainer } from './components/ToastContainer';

const MainContent: React.FC = () => {
  const { currentPage } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'browse' && <BrowsePage />}
        {currentPage === 'detail' && <BookDetailPage />}
        {currentPage === 'map' && <NearbyMapPage />}
        {currentPage === 'messages' && <MessagesPage />}
        {currentPage === 'profile' && <ProfilePage />}
        {currentPage === 'add-book' && <AddBookPage />}
        {currentPage === 'wishlist' && <WishlistPage />}
      </main>

      <Footer />

      {/* Global Modals & Overlays */}
      <IntentModal />
      <AuthModal />
      <RequestModal />
      <QuickMessageModal />
      <ReviewModal />
      <EditProfileModal />
      <ToastContainer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
};

export default App;
