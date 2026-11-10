import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Aperture, ArrowRight, Heart, Sliders, Sparkles, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories, photos, type Photo } from "@/lib/photos";
import { reels } from "@/lib/reels";
import { ApertureIntro } from "@/components/aperture-intro";
import { Viewfinder } from "@/components/viewfinder";
import { Lightbox } from "@/components/lightbox";
import { DarkroomEditorModal } from "@/components/darkroom-editor";
import { PhotoCard } from "@/components/photo-card";
import { usePhotoLike } from "@/lib/likes-store";
import { cameraSound } from "@/lib/camera-audio";
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

function FeaturedStoryArticle({
  photo,
  index,
  onOpen,
  onEdit,
}: {
  photo: Photo;
  index: number;
  onOpen: () => void;
  onEdit: (photo: Photo) => void;
}) {
  const { liked, count, toggle: toggleLike } = usePhotoLike(photo.slug);

  return (
    <article className="grid items-center gap-10 md:grid-cols-12">
      <div className={`md:col-span-7 ${index % 2 ? "md:order-2 md:col-start-6" : ""}`}>
        <div className="group relative block w-full overflow-hidden rounded-sm bg-muted text-left shadow-print">
          <img
            src={photo.src}
            alt={photo.title}
            width={photo.width}
            height={photo.height}
            loading="lazy"
            className="develop max-h-[80vh] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />

          {/* Top Overlaid Badges */}
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span className="rounded bg-black/75 px-2.5 py-1 font-mono text-[10px] tracking-widest text-primary backdrop-blur">
              PLATE 0{index + 1}
            </span>
            <span className="rounded bg-black/75 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground backdrop-blur">
              {photo.category}
            </span>
          </div>

          {/* Floating Like Button */}
          <button
            type="button"
            onClick={toggleLike}
            className={`absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium backdrop-blur transition-all ${
              liked
                ? "bg-red-500/20 text-red-400 ring-1 ring-red-500/60"
                : "bg-black/70 text-white/80 hover:bg-black/90 hover:text-white"
            }`}
            title={liked ? "Unlike" : "Like this story"}
          >
            <Heart
              className={`size-3.5 transition-transform duration-200 group-hover:scale-125 ${
                liked ? "fill-red-500 text-red-500" : ""
              }`}
            />
            <span className="font-mono text-xs">{count}</span>
          </button>

          {/* Action Overlay */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => {
                cameraSound.playShutter();
                onOpen();
              }}
              className="flex items-center gap-1.5 text-xs text-white/90 hover:text-primary transition-colors"
            >
              <Eye className="size-4" />
              <span>Full Screen Inspection</span>
            </button>

            <button
              type="button"
              onClick={() => {
                cameraSound.playDial();
                onEdit(photo);
              }}
              className="flex items-center gap-1.5 rounded border border-primary/50 bg-primary/20 px-3 py-1 font-mono text-xs uppercase tracking-wider text-primary backdrop-blur transition-all hover:bg-primary hover:text-primary-foreground"
            >
              <Sliders className="size-3.5" />
              <span>Darkroom Studio</span>
            </button>
          </div>
        </div>
      </div>

      <div className={`reveal md:col-span-4 ${index % 2 ? "md:order-1 md:col-start-1" : "md:col-start-9"}`}>
        <span className="eyebrow text-primary">
          Story {String(index + 1).padStart(2, "0")} · {photo.category}
        </span>
        <h3 className="mt-3 font-display text-4xl leading-tight md:text-5xl">{photo.title}</h3>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{photo.story}</p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => {
              cameraSound.playShutter();
              onOpen();
            }}
            className="eyebrow inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            Open full frame <ArrowRight className="size-3.5" />
          </button>

          <span className="text-border">·</span>

          <button
            type="button"
            onClick={() => {
              cameraSound.playDial();
              onEdit(photo);
            }}
            className="eyebrow inline-flex items-center gap-1.5 text-primary hover:underline transition-colors"
          >
            <Sliders className="size-3" />
            Grade in Darkroom
          </button>
        </div>
      </div>
    </article>
  );
}

