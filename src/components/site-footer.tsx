import { Link } from "@tanstack/react-router";
import { Phone, Mail, Instagram } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2">
          <p className="font-display text-3xl text-foreground">Rahul</p>
          <p className="mt-2 text-sm text-muted-foreground">
            My camera is my language. Chennai is my story.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-muted-foreground">
            <a
              href="tel:9360476964"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
            >
              <Phone className="size-3.5 text-primary" />
              <span>+91 9360476964</span>
            </a>
            <a
              href="mailto:rahul107825@gmail.com"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
            >
              <Mail className="size-3.5 text-primary" />
              <span>rahul107825@gmail.com</span>
            </a>
            <a
              href="https://instagram.com/rahhuulll.l"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
            >
              <Instagram className="size-3.5 text-primary" />
              <span>@rahhuulll.l</span>
            </a>
          </div>
        </div>

        <nav className="flex flex-col gap-2 text-sm">
          <span className="eyebrow mb-2">Explore</span>
          <Link to="/work" className="hover:text-primary transition-colors">
            Stories
          </Link>
          <Link to="/reels" className="hover:text-primary transition-colors">
            Reels
          </Link>
          <Link to="/about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/contact" className="hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        <div className="text-sm text-muted-foreground md:text-right">
          <span className="eyebrow mb-2 block">Based in</span>
          Chennai, Tamil Nadu, India
          <p className="mt-6 text-xs text-muted-foreground/80">
            © {new Date().getFullYear()} Rahul. All photographs reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}