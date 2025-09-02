import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";
import SkillsFilter from "./SkillsFilter.jsx"; 
import CategoryFilter from "./CategoryFilter.jsx";

const categories = ["all","web","game","ml","art"];
const skills = ["react","nextjs","unity","csharp","python","sklearn","fastapi","tailwind","figma","docker"];

export default function Sidebar({ showFilters }) {
  const loc = useLocation();
  const [open, setOpen] = useState(null); // "sofia" | "menu" | null

  const headerRef = useRef(null);
  const sofiaBtnRef = useRef(null);
  const menuBtnRef  = useRef(null);

  const [anchors, setAnchors] = useState({ sofia: 0, menu: 0 });

  // Measure button positions (relative to header)
  useEffect(() => {
    function measure() {
      const header = headerRef.current;
      if (!header) return;
      const headerRect = header.getBoundingClientRect();

      const sofiaRect = sofiaBtnRef.current?.getBoundingClientRect();
      const menuRect  = menuBtnRef.current?.getBoundingClientRect();

      setAnchors({
        sofia: sofiaRect ? sofiaRect.left - headerRect.left : 0,
        menu:  menuRect  ? menuRect.left  - headerRect.left : 0,
      });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Close on click outside + Esc
  useEffect(() => {
    function onDocClick(e) {
      if (!headerRef.current) return;
      if (!headerRef.current.contains(e.target)) setOpen(null);
    }
    function onEsc(e) {
      if (e.key === "Escape") setOpen(null);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <aside className="h-screen border-r border-border bg-background text-foreground flex flex-col">
      {/* TOP: buttons + popovers (relative container for absolute panels) */}
      <div ref={headerRef} className="p-4 border-b border-border relative">
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            ref={sofiaBtnRef}
            onClick={() => setOpen(open === "sofia" ? null : "sofia")}
            className="px-3 py-1.5 rounded-lg text-sm font-medium border-2 border-accent text-foreground bg-background hover:bg-muted"
            aria-haspopup="menu"
            aria-expanded={open === "sofia"}
          >
            Sofia <span className="ml-1 align-middle">▾</span>
          </button>

          <button
            ref={menuBtnRef}
            onClick={() => setOpen(open === "menu" ? null : "menu")}
            className="px-3 py-1.5 rounded-lg text-sm font-medium border-2 border-primary text-foreground bg-background hover:bg-muted"
            aria-haspopup="menu"
            aria-expanded={open === "menu"}
          >
            ≡ Menu <span className="ml-1 align-middle">▾</span>
          </button>
        </div>

        {/* Sofia popover */}
        {open === "sofia" && (
          <PopoverPanel style={{ left: anchors.sofia }}>
            <PopoverItem to="/about"   active={loc.hash.includes("about")}>About me</PopoverItem>
            <PopoverItem to="/contact" active={loc.hash.includes("contact")}>Contact</PopoverItem>
            <a
              className="block px-3 py-2 text-sm rounded hover:bg-muted"
              href="/resume.pdf" target="_blank" rel="noreferrer"
            >
              Resume (PDF)
            </a>
          </PopoverPanel>
        )}

        {/* Menu popover */}
        {open === "menu" && (
          <PopoverPanel style={{ left: anchors.menu }}>
            <PopoverItem to="/home"    active={loc.hash.includes("home")}>Home</PopoverItem>
            <PopoverItem to="/works"   active={loc.hash.includes("works")}>Works</PopoverItem>
            <PopoverItem to="/contact" active={loc.hash.includes("contact")}>Contact</PopoverItem>
          </PopoverPanel>
        )}
      </div>

      {/* NAME BLOCK */}
      <div className="p-4">
        <div className="font-semibold">Sofia Zamiatina</div>
        <div className="text-xs text-foreground/60">Software Engineering MEng</div>
      </div>

      {/* Contextual filters – only for Works */}
      {showFilters && <FiltersPanel />}

      <div className="mt-auto p-3 text-xs text-foreground/60">
        © {new Date().getFullYear()} Sofia Z.
      </div>
    </aside>
  );
}

function PopoverPanel({ children, style }) {
  return (
    <div
      role="menu"
      style={style}
      className="absolute z-50 min-w-[180px] rounded-xl border border-border bg-card shadow-lg"
    >
      <div className="py-1">{children}</div>
    </div>
  );
}

function PopoverItem({ to, active, children }) {
  return (
    <Link
      to={to}
      className={`block px-3 py-2 text-sm rounded hover:bg-muted ${active ? "bg-muted" : ""}`}
      role="menuitem"
    >
      {children}
    </Link>
  );
}

/* ---------------- Filters (new pill UI, no reloads) ---------------- */
function FiltersPanel() {
    const mutateParams = (mutator) => {
      const url = new URL(window.location.href);
      const [route, search = ""] = url.hash.split("?");
      const params = new URLSearchParams(search);
      mutator(params);
      const nextHash = `${route}?${params.toString()}`;
      if (url.hash !== nextHash) {
        history.replaceState(null, "", nextHash);
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      }
    };
  
    const params = new URLSearchParams(window.location.hash.split("?")[1] || "");
    const activeCat = params.get("cat") || "all";
    const activeSkills = (params.get("skills") || "").split(",").filter(Boolean);
  
    const setCategory = (cat) => {
      mutateParams((p) => {
        if (!cat || cat === "all") p.delete("cat");
        else p.set("cat", cat);
      });
    };
  
    const toggleSkill = (skill) => {
      mutateParams((p) => {
        const set = new Set((p.get("skills") || "").split(",").filter(Boolean));
        set.has(skill) ? set.delete(skill) : set.add(skill);
        const next = Array.from(set).join(",");
        next ? p.set("skills", next) : p.delete("skills");
      });
    };
  
    return (
      <div className="mt-2 p-4 border-t border-border overflow-y-auto">
        <div className="text-[10px] uppercase tracking-[0.12em] text-foreground/60 mb-2">Filters</div>
  
        <div className="mb-3">
  <div className="text-xs text-foreground/60 mb-1">Category</div>
  <CategoryFilter
    items={categories}
    active={activeCat}
    onSelect={setCategory}
  />
</div>

<div className="mb-3">
  <div className="text-xs text-foreground/60 mb-1">Skills</div>
  <SkillsFilter
    items={skills}
    active={activeSkills}
    onToggle={toggleSkill}
  />
</div>
  
<button
  type="button"
  onClick={() => { setCategory("all"); mutateParams(p => p.delete("skills")); }}
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