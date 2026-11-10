import {
  CalendarCheck,
  Globe,
  LayoutDashboard,
  MousePointerClick,
  SearchCheck,
  ShoppingBag,
} from "lucide-react";
import { motion } from "motion/react";
import SectionHeading from "./section-heading.tsx";

const services = [
  {
    title: "Business Websites",
    description:
      "A polished home for your business that makes a strong first impression and turns visits into enquiries.",
    icon: Globe,
  },
  {
    title: "Landing Pages",
    description:
      "Focused, fast-loading pages built around one clear message and a confident next step.",
    icon: MousePointerClick,
  },
  {
    title: "E-commerce Stores",
    description:
      "A smooth storefront that helps customers discover your products and shop with confidence.",
    icon: ShoppingBag,
  },
  {
    title: "Booking Systems",
    description:
      "Make it easy for customers to find a time, book a service, and know what happens next.",
    icon: CalendarCheck,
  },
  {
    title: "Web Apps & Dashboards",
    description:
      "Useful, well-organised tools that bring your workflows and important information together.",
    icon: LayoutDashboard,
  },
  {
    title: "UI/UX Design & SEO",
    description:
      "Thoughtful design and search-friendly foundations that help the right people find you.",
    icon: SearchCheck,
  },
];

export default function Services() {
  return (
    <section id="services" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="01 — Services"
          title="Everything your business"
          highlight="needs online."
          description="From the first sketch to the final click, I build the digital pieces that help your business move forward."
        />
        <div className="grid grid-cols-1 gap-4 pt-12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-primary/50 hover:shadow-[0_16px_44px_-20px] hover:shadow-primary/35 sm:p-7"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-accent text-primary transition-transform duration-300 group-hover:rotate-[-4deg] group-hover:scale-105">
                  <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
                </div>
                <h3 className="pt-6 font-display text-xl font-semibold tracking-tight">
                  {service.title}
                </h3>
                <p className="pt-2 text-sm leading-6 text-muted-foreground">
                  {service.description}
                </p>
                <div className="pt-5">
                  <span className="inline-flex h-1 w-9 rounded-full bg-primary/40 transition-all duration-300 group-hover:w-14 group-hover:bg-primary" />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
