import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { photos, type Photo } from "@/lib/photos";

type Shot = { slug: string; shutter: string; f: string; iso: string; ev: number };

// Plausible exposure settings for each frame, shown in the viewfinder HUD.
const SHOTS: Shot[] = [
  { slug: "fire-keeper", shutter: "1/125", f: "2.8", iso: "1600", ev: -0.7 },
  { slug: "waiting-by-the-sea", shutter: "1/500", f: "5.6", iso: "200", ev: 0.3 },
  { slug: "under-the-bulb", shutter: "1/60", f: "1.8", iso: "3200", ev: -1 },
  { slug: "golden-hour-talk", shutter: "1/320", f: "4", iso: "100", ev: 0.7 },
  { slug: "harbour-reflections", shutter: "1/250", f: "8", iso: "400", ev: 0 },
  { slug: "late-shift", shutter: "1/80", f: "2", iso: "2500", ev: -0.3 },
];

const frames = SHOTS.map((s) => ({
  ...s,
  photo: photos.find((p) => p.slug === s.slug),
})).filter((f): f is Shot & { photo: Photo } => Boolean(f.photo));

const INTERVAL = 4800;

/** A camera viewfinder that "shoots" through Rahul's frames with a shutter blink. */
export function Viewfinder({ startDelay = 0 }: { startDelay?: number }) {
  const [idx, setIdx] = useState(0);
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let interval: number | undefined;
    const timers: number[] = [];
    const shoot = () => {
      setBlink(true);
      timers.push(window.setTimeout(() => setIdx((i) => (i + 1) % frames.length), 130));
      timers.push(window.setTimeout(() => setBlink(false), 240));
    };
    const start = window.setTimeout(() => {
      interval = window.setInterval(shoot, INTERVAL);
    }, startDelay);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [startDelay]);

  const frame = frames[idx]!;
  const remaining = String(photos.length - idx).padStart(3, "0");

  return (
    <figure>
      <div className="relative aspect-[4/5] overflow-hidden bg-muted shadow-print">
        {frames.map((f, i) => (
          <img
            key={f.slug}
            src={f.photo.src}
            alt={i === idx ? f.photo.title : ""}
            width={f.photo.width}
            height={f.photo.height}
            loading={i === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[6000ms] ease-out ${
              i === idx ? "scale-100 opacity-100" : "scale-110 opacity-0"
            }`}
          />
        ))}

        {/* Rule-of-thirds grid */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-y-0 left-1/3 w-px bg-foreground/15" />
          <div className="absolute inset-y-0 left-2/3 w-px bg-foreground/15" />
          <div className="absolute inset-x-0 top-1/3 h-px bg-foreground/15" />
          <div className="absolute inset-x-0 top-2/3 h-px bg-foreground/15" />
        </div>

        {/* Frame corners */}
        <div className="pointer-events-none absolute inset-4">
          <span className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-foreground/80" />
          <span className="absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-foreground/80" />
          <span className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-foreground/80" />
          <span className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-foreground/80" />
        </div>

        {/* Focus reticle — re-runs its hunt on every new frame */}
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div key={idx} className="relative h-16 w-16 border-2 animate-focus-lock">
            <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 bg-primary" />
          </div>
        </div>

        {/* Top HUD */}
        <div className="pointer-events-none absolute inset-x-10 top-10 flex items-center justify-between hud">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-rec-blink" />
            AF-S · Raw
          </span>
          <span>[{remaining}]</span>
        </div>

        {/* Bottom HUD */}
        <div className="pointer-events-none absolute inset-x-10 bottom-10 hud">
          <div className="relative mx-auto mb-3 h-3 w-40">
            <div className="flex h-full items-end justify-between">
              {Array.from({ length: 13 }, (_, i) => (
                <span
                  key={i}
                  className={`w-px bg-foreground/70 ${i % 3 === 0 ? "h-3" : "h-1.5"}`}
                />
              ))}
            </div>
            <span
              className="absolute -top-2 h-0 w-0 -translate-x-1/2 border-x-4 border-t-[5px] border-x-transparent border-t-primary transition-all duration-700"
              style={{ left: `${((frame.ev + 2) / 4) * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span>{frame.shutter}</span>
            <span>ƒ{frame.f}</span>
            <span>ISO {frame.iso}</span>
            <span className="text-primary">{frame.ev > 0 ? "+" : ""}{frame.ev.toFixed(1)}</span>
          </div>
        </div>

        {/* Shutter blink */}
        <div
          className={`pointer-events-none absolute inset-0 bg-scrim transition-opacity duration-100 ${
            blink ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      <figcaption className="mt-3 flex justify-between eyebrow">
        <Link to="/work" className="hover:text-primary">
          Frame {String(idx + 1).padStart(2, "0")} — {frame.photo.title}
        </Link>
        <span>{frame.photo.category}</span>
      </figcaption>
    </figure>
  );
}