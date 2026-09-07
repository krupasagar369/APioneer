import Link from "next/link";

export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const tagline = variant === "light" ? "text-on-dark-muted" : "text-navy-soft";

  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="aPIONEER Business Solutions — home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo-mark.png"
        alt=""
        className="h-12 w-12 shrink-0 object-contain transition-transform duration-500 group-hover:scale-105 sm:h-20 sm:w-20"
      />
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="font-display text-xl font-extrabold tracking-tight text-gold-gradient sm:text-2xl">
          APIONEER
        </span>
        <span className="text-[0.66rem] font-bold uppercase tracking-[0.14em] text-teal sm:text-xs">
          Business Solutions
        </span>
        <span className={`mt-0.5 hidden text-[0.62rem] italic leading-snug sm:block ${tagline}`}>
          Engineering Growth. Enabling Success.
        </span>
      </span>
    </Link>
  );
}