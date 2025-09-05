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
        {/* 👇 AnimatePresence must wrap the mapped items */}
        <AnimatePresence mode="sync">
          {filtered.map((p) => (
            <motion.article
              key={p.id}
              variants={cardUp}
              initial="hidden"
              animate="visible"
              exit="exit"   // ✅ now safe, AnimatePresence controls unmount
              layout        // ✅ smooth grid reflow
              className="rounded-xl border border-border overflow-hidden bg-card shadow-sm"
            >
              <div className="aspect-video bg-muted" />
              <div className="p-3">
                <div className="text-sm text-foreground/60">
                  {p.year} · {p.category.toUpperCase()}
                </div>
                <h2 className="font-medium">{p.title}</h2>
                <p className="text-sm text-foreground/80 mt-1">{p.summary}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2 py-0.5 rounded bg-muted text-foreground/80 border border-border"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
