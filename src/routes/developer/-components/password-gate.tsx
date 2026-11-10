import { useState, type FormEvent } from "react";
import { useMutation } from "convex/react";
import { motion, useAnimationControls } from "motion/react";
import { KeyRound } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api.js";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Spinner } from "@/components/ui/spinner.tsx";
import GateCard from "./gate-card.tsx";

export default function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const checkPassword = useMutation(api.leads.checkPanelPassword);
  const [password, setPassword] = useState("");
  const [checking, setChecking] = useState(false);
  const controls = useAnimationControls();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setChecking(true);
    try {
      const ok = await checkPassword({ password });
      if (ok) {
        onUnlock();
      } else {
        toast.error("Wrong password");
        void controls.start({ x: [0, -10, 10, -6, 6, 0] as const, transition: { duration: 0.4 } });
      }
    } catch {
      toast.error("Could not check password. Try again.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <GateCard
      icon={<KeyRound className="size-6" />}
      title="Enter panel password"
      description="One more step to open your admin panel."
    >
      <motion.form animate={controls} onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="password"
          autoFocus
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="h-11 text-center"
        />
        <Button type="submit" size="lg" disabled={checking || password.length === 0} className="w-full rounded-full">
          {checking ? <Spinner /> : null} Unlock
        </Button>
      </motion.form>
    </GateCard>
  );
}
