import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    localStorage.getItem("theme") === "dark" ||
    (localStorage.getItem("theme") == null &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <label
      className="relative inline-flex items-center cursor-pointer select-none"
      title={dark ? "Switch to light" : "Switch to dark"}
    >
      {/* Hidden checkbox to keep things accessible */}
      <input
        type="checkbox"
        className="sr-only peer"
        checked={dark}
        onChange={() => setDark(v => !v)}
        aria-label="Toggle dark mode"
      />

      {/* Track */}
      <span
        className="
          h-6 w-10 rounded-full
          border border-border
          bg-muted
          peer-checked:bg-primary/30
          transition-colors duration-200
        "
      />

      {/* Thumb */}
      <span
        className="
          pointer-events-none
          absolute left-0.5 top-0.5
          h-5 w-5 rounded-full
          bg-card border border-border shadow
          transition-transform duration-200
          peer-checked:translate-x-4
        "
      />
    </label>
  );
}
