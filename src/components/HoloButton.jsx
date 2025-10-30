import { Link } from "react-router-dom";

const TONES = {
  pink:   { glow: "transparent", accent: "rgba(217,70,239,.28)" },
  sky:    { glow: "transparent", accent: "rgba(56,189,248,.32)" },
  violet: { glow: "transparent", accent: "rgba(167,139,250,.32)" },
  amber:  { glow: "transparent", accent: "rgba(251,191,36,.32)" },
  cyan:   { glow: "transparent", accent: "rgba(0,255,255,.30)" },
  blue:   { glow: "transparent", accent: "rgba(59,130,246,.30)" },
};

export default function HoloButton({
  to,             // if set -> renders <Link>
  href,           // if set and no 'to' -> renders <a>
  download,       // pass-through for <a>
  tone = "pink",  // pick from TONES above
  iconLeft,
  iconRight,
  children,
  className = "",
  ...rest
}) {
  const t = TONES[tone] ?? TONES.pink;
  const base =
    "holo-btn overflow-hidden " +
    // compact padding for button look
    "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium " +
    // theme-aware surface (self-contained)
    "[--holo-bg:theme(colors.white)] dark:[--holo-bg:rgb(17_17_17)] " +
    // subtle neutral focus ring (not purple)
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 dark:focus-visible:ring-white/15";

  const style = { "--holo-glow": t.glow, "--holo-accent": t.accent };

  if (to) {
    return (
      <Link to={to} className={`${base} ${className}`} style={style} {...rest}>
        {iconLeft}{children}{iconRight}
      </Link>
    );
  }
  return (
    <a href={href} download={download} className={`${base} ${className}`} style={style} {...rest}>
      {iconLeft}{children}{iconRight}
    </a>
  );
}