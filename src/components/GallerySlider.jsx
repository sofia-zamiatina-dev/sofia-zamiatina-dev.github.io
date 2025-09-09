import { useEffect, useMemo, useRef, useState, useCallback, useLayoutEffect } from "react";

export default function GallerySlider({
  items,                     // [{ type:'image'|'video', src, alt?, poster?, loop?, muted? }]
  className = "",
  autoAdvanceMs = 30000,
  peekPx = 32,              // <-- visible sliver of prev/next on each side
  gapPx = 0,               // <-- space between slides
}) {
  const [index, setIndex] = useState(0);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const containerRef = useRef(null);   // viewport
  const trackRef = useRef(null);       // track
  const [slideW, setSlideW] = useState(0);

  const count = items?.length ?? 0;
  const clamp = (n) => (count ? (n + count) % count : 0);

  const next = useCallback(() => setIndex((i) => clamp(i + 1)), [count]);
  const prev = useCallback(() => setIndex((i) => clamp(i - 1)), [count]);
  const markInteraction = useCallback(() => setLastInteraction(Date.now()), []);

  // Measure slide width = viewport - 2*peek
  useLayoutEffect(() => {
    const measure = () => {
      const el = containerRef.current;
      if (!el) return;
      const w = el.clientWidth - 2 * peekPx;
      setSlideW(Math.max(0, w));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [peekPx]);

  // Auto-advance when idle
  useEffect(() => {
    if (!count) return;
    const id = setInterval(() => {
      if (Date.now() - lastInteraction >= autoAdvanceMs) {
        next();
        setLastInteraction(Date.now());
      }
    }, 1000);
    return () => clearInterval(id);
  }, [lastInteraction, autoAdvanceMs, next, count]);

  // Keyboard arrows (when focused in/near the slider)
  useEffect(() => {
    const onKey = (e) => {
      if (!containerRef.current) return;
      const active = document.activeElement;
      const inside = containerRef.current.contains(active) || active === document.body;
      if (!inside) return;
      if (e.key === "ArrowRight") { next(); markInteraction(); }
      if (e.key === "ArrowLeft")  { prev(); markInteraction(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, markInteraction]);

  const trackProps = useMemo(() => ({
    onMouseDown: markInteraction,
    onTouchStart: markInteraction,
    onClick: markInteraction,
  }), [markInteraction]);

  if (!count) return null;

  const offsetX = -(index * (slideW + gapPx)); // pixel-perfect translation per slide

  return (
    <div className={["relative h-full flex flex-col", className].join(" ")}>
      {/* Viewport: add side padding == peek to reveal neighbors */}
      <section
        ref={containerRef}
        className="relative overflow-hidden bg-background/40 flex-1 min-h-0 rounded-md"
        style={{ paddingLeft: peekPx, paddingRight: peekPx }}
        aria-label="Project media gallery"
        tabIndex={0}
      >
        <div className="relative w-full h-full">
          {/* Track */}
          <div
            ref={trackRef}
            className="flex h-full select-none will-change-transform"
            style={{
              gap: gapPx,
              transform: `translateX(${offsetX}px)`,
              transition: "transform 420ms cubic-bezier(.22,.61,.36,1)", // buttery slide
            }}
            {...trackProps}
          >
            {items.map((item, i) => (
              <div key={i} className="flex-none h-full" style={{ width: slideW }}>
                <Slide item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Controls row (outside, bottom) */}
      <div className="mt-2 flex items-center justify-center gap-3">

        <div className="flex items-center gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => { setIndex(i); markInteraction(); }}
              aria-label={`Go to slide ${i + 1}`}
              className={[
                "h-2 w-2 rounded-full border border-border",
                i === index ? "bg-foreground/80" : "bg-muted",
              ].join(" ")}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

// Slides always fit the frame height; images/videos keep aspect.
function Slide({ item }) {
  const frame = "w-full h-full flex items-center justify-center p-2";
  if (item.type === "video") {
    return (
      <div className={frame}>
        <video
          className="max-h-full max-w-full object-contain bg-black rounded border border-border"
          src={srcPath(item.src)}
          poster={item.poster ? srcPath(item.poster) : undefined}
          controls
          preload="metadata"
          playsInline
          {...(item.loop ? { loop: true } : {})}
          {...(item.muted ? { muted: true } : {})}
        />
      </div>
    );
  }
  return (
    <div className={frame}>
      <img
        src={srcPath(item.src)}
        alt={item.alt || ""}
        className="max-h-full max-w-full object-contain rounded border border-border bg-background"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

function srcPath(src) {
  return src.startsWith("/") ? src : `/${src}`;
}
