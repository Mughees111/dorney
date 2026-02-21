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
