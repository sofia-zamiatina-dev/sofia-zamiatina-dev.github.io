import { Link } from "react-router-dom";

export default function HomeCard({ to, title, desc, color }) {
    const theme = {
        sky: {
            border: "border-sky-300",
            //glow: "shadow-[0_10px_24px_rgba(56,189,248,0.25)]",
            bg: "bg-sky-50/50 dark:bg-sky-950/30",
            text: "text-sky-800 dark:text-sky-200",
        },
        violet: {
            border: "border-violet-400",
            //glow: "shadow-[0_10px_24px_rgba(139,92,246,0.25)]",
            bg: "bg-violet-50/50 dark:bg-violet-950/30",
            text: "text-violet-800 dark:text-violet-200",
        },
        amber: {
            border: "border-amber-300",
            //glow: "shadow-[0_10px_24px_rgba(251,191,36,0.25)]",
            bg: "bg-amber-50/50 dark:bg-amber-950/30",
            text: "text-amber-800 dark:text-amber-200",
        },
        pink: {
            border: "border-pink-300",
            //glow: "shadow-[0_10px_24px_rgba(236,72,153,0.25)]",
            bg: "bg-pink-50/50 dark:bg-pink-950/30",
            text: "text-pink-800 dark:text-pink-200",
        },
        blue: {
            border: "border-blue-300",
            //glow: "shadow-[0_10px_24px_rgba(59,130,246,0.25)]",
            bg: "bg-blue-50/50 dark:bg-blue-950/30",
            text: "text-blue-800 dark:text-blue-200",
        },
    }[color];

    const Arrow = (props) => (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
            <path
                d="M5 12h12M13 6l6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );

    return (
        <Link
            to={to}
            className={[
                "group relative rounded-xl p-5",
                "border-2 transition-all duration-200",
                theme.border,
                theme.bg,
                theme.glow,
                "hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                "flex flex-col justify-between min-h-[200px]",
            ].join(" ")}
        >
            {/* Top content */}
            <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className={["mt-3 text-sm leading-relaxed", theme.text].join(" ")}>
                    {desc}
                </p>
            </div>

            {/* Bottom-right arrow */}
            <div className="self-end mt-6">
                <Arrow className="opacity-70 group-hover:translate-x-1 transition-transform" />
            </div>
        </Link>
    );
}