import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { HoloDropdownPanel, HoloDropdownItem } from "./HoloDropdown.jsx";

/* icons */
const ChevronDown = (props) => (
    <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true" {...props}>
        <path d="M5 7l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const WorkIcon = (props) => (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" {...props}>
        <path d="M4 7h16v13H4V7zM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const UserIcon = (props) => (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" {...props}>
        <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4z"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const MailIcon = (props) => (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" {...props}>
        <path d="M4 4h16v16H4z M4 4l8 8 8-8"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

function HoloMenuButton({ label, onClick, buttonRef, isOpen = false, tone = "pink" }) {
    const tones = {
        pink: { glow: "transparent", accent: "rgba(217,70,239,.28)" },
        sky: { glow: "transparent", accent: "rgba(56,189,248,.32)" },
        violet: { glow: "transparent", accent: "rgba(167,139,250,.32)" },
        amber: { glow: "transparent", accent: "rgba(251,191,36,.32)" },
        cyan: { glow: "transparent", accent: "rgba(0,255,255,.30)" },
    };
    const c = tones[tone] ?? tones.pink;

    return (
        <button
            ref={buttonRef}
            onClick={onClick}
            className={[
                "holo-btn overflow-hidden",
                "[--holo-bg:var(--panel-surface)]",
                "focus:outline-none focus-visible:ring-2",
                "focus-visible:ring-white/20 dark:focus-visible:ring-white/15",
            ].join(" ")}
            style={{ "--holo-glow": c.glow, "--holo-accent": c.accent }}
            aria-haspopup="menu"
            aria-expanded={isOpen}
        >
            <span>{label}</span>
            <ChevronDown className="opacity-80" />
        </button>
    );
}

export default function SidebarMenu() {
    const loc = useLocation();

    // open/close with exit animation
    const [isOpen, setIsOpen] = useState(false);
    const [renderPanel, setRenderPanel] = useState(false);
    const [panelState, setPanelState] = useState("open"); // "open" | "close"

    const headerRef = useRef(null);
    const menuBtnRef = useRef(null);
    const [anchorX, setAnchorX] = useState(0);

    // measure button
    useEffect(() => {
        function measure() {
            const headerRect = headerRef.current?.getBoundingClientRect();
            const menuRect = menuBtnRef.current?.getBoundingClientRect();
            if (headerRect && menuRect) setAnchorX(menuRect.left - headerRect.left);
        }
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    // open/close toggler with reverse hologram on close
    const toggle = () => {
        if (!renderPanel) {
            setRenderPanel(true);
            setPanelState("open");
            setIsOpen(true);
            return;
        }
        if (isOpen) {
            setPanelState("close");
            setIsOpen(false);
            setTimeout(() => setRenderPanel(false), 500);
        } else {
            setPanelState("open");
            setIsOpen(true);
        }
    };

    // close on route change / click outside / Esc
    useEffect(() => {
        function onDocClick(e) {
            if (!headerRef.current) return;
            if (!headerRef.current.contains(e.target)) {
                if (isOpen) { setPanelState("close"); setIsOpen(false); setTimeout(() => setRenderPanel(false), 500); }
            }
        }
        function onEsc(e) {
            if (e.key === "Escape" && isOpen) {
                setPanelState("close"); setIsOpen(false); setTimeout(() => setRenderPanel(false), 500);
            }
        }
        document.addEventListener("mousedown", onDocClick);
        document.addEventListener("keydown", onEsc);
        return () => {
            document.removeEventListener("mousedown", onDocClick);
            document.removeEventListener("keydown", onEsc);
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) { setPanelState("close"); setIsOpen(false); setTimeout(() => setRenderPanel(false), 500); }
    }, [loc.pathname, loc.hash]);

    return (
        // one shared surface for both button & panel (light/dark)
        <div
            ref={headerRef}
            className="relative [--panel-surface:theme(colors.white)] dark:[--panel-surface:rgb(24_24_27)]"
        >
            <HoloMenuButton
                label="Menu"
                buttonRef={menuBtnRef}
                onClick={toggle}
                isOpen={isOpen}
                tone="pink"
            />

            {renderPanel && (
                <HoloDropdownPanel
                    left={anchorX}
                    tone="pink"
                    state={panelState}  // drives reverse shimmer
                >
                    <HoloDropdownItem to="/works" onSelect={toggle} icon={<WorkIcon />}>Works</HoloDropdownItem>
                    <HoloDropdownItem to="/about" onSelect={toggle} icon={<UserIcon />}>About me</HoloDropdownItem>
                    <HoloDropdownItem to="/contact" onSelect={toggle} icon={<MailIcon />}>Contact</HoloDropdownItem>
                </HoloDropdownPanel>
            )}
        </div>
    );
}
