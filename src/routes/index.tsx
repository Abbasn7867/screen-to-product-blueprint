import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Phone, CalendarCheck, Clock, Moon, Sparkles, PhoneCall, Settings2, Gift, Check, ArrowRight, Mic,
} from "lucide-react";
import amyScene from "@/assets/amy-medical-scene.jpg";
import { AGENT_PORTRAITS } from "@/lib/agent-portraits";
import { Button } from "@/components/ui/button";
import caduceus from "@/assets/caduceus.jpg.asset.json";
import { CtaButton, Reveal, SiteFooter, SiteHeader, TrustBadges } from "@/components/site";
import { PLANS, formatUSD, priceFor, type Billing } from "@/lib/pricing";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Front Office for Medical Practices | AI Solution Company" },
      {
        name: "description",
        content:
          "Meet Amy and 7 more AI employees who answer calls 24/7, book visits and follow up — so your front desk can focus on patients. Start a 14-day free trial.",
      },
      { property: "og:title", content: "The Complete AI Front Office for Medical Practices" },
      {
        property: "og:description",
        content: "8 AI employees led by Amy, your AI receptionist. 14-day free trial of the full platform, $0 setup during launch.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const AGENTS = [
  { name: "Amy", role: "Receptionist", area: "Calls & Scheduling", dot: "bg-agent-amy",
    pains: ["Calls ringing out during rush hours", "Voicemails piling up after hours", "Patients on hold while staff check in others", "Weekend and holiday calls going unanswered", "Booking, rescheduling and cancellations by phone", "Routine questions about hours, location and insurance", "Clinical questions routed to staff by your protocol"] },
  { name: "Leena", role: "Schedule Optimizer", area: "Provider Schedule Optimization", dot: "bg-agent-leena",
    pains: ["Gaps from late cancellations", "Uneven provider schedules", "Waitlist patients never called back", "Double-booking headaches"] },
  { name: "Morgan", role: "Patient Intake", area: "Patient Intake & Insurance", dot: "bg-agent-morgan",
    pains: ["Paper forms filled out in the lobby", "Missing insurance details at check-in", "Repeated data entry for new patients", "Last-minute paperwork delays"] },
  { name: "Kim", role: "Care Follow-through", area: "Care Follow-through", dot: "bg-agent-kim",
    pains: ["Missed follow-up visits", "Patients unsure of next steps", "Referral appointments never booked", "Manual reminder calls"] },
  { name: "Stephanie", role: "Follow-up", area: "Recalls, Wellness & Reactivation", dot: "bg-agent-stephanie",
    pains: ["Annual wellness visits slipping", "Inactive patients drifting away", "Recall lists nobody has time for", "No-shows never rebooked"] },
  { name: "Elise", role: "Patient Experience", area: "Patient Experience & Reviews", dot: "bg-agent-elise",
    pains: ["Happy patients who never leave a review", "Feedback that arrives too late", "Unanswered online messages", "Inconsistent post-visit check-ins"] },
  { name: "Joseph", role: "Records & Referrals", area: "Faxes, Records & Referrals", dot: "bg-agent-joseph",
    pains: ["Stacks of incoming faxes", "Records requests waiting days", "Referral status calls", "Documents filed to the wrong place"] },
  { name: "Trisha", role: "Practice Manager", area: "Practice Intelligence & Reporting", dot: "bg-agent-trisha",
    pains: ["No clear view of calls and bookings", "Guessing which follow-ups worked", "Reports built by hand"] },
];

