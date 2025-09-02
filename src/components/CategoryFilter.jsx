// CategoryFilter.jsx
// Neutral, grey-only category pills

export default function CategoryFilter({ items = [], active, onSelect }) {
    return (
      <div className="flex flex-wrap gap-1.5">
        {items.map((name) => {
          const isActive = active === name;
          const cls = [
            "px-2.5 py-1 rounded-full text-xs font-medium border transition",
            isActive
              ? "bg-gray-700 text-white border-gray-700 dark:bg-gray-200 dark:text-gray-900 dark:border-gray-200"
              : "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700",
          ].join(" ");
          return (
            <button
              key={name}
              type="button"
              className={cls}
              onClick={() => onSelect?.(name)}
            >
              {name}
            </button>
          );
        })}
      </div>
    );
  }
  