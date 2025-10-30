import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GallerySlider from "../components/GallerySlider.jsx";

/* brand icons */
import {
  SiReact,
  SiDocker,
  SiMongodb,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiFigma,
  SiUnity,
  SiApple,
} from "react-icons/si";
import {
  BrainCircuit,
  Briefcase,
  Handshake,
  Sigma,
  BarChart3,
  TrendingUp,
  Banknote,
  Code2,
  MessageSquareText,
  Megaphone,
  GraduationCap,
  UserCheck,
} from "lucide-react";
import { TbBrandCSharp } from "react-icons/tb";
import { FaJava } from "react-icons/fa6";

/* generic icons for non-brands */
import { Cloud, Database, Repeat2, ListChecks, Palette, TestTube2 } from "lucide-react";

const backdrop = { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } };
const panel = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: "tween", duration: 0.25 } },
  exit: { opacity: 0, y: 16, transition: { duration: 0.2 } },
};

/* -------------------------------------------
   ICON MAPPING (brand-first, sensible fallbacks)
-------------------------------------------- */
const ICONS = {
  // tooling / web
  react: SiReact,
  tailwind: SiTailwindcss,
  docker: SiDocker,
  javascript: SiJavascript,
  js: SiJavascript,
  typescript: SiTypescript,
  ts: SiTypescript,
  mongodb: SiMongodb,
  db: Database,

  // languages
  python: SiPython,
  java: FaJava,
  csharp: TbBrandCSharp,

  // platforms / design / game
  ios: SiApple,
  figma: SiFigma,
  design: Palette,
  unity: SiUnity,

  // process
  agile: Repeat2,
  scrum: ListChecks,

  // networking / real-time
  photon: Cloud,

  // quality
  testing: TestTube2,
  test: TestTube2,

  "ai-ml": BrainCircuit,
  "client-project-1": Briefcase,
  "client-project-2": Handshake,
  algorithms: Sigma,
  statistics: BarChart3,
  econometrics: TrendingUp,
  "economics-business": Banknote,
  "software-dev": Code2,
  feedback: MessageSquareText,
  communication: Megaphone,
  teaching: GraduationCap,
  adapting: Repeat2,
  mentoring: UserCheck,
};

/* ------------------- Skill Bubble -------------------
   - icon-only bubble
   - animated hover card (title + info)
----------------------------------------------------- */
const bubbleVariants = {
  rest: {
    scale: 1,
    transition: {
      scale: { type: "spring", stiffness: 280, damping: 22 },
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      scale: { type: "spring", stiffness: 280, damping: 22 },
    },
  },
};

const iconVariants = {
  rest: { opacity: 1, y: 0, scale: 1 },
  hover: { opacity: 0, y: -6, scale: 1.03, transition: { duration: 0.18, ease: "easeOut" } },
};

const textVariants = {
  rest: { opacity: 0, y: 8, scale: 0.98 },
  hover: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 18 } },
};

