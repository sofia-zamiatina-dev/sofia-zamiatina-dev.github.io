import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FiltersPanel from "./FiltersPanel.jsx";
import { projects } from "../data/projects.js";
import { buildFacets } from "../lib/facets.js";
import BouncyBallOverlay from "./BouncyBallOverlay.jsx";
import { Download } from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";
import { filtersContainer } from "../animations/worksAnimations";
import { sidebarVariants } from "../animations/sidebarAnimations.js";
import SidebarMenu from "./SidebarMenu.jsx";
import HoloButton from "./HoloButton.jsx";

const facets = buildFacets(projects, { categoryOrder: ["web", "game", "ml", "art"] });

const HomeIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function HomeButton() {
  return (
    <Link
      to="/home"
      className="p-2 rounded-md hover:bg-muted transition-colors"
      aria-label="Home"
    >
      <HomeIcon className="w-4 h-4 text-fuchsia-500 hover:text-fuchsia-600 transition-colors" />
    </Link>
  );
}

// Download button (bottom-left)
function DownloadPDFButton() {
  return (
    <HoloButton
      href="/CV.pdf"
      download
      tone="sky"
      className="px-3 py-1.5 rounded-md text-sm"
      aria-label="Download CV as PDF"
      iconLeft={<Download className="w-4 h-4" />}
    >
      CV.pdf
    </HoloButton>
  );
}

export default function Sidebar({ showFilters }) {
  const loc = useLocation();

  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className="relative sticky top-0 h-dvh border-r border-border bg-background text-foreground flex flex-col"
    >
      {/* Background ball animation */}
      <BouncyBallOverlay />

      <div className="relative z-10 flex-1 overflow-y-auto flex flex-col">

        {/* TOP: Home + Menu */}
        <div className="p-4 border-b border-border relative">
          <div className="flex items-center gap-3">
            <HomeButton />
            <SidebarMenu />
          </div>
        </div>

        {/* NAME BLOCK */}
        <div className="p-4">
          <div className="font-semibold">Sofia Zamiatina</div>
          <div className="text-xs text-foreground/60">Software Engineering MEng</div>
        </div>

        {/* Contextual filters – only for Works */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              key="filters-panel"
              variants={filtersContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 10 }}
            >
              <FiltersPanel
                categories={facets.categories}
                skills={facets.skills}
                catColorIndex={facets.colorIndex.categories}
                skillColorIndex={facets.colorIndex.skills}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-auto p-3 text-xs text-foreground/60">
          © {new Date().getFullYear()} Sofia Z.
        </div>

        {/* Bottom-left download button */}
        <div className="absolute left-3 bottom-10">
          <DownloadPDFButton />
        </div>
      </div>
    </motion.aside>
  );
}