import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Authenticated, AuthLoading, useQuery } from "convex/react";
import { motion } from "motion/react";
import { ExternalLink, Image as ImageIcon, Inbox, Lock, PenLine, ShieldX } from "lucide-react";
import { api } from "@/convex/_generated/api.js";
import { SignInButton } from "@/components/ui/signin.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Spinner } from "@/components/ui/spinner.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import ThemeToggle from "@/components/theme-toggle.tsx";
import { useAuth } from "@/hooks/use-auth.ts";
import { site } from "@/lib/site.ts";
import GateCard from "./-components/gate-card.tsx";
import PasswordGate from "./-components/password-gate.tsx";
import StatsGrid from "./-components/stats-grid.tsx";
import LeadsList from "./-components/leads-list.tsx";

export const Route = createFileRoute("/developer/")({
  head: () => ({
    meta: [
      { title: `Admin | ${site.name}` },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DeveloperPage,
});

function DeveloperPage() {
  const { user } = useAuth();
  if (!user) {
    return (
      <GateCard
        icon={<Lock className="size-6" />}
        title="Admin panel"
        description="Sign in with your admin email to continue."
      >
        <SignInButton size="lg" className="w-full rounded-full" signInText="Sign in" />
      </GateCard>
    );
  }
  return (
    <>
      <AuthLoading>
        <CenterSpinner />
      </AuthLoading>
      <Authenticated>
        <AdminCheck />
      </Authenticated>
    </>
  );
}

function CenterSpinner() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-background">
      <Spinner className="size-6 text-primary" />
    </div>
  );
}

function AdminCheck() {
  const isAdmin = useQuery(api.leads.amIAdmin);
  const [unlocked, setUnlocked] = useState(false);

  if (isAdmin === undefined) return <CenterSpinner />;
  if (!isAdmin) {
    return (
      <GateCard
        icon={<ShieldX className="size-6" />}
        title="No access"
        description="This account is not the admin. Sign out and use the admin email."
      >
        <SignInButton size="lg" variant="secondary" className="w-full rounded-full" />
      </GateCard>
    );
  }
  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  return <Dashboard />;
}

function ComingSoon({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
      <p className="font-display text-lg font-bold">{title}</p>
      <p className="pt-1 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="min-h-svh bg-background">
      <motion.header
        initial={{ y: -16 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <img src={site.logo} alt="" className="size-9 rounded-full object-cover" />
            <div className="min-w-0">
              <p className="font-display text-base font-bold leading-tight">{site.name} Admin</p>
              <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              render={<a href="/" target="_blank" rel="noreferrer" />}
              nativeButton={false}
              className="hidden sm:inline-flex"
            >
              <ExternalLink className="size-4" /> View site
            </Button>
            <ThemeToggle />
            <SignInButton size="sm" variant="secondary" className="rounded-full" signOutText="Logout" />
          </div>
        </div>
      </motion.header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        <motion.div
          initial={{ y: 12 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">Dashboard</p>
          <h1 className="pt-1 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ""}.
          </h1>
        </motion.div>

        <StatsGrid />

        <Tabs defaultValue="leads" className="gap-4">
          <TabsList className="w-full justify-start overflow-x-auto sm:w-auto">
            <TabsTrigger value="leads"><Inbox className="size-4" /> Enquiries</TabsTrigger>
            <TabsTrigger value="work"><ImageIcon className="size-4" /> Work</TabsTrigger>
            <TabsTrigger value="content"><PenLine className="size-4" /> Content</TabsTrigger>
          </TabsList>
          <TabsContent value="leads">
            <LeadsList />
          </TabsContent>
          <TabsContent value="work">
            <ComingSoon title="Work uploads" text="Upload photos and videos of your projects here. Coming next." />
          </TabsContent>
          <TabsContent value="content">
            <ComingSoon title="Edit website" text="Change prices, plans, text and contact details here. Coming next." />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
