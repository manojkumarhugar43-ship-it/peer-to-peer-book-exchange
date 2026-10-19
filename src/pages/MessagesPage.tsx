import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Send, BookOpen, User, CheckCheck, MessageSquarePlus } from 'lucide-react';

const QUICK_SUGGESTIONS = [
  'Is this still available?',
  'Can we meet near the metro station?',
  'Sounds great! See you then.',
  'What days work best for you?',
];

export const MessagesPage: React.FC = () => {
  const { conversations, selectedChatId, navigateTo, sendMessage } = useApp();
  const [activeChatId, setActiveChatId] = useState<string>(selectedChatId || conversations[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');

  const currentChat = conversations.find((c) => c.id === activeChatId) || conversations[0];

  const filteredConversations = conversations.filter(
    (c) =>
      c.partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !currentChat) return;
    sendMessage(currentChat.id, messageInput);
    setMessageInput('');
  };

  const handleSuggestionClick = (text: string) => {
    if (!currentChat) return;
    sendMessage(currentChat.id, text);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white border border-slate-200 rounded-3xl shadow-xs overflow-hidden h-[750px] grid grid-cols-1 lg:grid-cols-12">
        {/* Left: Conversations Sidebar */}
        <aside className="lg:col-span-4 border-r border-slate-200 flex flex-col h-full bg-slate-50/50">
          <div className="p-4 border-b border-slate-200 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-serif font-bold text-xl text-slate-900">Messages</h2>
              <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                {conversations.length} active
              </span>
            </div>
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations…"
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-100 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-600"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredConversations.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No conversations found
              </div>
            ) : (
              filteredConversations.map((c) => {
                const isActive = c.id === currentChat?.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setActiveChatId(c.id)}
                    className={`p-4 transition-colors cursor-pointer flex gap-3.5 ${
                      isActive ? 'bg-white border-l-4 border-blue-700 shadow-xs' : 'hover:bg-slate-100/60'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <div className="w-11 h-11 rounded-full bg-blue-700 text-white font-bold text-xs flex items-center justify-center">
                        {c.partner.avatar}
                      </div>
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                          {c.partner.name}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {c.lastMessageTime}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-700 my-0.5">
                        <BookOpen className="w-3 h-3 text-blue-600 shrink-0" />
                        <span className="truncate">{c.bookTitle}</span>
                        <span className="uppercase text-[9px] bg-blue-100 px-1 py-0.2 rounded font-bold">
                          {c.bookType}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 truncate">{c.lastMessage}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </aside>

        {/* Right: Active Chat Area */}
        <div className="lg:col-span-8 flex flex-col h-full bg-white">
          {currentChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-700 text-white font-bold text-xs flex items-center justify-center">
                    {currentChat.partner.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      {currentChat.partner.name}
                    </h3>
                    <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                      {currentChat.partner.statusText || 'Active now'} • {currentChat.partner.location}
                    </p>
                  </div>
                </div>

                {/* Book Context Pill */}
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  <span className="font-semibold text-slate-800 truncate max-w-44">
                    {currentChat.bookTitle}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">
                    {currentChat.bookType}
                  </span>
                </div>
              </div>

              {/* Messages Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/30">
                <div className="text-center my-2">
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wider">
                    BookSwap Secure Conversation
                  </span>
                </div>

                {currentChat.messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                        m.isMe
                          ? 'bg-blue-700 text-white rounded-br-xs'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                      {m.timestamp}
                      {m.isMe && <CheckCheck className="w-3 h-3 text-blue-500" />}
                    </span>
                  </div>
                ))}
              </div>

              {/* Quick Suggestions */}
              <div className="px-4 py-2 border-t border-slate-100 bg-slate-50 flex flex-wrap gap-1.5">
                {QUICK_SUGGESTIONS.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(s)}
                    className="text-[11px] font-medium bg-white hover:bg-blue-50 text-slate-600 hover:text-blue-700 border border-slate-200 hover:border-blue-200 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Message Input Bar */}
              <form onSubmit={handleSend} className="p-3 sm:p-4 border-t border-slate-200 bg-white flex gap-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder={`Reply to ${currentChat.partner.name}…`}
                  className="form-control rounded-full py-2.5 px-4 text-xs sm:text-sm"
                />
                <button
                  type="submit"
                  disabled={!messageInput.trim()}
                  className="btn btn-primary rounded-full px-5 shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
              <MessageSquarePlus className="w-12 h-12 text-slate-300" />
              <h3 className="font-serif font-bold text-lg text-slate-700">No Chat Selected</h3>
              <p className="text-xs text-slate-400 max-w-xs">
                Select a conversation from the sidebar or click "Message Owner" on any book page to start chatting.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
