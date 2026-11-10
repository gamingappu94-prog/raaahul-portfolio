import { useCallback, useEffect, useState } from "react";
import { Camera, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { photos, type Photo } from "@/lib/photos";

type Shot = { slug: string; shutter: string; f: string; iso: string; ev: number; lens: string };

// Plausible exposure settings for each frame, shown in the viewfinder HUD.
const SHOTS: Shot[] = [
  { slug: "fire-keeper", shutter: "1/125", f: "2.8", iso: "1600", ev: -0.7, lens: "35mm" },
  { slug: "waiting-by-the-sea", shutter: "1/500", f: "5.6", iso: "200", ev: 0.3, lens: "50mm" },
  { slug: "harbour-reflections", shutter: "1/250", f: "8", iso: "400", ev: 0, lens: "28mm" },
  { slug: "under-the-bulb", shutter: "1/60", f: "1.8", iso: "3200", ev: -1, lens: "35mm" },
  { slug: "golden-hour-talk", shutter: "1/320", f: "4", iso: "100", ev: 0.7, lens: "50mm" },
  { slug: "field-of-crosses", shutter: "1/200", f: "5.6", iso: "400", ev: -0.2, lens: "35mm" },
  { slug: "the-catch", shutter: "1/400", f: "4.5", iso: "320", ev: 0.2, lens: "28mm" },
  { slug: "morning-catch", shutter: "1/640", f: "5.6", iso: "200", ev: 0.4, lens: "35mm" },
  { slug: "late-shift", shutter: "1/80", f: "2", iso: "2500", ev: -0.3, lens: "50mm" },
  { slug: "midnight-rider", shutter: "1/100", f: "1.8", iso: "2000", ev: -0.5, lens: "35mm" },
  { slug: "resting-rickshaw", shutter: "1/160", f: "2.8", iso: "800", ev: -0.4, lens: "50mm" },
  { slug: "evening-shore", shutter: "1/320", f: "4", iso: "250", ev: 0.1, lens: "28mm" },
];

const frames = SHOTS.map((s) => ({
  ...s,
  photo: photos.find((p) => p.slug === s.slug),
})).filter((f): f is Shot & { photo: Photo } => Boolean(f.photo));

const INTERVAL = 6800;

/** A camera viewfinder that "shoots" through Rahul's frames with a shutter blink. */
export function Viewfinder({
  startDelay = 0,
  onSelect,
}: {
  startDelay?: number;
  onSelect?: (slug: string) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [blink, setBlink] = useState(false);
  const [paused, setPaused] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);

  const advance = useCallback((delta: number) => {
    setBlink(true);
    window.setTimeout(() => {
      setIdx((i) => (i + delta + frames.length) % frames.length);
      setCycleKey((k) => k + 1);
    }, 110);
    window.setTimeout(() => setBlink(false), 260);
  }, []);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let interval: number | undefined;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => advance(1), INTERVAL);
    }, startDelay);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [startDelay, advance, paused]);

  const frame = frames[idx]!;
  const remaining = String(photos.length - idx).padStart(3, "0");

  return (
    <figure>
      <div
        className="group relative aspect-[4/5] cursor-pointer overflow-hidden bg-muted shadow-print"
        onClick={() => onSelect?.(frame.slug)}
      >
        {frames.map((f, i) => (
          <img
            key={f.slug}
            src={f.photo.src}
            alt={i === idx ? f.photo.title : ""}
            width={f.photo.width}
            height={f.photo.height}
            loading={i === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-[6800ms] ease-out ${
              i === idx ? "scale-100 opacity-100" : "scale-110 opacity-0"
            }`}
          />
        ))}

        {/* Subtle optical vignette */}
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_90px_oklch(0_0_0/0.55)]" />

        {/* Rule-of-thirds grid */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-y-0 left-1/3 w-px bg-foreground/15" />
          <div className="absolute inset-y-0 left-2/3 w-px bg-foreground/15" />
          <div className="absolute inset-x-0 top-1/3 h-px bg-foreground/15" />
          <div className="absolute inset-x-0 top-2/3 h-px bg-foreground/15" />
        </div>

        {/* Frame corners */}
        <div className="pointer-events-none absolute inset-4">
          <span className="absolute left-0 top-0 h-7 w-7 border-l-2 border-t-2 border-foreground/85" />
          <span className="absolute right-0 top-0 h-7 w-7 border-r-2 border-t-2 border-foreground/85" />
          <span className="absolute bottom-0 left-0 h-7 w-7 border-b-2 border-l-2 border-foreground/85" />
          <span className="absolute bottom-0 right-0 h-7 w-7 border-b-2 border-r-2 border-foreground/85" />
        </div>

        {/* Split-prism rangefinder circle + focus reticle */}
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="relative grid place-items-center">
            <span className="absolute size-28 rounded-full border border-foreground/25" />
            <span className="absolute h-px w-28 bg-foreground/20" />
            <div key={idx} className="relative h-16 w-16 border-2 animate-focus-lock">
              <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
            </div>
          </div>
        </div>

        {/* Top HUD */}
        <div className="pointer-events-none absolute inset-x-8 top-8 flex items-center justify-between hud">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-rec-blink" />
            AF-C · {frame.lens} · RAW
          </span>
          <span>
            {String(idx + 1).padStart(2, "0")}/{String(frames.length).padStart(2, "0")} · [{remaining}]
          </span>
        </div>

        {/* Bottom HUD */}
        <div className="pointer-events-none absolute inset-x-8 bottom-8 hud">
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
            <span>{frame.shutter}s</span>
            <span>ƒ{frame.f}</span>
            <span>ISO {frame.iso}</span>
            <span className="text-primary">{frame.ev > 0 ? "+" : ""}{frame.ev.toFixed(1)} EV</span>
          </div>
        </div>

        {/* Live exposure timer bar along bottom edge */}
        {!paused && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-foreground/15">
            <div
              key={`${idx}-${cycleKey}`}
              className="h-full origin-left bg-primary"
              style={{
                animation: `frame-progress ${INTERVAL}ms linear both`,
                animationDelay: cycleKey === 0 ? `${startDelay}ms` : "0ms",
              }}
            />
          </div>
        )}

        {/* Shutter blink */}
        <div
          className={`pointer-events-none absolute inset-0 bg-scrim transition-opacity duration-100 ${
            blink ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      <figcaption className="mt-3 flex items-center justify-between gap-3 eyebrow">
        <button
          type="button"
          onClick={() => onSelect?.(frame.slug)}
          className="truncate text-left hover:text-primary"
        >
          Frame {String(idx + 1).padStart(2, "0")} — {frame.photo.title} · {frame.photo.category}
        </button>
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            aria-label={paused ? "Resume viewfinder reel" : "Hold current frame"}
            onClick={() => setPaused((p) => !p)}
            className="flex size-7 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {paused ? <Play className="size-3" /> : <Pause className="size-3" />}
          </button>
          <button
            type="button"
            aria-label="Previous viewfinder frame"
            onClick={() => advance(-1)}
            className="flex size-7 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <ChevronLeft className="size-3.5" />
          </button>
          <button
            type="button"
            aria-label="Snap next frame"
            onClick={() => advance(1)}
            className="flex h-7 items-center gap-1.5 border border-border px-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Camera className="size-3" />
            <span>Shutter</span>
          </button>
          <button
            type="button"
            aria-label="Next viewfinder frame"
            onClick={() => advance(1)}
            className="flex size-7 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <ChevronRight className="size-3.5" />
          </button>
        </div>
      </figcaption>
    </figure>
  );
}