'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PROVINCES, getProduct, deliveryFee } from '@/lib/products';
import { useLang } from '@/lib/i18n';
import { useCart } from '@/components/CartContext';

const field = 'mt-1 w-full rounded-none border border-black bg-bone px-4 py-3';

export default function Checkout() {
  const { lang, t } = useLang();
  const { items, clear } = useCart();
  const router = useRouter();
  const [f, setF] = useState({ name: '', phone: '', province: '', address: '', landmark: '', payment: 'cod' });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const subtotal = items.reduce((s, i) => s + (getProduct(i.slug)?.price || 0) * i.qty, 0);
  const delivery = f.province ? deliveryFee(f.province, subtotal) : 0;
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    if (!/^(\+855|0)\d{8,9}$/.test(f.phone.replace(/[\s-]/g, ''))) return setErr(t('errPhone'));
    setBusy(true);
    try {
      const r = await fetch('/api/order', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...f, items }) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      clear();
      router.push(`/thanks?code=${d.code}`);
    } catch { setErr(t('errGeneral')); setBusy(false); }
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-xl space-y-5 px-5 py-10">
      <h1 className="text-4xl font-bold">{t('checkout')}</h1>
      <label className="block">{t('name')}<input required className={field} value={f.name} onChange={set('name')} autoComplete="name" /></label>
      <label className="block">{t('phone')}<input required type="tel" inputMode="tel" className={field} value={f.phone} onChange={set('phone')} autoComplete="tel" /></label>
      <label className="block">{t('province')}
        <select required className={field} value={f.province} onChange={set('province')}>
          <option value="">{t('choose')}</option>
          {PROVINCES.map((p) => <option key={p.en} value={p.en}>{lang === 'km' ? p.km : p.en}</option>)}
        </select>
      </label>
      <label className="block">{t('address')}<input required className={field} value={f.address} onChange={set('address')} autoComplete="street-address" /></label>
      <label className="block">{t('landmark')}<input className={field} value={f.landmark} onChange={set('landmark')} /></label>
      <fieldset>
        <legend>{t('payment')}</legend>
        {(['cod', 'khqr'] as const).map((k) => (
          <label key={k} className="mt-2 flex items-center gap-3"><input type="radio" name="pay" checked={f.payment === k} onChange={() => setF({ ...f, payment: k })} />{t(k)}</label>
        ))}
      </fieldset>
      <div className="space-y-1 border-t border-black/30 pt-4">
        <p className="flex justify-between"><span>{t('subtotal')}</span><span>${subtotal.toFixed(2)}</span></p>
        <p className="flex justify-between"><span>{t('delivery')}</span><span>{!f.province ? '-' : delivery === 0 ? t('free') : `$${delivery.toFixed(2)}`}</span></p>
        <p className="flex justify-between text-xl font-bold"><span>{t('total')}</span><span>${(subtotal + delivery).toFixed(2)}</span></p>
      </div>
      {err && <p role="alert" className="bg-black px-4 py-3 text-bone">{err}</p>}
      <button disabled={busy || !items.length} className="w-full rounded-full bg-black py-4 text-bone disabled:opacity-50">{busy ? t('sending') : t('placeOrder')}</button>
    </form>
  );
}
