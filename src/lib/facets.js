// Build categories/skills from projects and assign stable palette indexes.
export function buildFacets(projects, { categoryOrder = [] } = {}) {
    const catSet = new Set();
    const skillSet = new Set();
  
    for (const p of projects) {
      if (p.category) catSet.add(p.category);
      for (const t of p.tech || []) skillSet.add(t);
    }
  
    // categories (without "all") sorted by custom order then alpha
    const cats = [...catSet].sort((a, b) => {
      const ia = categoryOrder.indexOf(a);
      const ib = categoryOrder.indexOf(b);
      if (ia !== -1 || ib !== -1) return (ia === -1 ? Infinity : ia) - (ib === -1 ? Infinity : ib);
      return a.localeCompare(b);
    });
  
    const skills = [...skillSet].sort((a, b) => a.localeCompare(b));
  
    // color index maps (deterministic by sorted position)
    const catColorIndex = Object.fromEntries(cats.map((n, i) => [n, i]));
    const skillColorIndex = Object.fromEntries(skills.map((n, i) => [n, i]));
  
    return {
      categories: ["all", ...cats],
      skills,
      colorIndex: { categories: catColorIndex, skills: skillColorIndex },
    };
  }
  