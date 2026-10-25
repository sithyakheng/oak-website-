'use client';
import Link from 'next/link';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLang } from '@/lib/i18n';

function Inner() {
  const { t } = useLang();
  const code = useSearchParams().get('code');
  return (
    <div className="mx-auto max-w-xl px-5 py-16">
      <h1 className="text-4xl font-bold">{t('thanks')}</h1>
      <p className="mt-4 text-lg">{t('thanksSub')}</p>
      {code && <p className="mt-6">{t('orderNo')}: <b>{code}</b></p>}
      <Link href="/" className="mt-10 inline-block underline underline-offset-4">{t('backShop')}</Link>
    </div>
  );
}
export default function Thanks() { return <Suspense><Inner /></Suspense>; }
