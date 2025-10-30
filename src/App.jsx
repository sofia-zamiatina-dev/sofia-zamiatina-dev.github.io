import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useRef } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Home from "./pages/Home.jsx";
import Works from "./pages/Works.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "./components/ScrollToTop.jsx";

export default function App() {
  const location = useLocation();
  const onWorks = location.pathname === "/works";
  const mainRef = useRef(null);         

  return (
    <div
      className="h-dvh w-screen grid grid-cols-[400px_1fr] bg-background text-foreground
                 transition-[background-color,color,border-color,fill,stroke]
                 duration-500 ease-in-out"
    >
      <Sidebar showFilters={onWorks} />

      <main
        ref={mainRef}                
        className="relative h-dvh overflow-y-auto overscroll-contain bg-background
                   transition-[background-color,color,border-color,fill,stroke]
                   duration-500 ease-in-out"
        tabIndex={-1}
      >
        <ScrollToTop scrollEl={mainRef} />

        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/works" element={<Works />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} /> 
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}