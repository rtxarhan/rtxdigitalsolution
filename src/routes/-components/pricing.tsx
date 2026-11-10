import { motion } from "motion/react";
import {
  ArrowRight,
  Check,
  Clock3,
  ClipboardCheck,
  Rocket,
  ShieldCheck,
  Wallet,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { advanceAmount, formatInr, MONTHLY_INCLUDES, PLANS } from "@/lib/plans.ts";
import { whatsappLink } from "@/lib/site.ts";
import SectionHeading from "./section-heading.tsx";

const paymentSteps = [
  {
    number: "01",
    title: "Pay 50% advance",
    description: "Your project is booked once the advance is paid.",
    icon: Wallet,
  },
  {
    number: "02",
    title: "Design & build",
    description: "I create your site and share progress along the way.",
    icon: Wrench,
  },
  {
    number: "03",
    title: "Approve & pay remaining 50%",
    description: "Review the finished website before the final payment.",
    icon: ClipboardCheck,
  },
  {
    number: "04",
    title: "Go live + monthly plan",
    description: "Your site launches and monthly care begins.",
    icon: Rocket,
  },
];

const careIcons = [ShieldCheck, Wrench, Check, Clock3];

export default function Pricing() {
  return (
    <section id="pricing" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="04 — Pricing"
          title="Simple plans,"
          highlight="honest prices."
          description="One-time website price + small monthly care plan. Start with just 50% advance."
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto mt-10 flex max-w-4xl items-start gap-4 rounded-2xl border border-primary/20 bg-accent p-5 text-accent-foreground sm:items-center sm:p-6"
        >
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <ShieldCheck className="size-6" aria-hidden="true" />
          </span>
          <div>
            <p className="font-display text-lg font-bold">A 50% advance is compulsory to begin</p>
            <p className="pt-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
              50% advance payment is required to start every project. Remaining 50% after the website is complete and approved.
            </p>
          </div>
          <Wallet className="ml-auto hidden size-8 shrink-0 text-primary sm:block" aria-hidden="true" />
        </motion.div>

        <div className="grid grid-cols-1 gap-5 pt-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {PLANS.map((plan, index) => (
            <motion.article
              key={plan.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
              className={`relative flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg sm:p-7 ${
                plan.popular
                  ? "border-primary/40 bg-primary/5 ring-2 ring-primary lg:scale-[1.02]"
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-primary-foreground">
                  Most Popular
                </span>
              )}

              <div className="flex-1">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {plan.name}
                </p>
                <p className="min-h-12 pt-2 text-sm leading-relaxed text-muted-foreground">
                  {plan.tagline}
                </p>

                <div className="flex items-end gap-1 pt-5">
                  <span className="font-display text-4xl font-bold tracking-tight sm:text-[2.7rem]">
                    {formatInr(plan.price)}
                  </span>
                  {plan.priceSuffix && (
                    <span className="pb-1 font-display text-2xl font-semibold text-primary">
                      {plan.priceSuffix}
                    </span>
                  )}
                </div>
                <p className="pt-1 font-mono text-[11px] uppercase tracking-[0.17em] text-muted-foreground">
                  one-time
                </p>

                <div className="mt-5 rounded-xl bg-accent px-4 py-3 text-accent-foreground">
                  <p className="font-display text-lg font-bold text-primary">
                    + {formatInr(plan.monthly)}/month
                  </p>
                  <p className="pt-0.5 text-xs text-muted-foreground">after website goes live</p>
                </div>

                <p className="pt-4 text-sm font-medium">
                  Advance to start: {formatInr(advanceAmount(plan.price))} (50%)
                </p>
                <p className="flex items-center gap-2 pt-3 text-sm text-muted-foreground">
                  <Clock3 className="size-4 text-primary" aria-hidden="true" />
                  Delivery: {plan.delivery}
                </p>

                <ul className="space-y-3 pt-5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm leading-relaxed">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant={plan.popular ? "default" : "secondary"}
                className="mt-7 w-full cursor-pointer rounded-full"
                render={
                  <a
                    href={whatsappLink(`Hi Rtx Dev, I want the ${plan.name} plan (${formatInr(plan.price)}).`)}
                    target="_blank"
                    rel="noreferrer"
                  />
                }
                nativeButton={false}
              >
                Choose {plan.name}
                <ArrowRight className="ml-2 size-4" aria-hidden="true" />
              </Button>
            </motion.article>
          ))}
        </div>

        <div className="grid gap-6 pt-16 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-2xl bg-foreground p-6 text-background sm:p-8"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              After launch
            </p>
            <h3 className="pt-3 font-display text-2xl font-bold">Website Care Plan</h3>
            <p className="pt-2 text-sm text-background/70">
              Starts at <span className="font-display text-lg font-bold text-primary">{formatInr(PLANS[0].monthly)}/month</span>. Cancel anytime.
            </p>
            <ul className="grid gap-4 pt-6 sm:grid-cols-2">
              {MONTHLY_INCLUDES.map((item, index) => {
                const Icon = careIcons[index % careIcons.length];
                return (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span className="pt-1 text-background/85">{item}</span>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
            className="rounded-2xl border border-border bg-card p-6 sm:p-8"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              Clear from day one
            </p>
            <h3 className="pt-3 font-display text-2xl font-bold">How payment works</h3>
            <div className="relative pt-6">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.9, delay: 0.2, ease: "easeInOut" }}
                className="absolute left-4 top-8 h-[calc(100%-4rem)] w-px origin-top bg-primary/35 md:hidden"
              />
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.9, delay: 0.2, ease: "easeInOut" }}
                className="absolute left-[8%] right-[8%] top-4 hidden h-px origin-left bg-primary/35 md:block"
              />
              <ol className="relative grid gap-5 md:grid-cols-4 md:gap-3">
                {paymentSteps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <li key={step.number} className="flex gap-3 md:flex-col md:gap-3">
                      <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-card text-primary">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      <div className="pb-1 md:pt-1">
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                          Step {step.number}
                        </p>
                        <p className="pt-1 text-sm font-semibold leading-snug">{step.title}</p>
                        <p className="pt-1 text-xs leading-relaxed text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </motion.div>
        </div>

        <p className="pt-7 text-center text-xs text-muted-foreground">
          All prices in INR. Domain cost extra if premium domain needed.
        </p>
      </div>
    </section>
  );
}
