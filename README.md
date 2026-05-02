# Muradovs_.smm

Premium SMM agentligi uchun Next.js App Router, TypeScript, Tailwind CSS, Prisma, PostgreSQL va NextAuth asosidagi public website + admin panel.

## Texnologiyalar

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- NextAuth credentials login
- Zod validation
- React Hook Form
- Image upload: `public/uploads`
- Dynamic metadata, `sitemap.xml`, `robots.txt`

## Ishga tushirish

1. Dependencylarni o'rnating:

```bash
npm install
```

2. `.env.example` faylidan `.env` yarating va qiymatlarni to'ldiring:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
NEXTAUTH_SECRET="long-random-secret"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="admin@muradovs.uz"
ADMIN_PASSWORD="strong-password"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

3. Prisma client va migratsiya:

```bash
npm run db:generate
npm run db:migrate
```

4. Boshlang'ich kontent va admin user yaratish:

```bash
npm run db:seed
```

5. Development server:

```bash
npm run dev
```

Public sayt: `http://localhost:3000`

Admin panel: `http://localhost:3000/admin`

## Admin imkoniyatlari

- Secure login/logout
- Dashboard statistikalar
- Lead status boshqaruvi
- Services CRUD
- Portfolio CRUD
- Pricing CRUD
- Blog CRUD
- Testimonials CRUD
- FAQ CRUD
- Site Settings CRUD
- Image upload

## Vercel deploy

1. Loyihani GitHub'ga push qiling.
2. Vercel'da yangi project import qiling.
3. PostgreSQL database yarating yoki mavjud `DATABASE_URL` ni ulang.
4. Environment variables qo'shing:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `NEXT_PUBLIC_SITE_URL`
5. Build command: `npm run build`
6. Deploydan keyin production migratsiya:

```bash
npm run db:deploy
npm run db:seed
```

Eslatma: Vercel serverless filesystem doimiy saqlash uchun mos emas. Production image upload uchun Vercel Blob, S3 yoki Cloudinary ulash tavsiya qilinadi. Hozirgi local upload development va oddiy VPS deployment uchun tayyor.
