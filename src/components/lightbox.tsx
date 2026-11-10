import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Heart, Sliders } from "lucide-react";
import type { Photo } from "@/lib/photos";
import { usePhotoLike } from "@/lib/likes-store";
import { cameraSound } from "@/lib/camera-audio";

type Props = {
  photos: Photo[];
  index: number | null;
  onChange: (index: number | null) => void;
  onEdit?: (photo: Photo) => void;
};

export function Lightbox({ photos, index, onChange, onEdit }: Props) {
  const open = index !== null;
  const photo = open ? (photos[index] ?? null) : null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") {
        cameraSound.playShutter();
        onChange((index! + 1) % photos.length);
      }
      if (e.key === "ArrowLeft") {
        cameraSound.playShutter();
        onChange((index! - 1 + photos.length) % photos.length);
      }
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

  return (
    <LightboxContent
      photo={photo}
      photos={photos}
      index={index!}
      onChange={onChange}
      onEdit={onEdit}
    />
  );
}

function LightboxContent({
  photo,
  photos,
  index,
  onChange,
  onEdit,
}: {
  photo: Photo;
  photos: Photo[];
  index: number;
  onChange: (index: number | null) => void;
  onEdit?: ((photo: Photo) => void) | undefined;
}) {
  const { liked, count, toggle: toggleLike } = usePhotoLike(photo.slug);

  const go = (d: number) => {
    cameraSound.playShutter();
    onChange((index + d + photos.length) % photos.length);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
      className="fixed inset-0 z-50 flex flex-col bg-scrim/95 backdrop-blur-md animate-in fade-in duration-300 lg:flex-row"
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
        className="w-full shrink-0 border-t border-border bg-background/95 p-6 lg:w-[400px] lg:border-l lg:border-t-0 lg:p-10 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="flex items-center justify-between">
            <span className="eyebrow text-primary">
              {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")} ·{" "}
              {photo.category}
            </span>
            <button
              onClick={() => onChange(null)}
              aria-label="Close"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>

          <h2 className="mt-6 font-display text-4xl leading-tight text-foreground">{photo.title}</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{photo.story}</p>
        </div>

        <div className="mt-8 border-t border-border/70 pt-6">
          <div className="flex items-center justify-between gap-4">
            {/* Interactive Like Button */}
            <button
              type="button"
              onClick={toggleLike}
              className={`flex items-center gap-2 rounded border px-3.5 py-2 text-sm font-medium transition-all ${
                liked
                  ? "border-red-500/50 bg-red-500/15 text-red-400"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              <Heart
                className={`size-4 transition-transform ${
                  liked ? "fill-red-500 text-red-500 scale-110" : ""
                }`}
              />
              <span>{count} Likes</span>
            </button>

            {/* Launch Darkroom Studio */}
            {onEdit && (
              <button
                type="button"
                onClick={() => {
                  cameraSound.playDial();
                  onEdit(photo);
                }}
                className="flex items-center gap-2 rounded border border-primary/50 bg-primary/10 px-3.5 py-2 font-mono text-xs uppercase tracking-wider text-primary transition-all hover:bg-primary hover:text-primary-foreground"
              >
                <Sliders className="size-3.5" />
                <span>Grade Frame</span>
              </button>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="mt-5 flex items-center justify-between">
            <span className="eyebrow">Use ← → keys to browse</span>
            <div className="flex gap-2">
              <button
                onClick={() => go(-1)}
                aria-label="Previous photo"
                className="flex size-10 items-center justify-center rounded border border-border hover:border-primary hover:text-primary transition-colors"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next photo"
                className="flex size-10 items-center justify-center rounded border border-border hover:border-primary hover:text-primary transition-colors"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}