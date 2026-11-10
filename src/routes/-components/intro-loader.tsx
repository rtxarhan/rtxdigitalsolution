import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/lib/site.ts";

/**
 * Opening animation: logo pops in at the center, lifts up and away,
 * then the overlay slides up to reveal the site. No swing.
 */
export default function IntroLoader() {
  const [done, setDone] = useState(false);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] as const }}
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 size-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
          <motion.div
            className="relative flex flex-col items-center gap-5"
            initial={{ scale: 0.6, y: 0 }}
            animate={{ scale: [0.6, 1, 1], y: [0, 0, -140], opacity: [1, 1, 0] }}
            transition={{
              duration: 1.6,
              times: [0, 0.45, 1],
              ease: "easeInOut",
            }}
            onAnimationComplete={() => setDone(true)}
          >
            <img
              src={site.logo}
              alt={`${site.name} logo`}
              className="size-28 rounded-full shadow-2xl ring-4 ring-primary/40 md:size-36"
            />
            <p className="font-display text-3xl font-bold tracking-tight">
              Rtx <span className="text-primary">Dev</span>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
