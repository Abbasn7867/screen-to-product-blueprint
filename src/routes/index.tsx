import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  Clock, Check, ArrowRight,
} from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { PainSection, TeamSection } from "@/components/pain-section";
import { CallPlayer } from "@/components/call-player";
import { IntroVideoSection, WatchIntroButton } from "@/components/intro-video";
import { TestCall, ActionSection, DayTimeline, Comparison, Dashboard, Compliance, Process, Services } from "@/components/flagship-sections";
import { OfferLine } from "@/components/site-offers";
import amyScene from "@/assets/amy-medical-scene-silver.jpg";
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

function Index() {
 return <div className="overflow-x-clip"><SiteHeader/><main><Hero/><div className="trust-strip"><TrustBadges/><span className="flex items-center gap-2 font-bold text-primary"><Clock size={17}/>24/7</span><span className="text-sm font-semibold">Your own number in minutes</span></div><PainSection/><TeamSection/><IntroVideoSection/><TestCall/><ActionSection/><DayTimeline/><Comparison/><Dashboard/><Process/><Compliance/><Services/><Pricing/><Faq/><FinalCta/></main><SiteFooter/></div>;
}
function Hero() {
 const ref=useRef<HTMLElement>(null);
 const { scrollYProgress }=useScroll({target:ref,offset:["start start","end start"]});
 const parallax=useTransform(scrollYProgress,[0,1],[0,32]);
 const reduce=useReducedMotion();
 const move=(e:React.MouseEvent<HTMLElement>)=>{const r=e.currentTarget.getBoundingClientRect();ref.current?.style.setProperty('--mouse-x',`${(e.clientX-r.left-r.width/2)/80}deg`);ref.current?.style.setProperty('--mouse-y',`${-(e.clientY-r.top-r.height/2)/80}deg`);};
 return <section className="flagship-hero" ref={ref} onMouseMove={move} onMouseLeave={()=>{ref.current?.style.setProperty('--mouse-x','0deg');ref.current?.style.setProperty('--mouse-y','0deg');}}>
  <img src={amyScene} alt="Amy, AI Receptionist at a bright medical practice front desk with a silver monitor" className="hero-photo"/>
  <div className="hero-scrim"/><div className="page-width hero-content"><div className="hero-copy"><p className="eyebrow">AI Solution Company / Medical Practices</p><h1>Every Patient Call Answered, Every Visit Booked, So Your Team Can Focus on the Patients in Front of Them.</h1><p className="hero-subhead">Meet Amy and the AI Front Office team: 8 AI employees that answer, book, follow up and report for your practice, 24/7.</p><div className="mt-7 flex flex-wrap items-center gap-5"><CtaButton size="lg">Book a Free Trial <ArrowRight size={18}/></CtaButton><WatchIntroButton/><a href="#pricing" className="font-bold text-primary underline underline-offset-4">See Pricing</a></div><p className="mt-4 text-sm font-medium">14 days free · $0 setup (was $1,000) · $250 bonus credits</p></div><div className="hero-live"><CallPlayer compact/><motion.div className="hero-notifications" style={{y:reduce?0:parallax}}>{['New patient booked ✓','Insurance checked ✓','Reminder sent ✓','Review request sent ✓'].map((n,i)=><motion.div key={n} initial={{y:16,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:.5+i*.3}} className={`hero-notification notification-${i} glass`}><Check size={14} className="text-agent-amy"/>{n}</motion.div>)}</motion.div></div></div>
 </section>;
}

function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly");
  return (
    <section id="pricing" className="relative scroll-mt-24 px-6 py-24">

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="text-center">
          <h2 className="text-4xl font-extrabold md:text-6xl">Simple Plans. Full Platform Trial.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Every plan starts with the full-platform trial. Nothing locked.
          </p>
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

function Faq() {
  const faqs: [string, string][] = [
    ["What is the instant test call?", "After setup, our test caller rings Amy on your own booking line and asks your practice's FAQs. Your test call recording arrives on your dashboard and in your inbox within 3–4 minutes of setup."],
    ["Which calendar or practice software works with Amy?", "Amy works with the calendar and practice-management software you already use; we connect it during setup. Ask us about yours."],
    ["Can Amy transfer calls to staff?", "Yes. Amy recognizes a transfer request and routes the call to the right staff member with the reason logged, following your practice's rules."],
    ["What happens after the trial?", "Choose the plan and billing period that fit your practice. Monthly plans are month-to-month with no long-term contract — cancel anytime before your next billing date. Prefer yearly? Pay annually and save 12% on any plan."],
    ["Is the free trial the full product?", "Yes. You get 14 days of the full platform. Nothing is locked during the trial."],
    ["How long does setup take?", "Get Set Up in Minutes: the Setup Wizard walks you through each step. Or share your information and our team configures everything at no cost during launch."],
    ["Does Amy give medical advice?", "No. Amy handles front-office tasks only. Emergencies are directed to 911, urgent concerns go to your staff or nurse line, and refill or results requests are routed to clinical staff."],
    ["Is it secure?", "AI Solution Company is HIPAA compliant and SOC 2 compliant, and a BAA is available. Everything runs on secure, enterprise-grade cloud infrastructure."],
        ["What are the $250 bonus credits?", "Your $250 bonus credits are applied to call minutes, roughly 250 minutes of live calls handled by your AI team."],
    ["Can I cancel?", "Choose monthly or yearly billing. Monthly plans are month-to-month with no long-term contract — cancel anytime before your next billing date. Prefer yearly? Pay annually and save 12% on any plan."],
  ];
  return (
    <section id="faq" className="scroll-mt-24 bg-card px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-4xl font-extrabold md:text-5xl">Questions, Answered.</h2>
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
 return <section className="final-cta bg-signature px-6 py-20 text-on-dark"><div className="page-width relative"><img src={caduceus.url} alt="" aria-hidden="true" loading="lazy" className="final-symbol"/><div className="relative max-w-3xl"><h2 className="text-4xl font-extrabold md:text-6xl">Your Patients Are Calling. Let Amy Answer.</h2><div className="mt-8"><CtaButton variant="light" size="lg"/></div><p className="mt-5 text-sm"><OfferLine/></p></div></div></section>;
}
