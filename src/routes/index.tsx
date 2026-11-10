import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { featured, photos } from "@/lib/photos";
import { reels } from "@/lib/reels";
import { ApertureIntro } from "@/components/aperture-intro";
import { Viewfinder } from "@/components/viewfinder";

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

function Index() {
  const strip = photos.filter((p) => !featured.includes(p) && !p.mono).slice(0, 6);

  return (
    <>
      <ApertureIntro />
      {/* Hero */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-28 md:px-10 lg:grid-cols-12 lg:items-end lg:pt-36">
        <div className="lg:col-span-7">
          <p className="eyebrow animate-rise">Street & documentary · Chennai</p>
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
            comes with the story behind it.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 animate-rise" style={{ animationDelay: "360ms" }}>
            <Button asChild size="lg">
              <Link to="/work">
                Read the stories <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/about">About Rahul</Link>
            </Button>
          </div>
        </div>
        <div className="lg:col-span-5 animate-rise" style={{ animationDelay: "200ms" }}>
          <Viewfinder startDelay={2600} />
        </div>
      </section>

      {/* Featured stories */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-10">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-5xl md:text-6xl">Featured stories</h2>
            <Link to="/work" className="eyebrow hidden hover:text-primary sm:block">
              All {photos.length} stories →
            </Link>
          </div>

          <div className="mt-16 space-y-28">
            {featured.slice(1).map((p, i) => (
              <article
                key={p.slug}
                className="grid items-center gap-10 md:grid-cols-12"
              >
                <div className={`md:col-span-6 ${i % 2 ? "md:order-2 md:col-start-7" : ""}`}>
                  <img
                    src={p.src}
                    alt={p.title}
                    width={p.width}
                    height={p.height}
                    loading="lazy"
                    className="max-h-[80vh] w-full object-cover shadow-print"
                  />
                </div>
                <div
                  className={`md:col-span-5 ${i % 2 ? "md:order-1 md:col-start-1" : "md:col-start-8"}`}
                >
                  <span className="eyebrow text-primary">
                    Story {String(i + 1).padStart(2, "0")} · {p.category}
                  </span>
                  <h3 className="mt-4 font-display text-4xl leading-tight md:text-5xl">{p.title}</h3>
                  <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{p.story}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Strip */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-10">
          <p className="eyebrow">More from the streets</p>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {strip.map((p) => (
              <Link key={p.slug} to="/work" className="group overflow-hidden bg-muted">
                <img
                  src={p.src}
                  alt={p.title}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Reels teaser + quote */}
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-2 md:px-10">
          <blockquote className="font-display text-4xl leading-tight md:text-5xl">
            “My camera is my language. Chennai is my story. Photography is my forever love.”
            <footer className="eyebrow mt-6 not-italic">— Rahul</footer>
          </blockquote>
          <div>
            <p className="eyebrow">Moving pictures</p>
            <p className="mt-4 text-muted-foreground">
              {reels.length} short reels from the beach, the market and the night fair.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {reels.slice(0, 3).map((r) => (
                <Link key={r.slug} to="/reels" className="group overflow-hidden bg-muted">
                  <img
                    src={r.poster}
                    alt={r.title}
                    loading="lazy"
                    className="aspect-[9/16] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
              ))}
            </div>
            <Button asChild variant="link" className="mt-4 px-0">
              <Link to="/reels">
                Watch the reels <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