function SkillBubble({ iconName, label, info }) {
  const Icon =
    ICONS[iconName?.toLowerCase?.()] ||
    ICONS[label?.toLowerCase?.()] ||
    Database;

  return (
    <motion.div
      className="group relative w-full flex items-center justify-center"
      initial="rest"
      animate="rest"
      whileHover="hover"
    >
      {/* squared tile bubble */}
      <motion.div
        variants={bubbleVariants}
        className="
          relative
          w-full h-24 md:h-28
          rounded-2xl border border-border bg-muted/60
          overflow-hidden
        "
      >
        {/* icon layer */}
        <motion.div
          variants={iconVariants}
          className="absolute inset-0 grid place-items-center"
        >
          <Icon className="w-10 h-10 md:w-12 md:h-12 text-foreground/90" />
        </motion.div>

        {/* text layer (name + info) */}
        <motion.div
          variants={textVariants}
          className="
            absolute inset-0 p-3 md:p-4
            flex flex-col items-center justify-center text-center
            bg-gradient-to-b from-background/65 to-background/80 backdrop-blur-[1px]
          "
        >
          <div className="text-sm md:text-[15px] font-semibold leading-tight">
            {label}
          </div>
          <div className="mt-1 text-[12px] md:text-[13px] leading-snug text-foreground/80 line-clamp-4">
            {info}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------- Modal ------------------- */
export default function ProjectModal({ project, onClose }) {
  if (!project) return null;
  const d = project.detail || {};
  const hasGallery = Array.isArray(d.gallery) && d.gallery.length > 0;

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50"
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

      <motion.div
        className="absolute inset-0 flex items-center justify-center p-0"
        variants={panel}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="w-screen h-[85vh] bg-card border-y border-border rounded-none shadow-xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={project.id || project.title}
              variants={panel}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex h-full flex-col"
            >
              {/* Header */}
              <div className="flex items-start gap-3 p-6 border-b border-border">
                <img
                  src={(d.hero || project.cover).startsWith("/") ? (d.hero || project.cover) : `/${d.hero || project.cover}`}
                  alt=""
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl md:text-3xl font-semibold truncate">{project.title}</h2>
                  {d.tagline && <p className="text-base text-foreground/70">{d.tagline}</p>}
                  <div className="mt-1 text-sm md:text-base text-foreground/60">
                    {project.year} · {project.category?.toUpperCase()} {project.type ? `· ${project.type}` : ""}
                  </div>
                </div>
                <button
                  className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-muted bg-background text-foreground shadow-sm"
                  onClick={onClose}
                  aria-label="Close"
                >
                  Go back
                </button>
              </div>

              {/* Body */}
              <div
                className={`flex-1 min-h-0 grid ${hasGallery
                  ? "grid-cols-1 lg:grid-cols-[minmax(0,50%)_minmax(0,50%)]"
                  : "grid-cols-1"
                  } gap-0`}
              >
                {/* LEFT: content */}
                <div
                  className="pl-6 md:pl-24 pr-6 py-6 min-h-0 overflow-y-auto overscroll-contain"
                  style={{ WebkitOverflowScrolling: "touch" }}>
                  {d.contributions?.length > 0 && (
                    <section className="space-y-3">
                      <h3 className="text-lg md:text-xl font-semibold">My Contributions</h3>
                      <ul className="list-disc pl-6 text-base text-foreground/80 space-y-1">
                        {d.contributions.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {/* ---- SKILLS SECTION ---- */}
                  {d.skills?.length > 0 && (
                    <section className="mt-6 space-y-3">
                      <h3 className="text-lg md:text-xl font-semibold">Skills</h3>
                      <div
                        className="
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-4
    2xl:grid-cols-4
    gap-4
  "
                      >
                        {d.skills.map((s, i) => (
                          <SkillBubble
                            key={`${s.key}-${i}`}
                            iconName={s.icon || s.key}
                            label={s.label}
                            info={s.info}
                          />
                        ))}
                      </div>

                    </section>
                  )}

                  {d.background && (
                    <section className="mt-6 space-y-3">
                      <h3 className="text-lg md:text-xl font-semibold">Background</h3>
                      <p className="text-base leading-relaxed text-foreground/80">{d.background}</p>
                    </section>
                  )}
                </div>

                {/* RIGHT: gallery */}
                {hasGallery && (
                  <aside className="p-0 bg-background/40">
                    <div className="h-full" style={{ height: "clamp(360px, 62vh, 740px)" }}>
                      <GallerySlider
                        items={[
                          ...(d.video ? [{ type: "video", src: d.video, poster: d.videoPoster, muted: true }] : []),
                          ...d.gallery.map((src) => ({ type: "image", src })),
                        ]}
                        autoAdvanceMs={10000}
                        className="h-full"
                      />
                    </div>
                  </aside>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div >
  );
}
