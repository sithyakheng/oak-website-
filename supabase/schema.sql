create table orders (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  created_at timestamptz default now(),
  status text default 'new',
  name text, phone text, province text, address text, landmark text, payment text,
  items jsonb, subtotal numeric, delivery numeric, total numeric
);
alter table orders enable row level security; -- no policies: only the server (service role) can read or write
