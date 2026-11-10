import { useState, useId, useMemo } from "react";
import {
  Sliders,
  Sparkles,
  RotateCcw,
  Heart,
  X,
  Camera,
  Layers,
  ChevronLeft,
  ChevronRight,
  Eye,
  Copy,
  Check,
  MapPin,
  Maximize2
} from "lucide-react";
import { type Photo } from "@/lib/photos";
import { usePhotoLike } from "@/lib/likes-store";
import { cameraSound } from "@/lib/camera-audio";

type FilmPreset = {
  name: string;
  badge: string;
  desc: string;
  exposure: number;
  contrast: number;
  warmth: number;
  saturation: number;
  sepia: number;
  grain: number;
  vignette: number;
  grayscale: number;
};

const PRESETS: FilmPreset[] = [
  {
    name: "Raw / Original",
    badge: "RAW",
    desc: "Unmodified sensor capture",
    exposure: 0,
    contrast: 0,
    warmth: 0,
    saturation: 100,
    sepia: 0,
    grain: 10,
    vignette: 15,
    grayscale: 0,
  },
  {
    name: "Kodak Portra 400",
    badge: "PORTRA",
    desc: "Warm skin tones, lifted shadows, gentle roll-off",
    exposure: 8,
    contrast: 10,
    warmth: 18,
    saturation: 108,
    sepia: 8,
    grain: 28,
    vignette: 22,
    grayscale: 0,
  },
  {
    name: "Ilford HP5 Plus",
    badge: "HP5 400",
    desc: "Punchy monochrome, silvery midtones, authentic 35mm grain",
    exposure: 2,
    contrast: 24,
    warmth: 0,
    saturation: 0,
    sepia: 4,
    grain: 45,
    vignette: 35,
    grayscale: 100,
  },
  {
    name: "CineStill 800T",
    badge: "800T",
    desc: "Night-street tungsten bloom, deep cyan shadows & warm halation",
    exposure: 5,
    contrast: 16,
    warmth: -8,
    saturation: 115,
    sepia: 5,
    grain: 38,
    vignette: 28,
    grayscale: 0,
  },
  {
    name: "Chennai Golden Hour",
    badge: "GOLDEN",
    desc: "Late-sun Marina amber, honey glow, deep contrast",
    exposure: 12,
    contrast: 18,
    warmth: 32,
    saturation: 125,
    sepia: 12,
    grain: 20,
    vignette: 30,
    grayscale: 0,
  },
];

// Mock technical metadata per category for realistic darkroom inspector
function getExifData(photo: Photo) {
  const metadataMap: Record<
    string,
    { camera: string; lens: string; shutter: string; f: string; iso: string; loc: string; lat: string }
  > = {
    "fire-keeper": { camera: "Fujifilm X-T5", lens: "XF 35mm ƒ/1.4 R", shutter: "1/125s", f: "ƒ/2.0", iso: "1600", loc: "Sowcarpet Night Market", lat: "13.0973° N, 80.2825° E" },
    "harbour-reflections": { camera: "Leica M11", lens: "Summicron 28mm ƒ/2", shutter: "1/250s", f: "ƒ/8.0", iso: "400", loc: "Kasimedu Fishing Pier", lat: "13.1257° N, 80.2986° E" },
    "under-the-bulb": { camera: "Fujifilm X-T5", lens: "XF 35mm ƒ/1.4 R", shutter: "1/60s", f: "ƒ/1.8", iso: "3200", loc: "Pondy Bazaar", lat: "13.0416° N, 80.2337° E" },
    "waiting-by-the-sea": { camera: "Sony A7 IV", lens: "FE 50mm ƒ/1.4 GM", shutter: "1/500s", f: "ƒ/4.0", iso: "200", loc: "Marina Lighthouse Promenade", lat: "13.0398° N, 80.2785° E" },
    "morning-catch": { camera: "Leica M11", lens: "Summicron 35mm ƒ/2", shutter: "1/640s", f: "ƒ/5.6", iso: "200", loc: "Royapuram Beach Auctions", lat: "13.1147° N, 80.2951° E" },
    "midnight-rider": { camera: "Fujifilm X-T5", lens: "XF 23mm ƒ/1.4 R", shutter: "1/100s", f: "ƒ/1.8", iso: "2000", loc: "Besant Nagar Beach", lat: "12.9984° N, 80.2721° E" },
    "golden-hour-talk": { camera: "Sony A7 IV", lens: "FE 50mm ƒ/1.4 GM", shutter: "1/320s", f: "ƒ/3.5", iso: "100", loc: "Edward Elliot's Pier", lat: "13.0012° N, 80.2715° E" },
  };

  return (
    metadataMap[photo.slug] ?? {
      camera: "Fujifilm X-T5",
      lens: "XF 35mm ƒ/2 WR",
      shutter: "1/250s",
      f: "ƒ/4.0",
      iso: "400",
      loc: "Chennai Street Corridor",
      lat: "13.0827° N, 80.2707° E",
    }
  );
}