function Index() {
  return (
    <div className="overflow-x-clip">
      <SiteHeader />
      <main>
        <Hero />
        <Proof />
        <Team />
        <HowItWorks />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative px-6 pb-20 pt-14 md:pt-20">
      <div className="blob -left-32 top-10 h-96 w-96 bg-accent" aria-hidden="true" />
      <div className="blob -right-20 top-40 h-[28rem] w-[28rem] bg-primary" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 text-sm font-bold text-primary">
            <Sparkles className="h-4 w-4" aria-hidden="true" /> For medical practice owners & managers
          </p>
          <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] md:text-7xl">
            Your front desk, <span className="text-gradient">answered 24/7.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
            Meet Amy and the Complete AI Front Office from AI Solution Company — 8 AI employees who answer
            calls, book visits and follow up, so your team can focus on the patients in front of them.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <CtaButton size="lg">
              Book a Free Trial <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </CtaButton>
            <a href="#pricing" className="font-bold text-primary underline-offset-4 hover:underline">See pricing</a>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            14 days of the full platform · Setup <s>$1,000</s> <strong className="text-foreground">$0</strong> during launch · $250 bonus credits
          </p>
          <div className="mt-8"><TrustBadges /></div>
        </div>

        <div className="relative">
          <div className="tilt overflow-hidden rounded-[2rem] shadow-soft">
            <img
              src={amyScene}
              alt="Amy, a friendly receptionist wearing a headset at a bright medical practice front desk"
              className="aspect-[4/3] w-full object-cover object-[60%_30%]"
            />
          </div>
          <div className="float-y absolute -bottom-10 -left-4 w-72 rounded-2xl p-4 glass md:-left-12">
            <div className="flex items-center gap-2 text-xs font-bold text-primary">
              <img src={amyScene} alt="Amy, AI Receptionist" loading="lazy" className="h-10 w-14 rounded-md object-cover object-[60%_30%]" />
              <Mic className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              Amy · live call · 2:14 AM
            </div>
            <p className="mt-3 text-xs italic text-muted-foreground">"All calls are recorded for quality and training purposes."</p>
            <p className="mt-2 text-sm text-foreground"><strong>Amy:</strong> Thanks for calling! I can book that for you. Does Tuesday at 9:30 work?</p>
          </div>
          <div className="float-y absolute -right-3 -top-6 rounded-2xl px-4 py-3 glass [animation-delay:1.5s]">
            <p className="flex items-center gap-2 text-sm font-bold text-primary">
              <CalendarCheck className="h-4 w-4" aria-hidden="true" /> Visit booked
            </p>
            <p className="text-xs text-muted-foreground">Confirmation sent</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Proof() {
  const items = [
    { icon: Phone, t: "Every call answered", d: "No more rings to voicemail." },
    { icon: Moon, t: "Nights, weekends, holidays", d: "Amy works 24/7." },
    { icon: Clock, t: "Ready in about 10 minutes", d: "Quick Start checklist." },
    { icon: PhoneCall, t: "Instant test call", d: "Your own number in 3–4 minutes." },
  ];
  return (
    <section className="px-6 py-10">
      <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, t, d }, i) => (
          <Reveal key={t} delay={i * 80}>
            <div className="tilt h-full rounded-2xl bg-card p-6 shadow-soft">
              <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
              <p className="mt-4 font-extrabold">{t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Team() {
  const [active, setActive] = useState(0);
  const a = AGENTS[active] ?? AGENTS[0];
  if (!a) return null;
  return (
    <section id="team" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-bold text-accent-foreground"><span className="rounded-full bg-accent-soft px-3 py-1">The AI team</span></p>
          <h2 className="mt-5 max-w-3xl text-4xl font-extrabold md:text-6xl">8 AI employees. One calmer front office.</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Each one owns a part of your day. They support your staff — so people can spend more time with patients in person.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div role="tablist" aria-label="AI employees" className="grid grid-cols-2 gap-3">
            {AGENTS.map((ag, i) => (
              <Button
                variant="ghost"
                key={ag.name}
                role="tab"
                id={`agent-tab-${ag.name}`}
                aria-controls="agent-panel"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`h-auto min-h-24 justify-start whitespace-normal rounded-lg border p-3 text-left transition-all sm:gap-3 sm:p-4 ${
                  i === active ? "border-primary bg-card shadow-soft" : "border-transparent bg-muted hover:bg-card"
                }`}
              >
                <img src={AGENT_PORTRAITS[ag.name]} alt={`${ag.name}, AI ${ag.role}`} loading="lazy" className="h-14 w-12 shrink-0 rounded-md object-cover object-top sm:h-16 sm:w-14" />
                <span className="min-w-0">
                  <span className="block font-extrabold">{ag.name}</span>
                  <span className="block text-sm text-muted-foreground">{ag.role}</span>
                </span>
              </Button>
            ))}
          </div>
          <div role="tabpanel" id="agent-panel" aria-labelledby={`agent-tab-${a.name}`} className="relative overflow-hidden rounded-[2rem] bg-dark-section p-8 text-on-dark md:p-10">
            <div className="flex flex-wrap items-center gap-5">
              <img key={a.name} src={AGENT_PORTRAITS[a.name]} alt={`${a.name}, AI ${a.role}`} loading="lazy" className="h-36 w-28 shrink-0 rounded-lg object-cover object-top shadow-soft" />
              <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <span className={`h-4 w-4 rounded-full ring-4 ring-on-dark/20 ${a.dot}`} aria-hidden="true" />
              <p className="text-sm font-bold uppercase tracking-widest text-on-dark-muted">{a.area}</p>
            </div>
            <h3 className="mt-4 text-4xl font-extrabold">{a.name}, {a.role}</h3>
              </div>
            </div>
            <p className="mt-2 text-on-dark-muted">Owns {a.pains.length} pain points for your practice.</p>
            <ul className="mt-6 space-y-3">
              {a.pains.map((p) => (
                <li key={p} className="flex gap-3 rounded-xl p-3 glass-dark">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" /> {p}
                </li>
              ))}
            </ul>
            {a.name === "Amy" && (
              <p className="mt-6 text-sm text-on-dark-muted">
                Amy never gives medical advice. Emergencies are directed to 911; refill and results requests go to your clinical staff.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: CalendarCheck, t: "Book your free trial", d: "Share your business details. You go straight to your dashboard." },
    { icon: Settings2, t: "Quick Start in about 10 minutes", d: "Hours, services, FAQs, Amy's greeting, scheduling connection and team invites. Tap any agent to change what it says, how it sounds and when it works." },
    { icon: PhoneCall, t: "Hear your instant test call", d: "We assign your own phone number. A test caller asks real questions from your FAQs and Amy answers live. The call is recorded and sent to your email within 3–4 minutes." },
  ];
  return (
    <section id="how" className="scroll-mt-24 bg-card px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="max-w-3xl text-4xl font-extrabold md:text-6xl">Live in minutes. <span className="text-gradient">Not months.</span></h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, t, d }, i) => (
            <Reveal key={t} delay={i * 120}>
              <div className="tilt relative h-full rounded-3xl border bg-background p-8">
                <span className="text-6xl font-extrabold text-gradient">0{i + 1}</span>
                <Icon className="mt-4 h-7 w-7 text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-extrabold">{t}</h3>
                <p className="mt-2 text-muted-foreground">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-3xl bg-accent-soft p-6 md:flex-row md:items-center">
            <p className="font-semibold text-foreground">
              Prefer not to set it up yourself? Share your information and our team configures everything — the{" "}
              <s>$1,000</s> setup is waived during launch.
            </p>
            <CtaButton />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly");
  return (
    <section id="pricing" className="relative scroll-mt-24 px-6 py-24">
      <div className="blob left-1/3 top-20 h-80 w-80 bg-accent" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="text-center">
          <h2 className="text-4xl font-extrabold md:text-6xl">Simple plans. Full platform trial.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Every plan starts with the 14-day free trial, $0 setup (was $1,000) and $250 bonus credits.
          </p>
          <div role="radiogroup" aria-label="Billing period" className="mx-auto mt-8 inline-flex rounded-full bg-card p-1.5 shadow-soft">
            {(["monthly", "yearly"] as const).map((b) => (
              <button
                key={b}
                role="radio"
                aria-checked={billing === b}
                onClick={() => setBilling(b)}
                className={`rounded-full px-6 py-2.5 text-sm font-bold capitalize transition-colors ${
                  billing === b ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </Reveal>

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
                <span className="text-5xl font-extrabold">{formatUSD(priceFor(p.id, billing))}</span>
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
              <CtaButton variant={p.popular ? "light" : "primary"} className="mt-8 w-full" />
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-muted-foreground">
          Need Billing, Credentialing, Eligibility Verification and more?{" "}
          <a href="mailto:hello@aisolutioncompany.com" className="font-bold text-primary underline">Talk to our team</a>
        </p>
        <p className="mx-auto mt-4 max-w-3xl text-center text-sm text-muted-foreground">
          Choose monthly or yearly billing. Monthly plans are month-to-month with no long-term contract — cancel anytime
          before your next billing date. Prefer yearly? Pay annually and save 12% on any plan.
        </p>
      </div>
    </section>
  );
}

function Faq() {
  const faqs: [string, string][] = [
    ["Is the free trial the full product?", "Yes. You get 14 days of the full platform. Nothing is locked during the trial."],
    ["How long does setup take?", "The Quick Start checklist on your dashboard takes about 10 minutes. Or share your information and our team configures everything at no cost during launch."],
    ["Does Amy give medical advice?", "No. Amy handles front-office tasks only. Emergencies are directed to 911, urgent concerns go to your staff or nurse line, and refill or results requests are routed to clinical staff."],
    ["Is it secure?", "AI Solution Company is HIPAA compliant and SOC 2 compliant, and a BAA is available. Everything runs on secure, enterprise-grade cloud infrastructure."],
    ["Are calls recorded?", "Yes. Every call Amy answers opens with \u201CAll calls are recorded for quality and training purposes.\u201D Your instant test call is recorded and sent to the email you provide."],
    ["What are the $250 bonus credits?", "Credits apply to call minutes — roughly 250 minutes of live call time handled by your AI team."],
    ["Can I cancel?", "Monthly plans are month-to-month with no long-term contract. Cancel anytime before your next billing date."],
  ];
  return (
    <section id="faq" className="scroll-mt-24 bg-card px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-4xl font-extrabold md:text-5xl">Questions, answered.</h2>
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="text-left text-lg font-bold">{q}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="px-6 py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-dark-section px-8 py-16 text-on-dark md:px-16">
        <img
          src={caduceus.url}
          alt=""
          aria-hidden="true"
          className="float-y pointer-events-none absolute -right-10 top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 opacity-60 mix-blend-screen md:right-6"
        />
        <div className="relative max-w-2xl">
          <h2 className="text-4xl font-extrabold md:text-6xl">Give your front desk a full team tonight.</h2>
          <p className="mt-5 text-lg text-on-dark-muted">
            14 days of the full platform. <s>$1,000</s> $0 setup during launch. $250 in bonus credits.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <CtaButton size="lg" variant="light">
              <Gift className="h-5 w-5" aria-hidden="true" /> Book a Free Trial
            </CtaButton>
          </div>
          <div className="mt-8"><TrustBadges dark /></div>
        </div>
      </div>
    </section>
  );
}
