import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PhotoCard } from "@/components/photo-card";
import { Lightbox } from "@/components/lightbox";
import { categories, photos, type Category } from "@/lib/photos";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Stories — Rahul, Chennai Street Photography" },
      {
        name: "description",
        content:
          "Every photograph with the story behind it: Chennai's fish markets, coast, night streets and people.",
      },
      { property: "og:title", content: "Stories — Rahul, Chennai Street Photography" },
      {
        property: "og:description",
        content:
          "Every photograph with the story behind it: Chennai's fish markets, coast, night streets and people.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorkPage,
});

type Filter = "All" | Category | "Mono";

function WorkPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<number | null>(null);

  const list = useMemo(() => {
    if (filter === "All") return photos;
    if (filter === "Mono") return photos.filter((p) => p.mono);
    return photos.filter((p) => p.category === filter);
  }, [filter]);

  const filters: Filter[] = ["All", ...categories, "Mono"];

  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 pt-32 md:px-10">
      <p className="eyebrow">{photos.length} photographs · {photos.length} stories</p>
      <h1 className="mt-4 font-display text-6xl leading-none md:text-8xl">Stories</h1>
      <p className="mt-6 max-w-xl text-muted-foreground">
        Each frame has a moment behind it. Tap any photo to see it larger.
      </p>

      <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter photos">
        {filters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={`border px-4 py-1.5 text-sm transition-colors ${
              filter === f
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-14 columns-1 gap-8 sm:columns-2 lg:columns-3">
        {list.map((p, i) => (
          <PhotoCard key={p.slug} photo={p} index={i} onOpen={() => setOpen(i)} />
        ))}
      </div>

      <Lightbox photos={list} index={open} onChange={setOpen} />
    </section>
  );
}