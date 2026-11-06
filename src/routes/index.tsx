import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import {
  Clock, Check, ArrowRight,
} from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { PainSection, TeamSection } from "@/components/pain-section";
import { CallPlayer } from "@/components/call-player";
import { IntroVideoSection, WatchIntroButton } from "@/components/intro-video";
import { TestCall, ActionSection, DayTimeline, Comparison, Dashboard, Compliance, Process, Services } from "@/components/flagship-sections";
import { Configurator } from "@/components/configurator";
import { PricingPlans } from "@/components/pricing-plans";
import { OfferLine } from "@/components/site-offers";
import amyScene from "@/assets/amy-medical-scene-silver.jpg";
import caduceus from "@/assets/caduceus.jpg.asset.json";
import { CtaButton, Reveal, SiteFooter, SiteHeader, TrustBadges } from "@/components/site";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Front Office for Medical Practices | AI Solution Company" },
      {
        name: "description",
        content:
          "Meet Annie and 7 more AI employees who answer calls 24/7, book visits and follow up — so your front desk can focus on patients. Start a 14-day free trial.",
      },
      { property: "og:title", content: "The Complete AI Front Office for Medical Practices" },
      {
        property: "og:description",
        content: "8 AI employees led by Annie, your AI receptionist. 14-day free trial of the full platform, $0 setup during launch.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
 return <div className="overflow-x-clip"><SiteHeader/><main><Hero/><div className="trust-strip"><TrustBadges/><span className="flex items-center gap-2 font-bold text-primary"><Clock size={17}/>24/7</span><span className="text-sm font-semibold">Your own number in minutes</span></div><PainSection/><Configurator/><TeamSection/><IntroVideoSection/><TestCall/><ActionSection/><DayTimeline/><Comparison/><Dashboard/><Process/><Compliance/><Services/><PricingPlans/><Faq/><FinalCta/></main><SiteFooter/></div>;
}
function Hero() {
 const ref=useRef<HTMLElement>(null);
 const { scrollYProgress }=useScroll({target:ref,offset:["start start","end start"]});
 const parallax=useTransform(scrollYProgress,[0,1],[0,32]);
 const reduce=useReducedMotion();
 const move=(e:React.MouseEvent<HTMLElement>)=>{const r=e.currentTarget.getBoundingClientRect();ref.current?.style.setProperty('--mouse-x',`${(e.clientX-r.left-r.width/2)/80}deg`);ref.current?.style.setProperty('--mouse-y',`${-(e.clientY-r.top-r.height/2)/80}deg`);};
 return <section className="flagship-hero" ref={ref} onMouseMove={move} onMouseLeave={()=>{ref.current?.style.setProperty('--mouse-x','0deg');ref.current?.style.setProperty('--mouse-y','0deg');}}>
  <div className="page-width hero-content"><div className="hero-copy"><p className="eyebrow">AI Solution Company / Medical Practices</p><h1>Every Patient Call Answered, Every Visit Booked, So Your Team Can Focus on the Patients in Front of Them.</h1><p className="hero-subhead">Meet Annie and the AI Front Office team: 8 AI employees that answer, book, follow up and report for your practice, 24/7.</p><div className="mt-7 flex flex-wrap items-center gap-5"><CtaButton size="lg">Book a Free Trial <ArrowRight size={18}/></CtaButton><WatchIntroButton/></div><p className="mt-4 text-sm font-medium">14-day free trial · No credit card required · Setup $1,000 → $0 · +$250 in free credits</p></div><div className="hero-frame"><img src={amyScene} alt="Annie, AI Receptionist at a bright medical practice front desk with a silver monitor" className="person-photo hero-photo" style={{'--focus':'50% 18%'} as React.CSSProperties}/><div className="hero-live"><CallPlayer compact/><motion.div className="hero-notifications" style={{y:reduce?0:parallax}}>{['New patient booked ✓','Insurance checked ✓','Reminder sent ✓','Review request sent ✓'].map((n,i)=><motion.div key={n} initial={{y:16,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:.5+i*.3}} className={`hero-notification notification-${i} glass`}><Check size={14} className="text-agent-amy"/>{n}</motion.div>)}</motion.div></div></div></div>
 </section>;
}

function Faq() {
  const faqs: [string, string][] = [
    ["What is the instant test call?", "After setup, our test caller rings Annie on your own booking line and asks your practice's FAQs. Your test call recording arrives on your dashboard and in your inbox within 3–4 minutes of setup."],
    ["Which calendar or practice software works with Annie?", "Annie works with the calendar and practice-management software you already use; we connect it during setup. Ask us about yours."],
    ["Can Annie transfer calls to staff?", "Yes. Annie recognizes a transfer request and routes the call to the right staff member with the reason logged, following your practice's rules."],
    ["What happens after the trial?", "Your free trial lasts 14 days or until your $250 in free credits are used. If you don't choose a plan, your account is paused and the trial number is released. No credit card is needed to start."],
    ["Is the free trial the full product?", "Your free trial is the full Receptionist plan: Annie answers your calls, books visits and sends reminders on your own booking line. When you activate Receptionist, you can try Pro free for 14 days, and when you activate Pro, you can try Elite free for 14 days."],
    ["How long does setup take?", "Get Set Up in Minutes: the Setup Wizard walks you through each step. Or share your information and our team configures everything at no cost during launch."],
    ["Does Annie give medical advice?", "No. Annie handles front-office tasks only. Emergencies are directed to 911, urgent concerns go to your staff or nurse line, and refill or results requests are routed to clinical staff."],
    ["Is it secure?", "AI Solution Company is HIPAA compliant and SOC 2 compliant, and a BAA is available. Everything runs on secure, enterprise-grade cloud infrastructure."],
        ["What are the $250 in free credits?", "Every new account gets $250 in free credits to use during the trial. Your free trial lasts 14 days or until your $250 in free credits are used."],
    ["Can I cancel?", "Monthly plans: yes, anytime before your next billing date. Yearly plans are a 12-month agreement billed quarterly."],
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
 return <section className="final-cta bg-signature px-6 py-20 text-on-dark"><div className="page-width relative"><img src={caduceus.url} alt="" aria-hidden="true" loading="lazy" className="final-symbol"/><div className="relative max-w-3xl"><h2 className="text-4xl font-extrabold md:text-6xl">Your Patients Are Calling. Let Annie Answer.</h2><div className="mt-8"><CtaButton variant="light" size="lg"/></div><p className="mt-5 text-sm"><OfferLine/></p></div></div></section>;
}
