'use client';
import { LangProvider } from '@/lib/i18n';
import { CartProvider } from '@/components/CartContext';
export default function Providers({ children }: { children: React.ReactNode }) {
  return <LangProvider><CartProvider>{children}</CartProvider></LangProvider>;
}
