import { createBrowserRouter } from 'react-router';
import { Splash } from './screens/Splash';
import { Onboarding } from './screens/Onboarding';
import { Login } from './screens/Login';
import { OTPVerification } from './screens/OTPVerification';
import { CourierApplication } from './screens/CourierApplication';
import { Dashboard } from './screens/Dashboard';
import { ActiveOrder } from './screens/ActiveOrder';
import { MapNavigation } from './screens/MapNavigation';
import { Earnings } from './screens/Earnings';
import { OrderHistory } from './screens/OrderHistory';
import { Notifications } from './screens/Notifications';
import { Profile } from './screens/Profile';
import { Support } from './screens/Support';
import { AdminLoginSelector } from './screens/AdminLoginSelector';
import { AdminLogin } from './screens/AdminLogin';
import { ShopLogin } from './screens/ShopLogin';
import { EmployeeLogin } from './screens/EmployeeLogin';
import { AdminDashboardNew } from './screens/AdminDashboardNew';
import { ShopDashboard } from './screens/ShopDashboard';
import { EmployeeDashboard } from './screens/EmployeeDashboard';

export const router = createBrowserRouter([
  { path: '/', element: <Splash /> },
  { path: '/onboarding', element: <Onboarding /> },
  { path: '/login', element: <Login /> },
  { path: '/otp', element: <OTPVerification /> },
  { path: '/apply', element: <CourierApplication /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/order/:id', element: <ActiveOrder /> },
  { path: '/map/:orderId', element: <MapNavigation /> },
  { path: '/earnings', element: <Earnings /> },
  { path: '/history', element: <OrderHistory /> },
  { path: '/notifications', element: <Notifications /> },
  { path: '/profile', element: <Profile /> },
  { path: '/support', element: <Support /> },
  { path: '/admin-selector', element: <AdminLoginSelector /> },
  { path: '/admin/login', element: <AdminLogin /> },
  { path: '/shop/login', element: <ShopLogin /> },
  { path: '/employee/login', element: <EmployeeLogin /> },
  { path: '/admin/dashboard', element: <AdminDashboardNew /> },
  { path: '/admin/dashboard-new', element: <AdminDashboardNew /> },
  { path: '/shop/dashboard', element: <ShopDashboard /> },
  { path: '/employee/dashboard', element: <EmployeeDashboard /> },
]);