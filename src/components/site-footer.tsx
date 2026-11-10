import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-3 md:px-10">
        <div>
          <p className="font-display text-3xl">Rahul</p>
          <p className="mt-2 text-sm text-muted-foreground">
            My camera is my language. Chennai is my story.
          </p>
        </div>
        <nav className="flex flex-col gap-2 text-sm">
          <span className="eyebrow mb-2">Explore</span>
          <Link to="/work" className="hover:text-primary">Stories</Link>
          <Link to="/reels" className="hover:text-primary">Reels</Link>
          <Link to="/about" className="hover:text-primary">About</Link>
          <Link to="/contact" className="hover:text-primary">Contact</Link>
        </nav>
        <div className="text-sm text-muted-foreground md:text-right">
          <span className="eyebrow mb-2 block">Based in</span>
          Chennai, Tamil Nadu
          <p className="mt-6 text-xs">© {new Date().getFullYear()} Rahul. All photographs reserved.</p>
        </div>
      </div>
    </footer>
  );
}