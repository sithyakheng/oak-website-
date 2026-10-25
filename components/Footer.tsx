'use client';
import { useLang } from '@/lib/i18n';
export default function Footer() {
  const { t } = useLang();
  const links = [['Telegram', process.env.NEXT_PUBLIC_TELEGRAM_URL], ['Facebook', process.env.NEXT_PUBLIC_FACEBOOK_URL]].filter(([, u]) => u);
  return (
    <footer className="mt-24 bg-black px-5 py-12 text-bone">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <img src="/oak-leaf.png" alt="" className="h-10 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-bone/70">{t('shipNote')}</p>
        </div>
        <div className="text-sm">
          <p className="mb-2 font-bold">{t('contact')}</p>
          <ul className="space-y-1">
            {links.map(([n, u]) => <li key={n}><a className="underline underline-offset-4" href={u}>{n}</a></li>)}
            {process.env.NEXT_PUBLIC_PHONE && <li>{process.env.NEXT_PUBLIC_PHONE}</li>}
          </ul>
        </div>
      </div>
    </footer>
  );
}
