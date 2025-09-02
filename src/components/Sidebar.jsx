import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";
import SkillsFilter from "./SkillsFilter.jsx";
import CategoryFilter from "./CategoryFilter.jsx";

const categories = ["all","web","game","ml","art"];
const skills = ["react","nextjs","unity","csharp","python","sklearn","fastapi","tailwind","figma","docker"];

// --- tiny inline SVGs (no external icon lib) ---
const ChevronDown = (props) => (
  <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true" {...props}>
    <path d="M5 7l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const Hamburger = (props) => (
  <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true" {...props}>
    <path d="M3 6h14M3 10h14M3 14h10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Accent button with bottom thick bar
function AccentButton({
  label,
  onClick,
  buttonRef,
  color = "pink", // "pink" | "green"
  leadingIcon = null,
  isOpen = false,
}) {
    const palette =
        color === "green"
          ? {
              border: "border-lime-400",
              focus: "focus:ring-lime-400/50",
            }
          : {
              border: "border-fuchsia-400",
              focus: "focus:ring-fuchsia-400/50",
            };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={[
        "relative inline-flex items-center gap-2",
        "px-3 py-1.5 rounded-md text-sm font-medium",
        "bg-background text-foreground hover:bg-muted",
        "shadow-sm focus:outline-none focus:ring-2 transition-all duration-150",
        palette.focus,
        // asymmetric borders
        "border-t-2 border-x-2 border-b-4",
        palette.border,
      ].join(" ")}
      aria-haspopup="menu"
      aria-expanded={isOpen}
    >
      {leadingIcon}
      <span>{label}</span>
      <ChevronDown className="opacity-80" />
    </button>
  );
}

export default function Sidebar({ showFilters }) {
  const loc = useLocation();
  const [open, setOpen] = useState(null); // "sofia" | "menu" | null

  // Close popovers whenever the route/hash changes
  useEffect(() => { setOpen(null); }, [loc.pathname, loc.hash]);

  const headerRef = useRef(null);
  const sofiaBtnRef = useRef(null);
  const menuBtnRef  = useRef(null);
  const [anchors, setAnchors] = useState({ sofia: 0, menu: 0 });

  // Measure button positions (relative to header)
  useEffect(() => {
    function measure() {
      const headerRect = headerRef.current?.getBoundingClientRect();
      if (!headerRect) return;
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
    function onEsc(e) { if (e.key === "Escape") setOpen(null); }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <aside className="h-screen border-r border-border bg-background text-foreground flex flex-col">
      {/* TOP: toggle + accent buttons + popovers */}
      <div ref={headerRef} className="p-4 border-b border-border relative">
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <AccentButton
            label="Sofia"
            buttonRef={sofiaBtnRef}
            onClick={() => setOpen(open === "sofia" ? null : "sofia")}
            color="pink"
            isOpen={open === "sofia"}
          />

          <AccentButton
            label="Menu"
            buttonRef={menuBtnRef}
            onClick={() => setOpen(open === "menu" ? null : "menu")}
            color="green"
            leadingIcon={<Hamburger />}
            isOpen={open === "menu"}
          />
        </div>

        {/* Sofia popover */}
        {open === "sofia" && (
          <PopoverPanel accent="pink" style={{ left: anchors.sofia }}>
            <PopoverItem to="/about"   active={loc.hash.includes("about")}  onSelect={() => setOpen(null)}>About me</PopoverItem>
            <PopoverItem to="/contact" active={loc.hash.includes("contact")} onSelect={() => setOpen(null)}>Contact</PopoverItem>
            <a
              className="block px-3 py-2 text-sm rounded hover:bg-muted"
              href="/resume.pdf" target="_blank" rel="noreferrer"
              onClick={() => setOpen(null)}
            >
              Resume (PDF)
            </a>
          </PopoverPanel>
        )}

        {/* Menu popover */}
        {open === "menu" && (
          <PopoverPanel accent="green" style={{ left: anchors.menu }}>
            <PopoverItem to="/home"    active={loc.hash.includes("home")}   onSelect={() => setOpen(null)}>Home</PopoverItem>
            <PopoverItem to="/works"   active={loc.hash.includes("works")}  onSelect={() => setOpen(null)}>Works</PopoverItem>
            <PopoverItem to="/contact" active={loc.hash.includes("contact")} onSelect={() => setOpen(null)}>Contact</PopoverItem>
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

// ---- Popover with accent border & dropdown-list styling like screenshot ----
function PopoverPanel({ children, style, accent = "pink" }) {
  const border =
    accent === "green" ? "border-lime-400" : "border-fuchsia-400";
  const shadow =
    accent === "green"
      ? "shadow-[0_12px_24px_rgba(163,230,53,0.25)]"
      : "shadow-[0_12px_24px_rgba(217,70,239,0.25)]";

  return (
    <div
      role="menu"
      style={style}
      className={[
        "absolute top-[92%] z-50 min-w-[200px]",
        "rounded-lg border-2 bg-card",
        "ring-1 ring-border",
        shadow,
        border,
      ].join(" ")}
    >
      <ul className="py-1 divide-y divide-border/70">{children}</ul>
    </div>
  );
}

function PopoverItem({ to, active, children, onSelect }) {
  return (
    <li>
      <Link
        to={to}
        onClick={onSelect}
        role="menuitem"
        className={[
          "block px-3 py-2 text-sm text-foreground", // ← theme text (black/light, white/dark)
          "hover:bg-muted",
          active ? "bg-muted font-medium" : "",
        ].join(" ")}
      >
        {children}
      </Link>
    </li>
  );
}

/* ---------------- Filters (kept from your version) ---------------- */
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
        <CategoryFilter items={categories} active={activeCat} onSelect={setCategory} />
      </div>

      <div className="mb-3">
        <div className="text-xs text-foreground/60 mb-1">Skills</div>
        <SkillsFilter items={skills} active={activeSkills} onToggle={toggleSkill} />
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
