import { useEffect, useMemo, useRef, useState, useCallback, useLayoutEffect } from "react";

export default function GallerySlider({
    items, className = "", autoAdvanceMs = 15000, peekPx = 32, gapPx = 0,
    autoFocus = false,
}) {
    const count = items?.length ?? 0;
    const [index, setIndex] = useState(0);
    const [lastInteraction, setLastInteraction] = useState(Date.now());
    const [slideW, setSlideW] = useState(0);
    const viewportRef = useRef(null);

    // which slides are actually mounted 
    const [rendered, setRendered] = useState(() => {
        const arr = Array(count).fill(false);
        if (count > 0) arr[0] = true;
        if (count > 1) arr[1] = true;
        if (count > 2) arr[2] = true;
        return arr;
    });
    useEffect(() => {
        const arr = Array(count).fill(false);
        if (count > 0) arr[0] = true;
        if (count > 1) arr[1] = true;
        if (count > 2) arr[2] = true;
        setRendered(arr);
    }, [count]);
    useEffect(() => {
        if (!count) return;
        setRendered(prev => {
            const copy = prev.slice();
            copy[index] = true;
            copy[(index + 1) % count] = true;
            copy[(index + 2) % count] = true;
            return copy;
        });
    }, [index, count]);

    const clamp = n => (count ? (n + count) % count : 0);
    const next = useCallback(() => setIndex(i => clamp(i + 1)), [count]);
    const prev = useCallback(() => setIndex(i => clamp(i - 1)), [count]);
    const markInteraction = useCallback(() => setLastInteraction(Date.now()), []);

    // measure slide width based on viewport + peeks
    useLayoutEffect(() => {
        const measure = () => {
            const vp = viewportRef.current;
            if (!vp) return;
            const leftPeek = index === 0 ? 0 : peekPx;
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

    // auto-advance
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

    // keyboard: ← / → 
    useEffect(() => {
        const onKey = (e) => {
            const a = document.activeElement;
            const tag = a?.tagName;
            const typing = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || a?.isContentEditable;
            if (typing) return;
            if (e.key === "ArrowRight") { e.preventDefault(); next(); markInteraction(); }
            else if (e.key === "ArrowLeft") { e.preventDefault(); prev(); markInteraction(); }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [next, prev, markInteraction]);

    useEffect(() => {
        if (autoFocus) viewportRef.current?.focus();
    }, [autoFocus]);

    if (!count) return null;

    const leftPeek = index === 0 ? 0 : peekPx;
    const offsetX = -(index * (slideW + gapPx));
    const trackTransition = "transform 420ms cubic-bezier(.22,.61,.36,1)";

    return (
        <div className={["relative h-full flex flex-col", className].join(" ")}>
            <section
                ref={viewportRef}
                className="relative overflow-hidden bg-background/40 flex-1 min-h-0 rounded-md focus:outline-none focus-visible:outline-none focus:ring-0"
                aria-label="Project media gallery"
                tabIndex={-1}
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
                            const mount = rendered[i];
                            const isActive = i === index;
                            const isNext = i === (index + 1) % count;
                            const isNext2 = i === (index + 2) % count;
                            return (
                                <div key={i} className="flex-none h-full" style={{ width: slideW }}>
                                    {mount ? (
                                        <Slide item={item} active={isActive} prefetch={isNext || isNext2} />
                                    ) : (
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

            {/* dots */}
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

function Slide({ item, active, prefetch }) {
    const frame = "w-full h-full flex items-center justify-center p-2";
    if (item.type === "video") {
        const preload = active ? "metadata" : (prefetch ? "metadata" : "none");
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
                loading={active || prefetch ? "eager" : "lazy"}
                decoding="async"
            />
        </div>
    );
}

function srcPath(src) {
    return src.startsWith("/") ? src : `/${src}`;
}