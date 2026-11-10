export type Plan = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  monthly: number;
  priceSuffix?: string;
  delivery: string;
  popular?: boolean;
  features: string[];
};

/** All prices in Indian Rupees. Every project needs 50% advance before work starts. */
export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Small businesses ke liye perfect first website",
    price: 12000,
    monthly: 800,
    delivery: "2-3 days",
    features: [
      "Up to 5 pages",
      "Mobile friendly design",
      "WhatsApp chat button",
      "Contact form",
      "Basic SEO setup",
      "Free hosting setup",
    ],
  },
  {
    id: "business",
    name: "Business",
    tagline: "Growing brands ke liye professional website",
    price: 18000,
    monthly: 1100,
    delivery: "3-5 days",
    features: [
      "Up to 8 pages",
      "Smooth animations",
      "Google Maps + reviews",
      "Gallery and services pages",
      "On-page SEO",
      "Speed optimisation",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Premium look, animations aur full branding",
    price: 25000,
    monthly: 1500,
    delivery: "5-7 days",
    popular: true,
    features: [
      "Up to 12 pages",
      "Custom premium animations",
      "Blog / updates section",
      "Lead capture forms",
      "Advanced SEO",
      "Analytics setup",
    ],
  },
  {
    id: "booking",
    name: "Booking System",
    tagline: "Salon, clinic, gym ke liye online booking",
    price: 35000,
    monthly: 2000,
    delivery: "7-10 days",
    features: [
      "Everything in Premium",
      "Online appointment booking",
      "Time slots and calendar",
      "Admin panel",
      "Customer notifications",
      "Booking reports",
    ],
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    tagline: "Apna online store, products aur orders",
    price: 45000,
    monthly: 2500,
    delivery: "10-14 days",
    features: [
      "Unlimited products",
      "Cart and checkout",
      "Online payments",
      "Order management panel",
      "Coupons and offers",
      "Inventory tracking",
    ],
  },
  {
    id: "webapp",
    name: "Custom Web App",
    tagline: "Dashboards, portals aur custom software",
    price: 60000,
    monthly: 3500,
    priceSuffix: "+",
    delivery: "2-4 weeks",
    features: [
      "Fully custom features",
      "User login and accounts",
      "Database and admin dashboard",
      "Roles and permissions",
      "API integrations",
      "Priority support",
    ],
  },
];

export const MONTHLY_INCLUDES = [
  "Hosting aur domain management",
  "Security updates and backups",
  "Small text / image changes",
  "Speed and uptime monitoring",
];

export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** 50% advance, rounded to the nearest rupee. */
export function advanceAmount(price: number): number {
  return Math.round(price / 2);
}
