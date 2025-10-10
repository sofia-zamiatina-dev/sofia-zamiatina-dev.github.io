import { Link } from "react-router-dom";
import { Heart, Plus, Download, Code2 } from "lucide-react";
import mhcLogo from "../lib/logos/mhc.png";
import unimelbLogo from "../lib/logos/unimelb.jpg";
import { useState, useRef, useLayoutEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { rowLeft, rowRight, dotPop } from "../animations/aboutAnimations";

/* ------------- Timeline Row (simplified) ------------- */
function TimelineRow({
  year,
  title,
  subtitle,
  body,
  side = "left",
  imgSrc,
  imgAlt = "",
  Icon,
  connect = "none",
}) {
  const IconBubble = () => (
    <motion.div
      variants={dotPop}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="flex items-center justify-center w-24 h-24 rounded-full ring-4 ring-blue-400 bg-white dark:bg-background overflow-hidden shadow-sm"
    >
      {imgSrc ? (
        <img src={imgSrc} alt={imgAlt} className="w-full h-full object-contain" />
      ) : Icon ? (
        <Icon className="w-12 h-12 text-blue-600" />
      ) : (
        <span className="w-4 h-4 bg-blue-500 rounded-full" />
      )}
    </motion.div>
  );

  const TextBlock = () => (
    <div className="max-w-xl">
      <div className="text-sm text-gray-500">{year}</div>
      <h3 className="font-semibold">{title}</h3>
      {subtitle && <div className="text-sm text-gray-600 dark:text-gray-300">{subtitle}</div>}
      {body && <p className="mt-1 text-sm text-muted-foreground">{body}</p>}
    </div>
  );

  const leftCellClass = side === "right" ? "relative flex justify-end" : "";
  const rightCellClass = side === "left" ? "relative flex justify-start" : "";
  const rowVariants = side === "left" ? rowLeft : rowRight;

  return (
    <motion.div
      variants={rowVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      exit={{ opacity: 0, y: 8 }}
      className="relative grid grid-cols-[1fr_64px_1fr] items-center gap-8 py-8 first:pt-0"
    >
      {/* LEFT CELL */}
      <div className={leftCellClass}>
        {side === "left" ? (
          <TextBlock />
        ) : (
          <>
            <IconBubble />
            {connect === "left" && (
              <span className="pointer-events-none absolute top-1/2 -translate-y-1/2 -right-16 w-16 h-[2px] bg-blue-400" />
            )}
          </>
        )}
      </div>

      {/* CENTER NODE (static) */}
      <motion.div
        variants={dotPop}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative flex items-center justify-center"
      >
        <div className="relative z-10 w-6 h-6 rounded-full bg-white dark:bg-background ring-4 ring-blue-400" />
      </motion.div>

      {/* RIGHT CELL */}
      <div className={rightCellClass}>
        {side === "left" ? (
          <>
            <IconBubble />
            {connect === "right" && (
              <span className="pointer-events-none absolute top-1/2 -translate-y-1/2 -left-16 w-16 h-[2px] bg-blue-400" />
            )}
          </>
        ) : (
          <TextBlock />
        )}
      </div>
    </motion.div>
  );
}

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

export default function About() {
  const pageRef = useRef(null);

  // We'll point this to the existing <main> scroller (in App.jsx)
  const containerRef = useRef(null);
  const [hasContainer, setHasContainer] = useState(false);

  useLayoutEffect(() => {
    const el = document.querySelector("main"); // your real scroller
    if (el) {
      containerRef.current = el;   // hydrate the ref
      setHasContainer(true);
    }
  }, []);

  // Progress across THIS page/section (drives the vertical line)
  const { scrollYProgress } = useScroll({
    container: hasContainer ? containerRef : undefined,
    target: pageRef,
    offset: ["start start", "end end"],
  });

  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });

  return (
    <motion.div
      ref={pageRef}
      className="p-8 max-w-6xl mx-auto space-y-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Intro */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        exit={{ opacity: 0, y: -8 }}
      >
        <h1 className="text-2xl font-bold mb-2">About Me</h1>
        <p className="text-muted-foreground">
          Master of Software Engineering candidate at the University of Melbourne. I enjoy building
          systems that blend interaction, data, and design. blablablablablablabla
        </p>
        <p className="text-muted-foreground mt-4">See more details below:</p>
      </motion.section>

      {/* Timeline */}
      <section>
        <div className="relative pb-36">
          <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 inset-y-0 w-[3px] bg-border/30 rounded-full" />
          <motion.div
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 inset-y-0 w-[3px] bg-gradient-to-b from-pink-300 via-amber-300 to-blue-300 rounded-full origin-top"
            style={{ scaleY: lineScale }}
          />

          <div className="space-y-48 lg:space-y-48">
            <TimelineRow
              side="left"
              year="2014"
              title="Where I’m from & discovering programming"
              subtitle="Early teenage years"
              body="Built my first small website and got hooked on making interactive things."
              Icon={Code2}
              connect="right"
            />

            <TimelineRow
              side="right"
              year="2020 — 2024"
              title="Bachelor of Computer Science & Economics"
              subtitle="Mount Holyoke College, US"
              body="Core CS courses, math/econ, tutoring, and lots of programming projects."
              imgSrc={mhcLogo}
              imgAlt="Mount Holyoke College"
              connect="left"
            />

            <TimelineRow
              side="left"
              year="2025 — present"
              title="Master of Software Engineering"
              subtitle="University of Melbourne"
              body="Client-facing academic projects + personal project development."
              imgSrc={unimelbLogo}
              imgAlt="University of Melbourne"
              connect="right"
            />
          </div>
        </div>
      </section>

      {/* Bottom sections */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        exit={{ opacity: 0, y: 8 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-semibold mb-4">What I Love</h2>
            <ul className="space-y-2">
              {[
                "Bringing imaginative ideas to life in code or on canvas.",
                "Exploring the blend of technology and creativity.",
                "Storytelling through art, games, and interactive projects.",
                "Learning new frameworks and tools.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Heart className="w-5 h-5 mt-1 text-pink-500 shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">What I Can Do</h2>
            <ul className="space-y-2">
              {[
                "Design and build full-stack web apps (React, databases, Docker).",
                "Develop multiplayer games with Unity and Photon networking.",
                "Create interactive data tools — dashboards, visualizations.",
                "Work with clients & teams to turn ideas into working software.",
                "Write clean, modular code with testing and docs.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Plus className="w-5 h-5 mt-1 text-blue-600 shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        exit={{ opacity: 0, y: 8 }}
      >
        <div className="flex justify-end gap-4">
          <a
            href="/CV.pdf"
            download
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border-2 border-blue-300 bg-blue-50/50 dark:bg-blue-950/30 shadow-sm transition-all duration-200 hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4 text-blue-600" />
            Resume
          </a>
          <Link
            to="/works"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border-2 border-pink-300 bg-pink-50/50 dark:bg-pink-950/30 shadow-sm transition-all duration-200 hover:-translate-y-0.5"
          >
            See my Works
            <Arrow className="w-4 h-4 text-pink-500" />
          </Link>
        </div>
      </motion.section>
    </motion.div>
  );
}
