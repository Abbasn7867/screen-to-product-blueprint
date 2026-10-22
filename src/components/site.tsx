import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ShieldCheck, Lock, FileCheck2 } from "lucide-react";
import logo from "@/assets/aisc-logo.png.asset.json";

export const LEGAL = {
  privacy: "https://aisolutioncompany.com/privacy-policy",
  terms: "https://aisolutioncompany.com/terms-of-service",
  cookies: "https://aisolutioncompany.com/cookie-policy",
  accessibility: "https://aisolutioncompany.com/accessibility-statement",
};

const ctaBase =
  "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/60";

export function CtaButton({
  size = "md",
  variant = "primary",
  className = "",
  children = "Book a Free Trial",
}: {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "light";
  className?: string;
  children?: ReactNode;
}) {
  const sizes = { sm: "px-5 py-2.5 text-sm", md: "px-7 py-3.5 text-base", lg: "px-9 py-4 text-lg" };
  const variants = {
    primary:
      "bg-primary text-primary-foreground shadow-soft hover:-translate-y-0.5 hover:bg-primary-deep",
    light: "bg-card text-primary hover:-translate-y-0.5 hover:bg-accent-soft",
  };
  return (
    <Link to="/free-trial" className={`${ctaBase} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function Logo({ className = "h-9" }: { className?: string }) {
  return <img src={logo.url} alt="AI Solution Company" className={`w-auto ${className}`} />;
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40">
      <div className="mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 glass md:px-6">
        <Link to="/" aria-label="AI Solution Company home">
          <Logo className="h-8 md:h-9" />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 text-sm font-semibold text-muted-foreground md:flex">
          <a href="/#team" className="hover:text-primary">AI team</a>
          <a href="/#how" className="hover:text-primary">How it works</a>
          <a href="/#pricing" className="hover:text-primary">See pricing</a>
          <a href="/#faq" className="hover:text-primary">FAQ</a>
        </nav>
        <CtaButton size="sm" />
      </div>
    </header>
  );
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
          <p className="mt-2">18605 Kerill Rd, Triangle, VA 22172</p>
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
        © {new Date().getFullYear()} AI Solution Company · Powered by AI Solution Company
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
        <button onClick={() => choose("accepted")} className={`${ctaBase} bg-primary px-5 py-2 text-sm text-primary-foreground`}>
          Accept
        </button>
        <button onClick={() => choose("essential")} className={`${ctaBase} border border-input bg-card px-5 py-2 text-sm text-primary`}>
          Essential only
        </button>
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
        if (e.isIntersecting) {
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
