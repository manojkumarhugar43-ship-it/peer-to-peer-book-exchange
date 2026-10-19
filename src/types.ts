export type ExchangeType = 'lend' | 'swap' | 'give' | 'sell';
export type BookCondition = 'new' | 'good' | 'fair';

export interface Owner {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  location: string;
  statusText?: string;
  isAvailable?: boolean;
  joinedYear?: number;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  condition: BookCondition;
  type: ExchangeType;
  price?: number;
  year?: number;
  pages?: number;
  language: string;
  isbn?: string;
  description: string;
  coverImage: string;
  coverBgColor?: string;
  distance: number; // in km
  locationName: string;
  coordinates: {
    lat: number;
    lng: number;
    xPercent: number; // 0-100 for interactive map canvas
    yPercent: number; // 0-100 for interactive map canvas
  };
  owner: Owner;
  wishlistCount: number;
  isWishlisted?: boolean;
  reviews: Review[];
  status: 'available' | 'lent' | 'swapped' | 'sold';
  createdAt: string;
  lendingDuration?: string;
  swapPreferences?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: 'request' | 'message' | 'system';
  linkPage?: PageType;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface Conversation {
  id: string;
  partner: Owner;
  bookTitle: string;
  bookType: ExchangeType;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface ExchangeRequest {
  id: string;
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  bookCover: string;
  type: ExchangeType;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  requesterName: string;
  requesterAvatar: string;
  ownerName: string;
  ownerAvatar: string;
  duration?: string;
  offeredBook?: string;
  price?: number;
  paymentMode?: string;
  message: string;
  meetupArea: string;
  createdAt: string;
  isOutgoing: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  city: string;
  joinedDate: string;
  rating: number;
  exchangeCount: number;
  booksListedCount: number;
  booksLentCount: number;
  booksSwappedCount: number;
  booksDonatedCount: number;
}

export type PageType = 'home' | 'browse' | 'map' | 'messages' | 'profile' | 'add-book' | 'wishlist' | 'detail';

export interface FilterState {
  types: ExchangeType[];
  genres: string[];
  conditions: BookCondition[];
  maxDistance: number;
  searchQuery: string;
  sortBy: 'newest' | 'distance' | 'popular' | 'title';
  viewMode: 'grid' | 'list';
}
