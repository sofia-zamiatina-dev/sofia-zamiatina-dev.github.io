import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeDown, cardsStagger, cardItem } from "../animations/homeAnimations";

const Arrow = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
    <path
      d="M5 12h12M13 6l6 6-6 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function HomeCard({ to, title, desc, color }) {
  const theme = {
    sky: {
      border: "border-sky-300",
      glow: "shadow-[0_10px_24px_rgba(56,189,248,0.25)]",
      bg: "bg-sky-50/50 dark:bg-sky-950/30",
      text: "text-sky-800 dark:text-sky-200",
    },
    violet: {
      border: "border-violet-400",
      glow: "shadow-[0_10px_24px_rgba(139,92,246,0.25)]",
      bg: "bg-violet-50/50 dark:bg-violet-950/30",
      text: "text-violet-800 dark:text-violet-200",
    },
    amber: {
      border: "border-amber-300",
      glow: "shadow-[0_10px_24px_rgba(251,191,36,0.25)]",
      bg: "bg-amber-50/50 dark:bg-amber-950/30",
      text: "text-amber-800 dark:text-amber-200",
    },
  }[color];

  return (
    <Link
      to={to}
      className={[
        "group relative rounded-xl p-5",
        "border-2 transition-all duration-200",
        theme.border,
        theme.bg,
        theme.glow,
        "hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        "flex flex-col justify-between min-h-[200px]",
      ].join(" ")}
    >
      {/* Top content */}
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className={["mt-3 text-sm leading-relaxed", theme.text].join(" ")}>
          {desc}
        </p>
      </div>

      {/* Bottom-right arrow */}
      <div className="self-end mt-6">
        <Arrow className="opacity-70 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="p-8 md:p-10 max-w-5xl text-foreground bg-background min-h-screen">
      <motion.h1
        className="text-3xl md:text-4xl font-semibold mb-6"
        initial="hidden"
        animate="visible"
        variants={fadeDown}
      >
        Hi, I’m Sofia.
      </motion.h1>

      <motion.p
        className="text-foreground/80 leading-relaxed mb-8 max-w-5xl"
        initial="hidden"
        animate="visible"
        variants={fadeDown}
        transition={{ delay: 0.08 }} // tiny offset after the title
      >
        I build interactive software and playful experiences. Pick a card to explore my work, learn about me, or get in touch.
      </motion.p>

      {/* Cards */}
      <motion.div
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={cardsStagger}
      >
        <motion.div variants={cardItem}>
          <HomeCard
            to="/works"
            title="Explore Works"
            desc="Selected projects across web, games, and ML—short write-ups, stacks, and demos."
            color="sky"
          />
        </motion.div>

        <motion.div variants={cardItem}>
          <HomeCard
            to="/about"
            title="About Me"
            desc="Background, values, and what I’m learning at UniMelb. Quick timeline + skills."
            color="violet"
          />
        </motion.div>

        <motion.div variants={cardItem}>
          <HomeCard
            to="/contact"
            title="Contact"
            desc="Reach out for collaborations, freelance work, or a friendly chat."
            color="amber"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
