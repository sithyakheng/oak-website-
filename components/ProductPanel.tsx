'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Product, PRODUCTS } from '@/lib/products';
import { useLang } from '@/lib/i18n';
import { useCart } from '@/components/CartContext';
import Meter from '@/components/Meter';

export default function ProductPanel({ p, large = false }: { p: Product; large?: boolean }) {
  const { lang, t } = useLang();
  const { add } = useCart();
  const [done, setDone] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const saving = p.slug === 'duo'
    ? Math.max(0, PRODUCTS.filter((item) => item.slug !== 'duo').reduce((sum, item) => sum + item.price, 0) - p.price)
    : 0;

  function addToCart() {
    add(p.slug);
    setDone(true);
    setTimeout(() => setDone(false), 1800);
  }

  return (
    <article style={{ background: p.color }} className={`grain overflow-hidden border border-black ${large ? 'grid md:grid-cols-2' : 'flex flex-col'}`}>
      <div className={`relative aspect-[4/5] overflow-hidden ${p.slug === 'texture-powder' ? 'bg-bone' : 'bg-sand'} ${large ? 'md:aspect-auto md:min-h-[27rem]' : ''}`}>
        {!imageFailed && <img src={`/products/${p.slug}.jpg`} alt={p.name} className="absolute inset-0 h-full w-full object-cover" onError={() => setImageFailed(true)} />}
        {imageFailed && (
          <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
            <img src="/oak-leaf-ink.png" alt="" className="h-24 w-auto opacity-70 md:h-32" />
          </div>
        )}
        {saving > 0 && <span className="absolute left-4 top-4 rounded-full bg-black px-4 py-2 text-bone">{t('save')} ${saving.toFixed(2)}</span>}
      </div>
      <div className="flex flex-col justify-between p-5 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold md:text-3xl"><Link href={`/product/${p.slug}`}>{p.name}</Link></h3>
            <p className="mt-2">{p.tagline[lang]}</p>
          </div>
          <span aria-hidden="true" className="font-display text-sm tracking-[0.15em]">OAK</span>
        </div>
        <div className="mt-8">
          {p.hold !== undefined && (
            <div className="mb-7 max-w-sm space-y-2">
              <Meter label={t('hold')} value={p.hold} />
              {p.shine !== undefined && <Meter label={t('shine')} value={p.shine} />}
              {p.volume !== undefined && <Meter label={t('volume')} value={p.volume} />}
            </div>
          )}
          <div className="flex items-center justify-between gap-4 border-t border-black/30 pt-5">
            <span className="text-2xl font-bold">${p.price.toFixed(2)}</span>
            {p.size && !p.size.includes('__') && <span className="text-right">{p.size}</span>}
          </div>
          <button onClick={addToCart} className="mt-4 min-h-12 w-full rounded-full bg-black px-6 py-3 text-bone">
            {done ? t('added') : t('addToCart')}
          </button>
        </div>
      </div>
    </article>
  );
}
