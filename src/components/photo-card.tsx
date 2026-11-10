import { useState, useRef, MouseEvent } from "react";
import { Heart, Sliders, Eye, Sparkles } from "lucide-react";
import type { Photo } from "@/lib/photos";
import { usePhotoLike } from "@/lib/likes-store";
import { cameraSound } from "@/lib/camera-audio";

type Props = {
  photo: Photo;
  index: number;
  onOpen?: () => void;
  onEdit?: (photo: Photo) => void;
};

export function PhotoCard({ photo, index, onOpen, onEdit }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { liked, count, toggle: toggleLike } = usePhotoLike(photo.slug);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <figure className="group mb-10 break-inside-avoid">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.02, 1.02, 1.02)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
        }}
        className="relative overflow-hidden rounded-sm bg-muted shadow-print"
      >
        <button
          type="button"
          onClick={() => {
            cameraSound.playShutter();
            onOpen?.();
          }}
          className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`Open ${photo.title}`}
        >
          <img
            src={photo.src}
            alt={photo.title}
            width={photo.width}
            height={photo.height}
            loading="lazy"
            className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </button>

        {/* Ambient Film Halation Border on Hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ring-1 ring-inset ring-primary/40" />

        {/* Top Floating Badges */}
        <div className="absolute left-3 top-3 flex items-center gap-1.5 opacity-90">
          <span className="rounded bg-black/70 px-2 py-0.5 font-mono text-[10px] tracking-widest text-primary backdrop-blur">
            NO. {String(index + 1).padStart(2, "0")}
          </span>
          {photo.mono && (
            <span className="rounded bg-black/70 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground backdrop-blur">
              MONO
            </span>
          )}
        </div>

        {/* Floating Like Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleLike();
          }}
          className={`absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur transition-all ${
            liked
              ? "bg-red-500/20 text-red-400 ring-1 ring-red-500/50"
              : "bg-black/60 text-white/80 hover:bg-black/80 hover:text-white"
          }`}
          aria-label={liked ? "Unlike" : "Like"}
        >
          <Heart
            className={`size-3.5 transition-transform duration-200 group-hover:scale-110 ${
              liked ? "fill-red-500 text-red-500" : ""
            }`}
          />
          <span className="font-mono text-[11px]">{count}</span>
        </button>

        {/* Hover Quick Actions Drawer */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => {
              cameraSound.playShutter();
              onOpen?.();
            }}
            className="flex items-center gap-1.5 text-xs text-white/90 hover:text-primary transition-colors"
          >
            <Eye className="size-3.5" />
            <span>Inspect</span>
          </button>

          {onEdit && (
            <button
              type="button"
              onClick={() => {
                cameraSound.playDial();
                onEdit(photo);
              }}
              className="flex items-center gap-1.5 rounded border border-primary/40 bg-primary/20 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-primary backdrop-blur transition-all hover:bg-primary hover:text-primary-foreground"
            >
              <Sliders className="size-3" />
              <span>Darkroom Studio</span>
            </button>
          )}
        </div>
      </div>

      <figcaption className="mt-3.5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-2xl leading-tight text-foreground group-hover:text-primary transition-colors">
            {photo.title}
          </h3>
          <span className="eyebrow shrink-0 text-muted-foreground">{photo.category}</span>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground line-clamp-2">{photo.story}</p>
      </figcaption>
    </figure>
  );
}