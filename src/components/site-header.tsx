import { Link } from "@tanstack/react-router";

const nav = [
  { to: "/work", label: "Stories" },
  { to: "/reels", label: "Reels" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-10">
        <Link to="/" className="group flex items-baseline gap-3">
          <span className="font-display text-2xl leading-none text-foreground">Rahul</span>
          <span className="eyebrow hidden sm:inline">Chennai · Photography</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm sm:gap-8">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-primary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}