import { useEffect, useState } from "react";

const BLADES = 8;
const R = 10;
const verts = Array.from({ length: BLADES }, (_, k) => {
  const a = (Math.PI * 2 * k) / BLADES - Math.PI / 2;
  return [Math.cos(a) * R, Math.sin(a) * R] as const;
});
const hole = verts.map(([x, y]) => `${x.toFixed(3)},${y.toFixed(3)}`).join(" ");
// Each blade edge continues past its vertex — that's what makes an iris read as an iris.
const edges = verts.map(([x, y], k) => {
  const [px, py] = verts[(k + BLADES - 1) % BLADES]!;
  const dx = x - px;
  const dy = y - py;
  const len = Math.hypot(dx, dy);
  return { x1: x, y1: y, x2: x + (dx / len) * 400, y2: y + (dy / len) * 400 };
});

const SEEN_KEY = "rahul-intro-seen";
const DURATION = 3200;

/** Full-screen camera aperture that opens onto the home page, once per visit. */
export function ApertureIntro() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || sessionStorage.getItem(SEEN_KEY)) {
      setShow(false);
      return;
    }
    sessionStorage.setItem(SEEN_KEY, "1");
    const t = window.setTimeout(() => setShow(false), DURATION);
    return () => window.clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[70] animate-intro-out"
      onClick={() => setShow(false)}
    >
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
        </defs>

        <rect
          x="-1000"
          y="-1000"
          width="2000"
          height="2000"
          className="fill-scrim"
          mask="url(#iris-mask)"
        />

        <g className="animate-iris-open [transform-box:fill-box] [transform-origin:50%_50%]">
          {edges.map((e, i) => (
            <line
              key={i}
              {...e}
              className="stroke-foreground/25"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <polygon
            points={hole}
            fill="none"
            className="stroke-primary/70"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        </g>

        {/* Lens barrel engraving */}
        <g className="animate-intro-fade">
          <circle r="42" fill="none" className="stroke-foreground/15" strokeWidth={0.3} />
          <circle r="36" fill="none" className="stroke-foreground/10" strokeWidth={0.2} />
          <path id="lens-ring" d="M 0,-39 a 39,39 0 1,1 0,78 a 39,39 0 1,1 0,-78" fill="none" />
          <g className="animate-ring-spin [transform-box:fill-box] [transform-origin:50%_50%]">
            <circle r="44" fill="none" />
            <text className="fill-muted-foreground" fontSize="3.1" letterSpacing="1.4">
              <textPath href="#lens-ring">
                RAHUL · CHENNAI · 35MM ƒ/1.4 · STREET & DOCUMENTARY · ONE FRAME AT A TIME ·
              </textPath>
            </text>
          </g>
        </g>
      </svg>

      <div className="absolute inset-0 bg-foreground animate-shutter-flash" />

      <button
        type="button"
        onClick={() => setShow(false)}
        className="eyebrow absolute bottom-8 right-8 hover:text-primary"
      >
        Skip →
      </button>
    </div>
  );
}