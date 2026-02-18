🚀 Smart Bookmark App
A simple and secure bookmark manager built using Next.js (App Router) and Supabase.
Users can log in using Google OAuth, add bookmarks, delete them, and see updates in real-time without refreshing the page.
🔗 Live Links
🌐 Live App (Vercel Deployment):
https://smart-bookmark-appp.vercel.app/
💻 GitHub Repository:
https://github.com/MANIKANTA43513/Smart--Bookmark-Appp.git
🎥 Screen Recording (Demo Video):


📌 Features
1️⃣ Google Authentication
Users can sign up and log in using Google OAuth only
No email/password authentication used
Secure session handled by Supabase
2️⃣ Add Bookmark
Users can add:
Title
URL
Data is stored in Supabase database
3️⃣ Private Bookmarks
Each user's bookmarks are private
One user cannot see another user’s bookmarks
Implemented using Supabase Row Level Security (RLS)
4️⃣ Real-Time Updates
Bookmark list updates instantly
No page refresh required
Works even if opened in multiple tabs
5️⃣ Delete Bookmark
Users can delete their own bookmarks
Only owner can delete their records
6️⃣ Deployment
Deployed on Vercel
Connected with Supabase production environment
🛠 Tech Stack
Frontend: Next.js (App Router)
Styling: Tailwind CSS
Authentication: Supabase Auth (Google OAuth)
Database: Supabase PostgreSQL
Realtime: Supabase Realtime subscriptions
Deployment: Vercel
🗄 Database Structure
Table: bookmarks
Column
Type
Description
id
uuid
Primary key
user_id
uuid
Linked to authenticated user
title
text
Bookmark title
url
text
Bookmark URL
created_at
timestamp
Auto-generated
🔐 Security Implementation
Row Level Security (RLS) enabled
Policies created:
Users can only select their own bookmarks
Users can only insert with their user_id
Users can only delete their own records
This ensures complete data privacy between users.
⚙️ Environment Variables
These were added in Vercel:
Copy code

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_=
These values were taken from Supabase project settings.
🚀 How to Run Locally
Clone the repository
Copy code

git clone https://github.com/your-username/smart-bookmark-app.git
Install dependencies
Copy code

npm install
Create .env.local file and add:
Copy code

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
Run the project
Copy code

npm run dev
Open:
http://localhost:3000
🧠 Challenges Faced & Solutions
❌ Issue 1: OAuth redirect not working in production
Solution:
Added Vercel deployment URL in Supabase:
Site URL
Redirect URL configuration
❌ Issue 2: Real-time not updating properly
Solution:
Used Supabase Realtime channel subscription and refreshed state on change event.
❌ Issue 3: Users seeing other users' bookmarks
Solution:
Enabled Row Level Security and added correct policies.
📽 Demo Flow
User logs in with Google
Adds bookmark
Bookmark appears instantly
Open second tab → real-time sync works
Delete bookmark → removed immediately
📦 Final Deliverables
✅ Working live Vercel deployment
✅ Public GitHub repository
✅ Screen recording demonstration
✅ Fully functional Google OAuth login
✅ Real-time private bookmarks
👨‍💻 Author
Manikanta
MCA Graduate | Full Stack Developer
Built as part of assignment submission.
