# Courier Delivery App - Complete System

## 🚀 Overview
Professional mobile courier delivery app with comprehensive admin panel system. Built with React, TypeScript, Tailwind CSS, and Framer Motion.

## 📱 Features

### Courier App (Mobile)
- **11 Complete Screens:**
  - Splash & Onboarding
  - Login & OTP Verification
  - Dashboard with availability toggle
  - Incoming order notifications with countdown
  - Active order tracking (step-by-step)
  - **Embedded map navigation** (Leaflet/OpenStreetMap)
  - Earnings dashboard with charts
  - Order history
  - Notifications center
  - Profile & settings
  - Support & help chat

- **Courier Application System:**
  - Multi-step application form
  - Personal info, vehicle details, documents
  - Image upload for driver's license, registration, etc.
  - Location preference selection

### Admin Panel (Web)
**3-Tier Login System:**

#### 1. Admin Dashboard
- Full system access
- Review & approve/reject courier applications
- View all uploaded documents
- Monitor active couriers
- Add shops (email, phone, password)
- **Create test orders** for testing
- Real-time courier tracking

#### 2. Shop Owner Dashboard
- Monthly analytics & statistics
- Order count & revenue tracking
- Weekly distribution charts
- Performance metrics
- Success rate monitoring
- Revenue breakdown

#### 3. Employee Dashboard
- Review courier applications
- Approve/reject applications
- **Live support system** with severity prioritization
- Support ticket management
- Avg response time tracking

## 🎨 Design System
- **Colors:** Yellow (#FFD600) & Black (#121212)
- **8px Grid System**
- **Rounded corners:** 12-16px
- **Motion animations** throughout
- **One-hand operation** optimized
- Battery-friendly UI

## 🗺️ Map Features
- **Embedded navigation** (no external apps)
- Real-time route visualization
- Restaurant & customer markers
- Distance & time estimates
- Interactive map with popups

## 🔗 Routes

### Courier App
- `/` - Splash screen
- `/onboarding` - Onboarding slides
- `/login` - Phone login
- `/otp` - OTP verification
- `/apply` - Courier application form
- `/dashboard` - Main dashboard
- `/order/:id` - Active order tracking
- `/earnings` - Earnings dashboard
- `/history` - Order history
- `/notifications` - Notifications
- `/profile` - Profile settings
- `/support` - Support & help

### Admin Panel
- `/admin-selector` - Role selection page
- `/admin/login` - Admin login
- `/shop/login` - Shop owner login
- `/employee/login` - Employee login
- `/admin/dashboard` - Admin dashboard
- `/shop/dashboard` - Shop dashboard
- `/employee/dashboard` - Employee dashboard

## 🧪 Testing
1. Open `/admin/login` and login as admin
2. Create a test order in Admin Dashboard
3. Go to courier app `/dashboard`
4. Toggle online to receive the test order
5. Accept order and test embedded navigation
6. Complete delivery flow

## 🔒 Mock Data Storage
Uses localStorage for demonstration:
- `courierApplications` - Application submissions
- `activeOrders` - Test orders
- `shops` - Registered shops
- `adminRole` - Current admin role

## 📦 Key Dependencies
- React Router 7 (Data mode)
- Framer Motion / Motion
- Leaflet & React-Leaflet
- Recharts
- Radix UI components
- Lucide React icons
- React Hook Form
- Sonner (toast notifications)

## 🎯 Next Steps Suggestions
- Connect to Supabase for real backend
- Add WebSocket for real-time updates
- Implement actual SMS OTP service
- Add payment gateway integration
- Deploy with proper authentication

## 💡 Notes
This is a **frontend prototype** with mock data. For production:
- Requires backend API for authentication
- Needs database for persistent storage
- Should implement secure file upload service
- Add proper role-based access control (RBAC)
