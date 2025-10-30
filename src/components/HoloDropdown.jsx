import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const panelVariants = {
  initial: { opacity: 0, y: -4, scale: 0.98 },
  open:    { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.18, ease: "easeOut" } },
  close:   { opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.16, ease: "easeIn" } },
};

export function HoloDropdownPanel({
  children,
  left = 0,
  tone = "pink",
  className = "",
  style,
  state = "open", // "open" | "close" (drives reverse shimmer)
}) {
  const tones = {
    pink:   { glow: "transparent", accent: "rgba(217,70,239,.28)" },
    sky:    { glow: "transparent", accent: "rgba(56,189,248,.32)" },
    violet: { glow: "transparent", accent: "rgba(167,139,250,.32)" },
    amber:  { glow: "transparent", accent: "rgba(251,191,36,.32)" },
  };
  const c = tones[tone] ?? tones.pink;

  return (
    <motion.div
      role="menu"
      className={`holo-menu z-[60] ${className}`}
      data-state={state}
      style={{
        left,
        "--holo-menu-bg": "var(--panel-surface)", // same surface as button
        "--holo-menu-glow": c.glow,               // no outer glow
        "--holo-menu-accent": c.accent,
        ...style,
      }}
      variants={panelVariants}
      initial="initial"
      animate={state === "open" ? "open" : "close"}
    >
      <ul className="holo-list">{children}</ul>
    </motion.div>
  );
}

export function HoloDropdownItem({ to, onSelect, active, icon, children }) {
  return (
    <li>
      <Link
        to={to}
        onClick={onSelect}
        role="menuitem"
        className={`holo-item ${active ? "font-medium" : ""}`}
      >
        {icon}
        <span>{children}</span>
      </Link>
    </li>
  );
}