function Index() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  const [introReplay, setIntroReplay] = useState(0);

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
      <ApertureIntro replayNonce={introReplay} />

      {/* Hero Section: Perfectly aligned grid items-center */}
      <section className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-24 md:px-10 lg:grid-cols-12 lg:gap-12 lg:pt-28">
        <div className="min-w-0 lg:col-span-7 flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-4 animate-rise">
            <p className="eyebrow text-primary">
              Street & documentary · Chennai, India
            </p>
            <button
              type="button"
              onClick={() => {
                cameraSound.playShutter();
                setIntroReplay((n) => n + 1);
              }}
              className="eyebrow inline-flex items-center gap-1.5 border border-border px-2.5 py-1 text-muted-foreground transition-colors hover:border-primary hover:text-primary rounded-sm"
            >
              <Aperture className="size-3 text-primary" />
              Replay lens intro
            </button>
          </div>

          <h1
            className="mt-6 font-display text-5xl leading-[0.98] animate-rise sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]"
            style={{ animationDelay: "120ms" }}
          >
            The soul of <em className="text-primary not-italic">Chennai</em>, one frame at a time.
          </h1>

          <p
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground animate-rise"
            style={{ animationDelay: "240ms" }}
          >
            Fish markets at dawn, fires on night streets, faces by the sea. Every picture here
            comes with the human story behind the shutter.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 animate-rise" style={{ animationDelay: "360ms" }}>
            <Button asChild size="lg" className="rounded-sm">
              <Link to="/work">
                Explore all {photos.length} stories <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-sm">
              <Link to="/reels">Watch {reels.length} reels</Link>
            </Button>
          </div>

          <div
            className="mt-12 flex items-center gap-8 border-t border-border pt-6 animate-rise"
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

        {/* Hero Camera Viewfinder: Centered and Aligned */}
        <div className="min-w-0 lg:col-span-5 flex items-center justify-center animate-rise" style={{ animationDelay: "200ms" }}>
          <Viewfinder
            startDelay={5200}
            onSelect={openBySlug}
            onEdit={(p) => setEditingPhoto(p)}
          />
        </div>
      </section>

      {/* Dual 35mm contact sheet marquee */}
      <ContactSheetStrip
        rowA={colourPhotos.slice(0, 9)}
        rowB={[...colourPhotos.slice(9), ...monoPhotos.slice(0, 4)]}
        total={photos.length}
        onOpenSlug={openBySlug}
      />

      {/* Featured stories with like counter and darkroom triggers */}
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
              <FeaturedStoryArticle
                key={p.slug}
                photo={p}
                index={i}
                onOpen={() => openBySlug(p.slug)}
                onEdit={(photo) => setEditingPhoto(photo)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Silver Gelatin Monochrome Darkroom Band */}
      <SilverGelatinBand monos={monoPhotos} onOpenSlug={openBySlug} />

      {/* Colour Salon Wall */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-10">
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-primary">Dawn to Midnight · Colour Plates</p>
              <h2 className="mt-3 font-display text-5xl md:text-6xl">
                Markets, rigging & night streets
              </h2>
            </div>
            <Button asChild variant="outline" className="rounded-sm">
              <Link to="/work">
                Filter by chapter <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-14 columns-1 gap-8 sm:columns-2 lg:columns-3">
            {streetGrid.map((p, i) => (
              <PhotoCard
                key={p.slug}
                photo={p}
                index={i}
                onOpen={() => openBySlug(p.slug)}
                onEdit={(photo) => setEditingPhoto(photo)}
              />
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
              <Button asChild size="lg" className="rounded-sm">
                <Link to="/about">About Rahul</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-sm">
                <Link to="/contact">Get in touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Full-screen Lightbox with like & grading buttons */}
      <Lightbox
        photos={photos}
        index={lightboxIdx}
        onChange={setLightboxIdx}
        onEdit={(p) => setEditingPhoto(p)}
      />

      {/* Interactive Darkroom Studio / Editor Modal */}
      <DarkroomEditorModal
        photo={editingPhoto}
        allPhotos={photos}
        onClose={() => setEditingPhoto(null)}
        onNavigate={(p) => setEditingPhoto(p)}
      />
    </>
  );
}
