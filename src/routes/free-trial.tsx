import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { LegalLinks, SiteFooter, SiteHeader, TrustBadges } from "@/components/site";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/data/painPoints";
import { PLANS, formatUSD, priceFor, type Billing } from "@/lib/pricing";
import { CONSENT_MARKETING, CONSENT_SMS, formatUSPhone, leadFormSchema, type LeadForm } from "@/lib/lead-schema";
import { readAttribution } from "@/lib/attribution";
import { submitLead } from "@/lib/leads.functions";

type PlanId = "receptionist" | "pro" | "full";

export const Route = createFileRoute("/free-trial")({
  validateSearch: (search: Record<string, unknown>): { plan?: PlanId | undefined; billing?: Billing | undefined; pains?: string | undefined } => ({
    pains: typeof search["pains"] === "string" && /^[p0-9,]{1,200}$/.test(search["pains"]) ? search["pains"] : undefined,
    plan: search["plan"] === "receptionist" || search["plan"] === "pro" || search["plan"] === "full" ? search["plan"] : undefined,
    billing: search["billing"] === "monthly" || search["billing"] === "yearly" ? search["billing"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Book a Free Trial | AI Solution Company for Medical Practices" },
      { name: "description", content: "Start your 14-day free trial of the full platform. $0 setup (was $1,000), $250 in free credits and an instant test call in 3–4 minutes. No credit card required." },
      { property: "og:title", content: "Start Your 14-Day Free Trial of the Full Platform" },
      { property: "og:description", content: "14 days of the complete AI front office for your medical practice. $0 setup during launch." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FreeTrial,
});

const STEPS: { title: string; fields: (keyof LeadForm)[] }[] = [
  { title: "Your Details", fields: ["name", "business_name", "email", "phone", "website"] },
  { title: "Your Practice", fields: ["locations", "software", "problems"] },
  { title: "Patient Questions", fields: ["sample_questions"] },
  { title: "Consent and Submit", fields: ["consent_sms_account", "consent_marketing", "plan", "billing"] },
];
const LOCATIONS = ["1", "2–3", "4–10", "11+"];
const input = "mt-1.5 w-full rounded-xl border border-input bg-card px-4 py-3 text-foreground focus-visible:border-primary";

function FreeTrial() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const send = useServerFn(submitLead);
  const painIds = (search.pains ?? "").split(",").filter((id) => /^p\d{1,2}$/.test(id));
  const preselected = CATEGORIES.filter((c) => c.items.some((i) => painIds.includes(i.id))).map((c) => c.title);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [serverError, setServerError] = useState("");

  const form = useForm<LeadForm>({
    resolver: zodResolver(leadFormSchema),
    mode: "onTouched",
    defaultValues: {
      name: "", business_name: "", email: "", phone: "", website: "",
      locations: "", software: "", problems: preselected, sample_questions: ["", "", ""],
      consent_sms_account: false, consent_marketing: false,
      plan: search.plan ?? "full", billing: search.billing ?? "monthly",
    },
  });
  const { register, control, watch, trigger, formState: { errors, isSubmitting } } = form;
  const plan = watch("plan");
  const billing = watch("billing");

  const go = async (to: number) => {
    if (to > step) {
      const ok = await trigger(STEPS[step]!.fields, { shouldFocus: true });
      if (!ok) return;
    }
    setDir(to > step ? 1 : -1);
    setStep(to);
  };

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError("");
    try {
      const res = await send({ data: { ...values, pain_ids: painIds, ...readAttribution() } });
      if (!res.ok) { setServerError(res.error); return; }
      navigate({ to: "/thank-you" });
    } catch {
      setServerError("Something went wrong. Please try again.");
    }
  });

  const err = (name: string, msg?: string) => msg ? <p id={`${name}-err`} className="mt-1 text-sm text-destructive">{msg}</p> : null;
  const text = (name: "name" | "business_name" | "email" | "website", label: string, type: string, autoComplete: string, optional = false) => (
    <div>
      <label htmlFor={name} className="block text-sm font-bold">{label} {optional && <span className="font-normal text-muted-foreground">(optional)</span>}</label>
      <input id={name} type={type} autoComplete={autoComplete} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${name}-err` : undefined} className={input} {...register(name)} />
      {err(name, errors[name]?.message)}
    </div>
  );

  return (
    <div className="overflow-x-clip">
      <SiteHeader />
      <main className="relative px-6 py-16">
        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">Start Your 14-Day Free Trial of the <span className="text-gradient">Full Platform</span></h1>
            <div className="mt-8 rounded-[1.5rem] bg-accent-soft p-6">
              <ul className="space-y-3 font-semibold">
                {[<>$0 setup (was <s>$1,000</s>)</>, <>+$250 in free credits</>, <>Instant test call in 3–4 minutes</>].map((t, i) => (
                  <li key={i} className="flex gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" /><span>{t}</span></li>
                ))}
              </ul>
            </div>
            <div className="mt-8"><TrustBadges /></div>
          </div>

          <form onSubmit={onSubmit} noValidate className="rounded-[2rem] p-8 glass" aria-label="Book a Free Trial">
            <div className="mb-6">
              <div className="flex justify-between text-sm font-bold"><span>Step {step + 1} of {STEPS.length}: {STEPS[step]!.title}</span><span>{Math.round(((step + 1) / STEPS.length) * 100)}%</span></div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuemin={1} aria-valuemax={STEPS.length} aria-valuenow={step + 1} aria-label="Form progress">
                <motion.div className="h-full rounded-full bg-primary" animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
              </div>
            </div>
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.div key={step} custom={dir} initial={reduce ? false : { x: dir * 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={reduce ? { opacity: 0 } : { x: dir * -40, opacity: 0 }} transition={{ duration: 0.25 }} className="space-y-5">
                  {step === 0 && <>
                    {text("name", "Your name", "text", "name")}
                    {text("business_name", "Practice name", "text", "organization")}
                    {text("email", "Work email", "email", "email")}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold">Mobile phone</label>
                      <Controller control={control} name="phone" render={({ field }) => (
                        <input id="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="(555) 555-5555" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-err" : undefined} className={input} value={field.value} onBlur={field.onBlur} onChange={(e) => field.onChange(formatUSPhone(e.target.value))} />
                      )} />
                      {err("phone", errors.phone?.message)}
                    </div>
                    {text("website", "Website", "url", "url", true)}
                    <p className="text-xs text-muted-foreground">Business contact details only. Please don't share any patient information.</p>
                  </>}
                  {step === 1 && <>
                    <fieldset>
                      <legend className="text-sm font-bold">Number of locations</legend>
                      <Controller control={control} name="locations" render={({ field }) => (
                        <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Number of locations">
                          {LOCATIONS.map((l) => <button type="button" role="radio" aria-checked={field.value === l} key={l} onClick={() => field.onChange(l)} className={`rounded-full border px-5 py-2 font-bold transition ${field.value === l ? "border-primary bg-primary text-primary-foreground" : "border-input bg-card hover:border-primary"}`}>{l}</button>)}
                        </div>
                      )} />
                      {err("locations", errors.locations?.message)}
                    </fieldset>
                    <div>
                      <label htmlFor="software" className="block text-sm font-bold">Current scheduling or practice-management software <span className="font-normal text-muted-foreground">(optional)</span></label>
                      <input id="software" className={input} {...register("software")} />
                    </div>
                    <fieldset>
                      <legend className="text-sm font-bold">Biggest front-office problems</legend>
                      <Controller control={control} name="problems" render={({ field }) => (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {CATEGORIES.map((c) => {
                            const on = field.value.includes(c.title);
                            return <button type="button" key={c.id} aria-pressed={on} onClick={() => field.onChange(on ? field.value.filter((t) => t !== c.title) : [...field.value, c.title])} className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-bold transition ${on ? "border-primary bg-primary text-primary-foreground" : "border-input bg-card hover:border-primary"}`}>{on && <Check size={14} />}{c.title}</button>;
                          })}
                        </div>
                      )} />
                    </fieldset>
                  </>}
                  {step === 2 && <>
                    <p className="text-sm font-bold">Top questions your patients ask <span className="font-normal text-muted-foreground">(optional)</span></p>
                    <p className="rounded-lg bg-muted p-3 text-sm">General questions only. Please don't include any patient names or personal details.</p>
                    {[0, 1, 2].map((i) => (
                      <div key={i}>
                        <label htmlFor={`q${i}`} className="block text-sm font-bold">Question {i + 1}</label>
                        <input id={`q${i}`} maxLength={200} className={input} {...register(`sample_questions.${i}` as const)} />
                      </div>
                    ))}
                  </>}
                  {step === 3 && <>
                    <div className="rounded-xl bg-card p-4">
                      <p className="text-sm font-bold">Your plan</p>
                      <Controller control={control} name="plan" render={({ field }) => (
                        <div className="mt-2 grid grid-cols-3 gap-2" role="radiogroup" aria-label="Plan">
                          {PLANS.map((p) => <button type="button" role="radio" aria-checked={field.value === p.id} key={p.id} onClick={() => field.onChange(p.id)} className={`rounded-xl border px-2 py-2 text-sm font-bold ${field.value === p.id ? "border-primary bg-primary text-primary-foreground" : "border-input"}`}>{p.name}</button>)}
                        </div>
                      )} />
                      <Controller control={control} name="billing" render={({ field }) => (
                        <div className="mt-3 inline-flex rounded-full bg-muted p-1" role="radiogroup" aria-label="Billing period">
                          {(["monthly", "yearly"] as const).map((b) => <button type="button" role="radio" aria-checked={field.value === b} key={b} onClick={() => field.onChange(b)} className={`rounded-full px-4 py-1.5 text-sm font-bold capitalize ${field.value === b ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>{b}</button>)}
                        </div>
                      )} />
                      <p className="mt-3"><strong className="text-2xl">{formatUSD(priceFor(plan, billing))}</strong>/month{billing === "yearly" && <span className="text-sm text-muted-foreground"> · billed yearly</span>}</p>
                    </div>
                    <label className="flex gap-3 text-sm"><input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-primary" {...register("consent_sms_account")} /><span>{CONSENT_SMS}</span></label>
                    <label className="flex gap-3 text-sm"><input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-primary" {...register("consent_marketing")} /><span>{CONSENT_MARKETING}</span></label>
                    <p className="text-sm">After setup, your instant test call is recorded and the recording is emailed to you.</p>
                    <p className="text-xs text-muted-foreground"><LegalLinks /></p>
                    {serverError && <p role="alert" className="text-sm text-destructive">{serverError}</p>}
                  </>}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-8 flex items-center gap-3">
              {step > 0 && <Button type="button" variant="ghost" onClick={() => go(step - 1)} className="font-bold"><ArrowLeft size={16} /> Back</Button>}
              {step < STEPS.length - 1 ? (
                <Button type="button" onClick={() => go(step + 1)} className="ml-auto rounded-full px-7 py-5 font-bold">Continue <ArrowRight size={16} /></Button>
              ) : (
                <button type="submit" disabled={isSubmitting} className="ml-auto rounded-full bg-primary px-7 py-4 text-lg font-bold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 hover:bg-primary-deep disabled:opacity-60">
                  {isSubmitting ? "Booking…" : "Book a Free Trial"}
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
