import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const categories = ["all","web","game","ml","art"];
const skills = ["react","nextjs","unity","csharp","python","sklearn","fastapi","tailwind","figma","docker"];

export default function Sidebar({ showFilters }) {
  const loc = useLocation();
  const [openSofia, setOpenSofia] = useState(false);
  const [openMenu, setOpenMenu] = useState(true);

  return (
    <aside className="h-screen border-r border-neutral-200 bg-white text-neutral-900 flex flex-col">
      {/* TOP: horizontal dropdown buttons */}
      <div className="p-4 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpenSofia(v => !v)}
            className="px-3 py-1.5 rounded-lg text-sm font-medium border-2 border-pink-400 text-pink-600 bg-white hover:bg-pink-50"
            aria-expanded={openSofia}
          >
            Sofia <span className="ml-1 align-middle">▾</span>
          </button>

          <button
            onClick={() => setOpenMenu(v => !v)}
            className="px-3 py-1.5 rounded-lg text-sm font-medium border-2 border-cyan-400 text-cyan-600 bg-white hover:bg-cyan-50"
            aria-expanded={openMenu}
          >
            ≡ Menu <span className="ml-1 align-middle">▾</span>
          </button>
        </div>

        {/* Dropdown panes render directly under the buttons */}
        {openSofia && (
          <div className="mt-3 space-y-1">
            <NavItem to="/about"   label="About me" active={loc.hash.includes("about")} />
            <NavItem to="/contact" label="Contact"  active={loc.hash.includes("contact")} />
            <a
              className="block px-2 py-1 rounded hover:bg-neutral-100 text-sm"
              href="/resume.pdf" target="_blank" rel="noreferrer"
            >
              Resume (PDF)
            </a>
          </div>
        )}

        {openMenu && (
          <div className="mt-3 space-y-1">
            <NavItem to="/home"   label="Home"   active={loc.hash.includes("home")} />
            <NavItem to="/works"  label="Works"  active={loc.hash.includes("works")} />
            <NavItem to="/contact" label="Contact" active={loc.hash.includes("contact")} />
          </div>
        )}
      </div>

      {/* NAME BLOCK after some space */}
      <div className="p-4">
        <div className="font-semibold">Sofia Zamiatina</div>
        <div className="text-xs text-neutral-500">Software Engineering MEng</div>
      </div>

      {/* Contextual filters – only for Works */}
      {showFilters && <FiltersPanel />}

      <div className="mt-auto p-3 text-xs text-neutral-500">
        © {new Date().getFullYear()} Sofia Z.
      </div>
    </aside>
  );
}

function NavItem({ to, label, active }) {
  return (
    <Link
      to={to}
      className={`block px-2 py-1 rounded text-sm hover:bg-neutral-100 ${active ? "bg-neutral-100" : ""}`}
    >
      {label}
    </Link>
  );
}

function FiltersPanel() {
  const updateParam = (key, value) => {
    const url = new URL(window.location.href);
    const [route, search = ""] = url.hash.split("?");
    const params = new URLSearchParams(search);
    if (value === "" || value == null) params.delete(key);
    else params.set(key, value);
    url.hash = `${route}?${params.toString()}`;
    window.location.replace(url.toString());
  };

  const params = new URLSearchParams(window.location.hash.split("?")[1] || "");
  const activeCat = params.get("cat") || "all";
  const activeSkills = (params.get("skills") || "").split(",").filter(Boolean);

  const toggleSkill = (skill) => {
    const set = new Set(activeSkills);
    set.has(skill) ? set.delete(skill) : set.add(skill);
    updateParam("skills", Array.from(set).join(","));
  };

  return (
    <div className="mt-2 p-4 border-t border-neutral-200">
      <div className="text-xs uppercase tracking-wide text-neutral-500 mb-2">Filters</div>

      <div className="mb-3">
        <div className="text-xs text-neutral-500 mb-1">Category</div>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => updateParam("cat", cat === "all" ? "" : cat)}
              className={`px-2 py-1 rounded-md text-xs border border-neutral-300 hover:bg-neutral-100
                ${activeCat === cat ? "bg-neutral-100" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <div className="text-xs text-neutral-500 mb-1">Skills</div>
        <div className="flex flex-wrap gap-2">
          {skills.map(s => {
            const on = activeSkills.includes(s);
            return (
              <button
                key={s}
                onClick={() => toggleSkill(s)}
                className={`px-2 py-1 rounded-md text-xs border border-neutral-300 hover:bg-neutral-100
                  ${on ? "bg-neutral-100" : ""}`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => { updateParam("cat",""); updateParam("skills",""); }}
        className="text-xs text-neutral-600 underline"
      >
        Clear filters
      </button>
    </div>
  );
}
