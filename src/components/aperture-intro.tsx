import { useEffect, useState } from "react";
import { photos } from "@/lib/photos";

const BLADES = 9;
const R = 9.5;
const verts = Array.from({ length: BLADES }, (_, k) => {
  const a = (Math.PI * 2 * k) / BLADES - Math.PI / 2;
  return [Math.cos(a) * R, Math.sin(a) * R] as const;
});
const hole = verts.map(([x, y]) => `${x.toFixed(3)},${y.toFixed(3)}`).join(" ");
const edges = verts.map(([x, y], k) => {
  const [px, py] = verts[(k + BLADES - 1) % BLADES]!;
  const dx = x - px;
  const dy = y - py;
  const len = Math.hypot(dx, dy);
  return { x1: x, y1: y, x2: x + (dx / len) * 400, y2: y + (dy / len) * 400 };
});
const ticks = Array.from({ length: 60 }, (_, i) => {
  const a = (Math.PI * 2 * i) / 60;
  const r1 = 48;
  const r2 = i % 5 === 0 ? 51.2 : 49.4;
  return {
    x1: Math.cos(a) * r1,
    y1: Math.sin(a) * r1,
    x2: Math.cos(a) * r2,
    y2: Math.sin(a) * r2,
    major: i % 5 === 0,
  };
});

const SEEN_KEY = "rahul-intro-v2-seen";
const DURATION = 6600;

const STAGES = [
  { at: 0, f: "ƒ/16", shutter: "1/1000", status: "CHAMBER LOADED · 35MM", frame: 0 },
  { at: 950, f: "ƒ/8.0", shutter: "1/500", status: "METERING · MARINA LIGHT", frame: 1 },
  { at: 2050, f: "ƒ/5.6", shutter: "1/250", status: "RANGEFINDER HUNTING…", frame: 2 },
  { at: 3200, f: "ƒ/2.8", shutter: "1/125", status: "SUBJECT ACQUIRED · CHENNAI", frame: 3 },
  { at: 4450, f: "ƒ/1.4", shutter: "1/60", status: "FOCUS LOCKED · SHUTTER ARMED", frame: 0 },
] as const;

