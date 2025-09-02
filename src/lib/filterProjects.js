export function filterProjects(projects, { category = "all", skills = [], mode = "AND" }) {
  return projects.filter(p => {
    const catOK = category === "all" || !category ? true : p.category === category;
    if (!catOK) return false;

    if (!skills.length) return true;
    const tech = new Set(p.tech);
    return mode === "AND"
      ? skills.every(s => tech.has(s))
      : skills.some(s => tech.has(s));
  });
}