export default function MobileHeader() {
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-background border-b flex items-center justify-between px-4">
      <button className="text-xl">☰</button>

      <span className="font-semibold">
        Sofia Zamiatina
      </span>

      <a href="/CV.pdf" download className="text-sm">
        CV
      </a>
    </header>
  );
}