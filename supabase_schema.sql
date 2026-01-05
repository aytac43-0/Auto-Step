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

-- Create automations table
create table automations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  name text not null,
  status text not null default 'active' check (status in ('active', 'paused')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up RLS for automations
alter table automations enable row level security;

create policy "Users can view own automations." on automations
  for select using (auth.uid() = user_id);

create policy "Users can insert own automations." on automations
  for insert with check (auth.uid() = user_id);

create policy "Users can update own automations." on automations
  for update using (auth.uid() = user_id);

create policy "Users can delete own automations." on automations
  for delete using (auth.uid() = user_id);
