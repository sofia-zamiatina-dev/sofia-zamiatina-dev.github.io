import { motion } from "framer-motion";
import { filterItemLeft } from "../animations/worksAnimations";
import { chipStylesByIndex } from "../lib/chipPalette.js";

export default function SkillsFilter({ items = [], active = [], onToggle, colorIndexByName = {} }) {
  const activeSet = new Set(active);

  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((name) => {
        const on = activeSet.has(name);
        const idx = colorIndexByName[name] ?? 0;
        const s = chipStylesByIndex(idx);

        const pill = [
          "inline-flex items-center gap-2",
          "px-2.5 py-1 rounded-full text-xs font-medium border transition",
          on ? s.active : s.idle,
          "hover:brightness-95 active:scale-[0.98] cursor-pointer select-none",
        ].join(" ");

        return (
          <motion.span
            key={name}
            variants={filterItemLeft}
            className="inline-block transform-gpu"
          >
            <label className={pill} title={`Filter by ${name}`}>
              <input
                type="checkbox"
                checked={on}
                onChange={() => onToggle?.(name)}
                className="sr-only"
                aria-label={name}
              />
              <span
                aria-hidden="true"
                className={[
                  "inline-flex items-center justify-center",
                  "h-4 w-4 rounded-[4px] border",
                  "border-current",
                  on ? s.accentActive : s.accentIdle,
                ].join(" ")}
              >
                {on && (
                  <svg viewBox="0 0 16 16" className="h-3 w-3" fill="white">
                    <path d="M6.5 11.3 3.6 8.3l1.2-1.1 1.7 1.7L11.2 4l1.2 1.2z" />
                  </svg>
                )}
              </span>
              <span className="font-medium">{name}</span>
            </label>
          </motion.span>
        );
      })}
    </div>
  );
}
