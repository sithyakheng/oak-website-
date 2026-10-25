import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getProduct, deliveryFee } from '@/lib/products';

export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  if (!b) return NextResponse.json({ error: 'bad request' }, { status: 400 });

  const lines = (Array.isArray(b.items) ? b.items : []).flatMap((i: { slug?: string; qty?: number }) => {
    const p = getProduct(String(i.slug));
    return p ? [{ p, qty: Math.max(1, Math.min(10, Number(i.qty) || 1)) }] : [];
  });
  const phone = String(b.phone || '').replace(/[\s-]/g, '');
  if (!lines.length || !/^(\+855|0)\d{8,9}$/.test(phone) || !b.name || !b.province || !b.address)
    return NextResponse.json({ error: 'invalid order' }, { status: 400 });

  // Prices come from the server, never from the browser.
  const subtotal = lines.reduce((s: number, l: { p: { price: number }; qty: number }) => s + l.p.price * l.qty, 0);
  const delivery = deliveryFee(String(b.province), subtotal);
  const total = subtotal + delivery;
  const code = 'OAK-' + Math.random().toString(36).slice(2, 8).toUpperCase();
  const items = lines.map((l: { p: { name: string; price: number }; qty: number }) => ({ name: l.p.name, price: l.p.price, qty: l.qty }));
  const payment = b.payment === 'khqr' ? 'khqr' : 'cod';

  const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { error } = await sb.from('orders').insert({
    code, name: String(b.name).slice(0, 100), phone, province: String(b.province), address: String(b.address).slice(0, 300),
    landmark: String(b.landmark || '').slice(0, 300), payment, items, subtotal, delivery, total,
  });
  if (error) return NextResponse.json({ error: 'save failed' }, { status: 500 });

  if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
    const text = [`New order ${code}`, ...items.map((i: { name: string; qty: number }) => `${i.qty} x ${i.name}`), `Total $${total.toFixed(2)} (${payment})`,
      `${b.name}, ${phone}`, `${b.province}, ${b.address}`, b.landmark || ''].filter(Boolean).join('\n');
    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text }),
    }).catch(() => {});
  }
  return NextResponse.json({ code });
}
