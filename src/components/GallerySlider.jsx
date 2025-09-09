import { useEffect, useMemo, useRef, useState, useCallback, useLayoutEffect } from "react";

export default function GallerySlider({
  items,                     // [{ type:'image'|'video', src, alt?, poster?, loop?, muted? }]
  className = "",
  autoAdvanceMs = 15000,     // 15s
  peekPx = 32,
  gapPx = 0,
}) {
  const count = items?.length ?? 0;
  const [index, setIndex] = useState(0);                 // current real index
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [slideW, setSlideW] = useState(0);
  const viewportRef = useRef(null);

  // Which slides have actual media mounted (lazy). Start with [current, next].
  const [rendered, setRendered] = useState(() =>
    Array.from({ length: count }, (_, i) => i === 0 || i === 1)
  );
  useEffect(() => {
    // Reset when items change
    setRendered(Array.from({ length: count }, (_, i) => i === 0 || i === (count > 1 ? 1 : 0)));
  }, [count]);

  // Always ensure current and next are rendered
  useEffect(() => {
    if (!count) return;
    setRendered(prev => {
      const copy = prev.slice();
      copy[index] = true;
      copy[(index + 1) % count] = true;
      return copy;
    });
  }, [index, count]);

  const clamp = (n) => (count ? (n + count) % count : 0);
  const next = useCallback(() => setIndex(i => clamp(i + 1)), [count]);
  const prev = useCallback(() => setIndex(i => clamp(i - 1)), [count]);
  const markInteraction = useCallback(() => setLastInteraction(Date.now()), []);

  // Measure slide width = viewport - (leftPeek + rightPeek)
  useLayoutEffect(() => {
    const measure = () => {
      const vp = viewportRef.current;
      if (!vp) return;
      const leftPeek = index === 0 ? 0 : peekPx; // hide left sliver on first open
      const w = vp.clientWidth - (leftPeek + peekPx);
      setSlideW(Math.max(0, w));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [peekPx, index]);

  // Auto-advance (15s)
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

  // Keyboard arrows
  useEffect(() => {
    const onKey = (e) => {
      const vp = viewportRef.current;
      if (!vp) return;
      const active = document.activeElement;
      const inside = vp.contains(active) || active === document.body;
      if (!inside) return;
      if (e.key === "ArrowRight") { next(); markInteraction(); }
      if (e.key === "ArrowLeft")  { prev(); markInteraction(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, markInteraction]);

  if (!count) return null;

  const leftPeek = index === 0 ? 0 : peekPx;          // no left sliver on first open
  const offsetX = -(index * (slideW + gapPx));
  const trackTransition = "transform 420ms cubic-bezier(.22,.61,.36,1)";

  return (
    <div className={["relative h-full flex flex-col", className].join(" ")}>
      <section
        ref={viewportRef}
        className="relative overflow-hidden bg-background/40 flex-1 min-h-0 rounded-md"
        aria-label="Project media gallery"
        tabIndex={0}
      >
        <div className="relative w-full h-full">
          <div
            className="flex h-full select-none will-change-transform"
            style={{
              paddingLeft: leftPeek,
              paddingRight: peekPx,
              gap: gapPx,
              transform: `translateX(${offsetX}px)`,
              transition: trackTransition,
              boxSizing: "content-box",
            }}
            onMouseDown={markInteraction}
            onTouchStart={markInteraction}
            onClick={markInteraction}
          >
            {items.map((item, i) => {
              const mount = rendered[i]; // only mount current & next initially
              return (
                <div key={i} className="flex-none h-full" style={{ width: slideW }}>
                  {mount ? (
                    <Slide item={item} active={i === index} next={i === (index + 1) % count} />
                  ) : (
                    // lightweight placeholder keeps layout width without loading media
                    <div className="w-full h-full flex items-center justify-center p-2">
                      <div className="w-full h-full rounded border border-border/30 bg-muted/30" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dots (outside) */}
      <div className="mt-2 flex items-center justify-center gap-1.5">
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
  );
}

// Media mounts only when asked; videos are light unless active/next.
function Slide({ item, active, next }) {
  const frame = "w-full h-full flex items-center justify-center p-2";
  if (item.type === "video") {
    // Use lighter preload for non-active to avoid bandwidth spikes
    const preload = active ? "metadata" : "none";
    return (
      <div className={frame}>
        <video
          className="max-h-full max-w-full object-contain bg-black rounded border border-border"
          src={srcPath(item.src)}
          poster={item.poster ? srcPath(item.poster) : undefined}
          controls
          preload={preload}
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
        loading={active || next ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
}

function srcPath(src) {
  return src.startsWith("/") ? src : `/${src}`;
}