/** Full-screen camera aperture & rangefinder sequence that opens onto the home page. */
export function ApertureIntro({
  replayNonce = 0,
}: {
  replayNonce?: number;
}) {
  const [show, setShow] = useState(true);
  const [stageIdx, setStageIdx] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShow(false);
      return;
    }
    if (replayNonce === 0 && sessionStorage.getItem(SEEN_KEY)) {
      setShow(false);
      return;
    }
    sessionStorage.setItem(SEEN_KEY, "1");
    setStageIdx(0);
    setShow(true);

    const timers = STAGES.slice(1).map((s, idx) =>
      window.setTimeout(() => setStageIdx(idx + 1), s.at),
    );
    const end = window.setTimeout(() => setShow(false), DURATION);
    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      window.clearTimeout(end);
    };
  }, [replayNonce]);

  if (!show) return null;

  const stage = STAGES[stageIdx]!;
  const preview = photos[stage.frame] ?? photos[0]!;

  return (
    <div
      key={replayNonce}
      aria-hidden
      className="fixed inset-0 z-[70] animate-intro-out"
      onClick={() => setShow(false)}
    >
      {/* Subtle live lens preview seen through the iris hole as it hunts */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center bg-scrim animate-intro-fade">
        <img
          src={preview.src}
          alt=""
          className="h-[54vmin] w-[54vmin] rounded-full object-cover opacity-55 blur-[1px] transition-all duration-700"
        />
      </div>

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="-100 -100 200 200"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <mask id="iris-mask">
            <rect x="-1000" y="-1000" width="2000" height="2000" fill="white" />
            <g className="animate-iris-open [transform-box:fill-box] [transform-origin:50%_50%]">
              <polygon points={hole} fill="black" />
            </g>
          </mask>
          <radialGradient id="lens-coat" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="oklch(0.74 0.15 58 / 0.18)" />
            <stop offset="55%" stopColor="oklch(0.55 0.08 210 / 0.06)" />
            <stop offset="100%" stopColor="oklch(0.1 0.005 60 / 0)" />
          </radialGradient>
        </defs>

        <rect
          x="-1000"
          y="-1000"
          width="2000"
          height="2000"
          className="fill-scrim"
          mask="url(#iris-mask)"
        />

        {/* Optical lens coating reflection */}
        <circle r="46" fill="url(#lens-coat)" className="animate-intro-fade" />

        {/* Mechanical 9-blade iris */}
        <g className="animate-iris-open [transform-box:fill-box] [transform-origin:50%_50%]">
          {edges.map((e, i) => (
            <line
              key={i}
              {...e}
              className="stroke-foreground/30"
              strokeWidth={1.1}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <polygon
            points={hole}
            fill="none"
            className="stroke-primary/85"
            strokeWidth={1.3}
            vectorEffect="non-scaling-stroke"
          />
        </g>

        {/* Lens barrel engravings, distance scale & dual counter-rotating rings */}
        <g className="animate-intro-fade">
          <circle r="54" fill="none" className="stroke-foreground/12" strokeWidth={0.25} />
          <circle r="46" fill="none" className="stroke-primary/25" strokeWidth={0.35} />
          <circle r="36" fill="none" className="stroke-foreground/10" strokeWidth={0.2} />
          <circle
            r="26"
            fill="none"
            strokeDasharray="1.5 2.5"
            className="stroke-foreground/20"
            strokeWidth={0.25}
          />

          {/* Counter-rotating focus distance ticks */}
          <g className="animate-ring-counter [transform-box:fill-box] [transform-origin:50%_50%]">
            {ticks.map((t, i) => (
              <line
                key={i}
                x1={t.x1}
                y1={t.y1}
                x2={t.x2}
                y2={t.y2}
                className={t.major ? "stroke-primary/65" : "stroke-foreground/20"}
                strokeWidth={t.major ? 0.45 : 0.22}
              />
            ))}
          </g>

          <path id="lens-ring" d="M 0,-39 a 39,39 0 1,1 0,78 a 39,39 0 1,1 0,-78" fill="none" />
          <path id="fstop-ring" d="M 0,-57 a 57,57 0 1,1 0,114 a 57,57 0 1,1 0,-114" fill="none" />

          <g className="animate-ring-spin [transform-box:fill-box] [transform-origin:50%_50%]">
            <circle r="44" fill="none" />
            <text className="fill-foreground/75" fontSize="3.05" letterSpacing="1.45">
              <textPath href="#lens-ring">
                RAHUL · CHENNAI · 35MM ƒ/1.4 · STREET & DOCUMENTARY · ONE FRAME AT A TIME ·
              </textPath>
            </text>
          </g>

          <g className="animate-ring-counter [transform-box:fill-box] [transform-origin:50%_50%]">
            <circle r="60" fill="none" />
            <text className="fill-primary/70" fontSize="2.55" letterSpacing="2.1">
              <textPath href="#fstop-ring">
                ƒ/1.4 · ƒ/2 · ƒ/2.8 · ƒ/4 · ƒ/5.6 · ƒ/8 · ƒ/11 · ƒ/16 · ∞ · 3m · 1.5m · 0.7m ·
              </textPath>
            </text>
          </g>

          {/* Center rangefinder crosshair */}
          <line x1="-5" y1="0" x2="-1.6" y2="0" className="stroke-primary/80" strokeWidth={0.3} />
          <line x1="1.6" y1="0" x2="5" y2="0" className="stroke-primary/80" strokeWidth={0.3} />
          <line x1="0" y1="-5" x2="0" y2="-1.6" className="stroke-primary/80" strokeWidth={0.3} />
          <line x1="0" y1="1.6" x2="0" y2="5" className="stroke-primary/80" strokeWidth={0.3} />
        </g>
      </svg>

      {/* Live camera body telemetry readout */}
      <div className="pointer-events-none absolute inset-x-6 top-7 flex items-center justify-between hud animate-intro-fade sm:inset-x-12">
        <span className="flex items-center gap-2 text-primary">
          <span className="size-2 rounded-full bg-primary animate-rec-blink" />
          {stage.status}
        </span>
        <span className="hidden sm:inline">ROLL 01 · {photos.length} EXP · KODAK TRI-X / PORTRA</span>
      </div>

      <div className="pointer-events-none absolute inset-x-6 bottom-8 flex items-end justify-between hud animate-intro-fade sm:inset-x-12">
        <div className="space-y-1">
          <div className="text-primary">{stage.f} · {stage.shutter}s · ISO 400</div>
          <div className="text-muted-foreground">13.0827° N, 80.2707° E · CHENNAI</div>
        </div>
      </div>

      <div className="absolute inset-0 bg-foreground animate-shutter-flash" />

      <button
        type="button"
        onClick={() => setShow(false)}
        className="eyebrow absolute bottom-8 right-6 border border-border bg-scrim/80 px-3.5 py-2 text-foreground backdrop-blur-sm transition-colors hover:border-primary hover:text-primary sm:right-12"
      >
        Skip intro →
      </button>
    </div>
  );
}