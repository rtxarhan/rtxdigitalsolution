import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";
import SectionHeading from "./section-heading.tsx";

const QUESTIONS = [
  {
    question: "How long does it take to build a website?",
    answer:
      "Most small websites are ready in a few days. Bigger projects can take a little longer — I’ll share a clear timeline before we begin.",
  },
  {
    question: "Why is 50% advance payment compulsory?",
    answer:
      "The advance confirms your project slot and lets me get started. The remaining 50% is due after you approve the finished website.",
  },
  {
    question: "What does the monthly payment cover?",
    answer:
      "It covers hosting, updates, backups, and small changes like updating text or images, so your website stays cared for after launch.",
  },
  {
    question: "Can I cancel the monthly plan?",
    answer:
      "Yes. You can cancel the monthly care plan whenever you need to. I’ll explain what happens to hosting and support before cancellation.",
  },
  {
    question: "Do you provide a domain name?",
    answer:
      "I can help you choose and set up a domain. The domain is registered in your name, and its renewal cost is separate from the website build.",
  },
  {
    question: "Will my website work on mobile phones?",
    answer:
      "Yes. Every website is designed to work smoothly on phones, tablets, and desktops, so customers can reach you from any device.",
  },
] as const;

export default function Faq() {
  return (
    <section id="faq" className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="05 — FAQ"
          title="Questions?"
          highlight="Answered."
        />

        <Accordion className="mt-12" multiple>
          {QUESTIONS.map((item, index) => (
            <AccordionItem key={item.question} value={`question-${index}`}>
              <AccordionTrigger className="cursor-pointer py-5 text-base font-medium hover:no-underline md:text-lg">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
