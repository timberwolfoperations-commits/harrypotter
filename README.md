# ⚡ Harry Potter Wizarding Quiz — for Mia

A beautifully themed Harry Potter quiz game built with **Tailwind CSS**, **Supabase** (shared leaderboard), and deployed on **Vercel**.

---

## Features

- 🎮 **100 question bank** — 10 random questions every game, so it's always different  
- 🧙 **Name-based leaderboard** — scores are stored in Supabase and shared across all devices  
- ✨ **Harry Potter theme** — dark starfield, gold accents, magical animations, Hogwarts houses  
- 📱 **Fully responsive** — looks great on phone, tablet, and desktop  
- 🔌 **Works offline** — if Supabase isn't configured, scores are saved to `localStorage` automatically

---

## Getting Started

### 1 · Clone the repository

```bash
git clone https://github.com/timberwolfoperations-commits/harrypotter.git
cd harrypotter
```

### 2 · Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a free project.
2. Open the **SQL Editor** and run this to create the scores table:

```sql
-- Create the scores table
create table scores (
  id         uuid    default gen_random_uuid() primary key,
  name       text    not null,
  score      integer not null,
  total_time integer not null,
  played_at  timestamptz default now() not null
);

-- Enable Row Level Security
alter table scores enable row level security;

-- Allow anyone to read scores (public leaderboard)
create policy "public read"
  on scores for select
  using (true);

-- Allow anyone to insert a score (no account needed to play)
create policy "public insert"
  on scores for insert
  with check (true);
```

3. Go to **Settings → API** in your Supabase project and copy:
   - **Project URL** (looks like `https://xxxxxxxx.supabase.co`)
   - **anon / public** key

### 3 · Configure credentials

```bash
cp js/config.example.js js/config.js
```

Open `js/config.js` and replace the placeholder values:

```js
const SUPABASE_URL  = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON = 'YOUR_ANON_PUBLIC_KEY';
```

> ⚠️ `js/config.js` is in `.gitignore` and will **never** be committed to Git.

### 4 · Open locally

Just open `index.html` in your browser — no build step needed!

---

## Deploy to Vercel

### Option A — Vercel dashboard (easiest)

1. Push this repo to GitHub (already done ✅).
2. Go to [vercel.com](https://vercel.com) → **New Project** → import the `harrypotter` repo.
3. Add these **Environment Variables** in the Vercel project settings:

| Name | Value |
|------|-------|
| (none required) | Supabase keys live in `js/config.js` which you deploy with the site |

4. Click **Deploy**. Vercel detects it as a static site automatically.

> 💡 Since this is a static site (no build step), deploy `js/config.js` by **not** adding it to `.gitignore` on the Vercel branch, or use a Vercel-specific build hook to inject it. The simplest approach for a family project: commit a `js/config.js` with your real keys to a **private** repository.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

---

## Project Structure

```
harrypotter/
├── index.html              # Full single-page app (Tailwind via CDN)
├── js/
│   ├── questions.js        # 100 Harry Potter questions
│   ├── quiz.js             # Game engine + Supabase + localStorage fallback
│   ├── config.js           # YOUR credentials (gitignored)
│   └── config.example.js  # Template to copy
├── vercel.json             # Vercel static-site config
└── .gitignore
```

---

## Question Categories

| Category | Examples |
|----------|---------|
| Characters | Harry, Hermione, Snape, Dumbledore… |
| Spells | Expelliarmus, Expecto Patronum, Avada Kedavra… |
| Hogwarts | Houses, founders, ghosts, staff… |
| Locations | Diagon Alley, Hogsmeade, Platform 9¾… |
| Potions | Felix Felicis, Polyjuice, Veritaserum… |
| Creatures | Thestrals, Basilisk, Dobby, Nagini… |
| Objects | Horcruxes, Deathly Hallows, wands… |
| Quidditch | Teams, positions, rules… |
| Lore | History, lore, books… |

---

Made with 🪄 for Mia
