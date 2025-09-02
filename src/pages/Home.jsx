import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-8 max-w-3xl text-foreground bg-background min-h-screen">
      <h1 className="text-3xl font-semibold mb-2">Hi, I’m Sofia.</h1>

      <p className="text-foreground/80">
        I build interactive software, ML-powered tools, and playful experiences.
        Explore selected work, learn more about me, or get in touch.
      </p>

      <div className="mt-6 grid gap-3 w-full max-w-md">
        <Link
          className="px-4 py-3 rounded-xl border border-border hover:bg-muted"
          to="/works"
        >
          Explore Works
        </Link>
        <Link
          className="px-4 py-3 rounded-xl border border-border hover:bg-muted"
          to="/about"
        >
          About Me
        </Link>
        <Link
          className="px-4 py-3 rounded-xl border border-border hover:bg-muted"
          to="/contact"
        >
          Contact
        </Link>
      </div>

      {/* Optional featured teaser */}
      <div className="mt-10 p-4 rounded-xl border border-border bg-card">
        <div className="text-sm text-foreground/60 mb-1">Featured</div>
        <div className="font-medium">
          ImaginariumDigital — Multiplayer storytelling (Unity + Photon)
        </div>
        <Link
          to="/works"
          className="text-sm underline mt-1 inline-block text-primary hover:text-primary/80"
        >
          View all projects
        </Link>
      </div>
    </div>
  );
}
