'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { getProduct } from '@/lib/products';
import { useLang } from '@/lib/i18n';
import { useCart } from '@/components/CartContext';
import ProductPanel from '@/components/ProductPanel';

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t } = useLang();
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const p = getProduct(slug);
  if (!p) return <p className="p-10">404</p>;
  return (
    <div className="mx-auto max-w-6xl px-5 py-10 pb-28 md:py-16">
      <ProductPanel p={p} large />
      <p className="mt-8 max-w-lg text-lg">{p.desc[lang]}</p>
      <p className="mt-3 text-sm">{t('shipNote')}</p>
      <Link href="/cart" className="mt-8 inline-block underline underline-offset-4">{t('cart')}</Link>
      <div className="fixed inset-x-0 bottom-0 z-20 flex items-center gap-4 border-t border-black bg-bone px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 md:hidden">
        <span className="text-xl font-bold">${p.price.toFixed(2)}</span>
        <button onClick={() => { add(p.slug); setAdded(true); setTimeout(() => setAdded(false), 1800); }} className="min-h-12 flex-1 rounded-full bg-black px-5 py-3 text-bone">
          {added ? t('added') : t('addToCart')}
        </button>
      </div>
    </div>
  );
}
