'use client';
import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import { PRODUCTS } from '@/lib/products';
import ProductPanel from '@/components/ProductPanel';

export default function Home() {
  const { t } = useLang();
  const [clay, powder, duo] = PRODUCTS;
  return (
    <>
      <section className="relative overflow-hidden px-5 pb-20 pt-10 md:pb-32">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[36vw] leading-none text-[#b3aa9f]">OAK</div>
        <div className="relative mx-auto max-w-5xl pt-[24vw] md:pt-[18vw]">
          <h1 className="max-w-2xl text-4xl font-bold md:text-6xl">{t('heroTitle')}</h1>
          <p className="mt-5 max-w-md text-lg">{t('heroSub')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#shop" className="rounded-full bg-black px-7 py-3.5 text-bone">{t('shopNow')}</a>
            <Link href="/product/duo" className="rounded-full border border-black px-7 py-3.5">{t('duo')}</Link>
          </div>
        </div>
      </section>

      <section id="shop" className="mx-auto max-w-5xl px-5">
        <div className="grid gap-4 md:grid-cols-2">
          <ProductPanel p={clay} />
          <ProductPanel p={powder} />
        </div>
        <div className="mt-4"><ProductPanel p={duo} large /></div>
      </section>

      <section className="mx-auto mt-24 grid max-w-5xl gap-10 px-5 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold">{t('which')}</h2>
          <p className="mt-4 max-w-sm">{t('whichClay')}</p>
          <p className="mt-2 max-w-sm">{t('whichPowder')}</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold">{t('how')}</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5">
            <li>{t('step1')}</li><li>{t('step2')}</li><li>{t('step3')}</li>
          </ol>
        </div>
      </section>
    </>
  );
}
