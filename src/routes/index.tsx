import { createFileRoute } from "@tanstack/react-router";
import SiteHeader from "@/components/site-header.tsx";
import SiteFooter from "@/components/site-footer.tsx";
import WhatsappFloat from "@/components/whatsapp-float.tsx";
import { site } from "@/lib/site.ts";
import IntroLoader from "./-components/intro-loader.tsx";
import Hero from "./-components/hero.tsx";
import Services from "./-components/services.tsx";
import Work from "./-components/work.tsx";
import Process from "./-components/process.tsx";
import Pricing from "./-components/pricing.tsx";
import Faq from "./-components/faq.tsx";
import Contact from "./-components/contact.tsx";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${site.name} | Websites that grow your business` },
      { name: "description", content: site.tagline },
      { property: "og:title", content: site.name },
      { property: "og:description", content: site.tagline },
      { property: "og:image", content: site.logo },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background">
      <IntroLoader />
      <SiteHeader />
      <main>
        <Hero />
        <Services />
        <Work />
        <Process />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
      <WhatsappFloat />
    </div>
  );
}
