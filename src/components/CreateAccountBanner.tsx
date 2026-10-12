import React from 'react';
import { UserProfile, Language } from '../types';
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';

interface CreateAccountBannerProps {
  user: UserProfile | null;
  language?: Language;
  onOpenAuth: () => void;
  onNavigateToSyllabus: () => void;
}

export const CreateAccountBanner: React.FC<CreateAccountBannerProps> = ({
  user,
  onOpenAuth,
  onNavigateToSyllabus
}) => {
  const isAuthenticated = user !== null && user.provider !== 'guest';

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--bg-card)] via-[var(--bg-elevated)] to-[var(--bg-card)] p-5 shadow-xl text-[var(--text)]">
      <div className="flex items-start gap-3.5 mb-4">
        <span className="text-2xl select-none leading-none pt-0.5" role="img" aria-label="sparkles">
          ✨
        </span>
        <div>
          <p className="text-xs sm:text-sm font-sans text-[var(--text)] leading-relaxed font-semibold">
            Join <span className="text-[var(--primary)] font-bold">50+ learners</span> building real software with project-based engineering, terminal practice & feedback on <span className="text-[var(--primary)] font-bold">Lurnix</span>.
          </p>
        </div>
      </div>

      {isAuthenticated ? (
        <button
          onClick={onNavigateToSyllabus}
          className="w-full py-3.5 px-5 rounded-2xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-slate-950 font-extrabold text-xs sm:text-sm tracking-wide transition-all shadow-lg active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
        >
          <BookOpen className="h-4 w-4" />
          <span>Continue Learning →</span>
        </button>
      ) : (
        <button
          onClick={onOpenAuth}
          className="w-full py-3.5 px-5 rounded-2xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-slate-950 font-extrabold text-xs sm:text-sm tracking-wide transition-all shadow-lg active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Create Free Account →</span>
        </button>
      )}
    </div>
  );
};
