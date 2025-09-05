import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Home from "./pages/Home.jsx";
import Works from "./pages/Works.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";

import { AnimatePresence } from "framer-motion";

export default function App() {
  const location = useLocation();
  const onWorks = location.pathname === "/works";

  return (
    <div className="min-h-dvh w-screen grid grid-cols-[400px_1fr] bg-background text-foreground
                transition-[background-color,color,border-color,fill,stroke]
                duration-500 ease-in-out">
      <Sidebar showFilters={onWorks} />

      <main className="overflow-y-auto bg-background transition-[background-color,color,border-color,fill,stroke]
                   duration-500 ease-in-out">

        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/works" element={<Works />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}
