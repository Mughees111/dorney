# Dorney FMCG E-Commerce - Setup Instructions

## 1. Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Required variables:
- `DATABASE_URL` - MySQL connection string (e.g. `mysql://user:pass@localhost:3306/dorney_db`)
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- `JWT_SECRET` - Random string, min 32 chars (e.g. `openssl rand -base64 32`)
- `NEXT_PUBLIC_WHATSAPP_NUMBER` - Business WhatsApp number (e.g. `923164095608`)

## 2. Database Setup

```bash
# Push schema to MySQL
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
- **Order Online**: Customer fills cart, enters details, submits. Order is stored in MySQL.
- **Order on WhatsApp**: Opens WhatsApp with formatted message. No backend storage.

## 5. Admin Authentication

- Login at `/admin/login`
- JWT stored in httpOnly cookie
- To create more admins: insert into `admins` table with bcrypt-hashed password
