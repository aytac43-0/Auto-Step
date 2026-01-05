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

-- Create products table
create table products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  price numeric(10, 2) not null,
  active boolean not null default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up RLS for products
alter table products enable row level security;

create policy "Everyone can view active products." on products
  for select using (active = true);

create policy "Admins can manage products." on products
  for all using (
    exists (
      select 1 from profiles
      where user_id = auth.uid() and role = 'admin'
    )
  );

-- Create purchases table
create table purchases (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  product_id uuid references products not null,
  merchant_oid text unique,
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up RLS for purchases
alter table purchases enable row level security;

create policy "Users can view own purchases." on purchases
  for select using (auth.uid() = user_id);

create policy "Users can insert own purchases." on purchases
  for insert with check (auth.uid() = user_id);

create policy "Admins can view all purchases." on purchases
  for select using (
    exists (
      select 1 from profiles
      where user_id = auth.uid() and role = 'admin'
    )
  );

-- Seed some products (Helper)
insert into products (name, description, price) values 
('Starter Pack', 'Perfect for individuals starting their automation journey.', 29.00),
('Pro Automation', 'Advanced features for businesses and power users.', 99.00),
('Enterprise Solution', 'Custom workflows and dedicated support for scale.', 499.00);
