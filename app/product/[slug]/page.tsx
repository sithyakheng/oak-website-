'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getProduct } from '@/lib/products';
import { useLang } from '@/lib/i18n';
import ProductPanel from '@/components/ProductPanel';

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t } = useLang();
  const p = getProduct(slug);
  if (!p) return <p className="p-10">404</p>;
  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <ProductPanel p={p} large />
      <p className="mt-8 max-w-lg text-lg">{p.desc[lang]}</p>
      <p className="mt-3 text-sm">{t('shipNote')}</p>
      <Link href="/cart" className="mt-8 inline-block underline underline-offset-4">{t('cart')}</Link>
    </div>
  );
}
