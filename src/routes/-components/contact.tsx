import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
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
import { Mail, MapPin, MessageCircle, Send } from "lucide-react";

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
              Your customers are <span className="text-primary">waiting.</span>
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
                className="flex w-fit items-center gap-3 text-background/80 transition-colors hover:text-primary"
              >
                <MessageCircle className="size-4 text-primary" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex w-fit items-center gap-3 text-background/80 transition-colors hover:text-primary"
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
            <Button type="submit" size="lg" className="mt-5 w-full gap-2">
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
