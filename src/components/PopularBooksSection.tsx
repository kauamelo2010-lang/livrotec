import React from 'react';
import { Flame, Star, Trophy, Bookmark, Sparkles, TrendingUp, Users } from 'lucide-react';
import { Book } from '../types';
import { POPULAR_STATS } from '../data/reviewsData';
import { THEMES } from '../data/libraryData';
import { BookCover } from './BookCover';

interface PopularBooksSectionProps {
  books: Book[];
  onSelectBook?: (book: Book) => void;
  onOpenBookDetails?: (book: Book) => void;
  onStartLoan: (book: Book) => void;
  favorites?: string[];
  onToggleFavorite?: (bookId: string) => void;
  isDarkMode?: boolean;
}

export const PopularBooksSection: React.FC<PopularBooksSectionProps> = ({
  books,
  onSelectBook,
  onOpenBookDetails,
  onStartLoan,
  favorites: _favorites = [],
  onToggleFavorite: _onToggleFavorite = () => {},
  isDarkMode = false
}) => {
  const handleCardClick = (book: Book) => {
    if (onOpenBookDetails) onOpenBookDetails(book);
    else if (onSelectBook) onSelectBook(book);
  };
  // Sort popular books based on predefined ranking & loanCount
  const popularBookIds = Object.keys(POPULAR_STATS);
  const popularBooks = books
    .filter((b) => popularBookIds.includes(b.id))
    .sort((a, b) => {
      const rankA = POPULAR_STATS[a.id]?.ranking ?? 99;
      const rankB = POPULAR_STATS[b.id]?.ranking ?? 99;
      return rankA - rankB;
    })
    .slice(0, 6);

  if (popularBooks.length === 0) return null;

  return (
    <section id="popular-books-section" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mb-8 sm:mb-10">
      <div className={`p-3.5 sm:p-7 rounded-2xl sm:rounded-3xl border transition-all shadow-sm ${
        isDarkMode 
          ? 'bg-[#131d31] border-slate-700/80 text-white shadow-xl' 
          : 'bg-[#ffffff] border-[#1c1c1c]/12 text-[#1c1c1c] shadow-xs'
      }`}>
        
        {/* Header of Popular Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-inherit/20">
          <div className="flex items-center gap-3">
            <div className={`p-2 sm:p-2.5 rounded-2xl flex items-center justify-center shrink-0 ${
              isDarkMode ? 'bg-amber-400/20 text-amber-400' : 'bg-[#8b261d]/10 text-[#8b261d]'
            }`}>
              <Flame className="w-5 h-5 fill-current animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                  isDarkMode ? 'bg-amber-400/20 text-amber-300' : 'bg-amber-100 text-amber-900'
                }`}>
                  Mais Escolhidos
                </span>
                <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-[#7d7567]'}`}>
                  • Ranking Estudantil
                </span>
              </div>
              <h2 className={`text-lg sm:text-2xl font-bold tracking-tight font-delicate ${
                isDarkMode ? 'text-white' : 'text-[#1c1c1c]'
              }`}>
                Livros Mais Populares na Livrotec
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className={`flex items-center gap-1 font-medium ${isDarkMode ? 'text-slate-300' : 'text-[#5c5549]'}`}>
              <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
              Atualizado em tempo real pelos empréstimos dos alunos
            </span>
          </div>
        </div>

        {/* Popular Grid */}
        <div className="mobile-books-grid grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {popularBooks.map((book) => {
            const stats = POPULAR_STATS[book.id];
            const themeConfig = THEMES.find((t) => t.id === book.theme);
            const isAvailable = book.availableCopies > 0;

            return (
              <div
                key={book.id}
                onClick={() => handleCardClick(book)}
                className={`group relative rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border transition-all cursor-pointer flex flex-col justify-between hover:scale-[1.01] hover:shadow-md ${
                  isDarkMode
                    ? 'bg-[#182338] border-slate-700/70 hover:border-amber-400/50'
                    : 'bg-[#faf8f5] border-[#1c1c1c]/10 hover:border-[#1c1c1c]/30 hover:bg-[#ffffff]'
                }`}
              >
                {/* Ranking Tag on Top */}
                <div className="flex flex-wrap items-center justify-between gap-1 sm:gap-2 mb-2 sm:mb-3">
                  <span className={`text-[9px] sm:text-[11px] font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg flex items-center gap-1 sm:gap-1.5 shadow-2xs max-w-full truncate ${
                    stats?.ranking === 1
                      ? 'bg-amber-400 text-amber-950 font-black'
                      : stats?.ranking === 2
                      ? 'bg-slate-200 text-slate-800 font-black'
                      : stats?.ranking === 3
                      ? 'bg-amber-700 text-white font-bold'
                      : isDarkMode
                      ? 'bg-slate-800 text-slate-300'
                      : 'bg-[#ede8df] text-[#1c1c1c]'
                  }`}>
                    {stats?.ranking && stats.ranking <= 3 ? (
                      <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current shrink-0" />
                    ) : (
                      <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 shrink-0" />
                    )}
                    <span className="truncate">{stats?.badgeText || `#${stats?.ranking} Popular`}</span>
                  </span>

                  <span className={`hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-[#ede8df] text-[#5c5549]'
                  }`}>
                    {themeConfig?.name || book.theme}
                  </span>
                </div>

                {/* Main Book Info Row */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3.5 items-stretch sm:items-start">
                  {/* Book Cover Thumbnail */}
                  <div className="relative w-full aspect-[3/4] sm:w-20 sm:aspect-2/3 shrink-0 rounded-lg sm:rounded-xl overflow-hidden shadow-sm border border-black/10 group-hover:shadow-md transition-shadow">
                    <BookCover book={book} size="sm" />
                    <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-1">
                      <span className="text-[9px] text-white font-bold">Ver Obra</span>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                    <div>
                      <h3 className={`text-xs sm:text-base font-bold font-delicate truncate group-hover:text-amber-500 transition-colors ${
                        isDarkMode ? 'text-white' : 'text-[#1c1c1c]'
                      }`}>
                        {book.title}
                      </h3>
                      <p className={`text-[11px] sm:text-xs truncate ${isDarkMode ? 'text-slate-400' : 'text-[#7d7567]'}`}>
                        {book.author}
                      </p>

                      <p className={`text-[10px] sm:text-[11px] line-clamp-2 mt-1 sm:mt-1.5 leading-snug sm:leading-relaxed ${
                        isDarkMode ? 'text-slate-300' : 'text-[#5c5549]'
                      }`}>
                        {book.synopsis}
                      </p>
                    </div>

                    {/* Stats Pill */}
                    <div className="mt-1.5 sm:mt-2.5 flex items-center justify-between gap-1 sm:gap-2 pt-1.5 sm:pt-2 border-t border-inherit/20 text-[10px] sm:text-[11px]">
                      <div className="flex items-center gap-0.5 sm:gap-1 text-amber-500 font-bold">
                        <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                        <span>{book.rating.toFixed(1)}</span>
                      </div>

                      <div className={`flex items-center gap-1 font-medium truncate ${isDarkMode ? 'text-slate-400' : 'text-[#7d7567]'}`}>
                        <Users className="w-3 h-3 text-amber-500 shrink-0" />
                        <span className="truncate">{stats?.loanCount || 15} retiradas</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Quick Action */}
                <div className="mt-2 sm:mt-3 pt-2 sm:pt-2.5 border-t border-inherit/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-1.5 sm:gap-2">
                  <span className={`text-[10px] font-semibold truncate ${
                    isAvailable 
                      ? 'text-emerald-600 dark:text-emerald-400' 
                      : 'text-rose-500 dark:text-rose-400'
                  }`}>
                    {isAvailable ? `✓ ${book.availableCopies} disp.` : '✕ Indisponível'}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isAvailable) onStartLoan(book);
                      else handleCardClick(book);
                    }}
                    className={`w-full sm:w-auto px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer shadow-2xs ${
                      isAvailable
                        ? isDarkMode
                          ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-black'
                          : 'bg-[#1c1c1c] hover:bg-[#2e2b26] text-white'
                        : isDarkMode
                        ? 'bg-slate-800 text-slate-400'
                        : 'bg-[#ede8df] text-[#7d7567]'
                    }`}
                  >
                    <Bookmark className="w-3 h-3 text-amber-300 fill-amber-300 shrink-0" />
                    <span>{isAvailable ? 'Emprestar' : 'Ver Detalhes'}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
