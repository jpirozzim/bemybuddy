import { cn } from '@/lib/utils';

type SelectChipProps = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
};

export function SelectChip({ label, selected, onClick }: SelectChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex min-h-11 items-center justify-center rounded-2xl border px-3 py-2 text-sm font-extrabold transition active:scale-[0.98]',
        selected ? 'border-buddy-purple bg-buddy-lavender text-buddy-purpleDark shadow-sm' : 'border-buddy-border bg-white text-buddy-muted',
      )}
    >
      {label}
    </button>
  );
}
