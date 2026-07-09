import FiltersPanel from "../FiltersPanel";
import { projects } from "../../data/projects";
import { buildFacets } from "../../lib/facets";

const facets = buildFacets(projects, {
  categoryOrder: ["web", "game", "ml", "art"],
});

export default function MobileWorksFilters() {
  return (
    <div className="lg:hidden mb-6 w-full">
      <FiltersPanel
        categories={facets.categories}
        skills={facets.skills}
        catColorIndex={facets.colorIndex.categories}
        skillColorIndex={facets.colorIndex.skills}
      />
    </div>
  );
}