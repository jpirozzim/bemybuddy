import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StatusBar({ dark = false }: { dark?: boolean }) {
  return (
    <div className={cn('flex h-12 items-center justify-between px-5 pt-2 text-xs font-semibold', dark ? 'text-white/75' : 'text-buddy-muted')}>
      <span>9:41</span>
      <span>●●● Wi‑Fi ▰</span>
    </div>
  );
}

export function AppShell({
  children,
  step,
  showBack = true,
  onBack,
  dark = false,
}: {
  children: React.ReactNode;
  step?: number;
  showBack?: boolean;
  onBack?: () => void;
  dark?: boolean;
}) {
  return (
    <div className={cn('min-h-[852px] text-buddy-text', dark ? 'bg-[#11133A] text-white' : 'bg-buddy-bg')}>
      <div className={cn('flex min-h-[852px] flex-col', dark ? 'bg-gradient-to-b from-[#11133A] to-[#181048]' : 'bg-gradient-to-b from-buddy-bg to-[#F2F5FF]')}>
        <StatusBar dark={dark} />
        {showBack && (
          <div className="flex h-12 items-center justify-between px-5">
            <button
              onClick={onBack}
              className={cn('flex h-10 w-10 items-center justify-center rounded-full shadow-sm ring-1 transition active:scale-95', dark ? 'bg-white/10 text-white ring-white/10' : 'bg-white text-buddy-text ring-buddy-border')}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            {step ? <StepPill step={step} dark={dark} /> : <div />}
            <div className="h-10 w-10" />
          </div>
        )}
        <div className="flex-1 px-5 pb-6">{children}</div>
      </div>
    </div>
  );
}

function StepPill({ step, dark }: { step: number; dark?: boolean }) {
  return (
    <div className={cn('rounded-full px-3 py-1 text-xs font-extrabold shadow-sm ring-1', dark ? 'bg-white/10 text-white ring-white/10' : 'bg-white text-buddy-purple ring-buddy-border')}>
      Paso {step} de 7
    </div>
  );
}
