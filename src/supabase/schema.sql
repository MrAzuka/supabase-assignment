--Code used for RLS setup--

-- Public Tables --
create table public.public_items (
  id bigint generated always as identity primary key,
  title text not null,
  description text
);

alter table public.public_items enable row level security;

create policy "Anyone can read public items"
  on public.public_items
  for select
  to anon, authenticated
  using (true);

grant select on public.public_items to anon, authenticated;

insert into public.public_items (title, description) values
  ('Welcome', 'This is visible to everyone, even before signing in.'),
  ('Getting started', 'Create an account to see more content.'),
  ('About the app', 'A demo of Supabase auth and row level security.'),
  ('Public tip', 'Public rows are readable by the anon role.');

-- Protected Tables -- 
create table public.protected_items (
  id bigint generated always as identity primary key,
  title text not null,
  description text
);

alter table public.protected_items enable row level security;

create policy "Signed-in users can read protected items"
  on public.protected_items
  for select
  to authenticated
  using (true);

grant select on public.protected_items to authenticated;

insert into public.protected_items (title, description) values
  ('Members only', 'You can see this because you are signed in.'),
  ('Secret note', 'The anon role gets zero rows from this table.'),
  ('Dashboard data', 'Protected content for authenticated users.'),
  ('Account perk', 'RLS checks your role on every query.');