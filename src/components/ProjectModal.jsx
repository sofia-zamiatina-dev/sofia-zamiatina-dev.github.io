import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GallerySlider from "../components/GallerySlider.jsx";

const backdrop = { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } };
const panel = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: "tween", duration: 0.25 } },
  exit: { opacity: 0, y: 16, transition: { duration: 0.2 } },
};

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;
  const d = project.detail || {};
  const hasGallery = Array.isArray(d.gallery) && d.gallery.length > 0;
  //const [setProject] = useState(null);

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
              className={`flex-1 min-h-0 grid ${hasGallery ? "grid-cols-[minmax(0,50%)_minmax(0,50%)]" : "grid-cols-1"
                } gap-0`}
            >
              {/* LEFT: content, shifted toward center */}
              <div className="pl-24 pr-6 py-6 overflow-y-auto">
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

                {d.skills?.length > 0 && (
                  <section className="mt-6 space-y-3">
                    <h3 className="text-lg md:text-xl font-semibold">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {d.skills.map((s, i) => (
                        <div key={i} className="group relative">
                          <span
                            className="inline-flex items-center gap-1 rounded-lg  px-2.5 py-1 text-sm bg-background"
                            title={s.info}
                          >
                            <SkillIcon name={s.icon || s.key} />
                            {s.label}
                          </span>
                          <div
                            className="pointer-events-none absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap
                                         rounded-md bg-card px-2 py-1 text-[11px] text-foreground/90
                                         opacity-0 shadow-sm transition group-hover:opacity-100"
                          >
                            {s.info}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {d.background && (
                  <section className="mt-6 space-y-3">
                    <h3 className="text-lg md:text-xl font-semibold">Project Background</h3>
                    <p className="text-base leading-relaxed text-foreground/80">{d.background}</p>
                  </section>
                )}
              </div>

              {/* RIGHT: gallery */}
              {hasGallery && (
                <aside className="p-0 bg-background/40">
                  <div
                    className="h-full"
                    style={{ height: "clamp(360px, 62vh, 740px)" }} // ↓ smaller on big screens
                  >
                    <GallerySlider
                      items={[
                        ...(d.video ? [{ type: "video", src: d.video, poster: d.videoPoster, muted: true }] : []),
                        ...d.gallery.map((src) => ({ type: "image", src })),
                      ]}
                      autoAdvanceMs={30000}
                      className="h-full" // important: slider fills the container
                    />
                  </div>
                </aside>
              )}
            </div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

// tiny inline icons (no external lib needed)
function SkillIcon({ name, className = "w-4 h-4" }) {
  const common = <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.12" />;
  switch (name) {
    case "react":
      return (<svg viewBox="0 0 24 24" className={className}><g fill="none" stroke="currentColor"><ellipse cx="12" cy="12" rx="10" ry="4" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" /></g><circle cx="12" cy="12" r="1.8" fill="currentColor" /></svg>);
    case "tailwind":
      return (<svg viewBox="0 0 24 24" className={className}><path d="M3 12c2-4 4-6 7-6s4 2 6 2 3-1 5-2c-2 4-4 6-7 6s-4-2-6-2-3 1-5 2Z" fill="currentColor" /></svg>);
    case "docker":
      return (<svg viewBox="0 0 24 24" className={className}><rect x="3" y="11" width="4" height="4" fill="currentColor" /><rect x="8" y="11" width="4" height="4" fill="currentColor" /><rect x="13" y="11" width="4" height="4" fill="currentColor" /><rect x="8" y="6" width="4" height="4" fill="currentColor" /></svg>);
    case "db":
      return (<svg viewBox="0 0 24 24" className={className}><ellipse cx="12" cy="6" rx="8" ry="3" fill="currentColor" /><path d="M4 6v8c0 1.7 3.6 3 8 3s8-1.3 8-3V6" fill="currentColor" opacity="0.25" /></svg>);
    case "agile":
      return (<svg viewBox="0 0 24 24" className={className}><path d="M6 12a6 6 0 1 1 6 6h6" stroke="currentColor" strokeWidth="2" fill="none" /></svg>);
    case "scrum":
      return (<svg viewBox="0 0 24 24" className={className}><path d="M8 14a4 4 0 1 1 4-4" stroke="currentColor" strokeWidth="2" fill="none" /><path d="M12 10a4 4 0 1 1 4 4" stroke="currentColor" strokeWidth="2" fill="none" /></svg>);
    case "python":
      return (<svg viewBox="0 0 24 24" className={className}><path d="M12 3c5 0 5 3 5 3v4H7V6s0-3 5-3Z" fill="currentColor" /><path d="M12 21c-5 0-5-3-5-3v-4h10v4s0 3-5 3Z" fill="currentColor" opacity="0.5" /></svg>);
    case "java":
      return (<svg viewBox="0 0 24 24" className={className}><path d="M12 4c2 2 0 3-1 4s2 1 3 2-1 2-4 3" stroke="currentColor" fill="none" /></svg>);
    case "js":
      return (<svg viewBox="0 0 24 24" className={className}><rect x="4" y="4" width="16" height="16" fill="currentColor" /><text x="8" y="16" fontSize="9" fill="#000">JS</text></svg>);
    case "csharp":
      return (<svg viewBox="0 0 24 24" className={className}><circle cx="12" cy="12" r="9" stroke="currentColor" fill="none" /><text x="8" y="15" fontSize="8" fill="currentColor">C#</text></svg>);
    case "cloud":
      return (<svg viewBox="0 0 24 24" className={className}><path d="M7 16a4 4 0 1 1 0-8 5 5 0 0 1 10 1h1a3 3 0 1 1 0 6H7Z" fill="currentColor" /></svg>);
    case "design":
      return (<svg viewBox="0 0 24 24" className={className}><rect x="5" y="5" width="14" height="14" rx="2" stroke="currentColor" fill="none" /><path d="M5 12h14M12 5v14" stroke="currentColor" /></svg>);
    case "figma":
      return (<svg viewBox="0 0 24 24" className={className}><circle cx="9" cy="7" r="3" fill="currentColor" /><circle cx="9" cy="12" r="3" fill="currentColor" opacity="0.6" /><circle cx="9" cy="17" r="3" fill="currentColor" opacity="0.3" /><circle cx="15" cy="9.5" r="3" fill="currentColor" /></svg>);
    case "ts":
      return (<svg viewBox="0 0 24 24" className={className}><rect x="4" y="4" width="16" height="16" fill="currentColor" /><text x="8" y="16" fontSize="9" fill="#000">TS</text></svg>);
    case "test":
      return (<svg viewBox="0 0 24 24" className={className}><path d="M7 7h10v4H7z" fill="currentColor" /><path d="M9 11v6M15 11v6" stroke="currentColor" /></svg>);
    default:
      return (<svg viewBox="0 0 24 24" className={className}>{common}</svg>);
  }
}