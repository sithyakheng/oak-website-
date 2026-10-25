'use client';
import { useLang } from '@/lib/i18n';
export default function Footer() {
  const { t } = useLang();
  const links = [['Telegram', process.env.NEXT_PUBLIC_TELEGRAM_URL], ['Facebook', process.env.NEXT_PUBLIC_FACEBOOK_URL]].filter(([, u]) => u);
  return (
    <footer className="bg-black px-5 py-12 text-bone md:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <img src="/oak-leaf.png" alt="" className="h-10 w-auto" />
            <span className="font-display text-lg tracking-[0.2em]">OAK</span>
          </div>
          <p className="mt-4 max-w-xs">{t('shipNote')}</p>
        </div>
        <div>
          <p className="mb-2 font-bold">{t('contact')}</p>
          <ul className="space-y-1">
            {links.map(([n, u]) => <li key={n}><a className="inline-flex min-h-11 items-center underline underline-offset-4" href={u}>{n}</a></li>)}
            {process.env.NEXT_PUBLIC_PHONE && <li><a className="inline-flex min-h-11 items-center underline underline-offset-4" href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}>{process.env.NEXT_PUBLIC_PHONE}</a></li>}
          </ul>
        </div>
      </div>
    </footer>
  );
}
