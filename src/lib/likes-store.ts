import { useEffect, useState } from "react";
import { cameraSound } from "./camera-audio";

// Initial mock like counts for realistic photographer engagement
const DEFAULT_LIKES: Record<string, number> = {
  "fire-keeper": 142,
  "harbour-reflections": 98,
  "under-the-bulb": 184,
  "waiting-by-the-sea": 115,
  "fish-seller": 76,
  "fish-seller-mono": 89,
  "fish-cart": 63,
  "fish-cart-mono": 58,
  "the-catch": 121,
  "the-catch-mono": 94,
  "morning-catch": 137,
  "morning-catch-mono": 82,
  "prawn-hands": 105,
  "prawn-hands-mono": 67,
  "steel-and-silver": 73,
  "steel-and-silver-mono": 88,
  "rigging": 91,
  "rigging-mono": 64,
  "late-shift": 119,
  "midnight-rider": 164,
  "golden-hour-talk": 145,
  "city-cruiser": 82,
  "field-of-crosses": 156,
  "two-strays": 178,
};

const STORAGE_KEY_LIKES = "rahul_user_likes";
const STORAGE_KEY_COUNTS = "rahul_like_counts";

type Listener = () => void;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((l) => l());
}

function getUserLikes(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LIKES);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function getLikeCounts(): Record<string, number> {
  if (typeof window === "undefined") return { ...DEFAULT_LIKES };
  try {
    const raw = localStorage.getItem(STORAGE_KEY_COUNTS);
    const parsed = raw ? JSON.parse(raw) : {};
    return { ...DEFAULT_LIKES, ...parsed };
  } catch {
    return { ...DEFAULT_LIKES };
  }
}

export function togglePhotoLike(slug: string): boolean {
  if (typeof window === "undefined") return false;
  const userLikes = getUserLikes();
  const counts = getLikeCounts();
  const currentlyLiked = userLikes.has(slug);

  if (currentlyLiked) {
    userLikes.delete(slug);
    counts[slug] = Math.max(0, (counts[slug] || 1) - 1);
  } else {
    userLikes.add(slug);
    counts[slug] = (counts[slug] || 0) + 1;
    cameraSound.playDial();
  }

  localStorage.setItem(STORAGE_KEY_LIKES, JSON.stringify(Array.from(userLikes)));
  localStorage.setItem(STORAGE_KEY_COUNTS, JSON.stringify(counts));
  notify();
  return !currentlyLiked;
}

export function isPhotoLiked(slug: string): boolean {
  return getUserLikes().has(slug);
}

export function getPhotoLikeCount(slug: string): number {
  return getLikeCounts()[slug] ?? (DEFAULT_LIKES[slug] || 0);
}

export function usePhotoLike(slug: string) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick((t) => t + 1);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const liked = isPhotoLiked(slug);
  const count = getPhotoLikeCount(slug);

  return {
    liked,
    count,
    toggle: () => togglePhotoLike(slug),
  };
}

export function useLikedSlugs(): string[] {
  const [, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick((t) => t + 1);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return Array.from(getUserLikes());
}
