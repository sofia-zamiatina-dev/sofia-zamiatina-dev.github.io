import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";
import FiltersPanel from "./FiltersPanel.jsx";
import { projects } from "../data/projects.js";
import { buildFacets } from "../lib/facets.js";
import BouncyBallOverlay from "./BouncyBallOverlay.jsx";

const facets = buildFacets(projects, { categoryOrder: ["web","game","ml","art"] });

// --- tiny inline SVGs (no external icon lib) ---
const ChevronDown = (props) => (
  <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true" {...props}>
    <path d="M5 7l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DownloadIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" {...props}>
    <path d="M12 3v10m0 0l4-4m-4 4L8 9M4 17h16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Accent button with bottom thick bar (single color now)
function AccentButton({ label, onClick, buttonRef, isOpen = false }) {
  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={[
        "relative inline-flex items-center gap-2",
        "px-3 py-1.5 rounded-md text-sm font-medium",
        "bg-background text-foreground hover:bg-muted",
        "shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-400/50 transition-all duration-150",
        "border-t-2 border-x-2 border-b-4 border-fuchsia-400",
      ].join(" ")}
      aria-haspopup="menu"
      aria-expanded={isOpen}
    >
      <span>{label}</span>
      <ChevronDown className="opacity-80" />
    </button>
  );
}

// Download button (bottom-left)
function DownloadPDFButton() {
  return (
    <a
      href="/CV.pdf"              // new file name
      download
      className={[
        "inline-flex items-center gap-2",
        "px-3 py-1.5 rounded-md text-sm font-medium",
        // light theme
        "border border-sky-300 text-sky-700 bg-sky-50/60 hover:bg-sky-50",
        // dark theme: dark surface with blue outline
        "dark:border-blue-400 dark:text-blue-300 dark:bg-slate-900/60 dark:hover:bg-slate-900",
        "transition-colors",
      ].join(" ")}
      aria-label="Download CV as PDF"
    >
      <DownloadIcon className="text-sky-600 dark:text-blue-300" />
      <span>CV.pdf</span>
    </a>
  );
}


export default function Sidebar({ showFilters }) {
  const loc = useLocation();
  const [open, setOpen] = useState(null); // "menu" | null

  // Close popovers whenever the route/hash changes
  useEffect(() => { setOpen(null); }, [loc.pathname, loc.hash]);

  const headerRef = useRef(null);
  const menuBtnRef  = useRef(null);
  const [anchorX, setAnchorX] = useState(0);

  // Measure button position (relative to header)
  useEffect(() => {
    function measure() {
      const headerRect = headerRef.current?.getBoundingClientRect();
      const menuRect = menuBtnRef.current?.getBoundingClientRect();
      if (headerRect && menuRect) {
        setAnchorX(menuRect.left - headerRect.left);
      }
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
    <aside className="relative sticky top-0 h-dvh border-r border-border bg-background text-foreground flex flex-col">
      {/* Background ball animation */}
      <BouncyBallOverlay />

      <div className="relative z-10 flex-1 overflow-y-auto flex flex-col">

        {/* TOP: toggle + one accent button + popover */}
        <div ref={headerRef} className="p-4 border-b border-border relative">
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <AccentButton
              label="Menu"
              buttonRef={menuBtnRef}
              onClick={() => setOpen(open === "menu" ? null : "menu")}
              isOpen={open === "menu"}
            />
          </div>

          {open === "menu" && (
            <PopoverPanel accent="pink" style={{ left: anchorX }}>
              <PopoverItem to="/home"    active={loc.hash.includes("home")}    onSelect={() => setOpen(null)}>Home</PopoverItem>
              <PopoverItem to="/works"   active={loc.hash.includes("works")}   onSelect={() => setOpen(null)}>Works</PopoverItem>
              <PopoverItem to="/about"   active={loc.hash.includes("about")}   onSelect={() => setOpen(null)}>About me</PopoverItem>
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
        </div>

        {/* NAME BLOCK */}
        <div className="p-4">
          <div className="font-semibold">Sofia Zamiatina</div>
          <div className="text-xs text-foreground/60">Software Engineering MEng</div>
        </div>

        {/* Contextual filters – only for Works */}
        {showFilters && (
          <FiltersPanel
            categories={facets.categories}
            skills={facets.skills}
            catColorIndex={facets.colorIndex.categories}
            skillColorIndex={facets.colorIndex.skills}
          />
        )}

        {/* Footer */}
        <div className="mt-auto p-3 text-xs text-foreground/60">
          © {new Date().getFullYear()} Sofia Z.
        </div>

        {/* Bottom-left download button */}
        <div className="absolute left-3 bottom-10">
          <DownloadPDFButton />
        </div>
      </div>
    </aside>
  );
}

// ---- Popover with accent border & dropdown-list styling ----
function PopoverPanel({ children, style, accent = "pink" }) {
  const border = accent === "green" ? "border-lime-400" : "border-fuchsia-400";
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
          "block px-3 py-2 text-sm text-foreground",
          "hover:bg-muted",
          active ? "bg-muted font-medium" : "",
        ].join(" ")}
      >
        {children}
      </Link>
    </li>
  );
}
