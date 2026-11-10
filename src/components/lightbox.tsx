import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo } from "@/lib/photos";

type Props = {
  photos: Photo[];
  index: number | null;
  onChange: (index: number | null) => void;
};

export function Lightbox({ photos, index, onChange }: Props) {
  const open = index !== null;
  const photo = open ? (photos[index] ?? null) : null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") onChange((index! + 1) % photos.length);
      if (e.key === "ArrowLeft") onChange((index! - 1 + photos.length) % photos.length);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, index, photos.length, onChange]);

  if (!photo) return null;

  const go = (d: number) => onChange((index! + d + photos.length) % photos.length);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
      className="fixed inset-0 z-50 flex flex-col bg-scrim/95 backdrop-blur-sm animate-in fade-in duration-300 lg:flex-row"
      onClick={() => onChange(null)}
    >
      <div className="relative flex min-h-0 flex-1 items-center justify-center p-4 lg:p-10">
        <img
          key={photo.slug}
          src={photo.src}
          alt={photo.title}
          className="max-h-full max-w-full object-contain shadow-print animate-in fade-in zoom-in-95 duration-500"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <aside
        className="w-full shrink-0 border-t border-border bg-background p-6 lg:w-[380px] lg:border-l lg:border-t-0 lg:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <span className="eyebrow">
            {String(index! + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")} ·{" "}
            {photo.category}
          </span>
          <button
            onClick={() => onChange(null)}
            aria-label="Close"
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>
        <h2 className="mt-6 font-display text-4xl leading-tight">{photo.title}</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">{photo.story}</p>
        <div className="mt-8 flex gap-3">
          <button
            onClick={() => go(-1)}
            aria-label="Previous photo"
            className="flex size-11 items-center justify-center border border-border hover:border-primary hover:text-primary"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next photo"
            className="flex size-11 items-center justify-center border border-border hover:border-primary hover:text-primary"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </aside>
    </div>
  );
}