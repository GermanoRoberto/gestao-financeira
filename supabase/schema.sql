-- Create a table for public profiles using Supabase Auth
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  full_name text,
  role text default 'user',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies for profiles
create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

-- Receitas Table
create table public.receitas (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  description text not null,
  amount numeric not null,
  category text not null,
  date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.receitas enable row level security;

create policy "Users can view own receitas" on public.receitas
  for select using (auth.uid() = user_id);

create policy "Users can insert own receitas" on public.receitas
  for insert with check (auth.uid() = user_id);

create policy "Users can update own receitas" on public.receitas
  for update using (auth.uid() = user_id);

create policy "Users can delete own receitas" on public.receitas
  for delete using (auth.uid() = user_id);

-- Despesas Table
create table public.despesas (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  description text not null,
  amount numeric not null,
  category text not null,
  date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.despesas enable row level security;

create policy "Users can view own despesas" on public.despesas
  for select using (auth.uid() = user_id);

create policy "Users can insert own despesas" on public.despesas
  for insert with check (auth.uid() = user_id);

create policy "Users can update own despesas" on public.despesas
  for update using (auth.uid() = user_id);

create policy "Users can delete own despesas" on public.despesas
  for delete using (auth.uid() = user_id);

-- Admin policies
-- Allow admins to view everything
create policy "Admins can view all profiles" on public.profiles
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can view all receitas" on public.receitas
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can view all despesas" on public.despesas
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'user');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
