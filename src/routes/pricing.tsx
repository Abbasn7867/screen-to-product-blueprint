import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { CtaButton, SiteFooter, SiteHeader } from "@/components/site";
import { PricingPlans } from "@/components/pricing-plans";
import { AGENTS } from "@/data/painPoints";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing | AI Front Office for Medical Practices" },
      { name: "description", content: "Receptionist, Pro and Full Team plans. The full platform free for 14 days, $0 setup during launch and $250 bonus credits." },
      { property: "og:title", content: "Simple Pricing. The Full Platform, Free for 14 Days." },
      { property: "og:description", content: "Compare plans for your medical practice's AI front office." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricingPage,
});

type Tier = [boolean, boolean, boolean];
const AGENT_ROWS: [keyof typeof AGENTS, Tier][] = [
  ["amy", [true, true, true]], ["leena", [false, true, true]], ["morgan", [false, false, true]], ["kim", [false, false, true]],
  ["stephanie", [false, true, true]], ["elise", [false, false, true]], ["joseph", [false, false, true]], ["trisha", [false, true, true]],
];
const CAPABILITIES: [string, string, Tier][] = [
  ["24/7 answering", "amy", [true, true, true]], ["Booking", "amy", [true, true, true]], ["Instant test call", "amy", [true, true, true]],
  ["Intake", "morgan", [false, false, true]], ["Follow-up", "stephanie", [false, true, true]], ["Reviews", "elise", [false, false, true]],
  ["Documents", "joseph", [false, false, true]], ["Performance reporting", "trisha", [false, true, true]], ["Value-added services", "amy", [false, false, true]],
];
const BILLING_TERMS = "Choose monthly or yearly billing. Monthly plans are month-to-month with no long-term contract — cancel anytime before your next billing date. Prefer yearly? Pay annually and save 12% on any plan.";

function Cells({ tier, agent }: { tier: Tier; agent: string }) {
  return <>{tier.map((v, i) => <td key={i} className="p-3 text-center">{v ? <Check className={`agent-${agent} mx-auto`} style={{ color: "var(--agent-color)" }} size={20} aria-label="Included" /> : <Minus className="mx-auto text-muted-foreground" size={18} aria-label="Not included" />}</td>)}</>;
}

function PricingPage() {
  const faqs: [string, string][] = [
    ["What happens after the 14-day trial?", "Choose the plan and billing period that fit your practice. Your AI team keeps working without a gap."],
    ["What are the billing terms?", BILLING_TERMS],
    ["What do the $250 bonus credits cover?", "Your $250 bonus credits are applied to call minutes, roughly 250 minutes of live calls handled by your AI team."],
    ["Is there a setup fee?", "Setup is $1,000, waived during launch. Share your information and our team configures everything."],
    ["Can I switch plans later?", "Yes. Upgrade or downgrade anytime; the change applies from the next billing date."],
  ];
  return (
    <div className="overflow-x-clip">
      <SiteHeader />
      <main>
        <section className="px-6 pt-36 pb-4 text-center">
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold md:text-6xl">Simple Pricing. The Full Platform, Free for 14 Days.</h1>
          <div className="mt-8"><CtaButton size="lg" /></div>
        </section>
        <PricingPlans heading={false} />
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-3xl rounded-[2rem] bg-dark-section p-8 text-center text-on-dark shadow-soft">
            <p className="text-sm font-bold text-on-dark-muted">Launch Offer</p>
            <p className="mt-3 text-3xl font-extrabold">
              Setup{" "}
              <span className="relative inline-block">$1,000<motion.span aria-hidden="true" className="absolute left-0 top-1/2 h-[3px] bg-accent" initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} /></span>{" "}
              <motion.strong className="text-accent" initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", delay: 0.9 }}>$0</motion.strong>
            </p>
            <p className="mt-3 text-lg font-semibold">+ $250 bonus credits · 14-day free trial</p>
          </div>
        </section>
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-5xl overflow-x-auto rounded-lg border border-border bg-card">
            <h2 className="p-6 text-3xl font-extrabold">Compare Plans</h2>
            <table className="w-full min-w-[560px] text-sm">
              <thead><tr className="border-y border-border bg-muted"><th className="p-3 text-left">Feature</th><th className="p-3">Receptionist</th><th className="p-3">Pro</th><th className="p-3">Full Team</th></tr></thead>
              <tbody className="divide-y divide-border">
                {AGENT_ROWS.map(([k, t]) => <tr key={k}><td className="p-3 font-semibold">{AGENTS[k].name} <span className="text-muted-foreground">· {AGENTS[k].role}</span></td><Cells tier={t} agent={k} /></tr>)}
                {CAPABILITIES.map(([label, a, t]) => <tr key={label}><td className="p-3 font-semibold">{label}</td><Cells tier={t} agent={a} /></tr>)}
              </tbody>
            </table>
          </div>
        </section>
        <section className="bg-card px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-4xl font-extrabold">Pricing Questions</h2>
            <Accordion type="single" collapsible className="mt-10">
              {faqs.map(([q, a]) => <AccordionItem key={q} value={q}><AccordionTrigger className="text-left text-lg font-bold">{q}</AccordionTrigger><AccordionContent className="text-base text-muted-foreground">{a}</AccordionContent></AccordionItem>)}
            </Accordion>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
