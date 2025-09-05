import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { projects } from "../data/projects.js";
import { filterProjects } from "../lib/filterProjects.js";

import { motion, AnimatePresence } from "framer-motion";  // 👈 import AnimatePresence
import { gridStagger, cardUp } from "../animations/worksAnimations";
import { pageVariants } from "../animations/pageVariants";

export default function Works() {
  const [sp] = useSearchParams();
  const cat = sp.get("cat") || "all";
  const skills = (sp.get("skills") || "").split(",").filter(Boolean);

  const filtered = useMemo(() => {
    return filterProjects(projects, {
      category: cat,
      skills,
      mode: "OR",
    });
  }, [cat, skills]);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="p-6 text-foreground bg-background min-h-screen"
    >
      <h1 className="text-2xl font-semibold mb-4">Works</h1>

      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={gridStagger}
        initial="hidden"
        animate="visible"
      >

        <AnimatePresence mode="sync">
          {filtered.map((p) => (
            <motion.article
              key={p.id}
              variants={cardUp}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout="position"
              className="rounded-xl border border-border overflow-hidden bg-card shadow-sm flex flex-col h-full"
            >
              {/* Cover + status badge */}
              <div className="relative">
                {/* Grey background only (replace with image later) */}
                <div className="aspect-video bg-muted">
                  {/*
    <img
      src={p.cover}
      alt={`${p.title} cover`}
      className="h-full w-full object-cover"
      loading="lazy"
      decoding="async"
    />
    */}
                </div>

                {p.status && (
                  <span
                    className={[
                      "absolute top-2 right-2 rounded-full px-2.5 py-1 text-[11px] font-medium border",
                      p.status === "in progress"
                        ? "bg-blue-100/70 text-blue-800 border-blue-300 dark:bg-blue-900/40 dark:text-blue-100 dark:border-blue-400/40"
                        : p.status === "completed"
                          ? "bg-green-100/70 text-green-800 border-green-300 dark:bg-green-900/40 dark:text-green-100 dark:border-green-400/40"
                          : p.status === "discontinued"
                            ? "bg-red-100/70 text-red-800 border-red-300 dark:bg-red-900/40 dark:text-red-100 dark:border-red-400/40"
                            : "bg-muted text-foreground/80 border-border",
                    ].join(" ")}
                  >
                    {p.status}
                  </span>
                )}
              </div>


              {/* Body */}
              <div className="p-3 flex flex-col flex-1 min-h-0">
              <div className="grow">
                <div className="text-xs text-foreground/60">
                  {p.year} · {p.category?.toUpperCase()}
                  {p.type ? <> · {p.type}</> : null}
                </div>

                <h2 className="mt-0.5 font-medium">{p.title}</h2>

                <p className="text-sm text-foreground/80 mt-1">{p.summary}</p>

                {/* My role */}
                {p.role && p.role.trim().length > 0 && (
                  <div className="mt-3">
                    <div className="text-[11px] uppercase tracking-wide text-foreground/60">
                      My role
                    </div>
                    <p className="text-sm text-foreground/80 mt-1">{p.role}</p>
                  </div>
                )}
                </div>

                {/* FOOTER Tech tags + View button */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex flex-wrap gap-1">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded bg-muted text-foreground/80 border border-border"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-[12px] 
               bg-background hover:bg-muted transition text-foreground shadow-sm shrink-0"
                    aria-label={`View details of ${p.title}`}
                  // onClick={() => setActiveProject(p)}
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                      <path
                        d="M12 5c-5 0-9 4.5-9 7s4 7 9 7 9-4.5 9-7-4-7-9-7Zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"
                        fill="currentColor"
                      />
                    </svg>
                    View
                  </button>
                </div>


              </div>
            </motion.article>

          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
