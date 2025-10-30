const PALETTE = [
  {
    idle: "bg-sky-200/60 text-sky-900 border-sky-300 dark:bg-sky-500/30 dark:text-sky-50 dark:border-sky-400/40",
    active: "bg-sky-600 text-sky-50 border-sky-600 dark:bg-sky-400 dark:text-sky-900 dark:border-sky-400",
    accentIdle: "text-sky-400 dark:text-sky-400",
    accentActive: "text-sky-600 dark:text-sky-400"
  },
  {
    idle: "bg-indigo-200/60 text-indigo-900 border-indigo-300 dark:bg-indigo-500/30 dark:text-indigo-50 dark:border-indigo-400/40",
    active: "bg-indigo-600 text-indigo-50 border-indigo-600 dark:bg-indigo-400 dark:text-indigo-900 dark:border-indigo-400",
    accentIdle: "text-indigo-400 dark:text-indigo-400",
    accentActive: "text-indigo-600 dark:text-indigo-400"
  },
  {
    idle: "bg-emerald-200/60 text-emerald-900 border-emerald-300 dark:bg-emerald-500/30 dark:text-emerald-50 dark:border-emerald-400/40",
    active: "bg-emerald-600 text-emerald-50 border-emerald-600 dark:bg-emerald-400 dark:text-emerald-900 dark:border-emerald-400",
    accentIdle: "text-emerald-400 dark:text-emerald-400",
    accentActive: "text-emerald-600 dark:text-emerald-400"
  },
  {
    idle: "bg-amber-200/70 text-amber-900 border-amber-300 dark:bg-amber-500/30 dark:text-amber-50 dark:border-amber-400/40",
    active: "bg-amber-500 text-amber-900 border-amber-500 dark:bg-amber-300 dark:text-amber-900 dark:border-amber-300",
    accentIdle: "text-amber-400 dark:text-amber-400",
    accentActive: "text-amber-500 dark:text-amber-300"
  },
  {
    idle: "bg-rose-200/60 text-rose-900 border-rose-300 dark:bg-rose-500/30 dark:text-rose-50 dark:border-rose-400/40",
    active: "bg-rose-600 text-rose-50 border-rose-600 dark:bg-rose-400 dark:text-rose-900 dark:border-rose-400",
    accentIdle: "text-rose-400 dark:text-rose-400",
    accentActive: "text-rose-600 dark:text-rose-400"
  },
  {
    idle: "bg-cyan-200/60 text-cyan-900 border-cyan-300 dark:bg-cyan-500/30 dark:text-cyan-50 dark:border-cyan-400/40",
    active: "bg-cyan-600 text-cyan-50 border-cyan-600 dark:bg-cyan-400 dark:text-cyan-900 dark:border-cyan-400",
    accentIdle: "text-cyan-400 dark:text-cyan-400",
    accentActive: "text-cyan-600 dark:text-cyan-400"
  },
];

export function chipStylesByIndex(i = 0) {
  return PALETTE[i % PALETTE.length];
}
