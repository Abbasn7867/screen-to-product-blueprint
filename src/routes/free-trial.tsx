import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Check } from "lucide-react";
import { LegalLinks, SiteFooter, SiteHeader, TrustBadges } from "@/components/site";

export const Route = createFileRoute("/free-trial")({
  validateSearch: (search: Record<string, unknown>): { plan?: "receptionist" | "pro" | "full"; billing?: "monthly" | "yearly" } => ({
    plan: search.plan === "receptionist" || search.plan === "pro" || search.plan === "full" ? search.plan : undefined,
    billing: search.billing === "monthly" || search.billing === "yearly" ? search.billing : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Book a Free Trial | AI Solution Company for Medical Practices" },
      { name: "description", content: "Start your 14-day free trial of the Complete AI Front Office. $0 setup during launch and $250 bonus credits." },
      { property: "og:title", content: "Book a Free Trial — The Complete AI Front Office" },
      { property: "og:description", content: "14 days of the full platform for your medical practice. No setup fee during launch." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FreeTrial,
});

const CONSENT_SMS =
  "I agree to receive text messages and calls, including automated and AI-assisted calls, from AI Solution Company at the number provided about my free trial, account setup and service notices. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase.";
const CONSENT_MARKETING =
  "Yes, send me offers and product updates from AI Solution Company by text and email. Reply STOP or unsubscribe anytime.";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  practice: z.string().trim().min(1, "Please enter your practice name").max(150),
  email: z.string().trim().email("Please enter a valid work email").max(255),
  phone: z.string().trim().regex(/^[0-9+()\-.\s]{7,20}$/, "Please enter a valid phone number"),
  website: z.string().trim().max(255).optional(),
});

const DASHBOARD = "https://aisolutioncompany.com/practice/dashboard";

function FreeTrial() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    const now = new Date().toISOString();
    const record = {
      ...parsed.data,
      consent_sms_account: fd.get("consent_sms_account") === "on" ? { text: CONSENT_SMS, at: now } : null,
      consent_marketing: fd.get("consent_marketing") === "on" ? { text: CONSENT_MARKETING, at: now } : null,
      submitted_at: now,
    };
    localStorage.setItem("aisc_trial_signup", JSON.stringify(record));
    window.location.href = DASHBOARD;
  };

  const field = (id: string, label: string, type = "text", required = true, autoComplete?: string) => (
    <div>
      <label htmlFor={id} className="block text-sm font-bold">
        {label} {!required && <span className="font-normal text-muted-foreground">(optional)</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={!!errors[id]}
        aria-describedby={errors[id] ? `${id}-err` : undefined}
        className="mt-1.5 w-full rounded-xl border border-input bg-card px-4 py-3 text-foreground focus-visible:border-primary"
      />
      {errors[id] && <p id={`${id}-err`} className="mt-1 text-sm text-destructive">{errors[id]}</p>}
    </div>
  );

  return (
    <div className="overflow-x-clip">
      <SiteHeader />
      <main className="relative px-6 py-16">
        <div className="blob -left-20 top-0 h-96 w-96 bg-accent" aria-hidden="true" />
        <div className="blob right-0 top-60 h-96 w-96 bg-primary" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h1 className="text-5xl font-extrabold leading-tight md:text-6xl">
              Start your <span className="text-gradient">14-day free trial.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">The full Complete AI Front Office. Nothing locked.</p>
            <ul className="mt-8 space-y-4">
              {[
                <>Setup <s>$1,000</s> <strong>$0</strong> during launch</>,
                <>$250 in bonus credits — roughly 250 call minutes</>,
                <>Your dashboard opens right away; Quick Start takes about 10 minutes</>,
                <>Your instant test call: your own number, recorded and emailed to you in 3–4 minutes</>,
              ].map((t, i) => (
                <li key={i} className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" /> <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8"><TrustBadges /></div>
          </div>

          <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-[2rem] p-8 glass">
            {field("name", "Your name", "text", true, "name")}
            {field("practice", "Practice name", "text", true, "organization")}
            {field("email", "Work email", "email", true, "email")}
            {field("phone", "Phone", "tel", true, "tel")}
            {field("website", "Practice website", "url", false, "url")}
            <p className="text-xs text-muted-foreground">Business contact details only. Please don't share any patient information.</p>

            <label className="flex gap-3 text-sm">
              <input type="checkbox" name="consent_sms_account" className="mt-1 h-4 w-4 shrink-0 accent-primary" />
              <span>
                {CONSENT_SMS} <LegalLinks />
              </span>
            </label>
            <label className="flex gap-3 text-sm">
              <input type="checkbox" name="consent_marketing" className="mt-1 h-4 w-4 shrink-0 accent-primary" />
              <span>{CONSENT_MARKETING}</span>
            </label>

            <button
              type="submit"
              className="w-full rounded-full bg-primary px-7 py-4 text-lg font-bold text-primary-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:bg-primary-deep"
            >
              Book a Free Trial
            </button>
            <p className="text-center text-xs text-muted-foreground">
              Your instant test call is recorded and the recording is sent to the email you provide. <LegalLinks />
            </p>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
