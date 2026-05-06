import { cn } from '@/lib/utils';

type BuddyMascotProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  mood?: 'happy' | 'thinking';
};

export function BuddyMascot({ size = 'lg', mood = 'happy' }: BuddyMascotProps) {
  const sizes = {
    sm: 'h-9 w-9',
    md: 'h-12 w-12',
    lg: 'h-24 w-24',
    xl: 'h-32 w-32',
  };

  return (
    <div className={cn('relative flex items-center justify-center', sizes[size])}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-buddy-purple/25 to-buddy-blue/20 blur-xl" />
      <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-white to-buddy-lavender shadow-[0_14px_35px_rgba(76,92,140,0.18)] ring-2 ring-white">
        <div className="absolute -top-2 left-1/2 h-4 w-1 -translate-x-1/2 rounded-full bg-buddy-purple" />
        <div className="absolute -top-4 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-buddy-mint" />
        <div className="flex h-[52%] w-[68%] items-center justify-center rounded-full bg-gradient-to-br from-buddy-text to-[#30295E]">
          <div className="flex items-center gap-2">
            <div className={cn('rounded-full bg-white', size === 'sm' ? 'h-1.5 w-1.5' : 'h-2.5 w-2.5')} />
            <div className={cn('rounded-full bg-white', size === 'sm' ? 'h-1.5 w-1.5' : 'h-2.5 w-2.5')} />
          </div>
          <div className={cn('absolute bottom-[32%] h-2 rounded-b-full border-b-2 border-white', mood === 'thinking' ? 'w-4' : 'w-7')} />
        </div>
      </div>
    </div>
  );
}
