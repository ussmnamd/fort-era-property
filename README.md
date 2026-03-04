# Luxury Real Estate Lahore

A premium boutique real estate web application for property advisory in Lahore, Pakistan.

## Overview

This is a complete, production-ready luxury real estate platform built with Next.js 14 and Strapi CMS. It features a sophisticated design system, comprehensive property listings, lead capture, and SEO optimization.

## Features

- **Elegant Design**: Deep Navy (#0B1829), Muted Gold (#B8960C), Warm White (#FAF8F5)
- **Property Listings**: Browse properties with advanced filtering
- **Society Pages**: Explore properties by area (DHA, Bahria Town, Gulberg)
- **Lead Capture**: Contact forms with validation and rate limiting
- **WhatsApp Integration**: One-click WhatsApp messaging
- **SEO Optimized**: Sitemap, robots.txt, structured data
- **Responsive Design**: Mobile-first approach
- **Animations**: Smooth Framer Motion transitions

## Tech Stack

### Frontend

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React (icons)
- Zod (validation)

### Backend

- Strapi v4 (Headless CMS)
- PostgreSQL (Database)
- Cloudinary (Media Storage)

## Project Structure

```
/
├── frontend/          # Next.js application
│   ├── app/          # App Router pages
│   ├── components/   # React components
│   ├── lib/          # Utilities and types
│   └── public/       # Static assets
├── backend/          # Strapi CMS (to be set up)
└── .env.example      # Environment variables template
```

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL (for Strapi)

### Frontend Setup

1. Install dependencies:

```bash
cd frontend
npm install
```

1. Create `.env.local`:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_READ_TOKEN=your_read_token
NEXT_PUBLIC_WHATSAPP_NUMBER=923001234567
```

1. Run development server:

```bash
npm run dev
```

### Strapi Backend Setup

1. Create Strapi project:

```bash
cd backend
npx create-strapi-app@latest . --quickstart
```

1. Configure database in `.env`:

```env
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=strapi_realestate
DATABASE_USERNAME=strapi_user
DATABASE_PASSWORD=your_password
```

1. Create content types (see Content Types section below)

2. Generate API tokens for frontend access

## Content Types

### Property

- title (string)
- slug (uid)
- featuredImage (media)
- gallery (media, multiple)
- price (decimal)
- priceType (enumeration: fixed, negotiable, on-request)
- society (relation)
- phase (string)
- propertyType (enumeration)
- sizeValue (decimal)
- sizeUnit (enumeration)
- bedrooms (integer)
- bathrooms (integer)
- description (richtext)
- investmentHighlights (richtext)
- status (enumeration)
- featured (boolean)
- coordinates (json)

### Society

- name (string)
- slug (uid)
- coverImage (media)
- overview (richtext)
- investmentInsight (richtext)
- familyInsight (richtext)
- averagePricePerMarla (decimal)
- appreciationPercent (decimal)
- mapEmbed (string)
- featured (boolean)

### Testimonial

- clientName (string)
- location (string)
- review (text)
- photo (media)
- featured (boolean)

### Lead

- fullName (string)
- email (email)
- phone (string)
- inquiryType (enumeration)
- message (text)
- buyerType (enumeration)
- source (string)
- propertyReference (relation)

## Security Features

- Rate limiting on form submissions
- Input sanitization
- CORS configuration
- Environment variables for secrets
- CSRF protection
- API token-based authentication

## Deployment

### Vercel (Frontend)

1. Connect GitHub repository to Vercel
2. Set environment variables
3. Deploy

### DigitalOcean (Strapi + PostgreSQL)

1. Create Droplet
2. Install Node.js, PostgreSQL, PM2
3. Deploy Strapi with PM2
4. Configure Nginx reverse proxy
5. Set up SSL with Certbot

## Environment Variables

See `.env.example` for complete list of required variables.

## License

Private - Client Deliverable

## Support

For technical support, contact the development team.
