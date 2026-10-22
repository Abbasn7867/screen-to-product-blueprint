import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaButton, Reveal } from "@/components/site";
import { OfferLine } from "@/components/site-offers";
import { PLANS, formatUSD, priceFor, type Billing } from "@/lib/pricing";

export function PricingPlans({ heading = true }: { heading?: boolean }) {
  const [billing, setBilling] = useState<Billing>("monthly");
  return (
    <section id="pricing" className="relative scroll-mt-24 px-6 py-24">

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="text-center">
          {heading && <><h2 className="text-4xl font-extrabold md:text-6xl">Simple Plans. Full Platform Trial.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Every plan starts with the full-platform trial. Nothing locked.
          </p></>}
          <div role="radiogroup" aria-label="Billing period" className="mx-auto mt-8 inline-flex rounded-full bg-card p-1.5 shadow-soft">
            {(["monthly", "yearly"] as const).map((b) => (
              <Button variant="ghost"
                key={b}
                role="radio"
                aria-checked={billing === b}
                onClick={() => setBilling(b)}
                className={`rounded-full px-6 py-2.5 text-sm font-bold capitalize transition-colors ${
                  billing === b ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {b}
              </Button>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 rounded-lg bg-accent-soft px-4 py-4 text-center text-sm font-semibold"><OfferLine /></div>
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
                billed {billing}
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

        <p className="mt-8 text-center text-muted-foreground">
          Need Billing, Credentialing, Eligibility Verification and more?{" "}
          <a href="/free-trial" className="font-bold text-primary underline">Talk to Our Team</a>
        </p>
        <p className="mx-auto mt-4 max-w-3xl text-center text-sm text-muted-foreground">
          Choose monthly or yearly billing. Monthly plans are month-to-month with no long-term contract — cancel anytime
          before your next billing date. Prefer yearly? Pay annually and save 12% on any plan.
        </p>
      </div>
    </section>
  );
}

