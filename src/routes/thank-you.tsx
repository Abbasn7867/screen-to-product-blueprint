import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Building2, CalendarClock, ClipboardList, CreditCard, DoorOpen, Link2, MessageSquare, Stethoscope, Users } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site";
import { SETUP_STEPS } from "@/data/setupSteps";

const SETUP_URL = "https://aisolutioncompany.com/practice/setup";
const MAILTO = "mailto:info@aisolutioncompany.com?subject=Please%20set%20up%20my%20AI%20front%20office";
const SECONDS = 4;
const ICONS = [Building2, Stethoscope, CalendarClock, ClipboardList, DoorOpen, CreditCard, MessageSquare, Users, Link2];
// Brand palette plus bright accents for the confetti shower.
const CONFETTI = ["#0E4D64", "#FF7A59", "#F5FAFB", "#2B6E63", "#3E7CB8", "#FFD23F", "#C2678D", "#5FA88A", "#6B5B95"];

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Your Free Trial Is Booked | AI Solution Company" },
      { name: "description", content: "Your 14-day free trial is booked. Next, the Setup Wizard gets your AI front office live." },
      { property: "og:title", content: "Your Free Trial Is Booked" },
      { property: "og:description", content: "Next stop: the Setup Wizard for your AI front office." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ThankYou,
});

function ThankYou() {
  const [left, setLeft] = useState(SECONDS);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let stop = false;
    import("canvas-confetti").then(({ default: confetti }) => {
      const end = Date.now() + 3000;
      const frame = () => {
        if (stop) return;
        confetti({ particleCount: 7, startVelocity: 25, spread: 180, gravity: 0.9, ticks: 300, origin: { x: Math.random(), y: -0.05 }, colors: CONFETTI, disableForReducedMotion: true });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    });
    return () => { stop = true; };
  }, []);

  useEffect(() => {
    const t = window.setInterval(() => {
      if (pausedRef.current) return;
      setLeft((s) => {
        if (s <= 1) { window.clearInterval(t); window.location.href = SETUP_URL; return 0; }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(t);
  }, []);

  const pause = () => { pausedRef.current = true; setPaused(true); };
  const r = 26, c = 2 * Math.PI * r;
  const steps = SETUP_STEPS.filter((s) => s.title !== "You're All Set");

  return (
    <div className="overflow-x-clip">
      <SiteHeader />
      <main className="px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold md:text-6xl">Your free trial is booked!</h1>
          <p className="mt-4 text-lg text-muted-foreground">Taking you to the Setup Wizard to get your AI front office live…</p>
          <div className="mt-8 flex flex-col items-center gap-5">
            {!paused && (
              <svg width="64" height="64" viewBox="0 0 64 64" role="timer" aria-label={`Redirecting in ${left} seconds`}>
                <circle cx="32" cy="32" r={r} fill="none" stroke="var(--muted)" strokeWidth="6" />
                <circle cx="32" cy="32" r={r} fill="none" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - left / SECONDS)} transform="rotate(-90 32 32)" style={{ transition: "stroke-dashoffset 1s linear" }} />
                <text x="32" y="38" textAnchor="middle" fontSize="18" fontWeight="800" fill="var(--foreground)">{left}</text>
              </svg>
            )}
            <a href={SETUP_URL} className="rounded-full bg-primary px-9 py-4 text-lg font-bold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 hover:bg-primary-deep">Start Setup Now</a>
          </div>
        </div>

        <section className="mx-auto mt-16 max-w-4xl rounded-[2rem] bg-card p-8 shadow-soft">
          <h2 className="text-3xl font-extrabold">What Happens Next — Get Set Up in Minutes</h2>
          <ol className="mt-6 grid gap-3 sm:grid-cols-3">
            {steps.map((s, i) => {
              const Icon = ICONS[i] ?? Building2;
              return (
                <li key={s.title} className="flex items-center gap-3 rounded-xl border border-border p-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-primary"><Icon size={18} /></span>
                  <span className="text-sm font-bold">{i + 1}. {s.title}{s.optional && <span className="font-normal text-muted-foreground"> (optional)</span>}</span>
                </li>
              );
            })}
          </ol>
          <p className="mt-6 text-muted-foreground">Then your practice gets its own booking line, and our test caller rings Amy. The call is recorded, and the recording appears on your dashboard and is emailed to you within 3–4 minutes.</p>
          <a href={MAILTO} onClick={pause} className="mt-6 inline-block text-sm font-semibold text-primary underline underline-offset-4">
            Prefer not to set it up yourself? Share your information and our team configures everything — the <s>$1,000</s> setup is waived during launch.
          </a>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
