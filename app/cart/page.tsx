'use client';
import Link from 'next/link';
import { getProduct } from '@/lib/products';
import { useLang } from '@/lib/i18n';
import { useCart } from '@/components/CartContext';

export default function CartPage() {
  const { t } = useLang();
  const { items, setQty, remove } = useCart();
  const lines = items.map((i) => ({ ...i, p: getProduct(i.slug)! })).filter((l) => l.p);
  const subtotal = lines.reduce((s, l) => s + l.p.price * l.qty, 0);
  return (
    <div className="mx-auto max-w-2xl px-5 py-10">
      <h1 className="text-4xl font-bold">{t('cart')}</h1>
      {!lines.length ? (
        <p className="mt-6">{t('cartEmpty')} <Link href="/#shop" className="underline underline-offset-4">{t('shopNow')}</Link></p>
      ) : (
        <>
          <ul className="mt-8 divide-y divide-black/20">
            {lines.map((l) => (
              <li key={l.slug} className="flex items-center justify-between gap-4 py-4">
                <div><p className="font-bold">{l.p.name}</p><p className="text-sm">${l.p.price}</p></div>
                <div className="flex items-center gap-3">
                  <button aria-label="-" onClick={() => setQty(l.slug, l.qty - 1)} className="h-9 w-9 rounded-full border border-black">-</button>
                  <span className="w-5 text-center">{l.qty}</span>
                  <button aria-label="+" onClick={() => setQty(l.slug, l.qty + 1)} className="h-9 w-9 rounded-full border border-black">+</button>
                  <button onClick={() => remove(l.slug)} className="ml-2 text-sm underline underline-offset-4">{t('remove')}</button>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 flex justify-between text-lg"><span>{t('subtotal')}</span><b>${subtotal.toFixed(2)}</b></p>
          <Link href="/checkout" className="mt-8 block rounded-full bg-black py-4 text-center text-bone">{t('checkout')}</Link>
        </>
      )}
    </div>
  );
}
