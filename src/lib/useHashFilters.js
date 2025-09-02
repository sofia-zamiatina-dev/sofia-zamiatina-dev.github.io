import { useEffect, useState } from "react";

function parse() {
  const search = (window.location.hash.split("?")[1] || "");
  const params = new URLSearchParams(search);
  const category = params.get("cat") || "all";
  const skills = (params.get("skills") || "").split(",").filter(Boolean);
  return { category, skills };
}

export function useHashFilters() {
  const [filters, setFilters] = useState(parse());
  useEffect(() => {
    const onChange = () => setFilters(parse());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return filters; // { category, skills }
}
