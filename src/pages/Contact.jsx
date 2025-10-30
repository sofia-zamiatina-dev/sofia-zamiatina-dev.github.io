import { Link } from "react-router-dom";
import { useState } from "react";

import { motion } from "framer-motion";
import { pageFade, riseIn, slideInLeft } from "../animations/simple";

const IconCircle = ({ children }) => (
  <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-border bg-background/50 shadow-sm">
    {children}
  </div>
);

// --- Icons ---
const MailIcon = (props) => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" {...props}>
    <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="m22 8-10 6L2 8" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const GitHubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" {...props}>
    <path
      d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.49v-1.71c-2.78.6-3.37-1.2-3.37-1.2a2.65 2.65 0 0 0-1.11-1.46c-.91-.62.07-.61.07-.61a2.1 2.1 0 0 1 1.53 1.03 2.13 2.13 0 0 0 2.91.83 2.13 2.13 0 0 1 .63-1.34c-2.22-.26-4.56-1.11-4.56-4.92a3.86 3.86 0 0 1 1.03-2.67 3.59 3.59 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.43 9.43 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.37.84.4 1.8.1 2.64a3.86 3.86 0 0 1 1.03 2.67c0 3.82-2.34 4.66-4.57 4.91a2.38 2.38 0 0 1 .68 1.85v2.75c0 .28.18.59.69.49A10 10 0 0 0 12 2Z"
      fill="currentColor"
    />
  </svg>
);

const LinkedInIcon = (props) => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" {...props}>
    <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5Z" fill="currentColor" />
    <path d="M3 9h4v12H3z" fill="currentColor" />
    <path d="M10 9h3.7v1.7h.05A4.06 4.06 0 0 1 18 8.9C21 8.9 21 11.1 21 14.2V21h-4v-6c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21h-4V9Z" fill="currentColor" />
  </svg>
);

// small external-link glyph
const ExternalLinkIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" {...props}>
    <path d="M14 3h7v7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M10 14 21 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M21 14v6a1 1 0 0 1-1 1h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M3 10V4a1 1 0 0 1 1-1h6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// --- Holographic Contact tile (anchor or button) ---
function ContactSquare({
  as = "a",
  href,
  label,
  icon,
  accent = "cyan",
  onClick,
  showExternal = false,
}) {
  const COLORS = {
    sky: { glow: "rgba(56,189,248,0.55)", accent: "rgba(56,189,248,0.35)", textLight: "text-sky-700", textDark: "dark:text-sky-200" },
    violet: { glow: "rgba(167,139,250,0.55)", accent: "rgba(167,139,250,0.35)", textLight: "text-violet-700", textDark: "dark:text-violet-200" },
    amber: { glow: "rgba(251,191,36,0.55)", accent: "rgba(251,191,36,0.35)", textLight: "text-amber-700", textDark: "dark:text-amber-200" },
    pink: { glow: "rgba(236,72,153,0.50)", accent: "rgba(236,72,153,0.30)", textLight: "text-pink-700", textDark: "dark:text-pink-200" },
    blue: { glow: "rgba(59,130,246,0.50)", accent: "rgba(59,130,246,0.30)", textLight: "text-blue-700", textDark: "dark:text-blue-200" },
    gray: { glow: "rgba(156,163,175,0.45)", accent: "rgba(156,163,175,0.25)", textLight: "text-gray-800", textDark: "dark:text-gray-200" },
    cyan: { glow: "rgba(0,255,255,0.50)", accent: "rgba(0,255,255,0.30)", textLight: "text-cyan-700", textDark: "dark:text-cyan-200" },
  };
  const c = COLORS[accent] ?? COLORS.cyan;

  const base =
    "holo-card [--holo-bg:theme(colors.white)] dark:[--holo-bg:rgb(17_17_17)] " +
    // layout
    "relative rounded-2xl px-6 py-7 min-h-[180px] select-none " +
    "flex flex-col items-center justify-center text-center " +
    // subtle frame that adapts to theme
    "ring-1 ring-inset ring-black/10 dark:ring-white/10 " +
    "transition-colors duration-300";

  const LabelRow = () => (
    <div className={["mt-2 text-sm inline-flex items-center gap-1", c.textLight, c.textDark].join(" ")}>
      <span className="break-all">{label}</span>
      {showExternal && (
        <ExternalLinkIcon className="opacity-70 group-hover:opacity-100 transition-opacity" />
      )}
    </div>
  );

  const inner = (
    <div
      className="group relative z-10"
      // set glow color variables
      style={{ "--holo-glow": c.glow, "--holo-accent": c.accent }}
    >
      <IconCircle>
        <div className="opacity-90 group-hover:opacity-100 transition-opacity">{icon}</div>
      </IconCircle>
      <LabelRow />
    </div>
  );

  if (as === "button") {
    return (
      <button
        type="button"
        onClick={onClick}
        className={base + " cursor-copy"}
        title="Click to copy"
        style={{ "--holo-glow": c.glow, "--holo-accent": c.accent }}
      >
        {inner}
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={base}
      style={{ "--holo-glow": c.glow, "--holo-accent": c.accent }}
    >
      {inner}
    </a>
  );
}

export default function Contact() {
  const [toast, setToast] = useState("");

  const copyEmail = async () => {
    const email = "sofia@zamiatina.dev";
    try {
      await navigator.clipboard.writeText(email);
      setToast("Email copied to clipboard");
    } catch {
      setToast("Copy failed — please copy manually");
    } finally {
      setTimeout(() => setToast(""), 2000);
    }
  };

  return (
    <motion.div
      className="p-6 sm:p-10"
      variants={pageFade}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <h1 className="text-2xl font-semibold mb-6">Contact Me</h1>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        variants={riseIn}
        initial="initial"
        animate="animate"
      >
        {/* Email: copy to clipboard */}
        <ContactSquare
          as="button"
          onClick={copyEmail}
          label="Copy email: sofia@zamiatina.dev"
          icon={<MailIcon className="text-red-600" />}
          accent="pink"
          showExternal={false}
        />

        <ContactSquare
          href="https://github.com/sofia-zamiatina-dev"
          label="GitHub"
          icon={<GitHubIcon className="text-black dark:text-white" />}
          accent="gray"
          showExternal={true}
        />

        <ContactSquare
          href="https://www.linkedin.com/in/sofia-zamiatina-763638357/"
          label="LinkedIn"
          icon={<LinkedInIcon className="text-[#0A66C2]" />}
          accent="blue"
          showExternal={true}
        />

      </motion.div>

      {/* Small toast */}
      <div
        aria-live="polite"
        className={[
          "fixed left-1/2 -translate-x-1/2 bottom-6",
          "px-4 py-2 rounded-lg border border-border bg-background/95 backdrop-blur",
          "shadow-lg text-sm transition-opacity",
          toast ? "opacity-100" : "opacity-0 pointer-events-none",
        ].join(" ")}
        role="status"
      >
        {toast}
      </div>

      <motion.div className="mt-4" variants={slideInLeft} initial="initial" animate="animate">
        <Link to="/works" className="text-sm underline opacity-80 hover:opacity-100">
          Go check out my Projects
        </Link>
      </motion.div>

      <motion.div className="mt-4" variants={slideInLeft} initial="initial" animate="animate">
        <Link to="/home" className="text-sm underline opacity-80 hover:opacity-100">
          Go back to Homepage
        </Link>
      </motion.div>
    </motion.div>
  );
}
