import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { CONTACT, site, whatsappLink } from "@/lib/site.ts";
import { PLANS } from "@/lib/plans.ts";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  phone: z.string().trim().min(7, "Please enter a valid phone number."),
  businessType: z.string().trim().min(2, "Please tell me what your business does."),
  planId: z.string().min(1, "Please choose a plan."),
  message: z.string().trim().min(8, "Please add a little detail about your project."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const PLAN_ITEMS = Object.fromEntries(PLANS.map((plan) => [plan.id, plan.name]));

export default function Contact() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      businessType: "",
      planId: "",
      message: "",
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    const selectedPlan = PLANS.find((plan) => plan.id === values.planId);
    const details = [
      "Hi Rtx Dev, I’d like to discuss a website.",
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      `Business type: ${values.businessType}`,
      `Plan: ${selectedPlan?.name ?? values.planId}`,
      `Project details: ${values.message}`,
    ].join("\n");
    window.open(whatsappLink(details), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="px-4 py-16 md:px-8 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative isolate mx-auto mb-10 max-w-6xl overflow-hidden rounded-[2rem] bg-primary px-6 py-12 text-center text-primary-foreground sm:px-10 md:py-16"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 -top-16 -z-10 size-64 rounded-full bg-white/15 blur-2xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -right-10 -z-10 size-72 rounded-full bg-black/10 blur-2xl"
        />
        <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-balance sm:text-5xl">
          Ready to get more customers online?
        </h2>
        <p className="mx-auto max-w-xl pt-4 text-primary-foreground/85 sm:text-lg">
          Let’s turn your business into a website people love to visit. Starts at just 50% advance.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 pt-8 sm:flex-row">
          <Button
            size="lg"
            render={
              <a
                href={whatsappLink("Hi Rtx Dev, I want to get my business online.")}
                target="_blank"
                rel="noreferrer"
              />
            }
            nativeButton={false}
            className="w-full cursor-pointer rounded-full bg-background px-7 text-foreground hover:bg-background/90 sm:w-auto"
          >
            <MessageCircle aria-hidden="true" /> Chat on WhatsApp
          </Button>
          <Button
            size="lg"
            variant="ghost"
            render={<a href="#pricing" />}
            nativeButton={false}
            className="w-full cursor-pointer rounded-full border border-primary-foreground/40 px-7 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto"
          >
            View Pricing
          </Button>
        </div>
      </motion.div>

      <div className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-foreground text-background shadow-2xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-28 -z-10 size-96 rounded-full bg-primary/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-20 -z-10 size-80 rounded-full bg-primary/15 blur-3xl"
        />

        <div className="grid gap-10 p-6 sm:p-9 md:grid-cols-[0.85fr_1.15fr] md:gap-12 md:p-14 lg:p-16">
          <div className="flex flex-col">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary">
              06 — Let’s talk
            </p>
            <h2 className="pt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl">
              Let’s build something <span className="text-primary">great.</span>
            </h2>
            <p className="max-w-md pt-5 leading-relaxed text-background/70">
              Tell me what you’re building. I’ll help you find the right way to bring it online.
            </p>

            <div className="flex items-center gap-4 pt-8">
              <motion.img
                src={site.logo}
                alt="Rtx Dev"
                className="size-16 rounded-2xl object-cover ring-1 ring-background/15 sm:size-20"
                animate={{ y: [0, -5, 0] as const }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <div>
                <p className="font-display text-xl font-semibold">Rtx Dev</p>
                <p className="pt-1 text-sm text-background/60">Freelance web developer · India</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 border-t border-background/15 pt-6 text-sm">
              <a
                href={whatsappLink("Hi Rtx Dev, I want to talk about a website.")}
                target="_blank"
                rel="noreferrer"
                className="flex w-fit cursor-pointer items-center gap-3 text-background/80 transition-colors hover:text-primary"
              >
                <MessageCircle className="size-4 text-primary" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex w-fit cursor-pointer items-center gap-3 text-background/80 transition-colors hover:text-primary"
              >
                <Mail className="size-4 text-primary" aria-hidden="true" />
                <span>{CONTACT.email}</span>
              </a>
              <div className="flex items-center gap-3 text-background/80">
                <MapPin className="size-4 text-primary" aria-hidden="true" />
                <span>{CONTACT.location}</span>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="rounded-3xl bg-background p-5 text-foreground sm:p-7"
          >
            <p className="pb-5 font-display text-xl font-bold">Send a message</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contact-name">Your name</Label>
                <Input
                  id="contact-name"
                  autoComplete="name"
                  placeholder="Aarav Sharma"
                  aria-invalid={Boolean(errors.name)}
                  {...register("name")}
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Phone number</Label>
                <Input
                  id="contact-phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="98765 43210"
                  aria-invalid={Boolean(errors.phone)}
                  {...register("phone")}
                />
                {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-business">Business type</Label>
                <Input
                  id="contact-business"
                  placeholder="Cafe, studio, shop..."
                  aria-invalid={Boolean(errors.businessType)}
                  {...register("businessType")}
                />
                {errors.businessType && (
                  <p className="text-xs text-destructive">{errors.businessType.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-plan">Plan you’re interested in</Label>
                <Controller
                  control={control}
                  name="planId"
                  render={({ field }) => (
                    <Select
                      items={PLAN_ITEMS}
                      value={field.value || null}
                      onValueChange={(value) => field.onChange(value ?? "")}
                    >
                      <SelectTrigger
                        id="contact-plan"
                        aria-invalid={Boolean(errors.planId)}
                        className="h-10 w-full bg-background text-foreground"
                      >
                        <SelectValue placeholder="Choose a plan" />
                      </SelectTrigger>
                      <SelectContent>
                        {PLANS.map((plan) => (
                          <SelectItem key={plan.id} value={plan.id}>
                            {plan.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.planId && <p className="text-xs text-destructive">{errors.planId.message}</p>}
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="contact-message">A little about your project</Label>
                <Textarea
                  id="contact-message"
                  rows={4}
                  placeholder="What would you like your website to do?"
                  aria-invalid={Boolean(errors.message)}
                  className="min-h-28 bg-background text-foreground"
                  {...register("message")}
                />
                {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
              </div>
            </div>
            <Button type="submit" size="lg" className="mt-5 w-full cursor-pointer gap-2">
              Start a WhatsApp chat
              <Send className="size-4" aria-hidden="true" />
            </Button>
            <p className="pt-3 text-center text-xs text-muted-foreground">
              Your details open in WhatsApp — no account needed.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
