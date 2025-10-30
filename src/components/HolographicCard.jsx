import { Link } from "react-router-dom";

const COLOR_MAP = {
  sky: {
    glow: "rgba(56,189,248,0.55)",
    accent: "rgba(56,189,248,0.35)",
    titleLight: "text-sky-600",
    titleDark: "dark:text-sky-200",
  },
  violet: {
    glow: "rgba(167,139,250,0.55)",
    accent: "rgba(167,139,250,0.35)",
    titleLight: "text-violet-600",
    titleDark: "dark:text-violet-200",
  },
  amber: {
    glow: "rgba(251,191,36,0.55)",
    accent: "rgba(251,191,36,0.35)",
    titleLight: "text-amber-600",
    titleDark: "dark:text-amber-200",
  },
  cyan: {
    glow: "rgba(0,255,255,0.50)",
    accent: "rgba(0,255,255,0.30)",
    titleLight: "text-cyan-600",
    titleDark: "dark:text-cyan-200",
  },
};

export default function HolographicCard({
  to = "/",
  title,
  desc,
  color = "cyan",
  className = "",
}) {
  const c = COLOR_MAP[color] ?? COLOR_MAP.cyan;

  return (
    <Link to={to} className="block focus:outline-none">
      <div
        className={[
          "holo-card",
          // theme-aware background via CSS var
          "[--holo-bg:theme(colors.white)]",
          "dark:[--holo-bg:rgb(17_17_17)]", // ~ #111
          // subtle frame that flips with theme
          "ring-1 ring-inset ring-black/10 dark:ring-white/10",
          // size & layout
          "h-[200px] md:h-[220px] px-5 py-6 flex flex-col justify-center",
          "transition-colors duration-300",
          className,
        ].join(" ")}
        style={{ "--holo-glow": c.glow, "--holo-accent": c.accent }}
      >
        <div className="relative z-10">
          <h3 className={`text-2xl font-semibold ${c.titleLight} ${c.titleDark}`}>
            {title}
          </h3>
          {desc ? (
            <p className="mt-2 text-sm text-zinc-700 dark:text-foreground/75 leading-relaxed">
              {desc}
            </p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}