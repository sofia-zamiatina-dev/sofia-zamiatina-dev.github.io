// components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ scrollEl }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    if (scrollEl && scrollEl.current) {
      scrollEl.current.scrollTo({ top: 0, left: 0, behavior: "auto" });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname, hash, scrollEl]);

  return null;
}
