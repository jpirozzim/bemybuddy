import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BeMyBuddy',
  description: 'Crea tu buddy de IA personal en minutos.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
