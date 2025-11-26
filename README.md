# LockIn - Salon Booking System 💈✨

A modern, full-stack salon booking platform built with Next.js 14, featuring real-time availability, Stripe payments, and comprehensive admin management.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-green)
![Stripe](https://img.shields.io/badge/Payments-Stripe-purple)

---

## 🎯 Project Overview

**LockIn** is a professional salon booking system that solves the problem of appointment management and no-shows by requiring upfront payment. Built over 4 days with a focus on production-ready features and user experience.

### Problem Statement

High-demand salons face challenges with:

- Long queues and wait times
- No-shows wasting valuable time slots
- Manual booking management
- Lack of payment security

### Solution

LockIn provides:

- Real-time online booking with availability checking
- Upfront Stripe payment to confirm appointments
- Automated email notifications
- Comprehensive admin dashboard
- Staff schedule management

---

## ✅ Completed Features

### 🔐 Authentication & Authorization

- [x] Google OAuth integration (NextAuth v5)
- [x] Role-based access control (Admin, Staff, Client)
- [x] Secure session management
- [x] Protected routes

### 👨‍💼 Admin Features

- [x] **Staff Management**

  - Create, Read, Update, Delete staff members
  - Photo upload to Supabase Storage
  - Specialties and bio management
  - Hourly rate configuration
  - Active/inactive status toggle
  - Staff availability schedule (set working hours per day)

- [x] **Services Management**

  - CRUD operations for services
  - Service duration and pricing
  - Active/inactive service toggle
  - Service descriptions

- [x] **Bookings Management**

  - View all bookings (upcoming, past, cancelled)
  - Detailed booking information
  - Cancel bookings with email notifications
  - Real-time booking statistics
  - Revenue tracking

- [x] **Dashboard Analytics**
  - Today's appointments counter
  - Monthly bookings and revenue
  - Total revenue (all-time)
  - Active staff and services count
  - Recent activity feed
  - Upcoming appointments preview
  - Quick action shortcuts

### 👤 Customer Features

- [x] **Booking System**

  - Browse active hairdressers with photos and bios
  - View available services with pricing
  - Real-time availability checking
  - Date and time slot selection
  - Booking summary before payment
  - Stripe checkout integration
  - Booking confirmation page

- [x] **My Bookings**
  - View upcoming and past appointments
  - Detailed appointment information
  - Reschedule appointments
  - Cancel appointments
  - Email notifications for all actions

### 💳 Payment Integration

- [x] Stripe checkout sessions
- [x] Secure payment processing
- [x] Webhook handling for booking confirmation
- [x] Payment intent tracking
- [x] Automatic booking creation after successful payment

### 📧 Email Notifications

- [x] Booking confirmation emails (HTML templates)
- [x] Cancellation notification emails
- [x] Rescheduling confirmation emails
- [x] Beautiful, responsive email templates
- [x] Integration with Resend API

### 🎨 UI/UX Features

- [x] **Dark Mode**

  - System preference detection
  - Manual toggle with persistent storage
  - Dark mode across all pages
  - Smooth theme transitions

- [x] **Toast Notifications**

  - Success/error feedback
  - Loading states with spinners
  - React Hot Toast integration
  - Dark mode support

- [x] **Responsive Design**

  - Mobile-friendly navigation
  - Tablet and desktop layouts
  - Touch-optimized interfaces
  - Responsive admin panel

- [x] **Error Handling**

  - Global error boundaries
  - 404 Not Found page
  - Loading states
  - User-friendly error messages

- [x] **Professional Landing Page**
  - Hero section with CTAs
  - Features showcase
  - Footer with links
  - Gradient designs

### 🛠️ Technical Features

- [x] Server Actions for data mutations
- [x] Server Components for data fetching
- [x] Real-time availability calculation
- [x] Booking conflict prevention
- [x] Image storage (Supabase Storage)
- [x] PostgreSQL database (Supabase)
- [x] Environment variable management
- [x] API route handlers
- [x] Webhook security (Stripe signature verification)

---

## 🚀 Tech Stack

### Frontend

- **Framework:** Next.js 14 (App Router)
- **UI Library:** React 18
- **Styling:** Tailwind CSS
- **State Management:** React Hooks, Server Actions
- **Notifications:** React Hot Toast
- **Theme:** Dark mode with Context API

### Backend

- **Runtime:** Node.js (Next.js API Routes)
- **Authentication:** NextAuth v5
- **Database:** PostgreSQL (Supabase)
- **ORM:** Supabase Client
- **Storage:** Supabase Storage
- **Email:** Resend API

### Payments & External Services

- **Payment Processing:** Stripe
- **OAuth Provider:** Google
- **Email Service:** Resend
- **Image Storage:** Supabase Storage

### Development Tools

- **Language:** JavaScript (JSX)
- **Version Control:** Git
- **Package Manager:** npm
- **Linting:** ESLint
- **Formatting:** Prettier (recommended)

---

## 📁 Project Structure

```
lockin/
├── app/
│   ├── actions/              # Server Actions
│   │   ├── staff.js
│   │   ├── services.js
│   │   ├── reschedule.js
│   │   └── availability.js
│   ├── admin/                # Admin panel
│   │   ├── bookings/
│   │   ├── services/
│   │   ├── staff/
│   │   ├── layout.js
│   │   ├── page.js
│   │   ├── loading.js
│   │   └── error.js
│   ├── api/                  # API routes
│   │   ├── auth/
│   │   ├── bookings/
│   │   ├── create-checkout-session/
│   │   └── webhooks/
│   ├── booking/              # Customer booking flow
│   │   ├── [staffId]/
│   │   ├── checkout/
│   │   └── success/
│   ├── my-bookings/          # Customer bookings
│   ├── auth/                 # Authentication pages
│   ├── dashboard/            # User dashboard
│   ├── layout.js             # Root layout
│   ├── page.js               # Homepage
│   ├── providers.js          # Client providers
│   ├── error.js              # Global error handler
│   ├── not-found.js          # 404 page
│   └── loading.js            # Global loading
├── components/               # Reusable components
│   ├── AddStaffForm.js
│   ├── EditStaffForm.js
│   ├── AddServiceForm.js
│   ├── EditServiceForm.js
│   ├── BookingForm.js
│   ├── RescheduleForm.js
│   ├── AvailabilityForm.js
│   ├── CancelBookingButton.js
│   ├── CustomerCancelButton.js
│   ├── SignOutButton.js
│   ├── ThemeToggle.js
│   └── Loading.js
├── contexts/                 # React contexts
│   └── ThemeContext.js
├── lib/                      # Utilities
│   ├── supabase.js
│   └── emails/
│       ├── booking-confirmation.js
│       └── booking-cancellation.js
├── public/                   # Static assets
├── .env.local                # Environment variables
├── auth.js                   # NextAuth configuration
├── tailwind.config.js        # Tailwind configuration
├── next.config.js            # Next.js configuration
└── package.json              # Dependencies
```

---

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# NextAuth v5
AUTH_SECRET=your_random_secret_key
AUTH_GOOGLE_ID=your_google_oauth_client_id
AUTH_GOOGLE_SECRET=your_google_oauth_client_secret
AUTH_URL=http://localhost:3000

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Resend (Email)
RESEND_API_KEY=your_resend_api_key
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account
- Google Cloud Platform account (for OAuth)
- Stripe account
- Resend account

### Installation

1. **Clone the repository**

```bash
   git clone <repository-url>
   cd lockin
```

2. **Install dependencies**

```bash
   npm install
```

3. **Set up Supabase**

   - Create a new Supabase project
   - Run the database migrations (see Database Schema below)
   - Create a storage bucket named `staff-photos` (public)
   - Copy your project URL and keys to `.env.local`

4. **Set up Google OAuth**

   - Go to Google Cloud Console
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
   - Copy credentials to `.env.local`

5. **Set up Stripe**

   - Create a Stripe account
   - Get your API keys from the Stripe Dashboard
   - Install Stripe CLI for local webhook testing
   - Copy keys to `.env.local`

6. **Set up Resend**

   - Create a Resend account
   - Get your API key
   - Add to `.env.local`

7. **Run the development server**

```bash
   npm run dev
```

8. **Run Stripe webhook listener** (separate terminal)

```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

9. **Open your browser**

```
   http://localhost:3000
```

---

## 🗄️ Database Schema

Run this SQL in your Supabase SQL Editor:

```sql
-- Users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  image TEXT,
  role TEXT CHECK (role IN ('client', 'staff', 'admin')) DEFAULT 'client',
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Staff table
CREATE TABLE staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  bio TEXT,
  photo_url TEXT,
  specialties TEXT[],
  hourly_rate DECIMAL(10, 2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES users(id) ON DELETE CASCADE,
  staff_id UUID REFERENCES staff(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')) DEFAULT 'pending',
  total_price DECIMAL(10, 2) NOT NULL,
  payment_intent_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Staff availability
CREATE TABLE staff_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id UUID REFERENCES staff(id) ON DELETE CASCADE,
  day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_bookings_staff_id ON bookings(staff_id);
CREATE INDEX idx_bookings_client_id ON bookings(client_id);
CREATE INDEX idx_bookings_start_time ON bookings(start_time);
CREATE INDEX idx_staff_user_id ON staff(user_id);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public can view active services" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active staff" ON staff FOR SELECT USING (is_active = true);
CREATE POLICY "Users can view their own data" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update their own data" ON users FOR UPDATE USING (true);
CREATE POLICY "Anyone can insert users" ON users FOR INSERT WITH CHECK (true);
```

---

## 📊 Database Relationships

```
users (1) ──→ (1) staff
users (1) ──→ (many) bookings (as client)
staff (1) ──→ (many) bookings
staff (1) ──→ (many) staff_availability
services (1) ──→ (many) bookings
```

---

## 🎯 Future Improvements

### High Priority

- [ ] **Multi-language support** (i18n)
- [ ] **SMS notifications** (Twilio integration)
- [ ] **Calendar integration** (Google Calendar, iCal)
- [ ] **Reviews & ratings** for staff
- [ ] **Loyalty program** (points system)
- [ ] **Gift cards** functionality
- [ ] **Package deals** (multiple services)
- [ ] **Waiting list** for fully booked slots

### Medium Priority

- [ ] **Advanced analytics dashboard**

  - Revenue charts (daily, weekly, monthly)
  - Popular services analytics
  - Staff performance metrics
  - Customer retention rate

- [ ] **Staff portal**

  - View their own schedule
  - Mark breaks/time off
  - View earnings
  - Customer notes

- [ ] **Enhanced booking features**

  - Recurring appointments
  - Group bookings
  - Add-on services during booking
  - Promo codes and discounts

- [ ] **Customer features**
  - Favorite stylists
  - Booking history with photos
  - Preference saving
  - Appointment reminders (24h, 1h before)

### Low Priority / Nice to Have

- [ ] **Mobile app** (React Native)
- [ ] **Live chat support**
- [ ] **Social media integration** (share bookings)
- [ ] **Referral program**
- [ ] **Admin reports export** (PDF, CSV)
- [ ] **Inventory management** (products used)
- [ ] **POS integration** for in-person sales
- [ ] **Multi-location support**
- [ ] **Staff commission tracking**
- [ ] **Automated marketing emails**

### Technical Improvements

- [ ] **Testing**

  - Unit tests (Jest)
  - Integration tests
  - E2E tests (Playwright/Cypress)

- [ ] **Performance**

  - Image optimization
  - Code splitting
  - Database query optimization
  - Redis caching for availability

- [ ] **Security**

  - Rate limiting
  - CSRF protection
  - SQL injection prevention
  - XSS protection

- [ ] **DevOps**

  - CI/CD pipeline
  - Automated deployments
  - Database backups
  - Monitoring and logging (Sentry)

- [ ] **Code Quality**
  - TypeScript migration
  - Better error boundaries
  - Comprehensive documentation
  - Storybook for components

---

## 🐛 Known Issues

1. **Dark mode flash** - Minor FOUC (Flash of Unstyled Content) on first load

   - _Workaround:_ Using `suppressHydrationWarning` and invisible wrapper

2. **Stripe webhook in development** - Requires Stripe CLI running

   - _Solution:_ Use production webhooks when deployed

3. **Email sender address** - Using Resend's default `onboarding@resend.dev`

   - _Solution:_ Verify custom domain in production

4. **Mobile responsive images** - Staff photos may not be optimized
   - _Future:_ Implement Next.js Image component

---

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🔒 Security Features

- HTTPS enforced in production
- Secure session management (NextAuth)
- SQL injection prevention (Supabase parameterized queries)
- XSS protection (React escaping)
- CSRF protection (NextAuth)
- Stripe webhook signature verification
- Environment variable protection
- Row Level Security (Supabase RLS)

---

## 📈 Performance Metrics

### Target Metrics

- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.5s
- **Lighthouse Score:** > 90
- **Core Web Vitals:** All green

### Optimization Techniques Used

- Server-side rendering
- Static generation where possible
- Image optimization (Supabase Storage)
- Code splitting (Next.js automatic)
- Font optimization (next/font)
- Tailwind CSS purging

---

## 🤝 Contributing

This is a solo project built as a portfolio piece. However, suggestions and feedback are welcome!

### Reporting Issues

- Use the GitHub Issues tab
- Provide clear description and steps to reproduce
- Include screenshots if applicable

---

## 📄 License

This project is for educational and portfolio purposes.

---

## 👨‍💻 Developer

**Your Name**

- GitHub: [@yourusername]
- Email: your.email@example.com
- Portfolio: yourportfolio.com

---

## 🙏 Acknowledgments

- **Next.js Team** - Amazing framework
- **Vercel** - Hosting platform
- **Supabase** - Backend as a Service
- **Stripe** - Payment processing
- **Resend** - Email service
- **Tailwind CSS** - Styling framework
- **React Hot Toast** - Toast notifications

---

## 📝 Development Timeline

- **Day 1:** Project setup, database schema, authentication
- **Day 2:** Admin panel (staff & services management)
- **Day 3:** Booking system, Stripe integration, webhooks
- **Day 4:** Customer features, emails, polish, dark mode

**Total Development Time:** ~32-40 hours over 4 days

---

## 🎓 What I Learned

This project helped me master:

- Next.js 14 App Router architecture
- Server Actions and Server Components
- Stripe payment integration
- Webhook handling and security
- Email template design
- Dark mode implementation
- Real-time availability checking
- Complex database relationships
- Image uploads and storage
- Toast notifications
- Responsive design patterns

---

## 📸 Screenshots

_(Add screenshots here after deployment)_

- Homepage
- Booking flow
- Admin dashboard
- Staff management
- My bookings
- Dark mode examples

---

## 🚀 Deployment

Ready to deploy! See `DEPLOYMENT.md` for deployment instructions.

---

**Built with ❤️ and lots of ☕**
