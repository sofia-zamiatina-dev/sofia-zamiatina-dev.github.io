import { useMemo } from "react";
import { projects } from "../data/project/";

export default function Works() {
  const params = new URLSearchParams(window.location.hash.split("?")[1] || "");
  const cat = params.get("cat") || "all";
  const skills = (params.get("skills") || "").split(",").filter(Boolean);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const catOk = cat === "all" || p.category === cat;
      const skillsOk =
        skills.length === 0 || skills.every((s) => p.tech.includes(s));
      return catOk && skillsOk;
    });
  }, [cat, skills]);

  return (
    <div className="p-6 text-foreground bg-background min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Works</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <article
            key={p.id}
            className="rounded-xl border border-border overflow-hidden bg-card shadow-sm"
          >
            <div className="aspect-video bg-muted">
              {/* Replace with real images; keep placeholder bg for now */}
            </div>
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
          </article>
        ))}
      </div>
    </div>
  );
}
