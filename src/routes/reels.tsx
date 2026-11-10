import { createFileRoute } from "@tanstack/react-router";
import { reels } from "@/lib/reels";

export const Route = createFileRoute("/reels")({
  head: () => ({
    meta: [
      { title: "Reels — Rahul, Chennai Street Photography" },
      {
        name: "description",
        content: "Short moving pictures from Chennai's beaches, markets and night fairs by Rahul.",
      },
      { property: "og:title", content: "Reels — Rahul, Chennai Street Photography" },
      {
        property: "og:description",
        content: "Short moving pictures from Chennai's beaches, markets and night fairs by Rahul.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReelsPage,
});

function ReelsPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 pt-32 md:px-10">
      <p className="eyebrow">{reels.length} reels</p>
      <h1 className="mt-4 font-display text-6xl leading-none md:text-8xl">Reels</h1>
      <p className="mt-6 max-w-xl text-muted-foreground">
        Some moments need to move. Press play on any of them.
      </p>

      <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {reels.map((r) => (
          <figure key={r.slug}>
            <video
              src={r.src}
              poster={r.poster}
              controls
              playsInline
              preload="none"
              className="aspect-[9/16] w-full bg-muted object-cover"
            />
            <figcaption className="mt-3">
              <h2 className="font-display text-2xl">{r.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{r.story}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}