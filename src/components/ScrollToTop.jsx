// components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ scrollEl }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Let in-page anchors ( …/page#section ) keep their own scroll
    if (hash) return;

    // Prefer the provided scroll container; fall back to window
    if (scrollEl && scrollEl.current) {
      scrollEl.current.scrollTo({ top: 0, left: 0, behavior: "auto" });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname, hash, scrollEl]);

  return null;
}
