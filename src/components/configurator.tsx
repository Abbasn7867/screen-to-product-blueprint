import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CATEGORIES } from "@/data/painPoints";
import { agentFor } from "@/lib/medical-presentation";
import { ALL_PAIN_IDS, agentUsage, coveragePercent, presetIds, recommendPlan, type PlanId } from "@/lib/configurator";
import { PLANS, formatUSD } from "@/lib/pricing";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { AgentChip } from "@/components/pain-section";

const spring = { type: "spring", stiffness: 260, damping: 26 } as const;

export function Configurator({ standalone = false }: { standalone?: boolean }) {
  const [on, setOn] = useState<string[]>(ALL_PAIN_IDS);
  const [closed, setClosed] = useState<string[]>([]);
  const [sheet, setSheet] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.05 });
  const usage = agentUsage(on);
  const activeAgents = usage.filter((u) => u.on > 0).length;
  const planId: PlanId = recommendPlan(on);
  const plan = PLANS.find((p) => p.id === planId)!;
  const toggle = (id: string) => setOn((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const Heading = standalone ? "h1" : "h2";

  const summary = (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-extrabold">Agent Utilization</h3>
        <ul className="mt-3 space-y-2.5">
          {usage.map((u) => {
            const a = agentFor(u.key);
            return (
              <li key={u.key} className={`agent-${u.key} transition-opacity ${u.on ? "" : "opacity-40 grayscale"}`}>
                <div className="flex justify-between text-xs font-bold"><span>{a.name}</span><span>{u.on} of {u.total}</span></div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                  <motion.div className="h-full rounded-full" style={{ background: u.on ? "var(--agent-color)" : "var(--muted-foreground)" }} animate={{ width: `${(u.on / u.total) * 100}%` }} transition={spring} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-3 rounded-lg bg-muted p-4">
        <div><p className="text-xs font-bold text-muted-foreground">Scope of Service</p><p className="text-2xl font-extrabold">{activeAgents} of 8 agents</p></div>
        <div><p className="text-xs font-bold text-muted-foreground">Mapped pain points covered</p><p className="text-2xl font-extrabold">{coveragePercent(on)}%</p></div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={planId} initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.94, opacity: 0 }} transition={spring} className="rounded-lg bg-dark-section p-5 text-on-dark">
          <p className="text-xs font-bold text-on-dark-muted">Recommended Plan</p>
          <p className="text-2xl font-extrabold">{plan.name}</p>
          <p className="mt-1"><strong className="text-xl">{formatUSD(plan.monthly)}/mo</strong> <span className="text-sm text-on-dark-muted">or {formatUSD(plan.yearly)}/mo yearly</span></p>
        </motion.div>
      </AnimatePresence>
      <Link to="/free-trial" search={{ plan: planId, pains: on.join(",") }} className="flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 font-bold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 hover:bg-primary-deep">
        Book a Free Trial with This Setup
      </Link>
      <p className="text-sm text-muted-foreground">Prefer not to set it up yourself? Share your information and our team configures everything — the <s>$1,000</s> setup is waived during launch.</p>
    </div>
  );

  return (
    <section ref={ref} id="configure" className="section-space scroll-mt-32">
      <div className="page-width">
        <div className="section-heading">
          <p className="eyebrow">Build Your AI Front Office</p>
          <Heading className="text-4xl font-extrabold md:text-5xl">Choose the Problems You Want Solved.</Heading>
          <div className="mt-6 flex flex-wrap gap-2">
            {([["receptionist", "Receptionist"], ["pro", "Pro"], ["full", "Everything"]] as const).map(([id, label]) => (
              <Button key={id} variant="outline" className="rounded-full font-bold" onClick={() => setOn(presetIds(id))}>{label}</Button>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4 pb-24 lg:pb-0">
            {CATEGORIES.map((c) => {
              const open = !closed.includes(c.id);
              return (
                <div key={c.id} className="rounded-lg border border-border bg-card">
                  <button type="button" aria-expanded={open} onClick={() => setClosed((s) => (open ? [...s, c.id] : s.filter((x) => x !== c.id)))} className="flex w-full items-center justify-between p-4 text-left">
                    <span className="font-extrabold">{c.title} <span className="ml-2 text-sm font-semibold text-muted-foreground">{c.items.filter((i) => on.includes(i.id)).length}/{c.items.length}</span></span>
                    <ChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} size={18} />
                  </button>
                  {open && (
                    <ul className="divide-y divide-border border-t border-border">
                      {c.items.map((i) => {
                        const checked = on.includes(i.id);
                        return (
                          <motion.li layout key={i.id} className={`flex gap-4 p-4 transition-opacity ${checked ? "" : "opacity-55"}`}>
                            <Switch checked={checked} onCheckedChange={() => toggle(i.id)} aria-label={`${checked ? "Turn off" : "Turn on"}: ${i.pain}`} className="mt-1 shrink-0" />
                            <div className="min-w-0">
                              <p className="font-semibold">{i.pain}</p>
                              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground"><AgentChip agent={i.agent} /><span>{i.fix}</span></div>
                            </div>
                          </motion.li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
          <aside className="hidden lg:block"><div className="sticky top-28 rounded-lg border border-border bg-card p-6 shadow-soft">{summary}</div></aside>
        </div>
      </div>
      {inView && <div className="fixed inset-x-0 bottom-0 z-40 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-border bg-card p-4 shadow-soft lg:hidden">
        <button type="button" aria-expanded={sheet} onClick={() => setSheet((v) => !v)} className="flex w-full items-center justify-between font-extrabold">
          <span>{plan.name} · {activeAgents} of 8 agents · {coveragePercent(on)}%</span>{sheet ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
        </button>
        {sheet && <div className="mt-4">{summary}</div>}
      </div>}
    </section>
  );
}
