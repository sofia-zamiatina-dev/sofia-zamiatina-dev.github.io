import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";

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

/* ---- Filters (unchanged except theme tokens) ---- */
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
    <div className="mt-2 p-4 border-t border-border">
      <div className="text-xs uppercase tracking-wide text-foreground/60 mb-2">Filters</div>

      <div className="mb-3">
        <div className="text-xs text-foreground/60 mb-1">Category</div>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => updateParam("cat", cat === "all" ? "" : cat)}
              className={`px-2 py-1 rounded-md text-xs border border-border hover:bg-muted
                ${activeCat === cat ? "bg-muted" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <div className="text-xs text-foreground/60 mb-1">Skills</div>
        <div className="flex flex-wrap gap-2">
          {skills.map(s => {
            const on = activeSkills.includes(s);
            return (
              <button
                key={s}
                onClick={() => toggleSkill(s)}
                className={`px-2 py-1 rounded-md text-xs border border-border hover:bg-muted
                  ${on ? "bg-muted" : ""}`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => { updateParam("cat",""); updateParam("skills",""); }}
        className="text-xs text-foreground/70 underline"
      >
        Clear filters
      </button>
    </div>
  );
}
