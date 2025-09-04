import { useEffect, useRef } from "react";

/** Tiny ball that bounces inside its parent (the sidebar) as a background layer. */
export default function SidebarBallBG() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const lastRef = useRef(performance.now());
  const palette = useRef([
    "#ef4444", // red-500
    "#f59e0b", // amber-500
    "#10b981", // emerald-500
    "#06b6d4", // cyan-500
    "#3b82f6", // blue-500
    "#8b5cf6", // violet-500
    "#ec4899", // pink-500
  ]);

  const ballRef = useRef({
    x: 0,
    y: 0,
    r: 4,            // smaller ball
    vx: 160,         // px/s
    vy: -130,        // px/s
    color: "rgba(0,0,0,0.65)",
  });

  const pickColor = () => {
    const arr = palette.current;
    return arr[Math.floor(Math.random() * arr.length)];
  };

  function fitCanvasToParent() {
    const c = canvasRef.current;
    const parent = c.parentElement; // <aside>
    if (!parent) return { w: 0, h: 0 };

    const rect = parent.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    c.style.width = `${rect.width}px`;
    c.style.height = `${rect.height}px`;
    c.width = Math.max(1, Math.floor(rect.width * dpr));
    c.height = Math.max(1, Math.floor(rect.height * dpr));

    const ctx = c.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    return { w: rect.width, h: rect.height, ctx };
  }

  useEffect(() => {
    const c = canvasRef.current;
    const { w, h, ctx } = fitCanvasToParent();

    // Spawn at bottom-left inside the sidebar
    const b = ballRef.current;
    b.x = b.r + 6;
    b.y = h - b.r - 6;

    // Keep canvas synced to sidebar size
    const ro = new ResizeObserver(() => fitCanvasToParent());
    if (c.parentElement) ro.observe(c.parentElement);

    const onWinResize = () => fitCanvasToParent();
    window.addEventListener("resize", onWinResize, { passive: true });

    function loop(now = performance.now()) {
      const dt = Math.min(0.032, (now - lastRef.current) / 1000);
      lastRef.current = now;

      const parentRect = c.parentElement?.getBoundingClientRect();
      const width = parentRect?.width ?? 300;
      const height = parentRect?.height ?? 600;

      let { x, y, r, vx, vy, color } = ballRef.current;

      // integrate
      x += vx * dt;
      y += vy * dt;

      // bounce on edges; change color on each bounce
      let bounced = false;
      if (x - r <= 0) { x = r; vx *= -1; bounced = true; }
      if (x + r >= width) { x = width - r; vx *= -1; bounced = true; }
      if (y - r <= 0) { y = r; vy *= -1; bounced = true; }
      if (y + r >= height) { y = height - r; vy *= -1; bounced = true; }
      if (bounced) color = pickColor();

      ballRef.current = { x, y, r, vx, vy, color };

      // draw
      ctx.clearRect(0, 0, width, height);

      // soft blend layer (super subtle, comment out if not desired)
      // ctx.globalAlpha = 0.03;
      // ctx.fillStyle = "#000";
      // ctx.fillRect(0, 0, width, height);
      // ctx.globalAlpha = 1;

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = "rgba(0,0,0,0.25)";
      ctx.fill();
      ctx.shadowBlur = 0;

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onWinResize);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
    />
  );
}
