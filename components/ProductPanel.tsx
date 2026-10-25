'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@/lib/products';
import { useLang } from '@/lib/i18n';
import { useCart } from '@/components/CartContext';
import Meter from '@/components/Meter';

export default function ProductPanel({ p, large = false }: { p: Product; large?: boolean }) {
  const { lang, t } = useLang();
  const { add } = useCart();
  const [done, setDone] = useState(false);
  return (
    <article style={{ background: p.color }} className={`flex flex-col justify-between gap-10 p-7 md:p-10 ${large ? 'min-h-[28rem]' : 'min-h-[26rem]'}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-3xl font-bold md:text-4xl"><Link href={`/product/${p.slug}`}>{p.name}</Link></h3>
          <p className="mt-2 max-w-xs">{p.tagline[lang]}</p>
        </div>
        <img src="/oak-leaf-ink.png" alt="" className="h-20 w-auto md:h-28" />
      </div>
      <div>
        {p.hold !== undefined && (
          <div className="mb-8 max-w-xs space-y-2">
            <Meter label={t('hold')} value={p.hold} />
            {p.shine !== undefined && <Meter label={t('shine')} value={p.shine} />}
            {p.volume !== undefined && <Meter label={t('volume')} value={p.volume} />}
          </div>
        )}
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-2xl font-bold">${p.price}</span>
          <button onClick={() => { add(p.slug); setDone(true); setTimeout(() => setDone(false), 1800); }} className="rounded-full bg-black px-6 py-3 text-bone">
            {done ? t('added') : t('addToCart')}
          </button>
        </div>
      </div>
    </article>
  );
}
