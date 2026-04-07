// ─── JETGO GERÇEK AUTH SİSTEMİ ─────────────────────────────────────

export interface CourierUser {
  id: string; email: string; password: string; name: string; phone: string;
  vehicle: string; status: 'active'|'suspended'|'pending'; isOnline: boolean;
  rating: number; totalDeliveries: number; createdAt: string;
}

export interface SMTPConfig {
  serviceId: string; templateId: string; publicKey: string; enabled: boolean;
}

export function getSMTPConfig(): SMTPConfig {
  return JSON.parse(localStorage.getItem('jetgo_smtp') || '{"serviceId":"","templateId":"","publicKey":"","enabled":false}');
}

export async function sendVerificationEmail(email: string, code: string, name: string): Promise<boolean> {
  const config = getSMTPConfig();
  if (config.enabled && config.serviceId && config.publicKey) {
    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: config.serviceId,
          template_id: config.templateId,
          user_id: config.publicKey,
          template_params: { to_email: email, to_name: name, verification_code: code, app_name: 'Jetgo Kurye' },
        }),
      });
      return res.ok;
    } catch {}
  }
  console.log(`📧 [JETGO] Doğrulama kodu → ${email}: ${code}`);
  return true;
}

export function generateCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export const courierAuth = {
  register(data: { email: string; password: string; name: string; phone: string; vehicle: string; }): CourierUser {
    const couriers: CourierUser[] = JSON.parse(localStorage.getItem('jetgo_couriers') || '[]');
    if (couriers.find((c) => c.email === data.email)) throw new Error('Bu e-posta zaten kayıtlı');
    const c: CourierUser = {
      id: `KRY-${String(Date.now()).slice(-6)}`, ...data,
      status: 'pending', isOnline: false, rating: 5.0, totalDeliveries: 0,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem('jetgo_couriers', JSON.stringify([...couriers, c]));
    return c;
  },

  login(email: string, password: string): CourierUser | null {
    const couriers: CourierUser[] = JSON.parse(localStorage.getItem('jetgo_couriers') || '[]');
    return couriers.find((c) => c.email === email && c.password === password && c.status === 'active') || null;
  },

  getCurrent(): CourierUser | null {
    const id = localStorage.getItem('jetgo_courier_id');
    if (!id) return null;
    return (JSON.parse(localStorage.getItem('jetgo_couriers') || '[]') as CourierUser[]).find((c) => c.id === id) || null;
  },

  setSession(courier: CourierUser) {
    localStorage.setItem('jetgo_courier_id', courier.id);
    localStorage.setItem('courierName', courier.name);
    localStorage.setItem('isLoggedIn', 'true');
  },

  logout() {
    ['jetgo_courier_id','courierName','isLoggedIn','jetgo_otp'].forEach((k) => localStorage.removeItem(k));
  },

  isLoggedIn(): boolean { return localStorage.getItem('isLoggedIn') === 'true'; },

  updateOnlineStatus(isOnline: boolean) {
    const id = localStorage.getItem('jetgo_courier_id');
    if (!id) return;
    const couriers: CourierUser[] = JSON.parse(localStorage.getItem('jetgo_couriers') || '[]');
    localStorage.setItem('jetgo_couriers', JSON.stringify(couriers.map((c) => c.id === id ? { ...c, isOnline } : c)));
  },

  getAllCouriers(): CourierUser[] {
    return JSON.parse(localStorage.getItem('jetgo_couriers') || '[]');
  },

  approveApplication(applicationId: number) {
    const apps = JSON.parse(localStorage.getItem('courierApplications') || '[]');
    const app = apps.find((a: any) => a.id === applicationId);
    if (!app) return;
    const couriers: CourierUser[] = JSON.parse(localStorage.getItem('jetgo_couriers') || '[]');
    const exists = couriers.find((c) => c.email === app.email);
    if (!exists) {
      couriers.push({
        id: `KRY-${String(couriers.length + 1).padStart(3,'0')}`,
        email: app.email, password: app.password || 'jetgo123',
        name: app.fullName, phone: app.phone, vehicle: app.vehicleType,
        status: 'active', isOnline: false, rating: 5.0, totalDeliveries: 0,
        createdAt: new Date().toISOString(),
      });
    } else {
      const idx = couriers.indexOf(exists);
      couriers[idx] = { ...exists, status: 'active' };
    }
    localStorage.setItem('jetgo_couriers', JSON.stringify(couriers));
    localStorage.setItem('courierApplications', JSON.stringify(
      apps.map((a: any) => a.id === applicationId ? { ...a, status: 'approved' } : a)
    ));
  },
};

export const adminAuth = {
  getAdmins() {
    return JSON.parse(localStorage.getItem('jetgo_admins') || JSON.stringify([
      { email: 'admin@jetgo.com', password: 'jetgo2024', role: 'admin', name: 'Süper Admin' },
      { email: 'calisan@jetgo.com', password: 'calisan2024', role: 'employee', name: 'Destek Çalışanı' },
    ]));
  },
  login(email: string, password: string, role: 'admin'|'employee'): boolean {
    const found = this.getAdmins().find((a: any) => a.email === email && a.password === password && a.role === role);
    if (found) {
      localStorage.setItem('adminRole', found.role);
      localStorage.setItem('adminEmail', found.email);
      localStorage.setItem('adminName', found.name);
      return true;
    }
    return false;
  },
  isLoggedIn(): boolean { return !!localStorage.getItem('adminRole'); },
  getRole(): string { return localStorage.getItem('adminRole') || ''; },
  logout() { ['adminRole','adminEmail','adminName'].forEach((k) => localStorage.removeItem(k)); },
};

export interface Order {
  id: string; shopId: number; shopName: string; shopAddress: string; shopPhone: string;
  customerName: string; customerAddress: string; customerPhone: string;
  items: { name: string; quantity: number; price: number }[];
  totalPrice: number; courierEarning: number; paymentMethod: 'cash'|'card'|'online';
  status: 'new'|'accepted'|'picked'|'delivered'|'cancelled';
  courierId: string|null; distance: string; notes: string;
  createdAt: string; acceptedAt?: string; deliveredAt?: string;
}

export const orderStore = {
  getAll(): Order[] { return JSON.parse(localStorage.getItem('jetgo_orders') || '[]'); },
  getNew(): Order[] { return this.getAll().filter((o) => o.status === 'new' && !o.courierId); },
  getActive(courierId: string): Order[] {
    return this.getAll().filter((o) => o.courierId === courierId && ['accepted','picked'].includes(o.status));
  },
  create(order: Omit<Order,'id'|'createdAt'|'status'|'courierId'>): Order {
    const orders = this.getAll();
    const newOrder: Order = { ...order, id: `SIP-${Date.now()}`, status: 'new', courierId: null, createdAt: new Date().toISOString() };
    orders.push(newOrder);
    localStorage.setItem('jetgo_orders', JSON.stringify(orders));
    const active = JSON.parse(localStorage.getItem('activeOrders') || '[]');
    active.push({ ...newOrder, restaurant: newOrder.shopName, restaurantAddress: newOrder.shopAddress, restaurantPhone: newOrder.shopPhone });
    localStorage.setItem('activeOrders', JSON.stringify(active));
    return newOrder;
  },
  accept(orderId: string, courierId: string): void {
    const orders = this.getAll().map((o) => o.id === orderId ? { ...o, status: 'accepted' as const, courierId, acceptedAt: new Date().toISOString() } : o);
    localStorage.setItem('jetgo_orders', JSON.stringify(orders));
    localStorage.setItem('activeOrders', JSON.stringify(
      JSON.parse(localStorage.getItem('activeOrders')||'[]').map((o: any) => o.id === orderId ? { ...o, status: 'accepted', courierId } : o)
    ));
  },
  deliver(orderId: string): void {
    const orders = this.getAll().map((o) => o.id === orderId ? { ...o, status: 'delivered' as const, deliveredAt: new Date().toISOString() } : o);
    localStorage.setItem('jetgo_orders', JSON.stringify(orders));
    const courierId = orders.find((o) => o.id === orderId)?.courierId;
    if (courierId) {
      const couriers: CourierUser[] = JSON.parse(localStorage.getItem('jetgo_couriers') || '[]');
      localStorage.setItem('jetgo_couriers', JSON.stringify(couriers.map((c) => c.id === courierId ? { ...c, totalDeliveries: c.totalDeliveries + 1 } : c)));
    }
  },
  reassign(orderId: string, newCourierId: string): void {
    localStorage.setItem('jetgo_orders', JSON.stringify(this.getAll().map((o) => o.id === orderId ? { ...o, courierId: newCourierId } : o)));
  },
  getStats() {
    const all = this.getAll();
    return {
      total: all.length,
      delivered: all.filter((o) => o.status === 'delivered').length,
      active: all.filter((o) => ['accepted','picked'].includes(o.status)).length,
      new: all.filter((o) => o.status === 'new').length,
      totalRevenue: all.filter((o) => o.status === 'delivered').reduce((s, o) => s + o.totalPrice, 0),
    };
  },
};
