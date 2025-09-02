import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Home from "./pages/Home.jsx";
import Works from "./pages/Works.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  const { pathname, hash } = useLocation();
  const onWorks = hash.includes("works"); // HashRouter path check

  return (
    <div className="h-screen w-screen grid grid-cols-[280px_1fr] bg-white text-neutral-900">
      <Sidebar showFilters={onWorks} />
      <main className="overflow-y-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/#/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/works" element={<Works />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* fallback */}
          <Route path="*" element={<Navigate to="/#/home" />} />
        </Routes>
      </main>
    </div>
  );
}
