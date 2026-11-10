import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Volume2, VolumeX, Heart, Camera, Sliders } from "lucide-react";
import { cameraSound } from "@/lib/camera-audio";
import { useLikedSlugs } from "@/lib/likes-store";

const nav = [
  { to: "/work", label: "Stories" },
  { to: "/reels", label: "Reels" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [soundOn, setSoundOn] = useState(true);
  const likedSlugs = useLikedSlugs();

  useEffect(() => {
    setSoundOn(cameraSound.enabled);
  }, []);

  const handleToggleSound = () => {
    const next = cameraSound.toggleSound();
    setSoundOn(next);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-10">
        <Link to="/" className="group flex items-baseline gap-3">
          <span className="font-display text-2xl leading-none text-foreground group-hover:text-primary transition-colors">
            Rahul
          </span>
          <span className="eyebrow hidden sm:inline text-muted-foreground">Chennai · Photography</span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-8">
          <nav className="flex items-center gap-4 text-sm sm:gap-7">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-muted-foreground transition-colors hover:text-foreground font-medium"
                activeProps={{ className: "text-primary font-semibold" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 border-l border-border/70 pl-3 sm:pl-5">
            {/* Curated Favorites Link */}
            <Link
              to="/work"
              search={{ filter: "Liked" } as any}
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-mono transition-all ${
                likedSlugs.length > 0
                  ? "bg-red-500/15 text-red-400 ring-1 ring-red-500/30 hover:bg-red-500/25"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Curated Favorites"
            >
              <Heart
                className={`size-3.5 ${
                  likedSlugs.length > 0 ? "fill-red-500 text-red-500" : ""
                }`}
              />
              <span>{likedSlugs.length}</span>
            </Link>

            {/* Tactile Camera Sound FX Toggle */}
            <button
              type="button"
              onClick={handleToggleSound}
              aria-label={soundOn ? "Mute camera sound effects" : "Enable camera sound effects"}
              title={soundOn ? "Camera Audio FX: On" : "Camera Audio FX: Muted"}
              className={`flex size-8 items-center justify-center rounded border transition-colors ${
                soundOn
                  ? "border-primary/40 text-primary bg-primary/10 hover:bg-primary/20"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {soundOn ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}