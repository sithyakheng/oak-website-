'use client';
import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import { useCart } from '@/components/CartContext';

export default function Header() {
  const { lang, setLang, t } = useLang();
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between bg-stone/90 px-5 py-3 backdrop-blur">
      <Link href="/" className="flex items-center gap-3" aria-label="OAK">
        <img src="/oak-leaf-ink.png" alt="" className="h-8 w-auto" />
        <span className="font-display text-xl tracking-[0.2em]">OAK</span>
      </Link>
      <nav className="flex items-center gap-5 text-sm">
        <button onClick={() => setLang(lang === 'km' ? 'en' : 'km')} className="underline underline-offset-4">{lang === 'km' ? 'English' : 'ខ្មែរ'}</button>
        <Link href="/cart" className="rounded-full bg-black px-4 py-2 text-bone">{t('cart')} ({count})</Link>
      </nav>
    </header>
  );
}
