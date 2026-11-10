import type { Photo } from "@/lib/photos";

type Props = {
  photo: Photo;
  index: number;
  onOpen?: () => void;
};

export function PhotoCard({ photo, index, onOpen }: Props) {
  return (
    <figure className="group mb-12 break-inside-avoid">
      <button
        type="button"
        onClick={onOpen}
        className="block w-full overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`Open ${photo.title}`}
      >
        <img
          src={photo.src}
          alt={photo.title}
          width={photo.width}
          height={photo.height}
          loading="lazy"
          className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </button>
      <figcaption className="mt-4">
        <div className="eyebrow flex items-center gap-3">
          <span className="text-primary">No. {String(index + 1).padStart(2, "0")}</span>
          <span>{photo.category}</span>
          {photo.mono && <span>· Mono</span>}
        </div>
        <h3 className="mt-2 font-display text-2xl leading-tight">{photo.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{photo.story}</p>
      </figcaption>
    </figure>
  );
}