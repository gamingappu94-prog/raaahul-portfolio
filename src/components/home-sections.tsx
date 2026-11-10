import { Link } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Photo } from "@/lib/photos";
import type { Reel } from "@/lib/reels";

export function ContactSheetStrip({
  rowA,
  rowB,
  total,
  onOpenSlug,
}: {
  rowA: Photo[];
  rowB: Photo[];
  total: number;
  onOpenSlug: (slug: string) => void;
}) {
  return (
    <section className="overflow-hidden border-t border-border py-20">
      <div className="mx-auto mb-10 flex max-w-7xl flex-wrap items-end justify-between gap-4 px-5 md:px-10">
        <div>
          <p className="eyebrow text-primary">35mm Contact Sheet · Roll 01</p>
          <h2 className="mt-3 font-display text-4xl md:text-6xl">
            Twenty-four exposures from the streets
          </h2>
        </div>
        <p className="eyebrow">Hover to pause · Click any frame to read its story ({total} frames)</p>
      </div>

      <div className="film-strip overflow-hidden">
        <div className="flex w-max gap-5 animate-marquee pause-on-hover">
          {[...rowA, ...rowA].map((p, idx) => (
            <button
              key={`${p.slug}-a-${idx}`}
              type="button"
              onClick={() => onOpenSlug(p.slug)}
              className="group relative shrink-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="mb-1.5 flex justify-between px-1 font-mono text-[10px] tracking-widest text-primary/80">
                <span>◆ {String((idx % rowA.length) + 1).padStart(2, "0")}A</span>
                <span>KODAK 400TX</span>
              </div>
              <div className="h-64 w-48 overflow-hidden bg-muted sm:h-72 sm:w-56">
                <img
                  src={p.src}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <p className="mt-2 max-w-[13rem] truncate font-display text-lg text-foreground/90 group-hover:text-primary">
                {p.title}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="film-strip mt-3 overflow-hidden">
        <div className="flex w-max gap-5 animate-marquee-reverse pause-on-hover">
          {[...rowB, ...rowB].map((p, idx) => (
            <button
              key={`${p.slug}-b-${idx}`}
              type="button"
              onClick={() => onOpenSlug(p.slug)}
              className="group relative shrink-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="mb-1.5 flex justify-between px-1 font-mono text-[10px] tracking-widest text-muted-foreground">
                <span>▷ {String((idx % rowB.length) + 13).padStart(2, "0")}A</span>
                <span>{p.category.toUpperCase()}</span>
              </div>
              <div className="h-56 w-64 overflow-hidden bg-muted sm:h-64 sm:w-72">
                <img
                  src={p.src}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <p className="mt-2 max-w-[16rem] truncate font-display text-lg text-foreground/90 group-hover:text-primary">
                {p.title}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SilverGelatinBand({
  monos,
  onOpenSlug,
}: {
  monos: Photo[];
  onOpenSlug: (slug: string) => void;
}) {
  return (
    <section className="border-t border-border bg-scrim/60">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-10">
        <div className="reveal grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow text-primary">Darkroom Series · Silver Gelatin</p>
            <h2 className="mt-3 font-display text-5xl leading-[0.96] sm:text-6xl md:text-7xl">
              Stripped of colour,{" "}
              <span className="text-outline">only the truth</span> remains.
            </h2>
          </div>
          <p className="text-muted-foreground lg:col-span-4">
            Seven monochrome plates from Kasimedu harbour and the dawn fish auctions — where salt,
            sweat and silver scales turn ordinary labour into sculpture.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-12">
          {monos.map((p, i) => {
            const spans = [
              "lg:col-span-5",
              "lg:col-span-4 lg:mt-16",
              "lg:col-span-3",
              "lg:col-span-3 lg:-mt-10",
              "lg:col-span-5",
              "lg:col-span-4 lg:-mt-12",
              "lg:col-span-6",
            ];
            return (
              <figure
                key={p.slug}
                style={{ ["--reveal-delay" as string]: `${(i % 3) * 110}ms` }}
                className={`reveal group ${spans[i % spans.length]}`}
              >
                <button
                  type="button"
                  onClick={() => onOpenSlug(p.slug)}
                  className="block w-full overflow-hidden bg-muted text-left shadow-print focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <img
                    src={p.src}
                    alt={p.title}
                    width={p.width}
                    height={p.height}
                    loading="lazy"
                    className="develop aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </button>
                <figcaption className="mt-3 flex items-baseline justify-between gap-3">
                  <span className="font-display text-2xl">{p.title}</span>
                  <span className="eyebrow shrink-0">Plate 0{i + 1}</span>
                </figcaption>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {p.story}
                </p>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ReelsShowcase({ reels }: { reels: Reel[] }) {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-10">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-primary">Moving Pictures · {reels.length} Reels</p>
            <h2 className="mt-3 font-display text-5xl md:text-6xl">
              When a single frame isn't enough
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link to="/reels">
              Watch all {reels.length} reels <ArrowRight />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {reels.slice(0, 5).map((r, i) => (
            <div
              key={r.slug}
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
              className="reveal group relative overflow-hidden bg-muted shadow-print"
            >
              <video
                src={r.src}
                poster={r.poster}
                muted
                loop
                playsInline
                preload="metadata"
                onMouseEnter={(e) => void e.currentTarget.play().catch(() => {})}
                onMouseLeave={(e) => {
                  e.currentTarget.pause();
                  e.currentTarget.currentTime = 0;
                }}
                className="aspect-[9/16] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <Link
                to="/reels"
                aria-label={`Watch ${r.title}`}
                className="absolute inset-0 flex flex-col justify-between bg-scrim-gradient p-4"
              >
                <span className="hud flex items-center gap-1.5 self-end">
                  <Play className="size-3 fill-primary text-primary" /> Reel 0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-2xl leading-tight">{r.title}</h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-foreground/80">
                    {r.story}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}