// src/components/BouncyBallOverlay.jsx
import { useEffect, useRef, useState } from "react";

export default function BouncyBallOverlay() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const lastRef = useRef(performance.now());
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);

  const palette = useRef([
    "#ef4444", "#f59e0b", "#10b981",
    "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899",
  ]);

  const ballRef = useRef({
    x: 0, y: 0, r: 6,
    vx: 0, vy: 0,
    color: "#3b82f6",
  });

  const pickColor = () => {
    const arr = palette.current;
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const randomVelocity = (speed = 150) => {
    const angle = Math.random() * Math.PI * 2;
    return { vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed };
  };

  function fitCanvasToParent() {
    const c = canvasRef.current;
    const parent = c?.parentElement;
    if (!c || !parent) return { w: 0, h: 0, ctx: c?.getContext("2d") };

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

  function drawBall(ctx, width, height) {
    const { x, y, r, color } = ballRef.current;
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.shadowBlur = 6;
    ctx.shadowColor = "rgba(0,0,0,0.25)";
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  function respawnBall(W, H) {
    const b = ballRef.current;
    b.x = Math.random() * (W - 2 * b.r) + b.r;
    b.y = Math.random() * (H - 2 * b.r) + b.r;
    b.color = pickColor();
    const { vx, vy } = randomVelocity(160 + Math.random() * 80);
    b.vx = vx; b.vy = vy;
  }

  useEffect(() => {
    const c = canvasRef.current;
    const { w, h, ctx } = fitCanvasToParent();

    // initial spawn
    respawnBall(w, h);

    // keep canvas sized
    const ro = new ResizeObserver(() => fitCanvasToParent());
    if (c.parentElement) ro.observe(c.parentElement);
    const onWinResize = () => fitCanvasToParent();
    window.addEventListener("resize", onWinResize, { passive: true });

    function loop(now = performance.now()) {
      const dt = Math.min(0.032, (now - lastRef.current) / 1000);
      lastRef.current = now;

      const rect = c.parentElement?.getBoundingClientRect();
      const width = rect?.width ?? 300;
      const height = rect?.height ?? 600;

      let { x, y, r, vx, vy, color } = ballRef.current;

      if (!pausedRef.current) {
        x += vx * dt;
        y += vy * dt;

        let bounced = false;
        if (x - r <= 0) { x = r; vx *= -1; bounced = true; }
        if (x + r >= width) { x = width - r; vx *= -1; bounced = true; }
        if (y - r <= 0) { y = r; vy *= -1; bounced = true; }
        if (y + r >= height) { y = height - r; vy *= -1; bounced = true; }
        if (bounced) color = pickColor();
      }

      ballRef.current = { x, y, r, vx, vy, color };
      drawBall(ctx, width, height);

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onWinResize);
      ro.disconnect();
    };
  }, []);

  // Click anywhere in sidebar; if clicking ON the ball, respawn (new direction)
  useEffect(() => {
    const c = canvasRef.current;
    const parent = c.parentElement;

    const onClick = (e) => {
      const rect = parent.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const b = ballRef.current;
      const dx = clickX - b.x;
      const dy = clickY - b.y;
      const inside = dx * dx + dy * dy <= b.r * b.r;

      if (inside) {
        respawnBall(rect.width, rect.height);
      }
    };

    parent.addEventListener("click", onClick, true);
    return () => parent.removeEventListener("click", onClick, true);
  }, []);

  // Toggle handler
  const toggleMotion = () => {
    setPaused((p) => {
      const next = !p;
      pausedRef.current = next;
      return next;
    });
  };

  return (
    <>
      {/* Background canvas (under content) */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 z-0"
        style={{ pointerEvents: "none" }}
      />

      {/* Bottom-right control button */}
      <button
        type="button"
        onClick={toggleMotion}
        className="absolute bottom-2 right-2 z-20 text-xs px-2 py-1 rounded border border-border bg-background/80 backdrop-blur-sm hover:bg-muted transition"
      >
        {paused ? "Play" : "Stop ball"}
      </button>
    </>
  );
}
