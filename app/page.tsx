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
      <section className="relative flex min-h-[85svh] flex-col justify-center overflow-hidden bg-black px-5 py-16 text-bone md:min-h-[82svh] md:py-24">
        <div aria-hidden className="pointer-events-none absolute -left-[8vw] top-0 select-none whitespace-nowrap font-display text-[53vw] leading-[0.9] text-white/[0.035] md:-left-[2vw] md:text-[38vw]">OAK</div>
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[1.05fr_.95fr]">
          <div className="fade-in">
            <img src="/oak-leaf.png" alt="" className="mb-8 h-12 w-auto md:h-16" />
            <h1 className="max-w-2xl text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[1.22]">{t('heroTitle')}</h1>
            <p className="mt-6 max-w-lg text-lg text-bone/80 md:text-xl">{t('heroSub')}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#shop" className="inline-flex min-h-12 items-center justify-center rounded-full bg-bone px-7 py-3 text-center font-semibold text-black">{t('shopNow')}</a>
              <Link href="/product/duo" className="inline-flex min-h-12 items-center justify-center rounded-full border border-bone px-7 py-3 text-center font-semibold text-bone">{t('duo')}</Link>
            </div>
          </div>
          <div aria-hidden className="relative hidden aspect-[4/5] max-h-[36rem] items-center justify-center overflow-hidden rounded-[2rem] border border-bone/20 bg-stone md:flex">
            <img src="/oak-leaf-ink.png" alt="" className="h-40 w-auto opacity-80" />
            <span className="absolute bottom-7 left-8 font-display text-sm tracking-[0.25em] text-black/70">OAK</span>
          </div>
        </div>
      </section>

      <section className="border-y border-black bg-stone px-5 py-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-4">
          {[
            { label: t('deliveryCambodia'), icon: <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7zM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" /> },
            { label: t('cod'), icon: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h4" /></> },
            { label: t('matteFinish'), icon: <><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></> },
          ].map(({ label, icon }) => (
            <div key={label} className="flex min-h-12 items-center gap-3">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 shrink-0">{icon}</svg>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="shop" className="grain border-b border-black bg-stone px-5 py-16 md:py-24">
        <div className="fade-in mx-auto max-w-6xl">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="text-3xl font-bold md:text-5xl">{t('shopNow')}</h2>
            <span aria-hidden className="font-display text-sm tracking-[0.2em]">OAK</span>
          </div>
        <div className="grid gap-5 md:grid-cols-2">
          <ProductPanel p={clay} />
          <ProductPanel p={powder} />
        </div>
        <div className="mt-5"><ProductPanel p={duo} large /></div>
        </div>
      </section>

      <section className="grain border-b border-black bg-stone px-5 py-16 md:py-24">
        <div className="fade-in mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-20">
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
        </div>
      </section>
    </>
  );
}
