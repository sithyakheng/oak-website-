'use client';
import { createContext, useContext, useEffect, useState } from 'react';
export type Line = { slug: string; qty: number };
const Ctx = createContext<{ items: Line[]; count: number; add: (s: string) => void; setQty: (s: string, q: number) => void; remove: (s: string) => void; clear: () => void }>(
  { items: [], count: 0, add: () => {}, setQty: () => {}, remove: () => {}, clear: () => {} });

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Line[]>([]);
  useEffect(() => { try { setItems(JSON.parse(localStorage.getItem('oak-cart') || '[]')); } catch {} }, []);
  const save = (n: Line[]) => { setItems(n); try { localStorage.setItem('oak-cart', JSON.stringify(n)); } catch {} };
  const add = (s: string) => save(items.some((i) => i.slug === s) ? items.map((i) => (i.slug === s ? { ...i, qty: Math.min(10, i.qty + 1) } : i)) : [...items, { slug: s, qty: 1 }]);
  const setQty = (s: string, q: number) => save(q < 1 ? items.filter((i) => i.slug !== s) : items.map((i) => (i.slug === s ? { ...i, qty: Math.min(10, q) } : i)));
  const remove = (s: string) => save(items.filter((i) => i.slug !== s));
  const clear = () => save([]);
  return <Ctx.Provider value={{ items, count: items.reduce((n, i) => n + i.qty, 0), add, setQty, remove, clear }}>{children}</Ctx.Provider>;
}
export const useCart = () => useContext(Ctx);