type Props = {
  photo: Photo | null;
  allPhotos: Photo[];
  onClose: () => void;
  onNavigate: (photo: Photo) => void;
};

export function DarkroomEditorModal({ photo, allPhotos, onClose, onNavigate }: Props) {
  if (!photo) return null;

  const [activePreset, setActivePreset] = useState<string>("Raw / Original");
  const [exposure, setExposure] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [warmth, setWarmth] = useState(0);
  const [saturation, setSaturation] = useState(photo.mono ? 0 : 100);
  const [grain, setGrain] = useState(15);
  const [vignette, setVignette] = useState(20);
  const [grayscale, setGrayscale] = useState(photo.mono ? 100 : 0);
  const [compareSplit, setCompareSplit] = useState(100); // 100 = full edited, 0 = full original
  const [copied, setCopied] = useState(false);

  const { liked, count, toggle: toggleLike } = usePhotoLike(photo.slug);
  const exif = useMemo(() => getExifData(photo), [photo]);

  const applyPreset = (preset: FilmPreset) => {
    setActivePreset(preset.name);
    setExposure(preset.exposure);
    setContrast(preset.contrast);
    setWarmth(preset.warmth);
    setSaturation(photo.mono ? 0 : preset.saturation);
    setGrain(preset.grain);
    setVignette(preset.vignette);
    setGrayscale(photo.mono ? 100 : preset.grayscale);
    cameraSound.playDial();
  };

  const resetAdjustments = () => {
    if (PRESETS[0]) {
      applyPreset(PRESETS[0]);
    }
    cameraSound.playShutter();
  };

  const currentIndex = allPhotos.findIndex((p) => p.slug === photo.slug);
  const go = (step: number) => {
    const nextIdx = (currentIndex + step + allPhotos.length) % allPhotos.length;
    const nextPhoto = allPhotos[nextIdx];
    if (nextPhoto) {
      onNavigate(nextPhoto);
    }
    cameraSound.playShutter();
  };

  const copyRecipe = () => {
    const recipe = `${photo.title} Grade Recipe:\nPreset: ${activePreset}\nExposure: ${exposure > 0 ? "+" : ""}${exposure}%\nContrast: ${contrast > 0 ? "+" : ""}${contrast}%\nWarmth: ${warmth > 0 ? "+" : ""}${warmth}K\nSaturation: ${saturation}%\nGrain: ${grain}%\nVignette: ${vignette}%`;
    navigator.clipboard.writeText(recipe);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate dynamic CSS filter string
  const brightnessVal = 1 + exposure / 100;
  const contrastVal = 1 + contrast / 100;
  const saturateVal = saturation / 100;
  const sepiaVal = (warmth > 0 ? warmth * 0.6 : 0) / 100;
  const hueRotateVal = warmth < 0 ? `${warmth * 0.5}deg` : "0deg";
  const grayscaleVal = grayscale / 100;

  const filterString = `brightness(${brightnessVal}) contrast(${contrastVal}) saturate(${saturateVal}) sepia(${sepiaVal}) hue-rotate(${hueRotateVal}) grayscale(${grayscaleVal})`;

  // Realistic live histogram curve values calculated from exposure and contrast
  const histMid = 60 + exposure * 0.4;
  const histPeak = Math.max(20, 75 + contrast * 0.5);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex flex-col bg-scrim/98 text-foreground backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Top Studio Bar */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-border/80 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-mono text-xs tracking-wider text-primary">
            <Sliders className="size-3.5 text-primary" />
            <span className="font-semibold uppercase">Darkroom Studio</span>
            <span className="text-muted-foreground/60">· Live Grading v2.4</span>
          </div>
          <span className="hidden h-4 w-px bg-border sm:block" />
          <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
            <Camera className="size-3.5" />
            <span>{exif.camera}</span>
            <span>·</span>
            <span>{exif.lens}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Like Button */}
          <button
            type="button"
            onClick={toggleLike}
            className={`group inline-flex items-center gap-1.5 rounded border px-3 py-1.5 text-xs font-medium transition-all ${
              liked
                ? "border-red-500/50 bg-red-500/10 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.25)]"
                : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
            }`}
          >
            <Heart
              className={`size-3.5 transition-transform duration-300 group-active:scale-125 ${
                liked ? "fill-red-500 text-red-500" : ""
              }`}
            />
            <span>{count}</span>
          </button>

          {/* Reset */}
          <button
            type="button"
            onClick={resetAdjustments}
            title="Reset All Adjustments"
            className="flex h-8 items-center gap-1.5 border border-border px-2.5 text-xs text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
          >
            <RotateCcw className="size-3" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Copy Recipe */}
          <button
            type="button"
            onClick={copyRecipe}
            title="Copy Grading Parameters"
            className="flex h-8 items-center gap-1.5 border border-border px-2.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {copied ? <Check className="size-3 text-primary" /> : <Copy className="size-3" />}
            <span className="hidden sm:inline">{copied ? "Copied" : "Recipe"}</span>
          </button>

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Darkroom"
            className="flex size-8 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-red-400 hover:text-red-400"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      {/* Main Studio Body: Viewport + Controls Deck */}
      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-12">
        {/* Left / Center: Interactive Preview Canvas */}
        <div className="relative flex flex-col items-center justify-center overflow-hidden bg-black/60 p-4 sm:p-8 lg:col-span-8">
          {/* Previous / Next Frame Arrows */}
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous frame"
            className="absolute left-4 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center border border-border/70 bg-background/80 text-foreground backdrop-blur hover:border-primary hover:text-primary"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next frame"
            className="absolute right-4 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center border border-border/70 bg-background/80 text-foreground backdrop-blur hover:border-primary hover:text-primary"
          >
            <ChevronRight className="size-5" />
          </button>

          {/* Image Stage Container */}
          <div className="relative flex max-h-[72vh] max-w-full items-center justify-center shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]">
            {/* The Image with CSS grading filter */}
            <div className="relative overflow-hidden">
              <img
                src={photo.src}
                alt={photo.title}
                style={{
                  filter: filterString,
                  clipPath: `polygon(0 0, ${compareSplit}% 0, ${compareSplit}% 100%, 0 100%)`,
                }}
                className="max-h-[68vh] max-w-full object-contain transition-all duration-150"
              />

              {/* Raw Before image underlying the split slider */}
              {compareSplit < 100 && (
                <img
                  src={photo.src}
                  alt={photo.title}
                  style={{
                    clipPath: `polygon(${compareSplit}% 0, 100% 0, 100% 100%, ${compareSplit}% 100%)`,
                  }}
                  className="pointer-events-none absolute inset-0 max-h-[68vh] max-w-full object-contain"
                />
              )}

              {/* Split-line indicator */}
              {compareSplit > 0 && compareSplit < 100 && (
                <div
                  className="pointer-events-none absolute inset-y-0 w-0.5 bg-primary shadow-[0_0_8px_rgba(255,180,60,0.8)]"
                  style={{ left: `${compareSplit}%` }}
                >
                  <span className="absolute left-1/2 top-4 -translate-x-1/2 rounded bg-background/90 px-1 font-mono text-[9px] uppercase tracking-widest text-primary">
                    Split
                  </span>
                </div>
              )}

              {/* Film Grain Simulation Overlay */}
              {grain > 0 && (
                <div
                  className="pointer-events-none absolute inset-0 mix-blend-overlay"
                  style={{
                    opacity: grain / 100,
                    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23g)'/></svg>")`,
                  }}
                />
              )}

              {/* Optical Vignette Overlay */}
              {vignette > 0 && (
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    boxShadow: `inset 0 0 ${vignette * 2.5}px rgba(0,0,0,${vignette / 110})`,
                  }}
                />
              )}
            </div>
          </div>

          {/* Bottom Toolbar: Split Slider + Location */}
          <div className="mt-4 flex w-full max-w-md items-center justify-between gap-4 px-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Eye className="size-3.5 text-primary" />
              <span className="font-mono text-[11px] uppercase tracking-wider">Before / After</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={compareSplit}
              onChange={(e) => setCompareSplit(Number(e.target.value))}
              aria-label="Split preview slider"
              className="h-1.5 flex-1 cursor-pointer accent-primary"
            />
            <span className="font-mono text-xs text-muted-foreground">{compareSplit}% Graded</span>
          </div>
        </div>

        {/* Right: Studio Grading Inspector & Controls Deck */}
        <div className="flex flex-col border-t border-border/80 bg-background/95 p-6 overflow-y-auto lg:col-span-4 lg:border-l lg:border-t-0">
          {/* Header Info */}
          <div className="border-b border-border/60 pb-5">
            <div className="flex items-center justify-between">
              <span className="eyebrow text-primary">Frame {currentIndex + 1} of {allPhotos.length}</span>
              <span className="rounded bg-muted px-2 py-0.5 font-mono text-[10px] uppercase text-muted-foreground">
                {photo.category}
              </span>
            </div>
            <h2 className="mt-2 font-display text-3xl font-medium tracking-tight">{photo.title}</h2>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="size-3 text-primary shrink-0" />
              <span>{exif.loc}</span>
              <span className="font-mono text-[10px] text-muted-foreground/60">({exif.lat})</span>
            </div>
          </div>

          {/* Dynamic Live Histogram */}
          <div className="mt-5 rounded border border-border/70 bg-card p-3">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              <span>RGB Exposure Histogram</span>
              <span className="text-primary">{exposure >= 0 ? `+${exposure}` : exposure} EV</span>
            </div>
            <div className="mt-2 h-14 w-full">
              <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="h-full w-full">
                <defs>
                  <linearGradient id="histGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.74 0.15 58)" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="oklch(0.74 0.15 58)" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                <path
                  d={`M 0 60 Q 30 ${60 - histPeak * 0.4}, ${histMid} ${60 - histPeak} T 200 60 Z`}
                  fill="url(#histGrad)"
                />
                <path
                  d={`M 0 60 Q 30 ${60 - histPeak * 0.4}, ${histMid} ${60 - histPeak} T 200 60`}
                  fill="none"
                  stroke="oklch(0.74 0.15 58)"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <div className="mt-2 flex justify-between font-mono text-[9px] text-muted-foreground/70">
              <span>Shadows (0)</span>
              <span>Midtones (128)</span>
              <span>Highlights (255)</span>
            </div>
          </div>

          {/* Film Stock Emulation Presets */}
          <div className="mt-6">
            <div className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <Sparkles className="size-3 text-primary" />
              <span>Film Stock Emulations</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {PRESETS.map((p) => {
                const isActive = activePreset === p.name;
                return (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => applyPreset(p)}
                    className={`rounded border p-2 text-left transition-all ${
                      isActive
                        ? "border-primary bg-primary/10 shadow-[0_0_10px_rgba(255,180,60,0.15)]"
                        : "border-border/70 bg-card hover:border-foreground/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold tracking-wider text-primary">
                        {p.badge}
                      </span>
                      {isActive && <span className="size-1.5 rounded-full bg-primary animate-pulse" />}
                    </div>
                    <p className="mt-1 font-display text-sm leading-tight text-foreground">{p.name}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fine Tuning Sliders */}
          <div className="mt-6 space-y-4 border-t border-border/60 pt-5">
            <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Darkroom Fine Controls
            </span>

            {/* Exposure */}
            <div>
              <div className="flex justify-between font-mono text-xs">
                <span className="text-muted-foreground">Exposure Compensation</span>
                <span className="text-primary">{exposure > 0 ? `+${exposure}%` : `${exposure}%`}</span>
              </div>
              <input
                type="range"
                min="-60"
                max="60"
                value={exposure}
                onChange={(e) => {
                  setExposure(Number(e.target.value));
                  cameraSound.playDial();
                }}
                className="mt-1.5 h-1.5 w-full cursor-pointer accent-primary"
              />
            </div>

            {/* Contrast */}
            <div>
              <div className="flex justify-between font-mono text-xs">
                <span className="text-muted-foreground">Tone Contrast</span>
                <span className="text-primary">{contrast > 0 ? `+${contrast}%` : `${contrast}%`}</span>
              </div>
              <input
                type="range"
                min="-40"
                max="50"
                value={contrast}
                onChange={(e) => {
                  setContrast(Number(e.target.value));
                  cameraSound.playDial();
                }}
                className="mt-1.5 h-1.5 w-full cursor-pointer accent-primary"
              />
            </div>

            {/* Warmth / Color Temp */}
            <div>
              <div className="flex justify-between font-mono text-xs">
                <span className="text-muted-foreground">Color Temperature</span>
                <span className="text-primary">{warmth > 0 ? `+${warmth}K` : `${warmth}K`}</span>
              </div>
              <input
                type="range"
                min="-40"
                max="50"
                value={warmth}
                onChange={(e) => {
                  setWarmth(Number(e.target.value));
                  cameraSound.playDial();
                }}
                className="mt-1.5 h-1.5 w-full cursor-pointer accent-primary"
              />
            </div>

            {/* Saturation */}
            <div>
              <div className="flex justify-between font-mono text-xs">
                <span className="text-muted-foreground">Chroma Saturation</span>
                <span className="text-primary">{saturation}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                value={saturation}
                onChange={(e) => {
                  setSaturation(Number(e.target.value));
                  cameraSound.playDial();
                }}
                className="mt-1.5 h-1.5 w-full cursor-pointer accent-primary"
              />
            </div>

            {/* 35mm Grain */}
            <div>
              <div className="flex justify-between font-mono text-xs">
                <span className="text-muted-foreground">35mm Halide Grain</span>
                <span className="text-primary">{grain}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                value={grain}
                onChange={(e) => {
                  setGrain(Number(e.target.value));
                  cameraSound.playDial();
                }}
                className="mt-1.5 h-1.5 w-full cursor-pointer accent-primary"
              />
            </div>

            {/* Vignette */}
            <div>
              <div className="flex justify-between font-mono text-xs">
                <span className="text-muted-foreground">Optical Vignette</span>
                <span className="text-primary">{vignette}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                value={vignette}
                onChange={(e) => {
                  setVignette(Number(e.target.value));
                  cameraSound.playDial();
                }}
                className="mt-1.5 h-1.5 w-full cursor-pointer accent-primary"
              />
            </div>
          </div>

          {/* Shot Story */}
          <div className="mt-6 border-t border-border/60 pt-5">
            <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Documentary Field Note
            </span>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{photo.story}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
