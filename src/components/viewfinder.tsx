import { useCallback, useEffect, useState } from "react";
import { Camera, ChevronLeft, ChevronRight, Pause, Play, Heart, Sliders, Sparkles } from "lucide-react";
import { photos, type Photo } from "@/lib/photos";
import { usePhotoLike } from "@/lib/likes-store";
import { cameraSound } from "@/lib/camera-audio";

type Shot = { slug: string; shutter: string; f: string; iso: string; ev: number; lens: string };

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
];

const frames = SHOTS.map((s) => ({
  ...s,
  photo: photos.find((p) => p.slug === s.slug),
})).filter((f): f is Shot & { photo: Photo } => Boolean(f.photo));

const INTERVAL = 6400;

export function Viewfinder({
  startDelay = 0,
  onSelect,
  onEdit,
}: {
  startDelay?: number;
  onSelect?: (slug: string) => void;
  onEdit?: (photo: Photo) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [blink, setBlink] = useState(false);
  const [paused, setPaused] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);

  const frame = frames[idx]!;
  const { liked, count, toggle: toggleLike } = usePhotoLike(frame.slug);

  const advance = useCallback((delta: number, playSound = true) => {
    if (playSound) cameraSound.playShutter();
    setBlink(true);
    window.setTimeout(() => {
      setIdx((i) => (i + delta + frames.length) % frames.length);
      setCycleKey((k) => k + 1);
    }, 100);
    window.setTimeout(() => setBlink(false), 240);
  }, []);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let interval: number | undefined;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => advance(1, false), INTERVAL);
    }, startDelay);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [startDelay, advance, paused]);

  const remaining = String(photos.length - idx).padStart(3, "0");

  return (
    <figure className="relative w-full">
      {/* Outer tactile camera body housing */}
      <div className="relative rounded-lg border border-border/70 bg-gradient-to-b from-card/90 via-card/50 to-background/90 p-3 sm:p-4 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.85)] ring-1 ring-white/5">
        {/* Top Camera Body Plate with tactile details */}
        <div className="mb-3 flex items-center justify-between border-b border-border/50 pb-2.5 px-1 font-mono text-[11px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-primary animate-pulse" />
            <span className="font-semibold tracking-wider text-foreground">LEICA RANGEFINDER</span>
            <span className="hidden text-[10px] text-muted-foreground/60 sm:inline">· CHENNAI ED.</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-widest text-primary">OPTICAL EVF</span>
            <span className="rounded bg-black/40 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-muted-foreground">
              3:2 NATIVE
            </span>
          </div>
        </div>

        {/* Viewfinder Lens Optical Screen */}
        <div
          className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded bg-black shadow-inner"
          onClick={() => {
            cameraSound.playShutter();
            onSelect?.(frame.slug);
          }}
        >
          {frames.map((f, i) => (
            <img
              key={f.slug}
              src={f.photo.src}
              alt={i === idx ? f.photo.title : ""}
              width={f.photo.width}
              height={f.photo.height}
              loading={i === 0 ? "eager" : "lazy"}
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-[6400ms] ease-out ${
                i === idx ? "scale-100 opacity-100" : "scale-110 opacity-0"
              }`}
            />
          ))}

          {/* Optical Vignette & Lens Sheen */}
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.65)]" />
          <div className="pointer-events-none absolute -inset-full rotate-45 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

          {/* Rule-of-thirds grid */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-y-0 left-1/3 w-px bg-white/10" />
            <div className="absolute inset-y-0 left-2/3 w-px bg-white/10" />
            <div className="absolute inset-x-0 top-1/3 h-px bg-white/10" />
            <div className="absolute inset-x-0 top-2/3 h-px bg-white/10" />
          </div>

          {/* Viewfinder Frame Corners */}
          <div className="pointer-events-none absolute inset-3 sm:inset-4">
            <span className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-white/80" />
            <span className="absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-white/80" />
            <span className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-white/80" />
            <span className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-white/80" />
          </div>

          {/* Center Rangefinder Focus Reticle */}
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <div className="relative grid place-items-center">
              <span className="absolute size-24 rounded-full border border-white/20" />
              <span className="absolute h-px w-24 bg-white/15" />
              <div key={idx} className="relative h-14 w-14 border-2 animate-focus-lock">
                <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
              </div>
            </div>
          </div>

          {/* Top Camera HUD */}
          <div className="pointer-events-none absolute inset-x-4 top-4 flex items-center justify-between hud text-[10px] sm:text-[11px]">
            <span className="flex items-center gap-1.5 rounded bg-black/60 px-2 py-0.5 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-rec-blink" />
              AF-C · {frame.lens} · RAW
            </span>
            <span className="rounded bg-black/60 px-2 py-0.5 backdrop-blur">
              {String(idx + 1).padStart(2, "0")}/{String(frames.length).padStart(2, "0")} · [{remaining}]
            </span>
          </div>

          {/* Like Button & Studio Launcher overlaid inside viewfinder */}
          <div className="absolute right-4 top-14 z-20 flex flex-col gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleLike();
              }}
              title={liked ? "Unlike frame" : "Like this frame"}
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur transition-all ${
                liked
                  ? "bg-red-500/20 text-red-400 ring-1 ring-red-500/60"
                  : "bg-black/70 text-white/80 hover:bg-black/90 hover:text-white"
              }`}
            >
              <Heart
                className={`size-3.5 transition-transform duration-200 group-hover:scale-125 ${
                  liked ? "fill-red-500 text-red-500" : ""
                }`}
              />
              <span className="font-mono text-[11px]">{count}</span>
            </button>

            {onEdit && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  cameraSound.playDial();
                  onEdit(frame.photo);
                }}
                title="Open in Darkroom Studio"
                className="flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-primary ring-1 ring-primary/40 backdrop-blur transition-all hover:bg-primary hover:text-primary-foreground"
              >
                <Sliders className="size-3" />
                <span className="hidden sm:inline">Grade</span>
              </button>
            )}
          </div>

          {/* Bottom Camera HUD: Exposure Meter + Settings */}
          <div className="pointer-events-none absolute inset-x-4 bottom-4 hud">
            <div className="relative mx-auto mb-2 h-2.5 w-36">
              <div className="flex h-full items-end justify-between">
                {Array.from({ length: 11 }, (_, i) => (
                  <span
                    key={i}
                    className={`w-px bg-white/70 ${i % 2 === 0 ? "h-2.5" : "h-1.5"}`}
                  />
                ))}
              </div>
              <span
                className="absolute -top-1.5 h-0 w-0 -translate-x-1/2 border-x-3 border-t-[5px] border-x-transparent border-t-primary transition-all duration-500"
                style={{ left: `${((frame.ev + 2) / 4) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between rounded bg-black/60 px-3 py-1 text-[10px] backdrop-blur sm:text-[11px]">
              <span>{frame.shutter}s</span>
              <span>ƒ{frame.f}</span>
              <span>ISO {frame.iso}</span>
              <span className="text-primary">{frame.ev > 0 ? "+" : ""}{frame.ev.toFixed(1)} EV</span>
            </div>
          </div>

          {/* Live exposure progress bar */}
          {!paused && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-white/10">
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

          {/* Shutter flash animation */}
          <div
            className={`pointer-events-none absolute inset-0 bg-black transition-opacity duration-100 ${
              blink ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* Viewfinder Bottom Controls & Mechanical Shutter Button */}
        <figcaption className="mt-3 flex items-center justify-between gap-3 font-mono text-[11px] text-muted-foreground">
          <button
            type="button"
            onClick={() => {
              cameraSound.playShutter();
              onSelect?.(frame.slug);
            }}
            className="truncate text-left text-foreground hover:text-primary transition-colors font-sans"
          >
            <span className="font-semibold">{frame.photo.title}</span> · {frame.photo.category}
          </button>

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              aria-label={paused ? "Resume viewfinder reel" : "Hold current frame"}
              onClick={() => {
                cameraSound.playDial();
                setPaused((p) => !p);
              }}
              className="flex size-7 items-center justify-center rounded border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {paused ? <Play className="size-3" /> : <Pause className="size-3" />}
            </button>

            <button
              type="button"
              aria-label="Previous frame"
              onClick={() => advance(-1)}
              className="flex size-7 items-center justify-center rounded border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronLeft className="size-3.5" />
            </button>

            {/* Tactile Shutter Button with Click Sound */}
            <button
              type="button"
              aria-label="Snap next frame"
              onClick={() => advance(1)}
              className="flex h-7 items-center gap-1.5 rounded border border-primary/60 bg-primary/10 px-2.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary transition-all hover:bg-primary hover:text-primary-foreground active:scale-95"
            >
              <Camera className="size-3" />
              <span>Shutter</span>
            </button>

            <button
              type="button"
              aria-label="Next frame"
              onClick={() => advance(1)}
              className="flex size-7 items-center justify-center rounded border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </figcaption>
      </div>
    </figure>
  );
}