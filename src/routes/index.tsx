import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories, photos } from "@/lib/photos";
import { reels } from "@/lib/reels";
import { ApertureIntro } from "@/components/aperture-intro";
import { Viewfinder } from "@/components/viewfinder";
import { Lightbox } from "@/components/lightbox";
import {
  ContactSheetStrip,
  ReelsShowcase,
  SilverGelatinBand,
} from "@/components/home-sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rahul — Chennai, One Frame at a Time" },
      {
        name: "description",
        content:
          "Street and documentary photography of Chennai's markets, coast and night streets by Rahul.",
      },
      { property: "og:title", content: "Rahul — Chennai, One Frame at a Time" },
      {
        property: "og:description",
        content:
          "Street and documentary photography of Chennai's markets, coast and night streets by Rahul.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const STORY_SLUGS = [
  "fire-keeper",
  "harbour-reflections",
  "waiting-by-the-sea",
  "under-the-bulb",
  "field-of-crosses",
  "golden-hour-talk",
] as const;

function Index() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(".reveal, .develop");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((el) => (el.dataset["shown"] = "true"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset["shown"] = "true";
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" },
    );
    nodes.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const openBySlug = (slug: string) => {
    const idx = photos.findIndex((p) => p.slug === slug);
    if (idx !== -1) setLightboxIdx(idx);
  };

  const heroStories = STORY_SLUGS.map((s) => photos.find((p) => p.slug === s)).filter(
    (p): p is (typeof photos)[number] => Boolean(p),
  );
  const colourPhotos = photos.filter((p) => !p.mono);
  const monoPhotos = photos.filter((p) => p.mono);
  const streetGrid = colourPhotos.filter(
    (p) => !(STORY_SLUGS as readonly string[]).includes(p.slug),
  );

  return (
    <>
      <ApertureIntro />
      {/* Hero */}
      <section className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-28 md:px-10 lg:grid-cols-12 lg:items-end lg:pt-32">
        <div className="min-w-0 lg:col-span-7">
          <p className="eyebrow animate-rise text-primary">
            Street & documentary · Chennai, India
          </p>
          <h1
            className="mt-6 font-display text-6xl leading-[0.95] animate-rise sm:text-7xl lg:text-[8.5rem]"
            style={{ animationDelay: "120ms" }}
          >
            The soul of <em className="text-primary">Chennai</em>, one frame at a time.
          </h1>
          <p
            className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground animate-rise"
            style={{ animationDelay: "240ms" }}
          >
            Fish markets at dawn, fires on night streets, faces by the sea. Every picture here
            comes with the human story behind the shutter.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 animate-rise" style={{ animationDelay: "360ms" }}>
            <Button asChild size="lg">
              <Link to="/work">
                Explore all {photos.length} stories <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/reels">Watch {reels.length} reels</Link>
            </Button>
          </div>

          <div
            className="mt-14 flex items-center gap-8 border-t border-border pt-6 animate-rise"
            style={{ animationDelay: "480ms" }}
          >
            <div className="flex items-center gap-3">
              <span className="h-9 w-px overflow-hidden bg-border">
                <span className="block h-full w-full bg-primary animate-scroll-cue" />
              </span>
              <span className="eyebrow">Scroll to develop</span>
            </div>
            <div className="hidden gap-6 sm:flex">
              <span className="eyebrow">{photos.length} Photographs</span>
              <span className="eyebrow">{reels.length} Reels</span>
              <span className="eyebrow">{categories.length} Chapters</span>
            </div>
          </div>
        </div>
        <div className="min-w-0 lg:col-span-5 animate-rise" style={{ animationDelay: "200ms" }}>
          <Viewfinder startDelay={2600} onSelect={openBySlug} />
        </div>
      </section>

      {/* Dual 35mm contact sheet marquee */}
      <ContactSheetStrip
        rowA={colourPhotos.slice(0, 9)}
        rowB={[...colourPhotos.slice(9), ...monoPhotos.slice(0, 4)]}
        total={photos.length}
        onOpenSlug={openBySlug}
      />

      {/* Featured stories */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-10">
          <div className="reveal flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-primary">Selected Plates · With Field Notes</p>
              <h2 className="mt-3 font-display text-5xl md:text-6xl">Featured stories</h2>
            </div>
            <Link to="/work" className="eyebrow hidden hover:text-primary sm:block">
              All {photos.length} stories →
            </Link>
          </div>

          <div className="mt-16 space-y-28">
            {heroStories.map((p, i) => (
              <article
                key={p.slug}
                className="grid items-center gap-10 md:grid-cols-12"
              >
                <div className={`md:col-span-7 ${i % 2 ? "md:order-2 md:col-start-6" : ""}`}>
                  <button
                    type="button"
                    onClick={() => openBySlug(p.slug)}
                    className="group relative block w-full overflow-hidden bg-muted text-left shadow-print focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <img
                      src={p.src}
                      alt={p.title}
                      width={p.width}
                      height={p.height}
                      loading="lazy"
                      className="develop max-h-[82vh] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <span className="hud absolute bottom-4 right-4 bg-scrim/75 px-2.5 py-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Inspect plate ↗
                    </span>
                  </button>
                </div>
                <div
                  className={`reveal md:col-span-4 ${i % 2 ? "md:order-1 md:col-start-1" : "md:col-start-9"}`}
                >
                  <span className="eyebrow text-primary">
                    Story {String(i + 1).padStart(2, "0")} · {p.category}
                  </span>
                  <h3 className="mt-4 font-display text-4xl leading-tight md:text-5xl">{p.title}</h3>
                  <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{p.story}</p>
                  <button
                    type="button"
                    onClick={() => openBySlug(p.slug)}
                    className="eyebrow mt-6 inline-flex items-center gap-2 text-foreground hover:text-primary"
                  >
                    Open full frame <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Silver Gelatin Monochrome Darkroom Band */}
      <SilverGelatinBand monos={monoPhotos} onOpenSlug={openBySlug} />

      {/* Colour Salon Wall — remaining original colour frames */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-10">
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-primary">Dawn to Midnight · Colour Plates</p>
              <h2 className="mt-3 font-display text-5xl md:text-6xl">
                Markets, rigging & night streets
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link to="/work">
                Filter by chapter <ArrowRight />
              </Link>
            </Button>
          </div>

          <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3">
            {streetGrid.map((p, i) => (
              <figure
                key={p.slug}
                style={{ ["--reveal-delay" as string]: `${(i % 3) * 90}ms` }}
                className="reveal group mb-8 break-inside-avoid"
              >
                <button
                  type="button"
                  onClick={() => openBySlug(p.slug)}
                  className="relative block w-full overflow-hidden bg-muted text-left shadow-print focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <img
                    src={p.src}
                    alt={p.title}
                    width={p.width}
                    height={p.height}
                    loading="lazy"
                    className="develop h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-scrim-gradient p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="eyebrow text-primary">{p.category}</span>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-foreground/90">
                      {p.story}
                    </p>
                  </div>
                </button>
                <figcaption className="mt-3 flex items-baseline justify-between gap-3">
                  <span className="font-display text-2xl">{p.title}</span>
                  <span className="eyebrow">{p.category}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Reels Showcase */}
      <ReelsShowcase reels={reels} />

      {/* Closing manifesto + invitation */}
      <section className="border-t border-border">
        <div className="reveal mx-auto grid max-w-7xl gap-12 px-5 py-28 md:px-10 lg:grid-cols-12 lg:items-center">
          <blockquote className="font-display text-4xl leading-[1.08] sm:text-5xl lg:col-span-8 lg:text-6xl">
            “My camera is my language. Chennai is my story. Photography is my forever love.”
            <footer className="eyebrow mt-6 not-italic text-primary">
              — Rahul · Chennai, Tamil Nadu
            </footer>
          </blockquote>
          <div className="lg:col-span-4 lg:justify-self-end">
            <p className="text-muted-foreground">
              Available for photo walks, editorial assignments, prints and collaborations across
              Chennai.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/about">About Rahul</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Get in touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Lightbox photos={photos} index={lightboxIdx} onChange={setLightboxIdx} />
    </>
  );
}
