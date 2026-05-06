export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[430px] overflow-hidden rounded-[34px] border border-white/10 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
      {children}
    </div>
  );
}
