"use client";

import { useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function useCountUp(target: number, active: boolean, duration = 1600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      // Intentional: skip the count-up animation entirely for reduced-motion users.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);

  return value;
}

export function StatCard({
  value,
  suffix,
  label,
  tone = "light",
  index = 0,
}: {
  value: number;
  suffix: string;
  label: string;
  tone?: "light" | "dark";
  index?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const count = useCountUp(value, inView);
  const dark = tone === "dark";

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${index * 90}ms` }}
      className={`rounded-2xl p-6 text-center transition-all duration-500 md:text-left ${
        dark
          ? "border border-border bg-card shadow-soft"
          : "border border-white/12 bg-white/6 backdrop-blur-xl hover:border-gold/40"
      } ${inView ? "animate-fade-up" : "opacity-0"}`}
    >
      <p className={`font-display text-4xl font-bold tracking-tight xl:text-5xl ${dark ? "text-navy" : "text-on-dark"}`}>
        {count.toLocaleString()}
        <span className="text-gold">{suffix}</span>
      </p>
      <p className={`mt-2.5 text-sm font-medium ${dark ? "text-muted-foreground" : "text-on-dark-muted"}`}>{label}</p>
    </div>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={`${inView ? "animate-fade-up" : "opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}
