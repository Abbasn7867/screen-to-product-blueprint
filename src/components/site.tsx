import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ShieldCheck, Lock, FileCheck2, X, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Billing } from "@/lib/pricing";
import logo from "@/assets/aisc-logo.png.asset.json";

export const LEGAL = {
  privacy: "https://aisolutioncompany.com/privacy-policy",
  terms: "https://aisolutioncompany.com/terms-of-service",
  cookies: "https://aisolutioncompany.com/cookie-policy",
  accessibility: "https://aisolutioncompany.com/accessibility-statement",
};

const ctaBase =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/60";

export function CtaButton({
  size = "md",
  variant = "primary",
  className = "",
  children = "Book a Free Trial",
  plan, billing,
}: {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "light";
  className?: string;
  children?: ReactNode;
  plan?: "receptionist" | "pro" | "full";
  billing?: Billing;
}) {
  const sizes = { sm: "px-5 py-2.5 text-sm", md: "px-7 py-3.5 text-base", lg: "px-9 py-4 text-lg" };
  const variants = {
    primary:
      "bg-primary text-primary-foreground shadow-soft hover:-translate-y-0.5 hover:bg-primary-deep",
    light: "bg-card text-primary hover:-translate-y-0.5 hover:bg-accent-soft",
  };
  return (
    <Link to="/free-trial" search={plan && billing ? { plan, billing } : {}} className={`${ctaBase} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function Logo({ className = "h-9" }: { className?: string }) {
  return <img src={logo.url} alt="AI Solution Company" className={`w-auto ${className}`} />;
}

export function SiteHeader() {
  const [announcement,setAnnouncement]=useState(true);
  const [menu,setMenu]=useState(false);
  const links=[["Problems","problems"],["AI Team","team"],["Test Call","test-call"],["Pricing","pricing"],["FAQ","faq"]];
  return <header className="site-header">
    {announcement && <div className="announcement bg-signature text-on-dark"><p>Launch offer: 14-day free trial · Setup <s>$1,000</s> <strong>$0</strong> · +$250 bonus credits</p><a href="/free-trial" className="font-bold underline underline-offset-4">Book a Free Trial →</a><Button variant="ghost" size="icon" aria-label="Dismiss announcement" className="announcement-close hover:bg-primary/20 hover:text-on-dark" onClick={()=>setAnnouncement(false)}><X size={15}/></Button></div>}
    <div className="navigation glass"><Link to="/" aria-label="AI Solution Company home"><Logo className="h-8 md:h-9"/></Link><nav aria-label="Main" className="hidden lg:flex items-center gap-6 text-sm font-semibold text-muted-foreground">{links.map(([label,id])=><a key={id} href={`/#${id}`} className="hover:text-primary">{label}</a>)}</nav><div className="flex items-center gap-2"><CtaButton size="sm"/><Button variant="ghost" size="icon" aria-label="Toggle navigation" aria-expanded={menu} onClick={()=>setMenu(v=>!v)} className="lg:hidden">{menu?<X size={20}/>:<Menu size={20}/>}</Button></div></div>
    {menu&&<nav aria-label="Mobile navigation" className="mobile-navigation glass">{links.map(([label,id])=><a key={id} href={`/#${id}`} onClick={()=>setMenu(false)}>{label}</a>)}</nav>}
  </header>;
}

export function TrustBadges({ dark = false }: { dark?: boolean }) {
  const items = [
    { icon: ShieldCheck, label: "HIPAA compliant" },
    { icon: Lock, label: "SOC 2 compliant" },
    { icon: FileCheck2, label: "BAA available" },
  ];
  return (
    <ul className="flex flex-wrap gap-3">
      {items.map(({ icon: Icon, label }) => (
        <li
          key={label}
          className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold ${
            dark ? "glass-dark text-on-dark" : "bg-card text-primary shadow-soft"
          }`}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
          {label}
        </li>
      ))}
    </ul>
  );
}

export function LegalLinks({ className = "" }: { className?: string }) {
  return (
    <span className={className}>
      <a href={LEGAL.privacy} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
        Privacy Policy
      </a>{" "}
      ·{" "}
      <a href={LEGAL.terms} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
        Terms of Service
      </a>
    </span>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div className="space-y-4">
          <Logo className="h-10" />
          <p className="text-sm text-muted-foreground">
            The Complete AI Front Office for medical practices. Powered by AI Solution Company.
          </p>
          <TrustBadges />
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="font-bold text-foreground">AI Solution Company</p>
          <nav className="mt-3 flex flex-col gap-2" aria-label="Footer">{[["Problems","problems"],["AI Team","team"],["Test Call","test-call"],["Pricing","pricing"],["FAQ","faq"]].map(([label,id])=><a key={id} href={`/#${id}`}>{label}</a>)}</nav>
          <a href="https://www.aisolutioncompany.com" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block underline hover:text-primary">
            aisolutioncompany.com
          </a>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {[
            ["Privacy Policy", LEGAL.privacy],
            ["Terms of Service", LEGAL.terms],
            ["Cookie Policy", LEGAL.cookies],
            ["Accessibility Statement", LEGAL.accessibility],
          ].map(([l, h]) => (
            <li key={l}>
              <a href={h} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                {l}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="border-t py-5 text-center text-xs text-muted-foreground">
        © AI Solution Company
      </p>
    </footer>
  );
}

export function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("aisc_cookie_choice")) setShow(true);
  }, []);
  if (!show) return null;
  const choose = (v: string) => {
    localStorage.setItem("aisc_cookie_choice", v);
    setShow(false);
    window.dispatchEvent(new Event("aisc-cookie-choice"));
  };
  return (
    <div role="dialog" aria-label="Cookie notice" className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-2xl p-5 glass">
      <p className="text-sm text-foreground">
        We use cookies to run this site. Analytics and ad cookies load only if you accept.{" "}
        <a href={LEGAL.cookies} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
          Cookie Policy
        </a>
      </p>
      <div className="mt-3 flex gap-2">
        <Button onClick={() => choose("accepted")}>
          Accept
        </Button>
        <Button variant="outline" onClick={() => choose("essential")}>
          Essential only
        </Button>
      </div>
    </div>
  );
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
