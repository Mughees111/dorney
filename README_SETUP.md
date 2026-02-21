# Dorney FMCG E-Commerce - Setup Instructions

## 1. Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Required variables:
- `DATABASE_URL` - Supabase PostgreSQL connection string (see Supabase Credentials below)
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- `JWT_SECRET` - Random string, min 32 chars (e.g. `openssl rand -base64 32`)
- `NEXT_PUBLIC_WHATSAPP_NUMBER` - Business WhatsApp number (e.g. `923164095608`)

### Supabase Credentials

**Where to put them:** In the `.env` file at the project root (create from `.env.example` if needed).

**What to place for `DATABASE_URL`:**

1. Go to [Supabase Dashboard](https://supabase.com/dashboard) → your project → **Project Settings** (gear icon) → **Database**
2. Under "Connection string", select **URI** and copy the connection string
3. Choose:
   - **Session mode** (port 5432): For `db:push`, migrations, Prisma Studio
   - **Transaction mode** (port 6543): For serverless (Vercel, etc.) - add `?pgbouncer=true` if needed
4. Replace `[YOUR-PASSWORD]` with your database password (the one you set when creating the project, or reset it in Database settings)
5. Paste into `.env`:

```
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"
```

Example (with placeholder values):
```
DATABASE_URL="postgresql://postgres.abcdefghijk:mySecretPass123@aws-0-us-east-1.pooler.supabase.com:5432/postgres"
```

**Important:** Never commit `.env` to git (it's in `.gitignore`). Keep credentials secret.

## 2. Database Setup

```bash
# Push schema to Supabase (PostgreSQL)
npm run db:push

# Create initial admin user (admin@dorney.com / Admin123!)
npm run db:seed
```

## 3. Run the App

```bash
npm install
npm run dev
```

- Frontend: http://localhost:3000
- Admin panel: http://localhost:3000/admin

## 4. Adding Content

### Products
1. First create **Categories** in Admin → Categories
2. Then add **Products** in Admin → Products (select category, upload images via Cloudinary)

### Hero Slides
- Admin → Hero Slides → Add Slide
- Set `display_order` (0, 1, 2...) to control carousel order

### Orders
- **Order Online**: Customer fills cart, enters details, submits. Order is stored in Supabase.
- **Order on WhatsApp**: Opens WhatsApp with formatted message. No backend storage.

## 5. Admin Authentication

- Login at `/admin/login`
- JWT stored in httpOnly cookie
- To create more admins: insert into `admins` table (via Supabase SQL Editor or Prisma Studio) with bcrypt-hashed password

---

## 6. Vercel Deployment (Production)

### You do NOT need these

- `NEXT_PUBLIC_SUPABASE_URL` – only for Supabase Auth/Realtime client
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` – only for Supabase client SDK

This app uses **Prisma + Supabase PostgreSQL** (plain Postgres), not the Supabase JS client.

### What you need on Vercel

In Vercel: **Project → Settings → Environment Variables**, add:

| Variable | Required | Notes |
|----------|----------|-------|
| `DATABASE_URL` | Yes | See format below |
| `JWT_SECRET` | Yes | Same as local (min 32 chars) |
| `CLOUDINARY_API_KEY` | Yes | From Cloudinary dashboard |
| `CLOUDINARY_API_SECRET` | Yes | From Cloudinary dashboard |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Yes | From Cloudinary dashboard |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Yes | e.g. `923164095608` |
| `NEXT_PUBLIC_SITE_URL` | Yes | Your site URL, e.g. `https://your-app.vercel.app` |

### Critical: `DATABASE_URL` for Vercel

Vercel uses serverless functions, so you must use the **Transaction mode** (pooled) connection string, not Session mode.

1. Supabase Dashboard → **Project Settings** → **Database**
2. Under **Connection string**, choose **URI**
3. Select **Transaction** (port **6543**)
4. Copy the string and replace `[YOUR-PASSWORD]` with your DB password
5. Add `?pgbouncer=true` at the end

**Format:**
```
postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
```

**Example:**
```
postgresql://postgres.abcdefghijk:mySecretPass123@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

### Summary

| Environment | DATABASE_URL |
|-------------|--------------|
| Local dev | Session mode (port 5432) – works with Prisma Studio, migrations |
| Vercel (prod) | Transaction mode (port 6543) + `?pgbouncer=true` |

### After deployment

1. Redeploy after changing env vars.
2. Run `npm run db:push` and `npm run db:seed` from your machine if the DB is empty.
