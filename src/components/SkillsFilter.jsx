// SkillsFilter.jsx
// Self-contained colorful skill chips that work in light & dark mode.
// Usage: <SkillsFilter items={skills} active={activeSkills} onToggle={toggleSkill} />

export default function SkillsFilter({ items = [], active = [], onToggle }) {
    const activeSet = new Set(active);
  
    const styles = {
      react:    { idle: "bg-sky-200/60 text-sky-900 border-sky-300 dark:bg-sky-500/30 dark:text-sky-50 dark:border-sky-400/40", active: "bg-sky-600 text-sky-50 border-sky-600 dark:bg-sky-400 dark:text-sky-900 dark:border-sky-400" },
      nextjs:   { idle: "bg-gray-200/60 text-gray-900 border-gray-300 dark:bg-gray-500/30 dark:text-gray-50 dark:border-gray-400/40", active: "bg-gray-700 text-gray-50 border-gray-700 dark:bg-gray-300 dark:text-gray-900 dark:border-gray-300" },
      unity:    { idle: "bg-zinc-200/60 text-zinc-900 border-zinc-300 dark:bg-zinc-500/30 dark:text-zinc-50 dark:border-zinc-400/40", active: "bg-zinc-700 text-zinc-50 border-zinc-700 dark:bg-zinc-300 dark:text-zinc-900 dark:border-zinc-300" },
      csharp:   { idle: "bg-purple-200/60 text-purple-900 border-purple-300 dark:bg-purple-500/30 dark:text-purple-50 dark:border-purple-400/40", active: "bg-purple-600 text-purple-50 border-purple-600 dark:bg-purple-400 dark:text-purple-900 dark:border-purple-400" },
      python:   { idle: "bg-yellow-200/70 text-yellow-900 border-yellow-300 dark:bg-yellow-500/30 dark:text-yellow-50 dark:border-yellow-400/40", active: "bg-yellow-500 text-yellow-900 border-yellow-500 dark:bg-yellow-300 dark:text-yellow-900 dark:border-yellow-300" },
      sklearn:  { idle: "bg-orange-200/70 text-orange-900 border-orange-300 dark:bg-orange-500/30 dark:text-orange-50 dark:border-orange-400/40", active: "bg-orange-600 text-orange-50 border-orange-600 dark:bg-orange-400 dark:text-orange-900 dark:border-orange-400" },
      fastapi:  { idle: "bg-green-200/60 text-green-900 border-green-300 dark:bg-green-500/30 dark:text-green-50 dark:border-green-400/40", active: "bg-green-600 text-green-50 border-green-600 dark:bg-green-400 dark:text-green-900 dark:border-green-400" },
      tailwind: { idle: "bg-cyan-200/60 text-cyan-900 border-cyan-300 dark:bg-cyan-500/30 dark:text-cyan-50 dark:border-cyan-400/40", active: "bg-cyan-600 text-cyan-50 border-cyan-600 dark:bg-cyan-400 dark:text-cyan-900 dark:border-cyan-400" },
      figma:    { idle: "bg-pink-200/60 text-pink-900 border-pink-300 dark:bg-pink-500/30 dark:text-pink-50 dark:border-pink-400/40", active: "bg-pink-600 text-pink-50 border-pink-600 dark:bg-pink-400 dark:text-pink-900 dark:border-pink-400" },
      docker:   { idle: "bg-blue-200/60 text-blue-900 border-blue-300 dark:bg-blue-500/30 dark:text-blue-50 dark:border-blue-400/40", active: "bg-blue-600 text-blue-50 border-blue-600 dark:bg-blue-400 dark:text-blue-900 dark:border-blue-400" },
      _default: { idle: "bg-muted text-foreground/80 border-border dark:bg-muted/30 dark:text-foreground/90", active: "bg-foreground text-background border-foreground" },
    };
  
    return (
      <div className="flex flex-wrap gap-1.5">
        {items.map((name) => {
          const on = activeSet.has(name);
          const s = styles[name] || styles._default;
          const cls = [
            "px-2.5 py-1 rounded-full text-xs font-medium border transition",
            on ? s.active : s.idle,
            "hover:brightness-95 active:scale-[0.98]",
          ].join(" ");
          return (
            <button
              key={name}
              type="button"
              className={cls}
              title={`Filter by ${name}`}
              onClick={() => onToggle?.(name)}
            >
              {name}
            </button>
          );
        })}
      </div>
    );
  }
  