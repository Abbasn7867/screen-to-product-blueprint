import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaButton, Reveal } from "@/components/site";
import { OfferLine } from "@/components/site-offers";
import { PLANS, SHOW_PRICES, formatUSD, priceFor, type Billing } from "@/lib/pricing";

const QUARTERLY: Record<string, number> = { receptionist: 1311, pro: 5271, full: 7911 };

const TRIAL_STEPS = [
  <>Try Amy free — 14 days of the Receptionist plan. No credit card required.</>,
  <>Activate Receptionist → try Pro free for 14 days.</>,
  <>Activate Pro → try Elite free for 14 days.</>,
];

export function TrialSteps() {
  return (
    <ol className="mx-auto mt-8 grid max-w-4xl gap-3 text-left sm:grid-cols-3">
      {TRIAL_STEPS.map((t, i) => (
        <li key={i} className="flex items-start gap-3 rounded-xl bg-card p-4 text-sm font-semibold shadow-soft">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-extrabold text-primary-foreground">{i + 1}</span>
          {t}
        </li>
      ))}
    </ol>
  );
}

function LaunchCard() {
  return (
    <div className="mx-auto mt-12 max-w-2xl rounded-[2rem] bg-dark-section p-10 text-center text-on-dark shadow-soft">
      <h3 className="text-3xl font-extrabold">Start With Amy — Free for 14 Days</h3>
      <p className="mt-4 text-5xl font-extrabold">$0 <span className="text-xl font-bold text-on-dark-muted">for 14 days</span></p>
      <p className="mt-3 font-semibold text-on-dark-muted">No credit card required · +$250 in free credits · Setup $1,000 → $0</p>
      <CtaButton variant="light" size="lg" className="mt-8">Start Free With Amy <ArrowRight size={18} /></CtaButton>
      <ul className="mt-8 grid gap-3 text-left sm:grid-cols-3">
        {PLANS.map((p) => (
          <li key={p.id} className="rounded-xl border border-on-dark-muted/30 p-4">
            <p className="font-extrabold">{p.name}</p>
            <p className="mt-1 text-xs text-on-dark-muted">{p.blurb}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PricingPlans({ heading = true }: { heading?: boolean }) {
  const [billing, setBilling] = useState<Billing>("monthly");
  return (
    <section id="pricing" className="relative scroll-mt-24 px-6 py-24">

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="text-center">
          {heading && <><h2 className="text-4xl font-extrabold md:text-6xl">Simple Plans. Start Free With Amy.</h2>
          <TrialSteps /></>}
          {SHOW_PRICES && (
            <div role="radiogroup" aria-label="Billing period" className="mx-auto mt-8 inline-flex rounded-full bg-card p-1.5 shadow-soft">
              {(["monthly", "yearly"] as const).map((b) => (
                <Button variant="ghost"
                  key={b}
                  role="radio"
                  aria-checked={billing === b}
                  onClick={() => setBilling(b)}
                  className={`rounded-full px-6 py-2.5 text-sm font-bold transition-colors ${
                    billing === b ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {b === "yearly" ? "Yearly · Save 12%" : "Monthly"}
                </Button>
              ))}
            </div>
          )}
        </Reveal>

        <div className="mt-8 rounded-lg bg-accent-soft px-4 py-4 text-center text-sm font-semibold"><OfferLine /></div>

        {SHOW_PRICES ? (
          <>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {PLANS.map((p) => (
                <div
                  key={p.id}
                  className={`tilt relative flex flex-col rounded-[2rem] p-8 ${
                    p.popular ? "bg-dark-section text-on-dark shadow-soft" : "bg-card shadow-soft"
                  }`}
                >
                  {p.popular && (
                    <span className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 text-xs font-extrabold text-accent-foreground">
                      Most Popular
                    </span>
                  )}
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-extrabold">{p.name}</h3>
                    {billing === "yearly" && (
                      <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-bold text-primary">Save 12%</span>
                    )}
                  </div>
                  <p className={`mt-2 text-sm ${p.popular ? "text-on-dark-muted" : "text-muted-foreground"}`}>{p.blurb}</p>
                  <p className="mt-6">
                    <motion.span key={billing} initial={{y:6,opacity:0}} animate={{y:0,opacity:1}} className="inline-block text-5xl font-extrabold">{formatUSD(priceFor(p.id, billing))}</motion.span>
                    <span className={p.popular ? "text-on-dark-muted" : "text-muted-foreground"}>/month</span>
                  </p>
                  <p className={`text-sm ${p.popular ? "text-on-dark-muted" : "text-muted-foreground"}`}>
                    {billing === "yearly"
                      ? `12-month agreement, billed quarterly (${formatUSD(QUARTERLY[p.id] ?? 0)} per quarter)`
                      : "Billed monthly"}
                  </p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" /> {f}
                      </li>
                    ))}
                  </ul>
                  <CtaButton variant={p.popular ? "light" : "primary"} className="mt-8 w-full" plan={p.id} billing={billing} />
                </div>
              ))}
            </div>
            <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-muted-foreground">
              Monthly plans are month-to-month: cancel anytime before your next billing date. Yearly plans save 12% with a 12-month agreement, billed every quarter.
            </p>
          </>
        ) : (
          <LaunchCard />
        )}

        <p className="mt-8 text-center text-muted-foreground">
          Need Billing, Credentialing, Eligibility Verification and more?{" "}
          <a href="/free-trial" className="font-bold text-primary underline">Talk to Our Team</a>
        </p>
      </div>
    </section>
  );
}
