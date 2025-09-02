// FiltersPanel.jsx (inline in Sidebar or separate file)
import { useSearchParams } from "react-router-dom";
import CategoryFilter from "./CategoryFilter.jsx";
import SkillsFilter from "./SkillsFilter.jsx";

const categories = ["all","web","game","ml","art"];
const skills = ["react","nextjs","unity","csharp","python","sklearn","fastapi","tailwind","figma","docker"];

export default function FiltersPanel({
    categories, skills, catColorIndex, skillColorIndex
  }) {
  const [sp, setSp] = useSearchParams();

  const activeCat = sp.get("cat") || "all";
  const activeSkills = (sp.get("skills") || "").split(",").filter(Boolean);

  const setCategory = (cat) => {
    const next = new URLSearchParams(sp);
    if (!cat || cat === "all") next.delete("cat");
    else next.set("cat", cat);
    setSp(next, { replace: false });
  };

  const toggleSkill = (skill) => {
    const set = new Set((sp.get("skills") || "").split(",").filter(Boolean));
    set.has(skill) ? set.delete(skill) : set.add(skill);

    const next = new URLSearchParams(sp);
    if (set.size) next.set("skills", [...set].join(","));
    else next.delete("skills");
    setSp(next, { replace: false });
  };

  const clear = () => {
    const next = new URLSearchParams(sp);
    next.delete("cat");
    next.delete("skills");
    setSp(next, { replace: false });
  };

  return (
    <div className="mt-2 p-4 border-t border-border overflow-y-auto">
      <div className="text-xs text-foreground/60 mb-1">Category</div>
      <CategoryFilter
        items={categories}
        active={activeCat}
        onSelect={setCategory}
        colorIndexByName={catColorIndex}
      />

      <div className="text-xs text-foreground/60 mb-1 mt-3">Skills</div>
      <SkillsFilter
        items={skills}
        active={activeSkills}
        onToggle={toggleSkill}
        colorIndexByName={skillColorIndex}
      />

      <button
  type="button"
  onClick={clear}
  className="
    mt-2 px-0 py-0
    text-xs font-medium
    text-gray-600 hover:text-gray-900
    dark:text-gray-300 dark:hover:text-white
    underline underline-offset-2
    bg-transparent hover:bg-transparent
    border-0 shadow-none
    appearance-none
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 dark:focus:ring-gray-600
    rounded-none
  "
>
  Clear filters
</button>
    </div>
  );
}
