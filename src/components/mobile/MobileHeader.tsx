import SidebarMenu from "../SidebarMenu";

export default function MobileHeader() {
  return (
    <header className="lg:hidden h-14 border-b border-border bg-background flex items-center justify-between px-4">
      <SidebarMenu />

      <span className="font-semibold text-sm">
        Sofia Zamiatina
      </span>
    </header>
  );
}