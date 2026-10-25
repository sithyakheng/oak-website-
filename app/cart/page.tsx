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
    <div className="mx-auto min-h-[60svh] max-w-3xl px-5 py-10 pb-36 md:py-16">
      <h1 className="text-4xl font-bold">{t('cart')}</h1>
      {!lines.length ? (
        <p className="mt-6">{t('cartEmpty')} <Link href="/#shop" className="underline underline-offset-4">{t('shopNow')}</Link></p>
      ) : (
        <>
          <ul className="mt-8 divide-y divide-black/40 border-y border-black/40">
            {lines.map((l) => (
              <li key={l.slug} className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div><p className="font-bold">{l.p.name}</p><p>${l.p.price.toFixed(2)}</p></div>
                <div className="flex flex-wrap items-center gap-3">
                  <button aria-label="-" onClick={() => setQty(l.slug, l.qty - 1)} className="h-11 w-11 rounded-full border border-black">-</button>
                  <span className="w-5 text-center">{l.qty}</span>
                  <button aria-label="+" onClick={() => setQty(l.slug, l.qty + 1)} className="h-11 w-11 rounded-full border border-black">+</button>
                  <button onClick={() => remove(l.slug)} className="min-h-11 px-3 underline underline-offset-4">{t('remove')}</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="fixed inset-x-0 bottom-0 z-20 border-t border-black bg-bone px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 md:static md:mt-8 md:border-0 md:bg-transparent md:p-0">
            <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 md:mb-5">
              <span>{t('subtotal')}</span><b className="text-xl">${subtotal.toFixed(2)}</b>
            </div>
            <Link href="/checkout" className="mx-auto mt-3 flex min-h-12 max-w-3xl items-center justify-center rounded-full bg-black py-3 text-center text-bone md:mt-0">{t('checkout')}</Link>
          </div>
        </>
      )}
    </div>
  );
}
