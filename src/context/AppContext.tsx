import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Book,
  Conversation,
  ExchangeRequest,
  ExchangeType,
  FilterState,
  NotificationItem,
  PageType,
  UserProfile,
} from '../types';
import {
  initialBooks,
  initialConversations,
  initialCurrentUser,
  initialNotifications,
  initialRequests,
} from '../data/initialData';

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface AppContextType {
  books: Book[];
  myBooks: Book[];
  currentPage: PageType;
  selectedBookId: string | null;
  selectedBook: Book | null;
  selectedChatId: string | null;
  user: UserProfile | null;
  isLoggedIn: boolean;
  notifications: NotificationItem[];
  unreadNotifCount: number;
  conversations: Conversation[];
  requests: ExchangeRequest[];
  filters: FilterState;
  toasts: ToastItem[];
  // Modals state
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'signup';
  isIntentModalOpen: boolean;
  isRequestModalOpen: boolean;
  requestingBook: Book | null;
  isMessageModalOpen: boolean;
  messageTarget: { owner: any; bookTitle?: string } | null;
  isReviewModalOpen: boolean;
  reviewingBookId: string | null;
  isEditProfileModalOpen: boolean;

  // Actions
  navigateTo: (page: PageType, bookId?: string, chatId?: string) => void;
  toggleWishlist: (bookId: string) => void;
  addBook: (bookData: Partial<Book>) => Book;
  deleteBook: (bookId: string) => void;
  updateBookStatus: (bookId: string, status: Book['status']) => void;
  submitRequest: (data: {
    bookId: string;
    type: ExchangeType;
    duration?: string;
    offeredBook?: string;
    price?: number;
    paymentMode?: string;
    message: string;
    meetupArea: string;
  }) => void;
  updateRequestStatus: (requestId: string, status: ExchangeRequest['status']) => void;
  sendMessage: (conversationId: string, text: string) => void;
  startConversationWith: (
    partner: any,
    bookTitle: string,
    bookType: ExchangeType,
    initialMessage?: string
  ) => string;
  addReview: (bookId: string, rating: number, comment: string) => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  login: (email?: string, name?: string) => void;
  logout: () => void;
  markAllNotifsRead: () => void;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  clearAllFilters: () => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;

  // Modals
  openAuthModal: (tab?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  openIntentModal: () => void;
  closeIntentModal: () => void;
  handleIntentSelection: (intent: 'buy' | 'swap' | 'gift' | 'sell') => void;
  openRequestModal: (book: Book) => void;
  closeRequestModal: () => void;
  openMessageModal: (target: { owner: any; bookTitle?: string }) => void;
  closeMessageModal: () => void;
  openReviewModal: (bookId: string) => void;
  closeReviewModal: () => void;
  openEditProfileModal: () => void;
  closeEditProfileModal: () => void;
}

const defaultFilters: FilterState = {
  types: [],
  genres: [],
  conditions: [],
  maxDistance: 20,
  searchQuery: '',
  sortBy: 'newest',
  viewMode: 'grid',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Books state with localStorage
  const [books, setBooks] = useState<Book[]>(() => {
    try {
      const saved = localStorage.getItem('bookswap_books_v1');
      return saved ? JSON.parse(saved) : initialBooks;
    } catch {
      return initialBooks;
    }
  });

  // Current User
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('bookswap_user_v1');
      return saved ? JSON.parse(saved) : initialCurrentUser;
    } catch {
      return initialCurrentUser;
    }
  });

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('bookswap_notifs_v1');
      return saved ? JSON.parse(saved) : initialNotifications;
    } catch {
      return initialNotifications;
    }
  });

  // Conversations
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    try {
      const saved = localStorage.getItem('bookswap_convs_v1');
      return saved ? JSON.parse(saved) : initialConversations;
    } catch {
      return initialConversations;
    }
  });

  // Requests
  const [requests, setRequests] = useState<ExchangeRequest[]>(() => {
    try {
      const saved = localStorage.getItem('bookswap_requests_v1');
      return saved ? JSON.parse(saved) : initialRequests;
    } catch {
      return initialRequests;
    }
  });

  // Navigation
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<string | null>('conv-1');

  // Filters
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  // Toasts
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');
  const [isIntentModalOpen, setIsIntentModalOpen] = useState(() => {
    try {
      return !sessionStorage.getItem('bookswap_intent_done');
    } catch {
      return false;
    }
  });
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestingBook, setRequestingBook] = useState<Book | null>(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageTarget, setMessageTarget] = useState<{ owner: any; bookTitle?: string } | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewingBookId, setReviewingBookId] = useState<string | null>(null);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bookswap_books_v1', JSON.stringify(books));
    } catch {}
  }, [books]);

  useEffect(() => {
    try {
      localStorage.setItem('bookswap_user_v1', JSON.stringify(user));
    } catch {}
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('bookswap_notifs_v1', JSON.stringify(notifications));
    } catch {}
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem('bookswap_convs_v1', JSON.stringify(conversations));
    } catch {}
  }, [conversations]);

  useEffect(() => {
    try {
      localStorage.setItem('bookswap_requests_v1', JSON.stringify(requests));
    } catch {}
  }, [requests]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const navigateTo = (page: PageType, bookId?: string, chatId?: string) => {
    setCurrentPage(page);
    if (bookId) setSelectedBookId(bookId);
    if (chatId) setSelectedChatId(chatId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedBook = selectedBookId ? books.find((b) => b.id === selectedBookId) || null : null;
  const myBooks = user ? books.filter((b) => b.owner.id === user.id) : [];
  const unreadNotifCount = notifications.filter((n) => n.unread).length;

  const toggleWishlist = (bookId: string) => {
    setBooks((prev) =>
      prev.map((b) => {
        if (b.id === bookId) {
          const nextWish = !b.isWishlisted;
          showToast(
            nextWish ? `Added "${b.title}" to your wishlist!` : `Removed "${b.title}" from wishlist`,
            'info'
          );
          return {
            ...b,
            isWishlisted: nextWish,
            wishlistCount: nextWish ? b.wishlistCount + 1 : Math.max(0, b.wishlistCount - 1),
          };
        }
        return b;
      })
    );
  };

  const addBook = (bookData: Partial<Book>): Book => {
    const newBook: Book = {
      id: `book-${Date.now()}`,
      title: bookData.title || 'Untitled Book',
      author: bookData.author || 'Unknown Author',
      genre: bookData.genre || 'Fiction',
      condition: bookData.condition || 'good',
      type: bookData.type || 'lend',
      price: bookData.price,
      year: bookData.year || new Date().getFullYear(),
      pages: bookData.pages || 250,
      language: bookData.language || 'English',
      isbn: bookData.isbn || '',
      description: bookData.description || 'Listed by community reader.',
      coverImage:
        bookData.coverImage ||
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
      coverBgColor: '#0F766E',
      distance: 0.5,
      locationName: user?.city || 'Nearby',
      coordinates: {
        lat: 12.9716,
        lng: 77.5946,
        xPercent: 50,
        yPercent: 50,
      },
      owner: {
        id: user?.id || 'user-me',
        name: user?.name || 'Manoj Kumar',
        avatar: user?.avatar || 'MK',
        rating: user?.rating || 5.0,
        reviewCount: user?.exchangeCount || 1,
        location: user?.city || 'Bengaluru',
        statusText: 'Available 🟢',
        isAvailable: true,
        joinedYear: 2024,
      },
      wishlistCount: 0,
      isWishlisted: false,
      reviews: [],
      status: 'available',
      createdAt: new Date().toISOString(),
      lendingDuration: bookData.lendingDuration,
      swapPreferences: bookData.swapPreferences,
    };

    setBooks((prev) => [newBook, ...prev]);
    if (user) {
      setUser((prev) =>
        prev ? { ...prev, booksListedCount: prev.booksListedCount + 1 } : null
      );
    }
    showToast(`"${newBook.title}" has been listed in BookSwap! 🎉`);
    return newBook;
  };

  const deleteBook = (bookId: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== bookId));
    showToast('Listing removed successfully', 'info');
  };

  const updateBookStatus = (bookId: string, status: Book['status']) => {
    setBooks((prev) => prev.map((b) => (b.id === bookId ? { ...b, status } : b)));
    showToast(`Book status updated to ${status}`);
  };

  const submitRequest = (data: {
    bookId: string;
    type: ExchangeType;
    duration?: string;
    offeredBook?: string;
    price?: number;
    paymentMode?: string;
    message: string;
    meetupArea: string;
  }) => {
    const targetBook = books.find((b) => b.id === data.bookId);
    if (!targetBook) return;

    const newRequest: ExchangeRequest = {
      id: `req-${Date.now()}`,
      bookId: targetBook.id,
      bookTitle: targetBook.title,
      bookAuthor: targetBook.author,
      bookCover: targetBook.coverImage,
      type: data.type,
      status: 'pending',
      requesterName: user?.name || 'Manoj Kumar',
      requesterAvatar: user?.avatar || 'MK',
      ownerName: targetBook.owner.name,
      ownerAvatar: targetBook.owner.avatar,
      duration: data.duration,
      offeredBook: data.offeredBook,
      price: data.price || targetBook.price,
      paymentMode: data.paymentMode,
      message: data.message,
      meetupArea: data.meetupArea || targetBook.locationName,
      createdAt: new Date().toISOString(),
      isOutgoing: true,
    };

    setRequests((prev) => [newRequest, ...prev]);

    // Also auto-create or update conversation with owner
    startConversationWith(
      targetBook.owner,
      targetBook.title,
      targetBook.type,
      `Request for ${targetBook.type.toUpperCase()}: "${data.message || 'I would like to exchange this book!'}" (Meetup area: ${data.meetupArea || 'Flexible'})`
    );

    showToast(`Request sent to ${targetBook.owner.name}! 🚀`);
    closeRequestModal();
  };

  const updateRequestStatus = (requestId: string, status: ExchangeRequest['status']) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status } : r))
    );
    showToast(`Exchange request marked as ${status}`);
  };

  const sendMessage = (conversationId: string, text: string) => {
    if (!text.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: user?.id || 'user-me',
      text: text.trim(),
      timestamp: 'Just now',
      isMe: true,
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === conversationId) {
          return {
            ...c,
            lastMessage: text.trim(),
            lastMessageTime: 'Just now',
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );

    // Simulated courteous auto-reply after 1.5 seconds if replying to an existing demo partner
    setTimeout(() => {
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === conversationId) {
            const replyMsg = {
              id: `msg-${Date.now() + 1}`,
              senderId: c.partner.id,
              text: `Thanks for the message! That works perfectly for me. Looking forward to our book swap! 📚`,
              timestamp: 'Just now',
              isMe: false,
            };
            return {
              ...c,
              lastMessage: replyMsg.text,
              lastMessageTime: 'Just now',
              messages: [...c.messages, replyMsg],
            };
          }
          return c;
        })
      );
    }, 1500);
  };

  const startConversationWith = (
    partner: any,
    bookTitle: string,
    bookType: ExchangeType,
    initialMessage?: string
  ): string => {
    const existing = conversations.find((c) => c.partner.name === partner.name);
    if (existing) {
      if (initialMessage) {
        sendMessage(existing.id, initialMessage);
      }
      setSelectedChatId(existing.id);
      return existing.id;
    }

    const newConvId = `conv-${Date.now()}`;
    const newConv: Conversation = {
      id: newConvId,
      partner: {
        id: partner.id || `partner-${Date.now()}`,
        name: partner.name,
        avatar: partner.avatar || partner.name.slice(0, 2).toUpperCase(),
        rating: partner.rating || 5.0,
        reviewCount: partner.reviewCount || 10,
        location: partner.location || 'Local area',
        statusText: 'Online',
        isAvailable: true,
      },
      bookTitle,
      bookType,
      lastMessage: initialMessage || 'Started a conversation about this book',
      lastMessageTime: 'Just now',
      unreadCount: 0,
      messages: initialMessage
        ? [
            {
              id: `msg-${Date.now()}`,
              senderId: user?.id || 'user-me',
              text: initialMessage,
              timestamp: 'Just now',
              isMe: true,
            },
          ]
        : [],
    };

    setConversations((prev) => [newConv, ...prev]);
    setSelectedChatId(newConvId);
    return newConvId;
  };

  const addReview = (bookId: string, rating: number, comment: string) => {
    const newRev = {
      id: `rev-${Date.now()}`,
      author: user?.name || 'Manoj Kumar',
      avatar: user?.avatar || 'MK',
      rating,
      date: 'Just now',
      comment,
    };

    setBooks((prev) =>
      prev.map((b) => (b.id === bookId ? { ...b, reviews: [newRev, ...b.reviews] } : b))
    );
    showToast('Your review has been published! ⭐');
    closeReviewModal();
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
    showToast('Profile updated successfully!');
    closeEditProfileModal();
  };

  const login = (email = 'manoj@bookswap.com', name = 'Manoj Kumar') => {
    const loggedUser: UserProfile = {
      ...initialCurrentUser,
      email,
      name,
      avatar: name
        .split(' ')
        .map((p) => p[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || 'ME',
    };
    setUser(loggedUser);
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${loggedUser.name}! 👋`);
  };

  const logout = () => {
    setUser(null);
    showToast('You have logged out of BookSwap');
  };

  const markAllNotifsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    showToast('All notifications marked as read', 'info');
  };

  const clearAllFilters = () => {
    setFilters({
      ...defaultFilters,
      searchQuery: filters.searchQuery,
      viewMode: filters.viewMode,
    });
    showToast('Filters cleared', 'info');
  };

  // Modals helpers
  const openAuthModal = (tab: 'login' | 'signup' = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const openIntentModal = () => setIsIntentModalOpen(true);
  const closeIntentModal = () => {
    setIsIntentModalOpen(false);
    try {
      sessionStorage.setItem('bookswap_intent_done', 'true');
    } catch {}
  };

  const handleIntentSelection = (intent: 'buy' | 'swap' | 'gift' | 'sell') => {
    closeIntentModal();
    if (intent === 'buy') {
      setFilters((prev) => ({ ...prev, types: ['lend', 'sell'] }));
      navigateTo('browse');
      showToast('Showing books available to borrow or buy');
    } else if (intent === 'swap') {
      setFilters((prev) => ({ ...prev, types: ['swap'] }));
      navigateTo('browse');
      showToast('Showing books available for barter & swap');
    } else if (intent === 'gift') {
      setFilters((prev) => ({ ...prev, types: ['give'] }));
      navigateTo('browse');
      showToast('Showing free books given away by the community');
    } else if (intent === 'sell') {
      navigateTo('add-book');
      showToast('List your books to sell or share with the community');
    }
  };

  const openRequestModal = (book: Book) => {
    setRequestingBook(book);
    setIsRequestModalOpen(true);
  };
  const closeRequestModal = () => {
    setIsRequestModalOpen(false);
    setRequestingBook(null);
  };

  const openMessageModal = (target: { owner: any; bookTitle?: string }) => {
    setMessageTarget(target);
    setIsMessageModalOpen(true);
  };
  const closeMessageModal = () => {
    setIsMessageModalOpen(false);
    setMessageTarget(null);
  };

  const openReviewModal = (bookId: string) => {
    setReviewingBookId(bookId);
    setIsReviewModalOpen(true);
  };
  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
    setReviewingBookId(null);
  };

  const openEditProfileModal = () => setIsEditProfileModalOpen(true);
  const closeEditProfileModal = () => setIsEditProfileModalOpen(false);

  return (
    <AppContext.Provider
      value={{
        books,
        myBooks,
        currentPage,
        selectedBookId,
        selectedBook,
        selectedChatId,
        user,
        isLoggedIn: !!user,
        notifications,
        unreadNotifCount,
        conversations,
        requests,
        filters,
        toasts,
        isAuthModalOpen,
        authModalTab,
        isIntentModalOpen,
        isRequestModalOpen,
        requestingBook,
        isMessageModalOpen,
        messageTarget,
        isReviewModalOpen,
        reviewingBookId,
        isEditProfileModalOpen,

        navigateTo,
        toggleWishlist,
        addBook,
        deleteBook,
        updateBookStatus,
        submitRequest,
        updateRequestStatus,
        sendMessage,
        startConversationWith,
        addReview,
        updateProfile,
        login,
        logout,
        markAllNotifsRead,
        setFilters,
        clearAllFilters,
        showToast,

        openAuthModal,
        closeAuthModal,
        openIntentModal,
        closeIntentModal,
        handleIntentSelection,
        openRequestModal,
        closeRequestModal,
        openMessageModal,
        closeMessageModal,
        openReviewModal,
        closeReviewModal,
        openEditProfileModal,
        closeEditProfileModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
