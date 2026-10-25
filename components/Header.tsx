'use client';
import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import { useCart } from '@/components/CartContext';

export default function Header() {
  const { lang, setLang, t } = useLang();
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b border-black/20 bg-stone/95 px-4 backdrop-blur md:px-6">
      <Link href="/" className="flex min-h-12 items-center gap-2" aria-label="OAK">
        <img src="/oak-leaf-ink.png" alt="" className="h-7 w-auto" />
        <span className="font-display text-lg tracking-[0.15em]">OAK</span>
      </Link>
      <nav className="flex items-center gap-2">
        <button onClick={() => setLang(lang === 'km' ? 'en' : 'km')} className="min-h-11 rounded-full px-3 underline underline-offset-4">{lang === 'km' ? 'English' : 'ខ្មែរ'}</button>
        <Link href="/cart" className="inline-flex min-h-11 items-center rounded-full bg-black px-4 py-2 text-bone">{t('cart')} ({count})</Link>
      </nav>
    </header>
  );
}
