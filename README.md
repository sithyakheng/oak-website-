# OAK website

Khmer-first online shop for OAK Hair Clay and Texture Powder. Built with Next.js, TypeScript, Tailwind and Supabase. Deploys on Vercel.

## Run it
1. `npm install`
2. Copy `.env.example` to `.env.local` and fill it in.
3. In Supabase, open the SQL editor and run `supabase/schema.sql`.
4. `npm run dev`, then open http://localhost:3000

## Telegram order alerts
Create a bot with @BotFather, put its token in `TELEGRAM_BOT_TOKEN`, message the bot once, and put your chat id in `TELEGRAM_CHAT_ID`.

## Deploy
Push to GitHub, import the repo in Vercel, and add the same variables from `.env.example` in Project Settings.

## Before you launch
- Set real prices, the clay weight and delivery fees in `lib/products.ts`.
- Have a Khmer speaker review the Khmer text in `lib/i18n.tsx`.
- Add real product photos (replace the leaf on each product panel in `components/ProductPanel.tsx`).
- Add your contact links in `.env.local`.
- KHQR is manual for now: the customer sends the receipt on Telegram. Add ABA PayWay later in `app/api/order/route.ts`.
- Orders are saved in the Supabase `orders` table. Read and update them from the Supabase dashboard.
