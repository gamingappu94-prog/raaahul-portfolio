import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { LayoutGrid, Columns, Search, Heart, Sliders, Sparkles, Filter as FilterIcon } from "lucide-react";
import { PhotoCard } from "@/components/photo-card";
import { Lightbox } from "@/components/lightbox";
import { DarkroomEditorModal } from "@/components/darkroom-editor";
import { categories, photos, type Category, type Photo } from "@/lib/photos";
import { useLikedSlugs } from "@/lib/likes-store";
import { cameraSound } from "@/lib/camera-audio";

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

type Filter = "All" | Category | "Mono" | "Liked";
type ViewMode = "editorial" | "contact";

function WorkPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("editorial");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);

  const likedSlugs = useLikedSlugs();

  const filteredList = useMemo(() => {
    let result = photos;

    if (filter === "Mono") {
      result = result.filter((p) => p.mono);
    } else if (filter === "Liked") {
      result = result.filter((p) => likedSlugs.includes(p.slug));
    } else if (filter !== "All") {
      result = result.filter((p) => p.category === filter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.story.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }

    return result;
  }, [filter, searchQuery, likedSlugs]);

  const filters: Filter[] = ["All", ...categories, "Mono", "Liked"];

  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 pt-28 md:px-10 lg:pt-32">
      {/* Page Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-border/70 pb-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="eyebrow text-primary">Master Archives · Chennai 35mm</span>
            <span className="text-muted-foreground/50">·</span>
            <span className="font-mono text-xs text-muted-foreground">{photos.length} Plates</span>
          </div>
          <h1 className="mt-3 font-display text-5xl leading-none md:text-7xl lg:text-8xl">Stories</h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Each frame has a human moment behind it. Inspect plates, like your favorites, or grade in
            the Darkroom Studio.
          </p>
        </div>

        {/* View Layout Switcher */}
        <div className="flex items-center gap-2 rounded border border-border/70 p-1 bg-card self-start md:self-end">
          <button
            type="button"
            onClick={() => {
              cameraSound.playDial();
              setViewMode("editorial");
            }}
            title="Editorial Masonry Wall"
            className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-mono transition-colors ${
              viewMode === "editorial"
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Columns className="size-3.5" />
            <span>Editorial</span>
          </button>
          <button
            type="button"
            onClick={() => {
              cameraSound.playDial();
              setViewMode("contact");
            }}
            title="35mm Contact Sheet Grid"
            className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-mono transition-colors ${
              viewMode === "contact"
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LayoutGrid className="size-3.5" />
            <span>Contact Sheet</span>
          </button>
        </div>
      </div>

      {/* Filter Chips & Search Bar */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Category Filter Chips */}
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter stories">
          {filters.map((f) => {
            const isLikedFilter = f === "Liked";
            const isActive = filter === f;

            return (
              <button
                key={f}
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  cameraSound.playDial();
                  setFilter(f);
                }}
                className={`flex items-center gap-1.5 rounded-sm border px-3.5 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground shadow-[0_0_12px_rgba(255,180,60,0.2)]"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground bg-card/60"
                }`}
              >
                {isLikedFilter && (
                  <Heart
                    className={`size-3 ${
                      isActive || likedSlugs.length > 0 ? "fill-current text-red-400" : ""
                    }`}
                  />
                )}
                <span>{f === "Liked" ? `Curated (${likedSlugs.length})` : f}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search moments, places, tags..."
            className="h-9 w-full rounded-sm border border-border bg-card/80 pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Gallery View */}
      {filteredList.length === 0 ? (
        <div className="mt-20 flex flex-col items-center justify-center rounded-sm border border-dashed border-border/80 p-16 text-center">
          <Heart className="size-8 text-muted-foreground/40" />
          <h3 className="mt-4 font-display text-2xl text-foreground">No matching photographs</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {filter === "Liked"
              ? "You haven't liked any photographs yet. Click the heart on any photo to save it to your curated reel!"
              : "Try adjusting your search or switching to another category."}
          </p>
          <button
            type="button"
            onClick={() => {
              setFilter("All");
              setSearchQuery("");
            }}
            className="mt-6 rounded border border-primary px-4 py-1.5 text-xs font-mono text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === "editorial" ? (
        /* Editorial Masonry Wall */
        <div className="mt-12 columns-1 gap-8 sm:columns-2 lg:columns-3">
          {filteredList.map((p, i) => (
            <PhotoCard
              key={p.slug}
              photo={p}
              index={i}
              onOpen={() => setLightboxIndex(i)}
              onEdit={(photo) => setEditingPhoto(photo)}
            />
          ))}
        </div>
      ) : (
        /* 35mm Contact Sheet Grid */
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {filteredList.map((p, i) => (
            <div
              key={p.slug}
              className="group relative flex flex-col overflow-hidden rounded-sm border border-border/80 bg-black/60 p-2 shadow-print transition-all hover:border-primary/60 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.8)]"
            >
              {/* Top Film Frame Number */}
              <div className="mb-1 flex items-center justify-between font-mono text-[9px] text-muted-foreground">
                <span className="text-primary font-bold">▶ {String(i + 1).padStart(2, "0")}A</span>
                <span>TX400</span>
              </div>

              {/* Thumbnail */}
              <button
                type="button"
                onClick={() => {
                  cameraSound.playShutter();
                  setLightboxIndex(i);
                }}
                className="relative aspect-square w-full overflow-hidden bg-muted text-left"
              >
                <img
                  src={p.src}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover overlay with Darkroom button */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="rounded bg-primary px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-primary-foreground font-semibold">
                    Inspect
                  </span>
                </div>
              </button>

              <div className="mt-2 flex items-center justify-between">
                <span className="truncate font-display text-xs text-foreground group-hover:text-primary transition-colors">
                  {p.title}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    cameraSound.playDial();
                    setEditingPhoto(p);
                  }}
                  title="Grade Frame"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Sliders className="size-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        photos={filteredList}
        index={lightboxIndex}
        onChange={setLightboxIndex}
        onEdit={(p) => setEditingPhoto(p)}
      />

      {/* Darkroom Studio Modal */}
      <DarkroomEditorModal
        photo={editingPhoto}
        allPhotos={photos}
        onClose={() => setEditingPhoto(null)}
        onNavigate={(p) => setEditingPhoto(p)}
      />
    </section>
  );
}