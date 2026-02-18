# Smart Bookmark App

## Features
- Google OAuth login
- Add bookmark (title + URL)
- Private per user
- Real-time updates using Supabase Realtime
- Delete bookmarks
- Deployable to Vercel

## Supabase Setup
1. Create project
2. Enable Google OAuth
3. Create table:

create table bookmarks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  url text not null,
  created_at timestamp default now()
);

4. Enable Row Level Security:
alter table bookmarks enable row level security;

create policy "Users can manage their own bookmarks"
on bookmarks
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

## Deployment
Add environment variables in Vercel:
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
