-- Create a table for public profiles
create table profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null unique,
  email text not null,
  username text not null unique,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = user_id);

create policy "Users can insert own profile." on profiles
  for insert with check (auth.uid() = user_id);

-- Only admins can delete profiles (optional)
create policy "Admins can delete profiles." on profiles
  for delete using (
    exists (
      select 1 from profiles
      where user_id = auth.uid() and role = 'admin'
    )
  );
