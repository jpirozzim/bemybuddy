import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
};

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  const styles = {
    primary:
      'bg-gradient-to-r from-buddy-purple to-[#5B6DFF] text-white shadow-[0_12px_24px_rgba(108,77,255,0.24)]',
    secondary: 'bg-white text-buddy-purpleDark ring-1 ring-[#D9E0EE]',
    ghost: 'bg-transparent text-buddy-purple',
  };

  return (
    <button
      className={cn(
        'h-14 w-full rounded-2xl px-5 text-base font-extrabold transition active:scale-[0.98] disabled:opacity-50',
        styles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
