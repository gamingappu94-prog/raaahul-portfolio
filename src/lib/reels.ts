import beachRide from "@/assets/reels/beach-ride.mp4.asset.json";
import beachRidePoster from "@/assets/reels/beach-ride-poster.jpg.asset.json";
import crossing from "@/assets/reels/crossing.mp4.asset.json";
import crossingPoster from "@/assets/reels/crossing-poster.jpg.asset.json";
import lampLight from "@/assets/reels/lamp-light.mp4.asset.json";
import lampLightPoster from "@/assets/reels/lamp-light-poster.jpg.asset.json";
import lens from "@/assets/reels/lens-70-200.mp4.asset.json";
import lensPoster from "@/assets/reels/lens-70-200-poster.jpg.asset.json";
import marketSmile from "@/assets/reels/market-smile.mp4.asset.json";
import marketSmilePoster from "@/assets/reels/market-smile-poster.jpg.asset.json";
import nightFair from "@/assets/reels/night-fair.mp4.asset.json";
import nightFairPoster from "@/assets/reels/night-fair-poster.jpg.asset.json";
import redBalloon from "@/assets/reels/red-balloon.mp4.asset.json";
import redBalloonPoster from "@/assets/reels/red-balloon-poster.jpg.asset.json";
import seaSelfie from "@/assets/reels/sea-selfie.mp4.asset.json";
import seaSelfiePoster from "@/assets/reels/sea-selfie-poster.jpg.asset.json";
import shoreline from "@/assets/reels/shoreline.mp4.asset.json";
import shorelinePoster from "@/assets/reels/shoreline-poster.jpg.asset.json";
import sunsetCatch from "@/assets/reels/sunset-catch.mp4.asset.json";
import sunsetCatchPoster from "@/assets/reels/sunset-catch-poster.jpg.asset.json";

export type Reel = { slug: string; title: string; src: string; poster: string; story: string };

export const reels: Reel[] = [
  {
    slug: "red-balloon",
    title: "The Red Balloon",
    src: redBalloon.url,
    poster: redBalloonPoster.url,
    story: "A tiny explorer on the beach, holding the brightest thing in the whole evening.",
  },
  {
    slug: "market-smile",
    title: "Market Smile",
    src: marketSmile.url,
    poster: marketSmilePoster.url,
    story: "A laugh that breaks through the noise of the market and makes the whole stall glow.",
  },
  {
    slug: "shoreline",
    title: "Shoreline",
    src: shoreline.url,
    poster: shorelinePoster.url,
    story: "She walks into the waves in her sari, the way generations have before her.",
  },
  {
    slug: "beach-ride",
    title: "Shoulder Ride",
    src: beachRide.url,
    poster: beachRidePoster.url,
    story: "The best seat on the beach is always on someone's shoulders.",
  },
  {
    slug: "sea-selfie",
    title: "Sea Selfie",
    src: seaSelfie.url,
    poster: seaSelfiePoster.url,
    story: "Two people, one phone and the Bay of Bengal behind them — a memory being made.",
  },
  {
    slug: "sunset-catch",
    title: "Sunset Catch",
    src: sunsetCatch.url,
    poster: sunsetCatchPoster.url,
    story: "The day's last light falls on the day's last catch.",
  },
  {
    slug: "crossing",
    title: "The Crossing",
    src: crossing.url,
    poster: crossingPoster.url,
    story: "A mother, a child on her hip and a busy Chennai road — everyday courage.",
  },
  {
    slug: "night-fair",
    title: "Night Fair",
    src: nightFair.url,
    poster: nightFairPoster.url,
    story: "When the sun goes down, the city lights up its own small festival.",
  },
  {
    slug: "lamp-light",
    title: "Lamp Light",
    src: lampLight.url,
    poster: lampLightPoster.url,
    story: "A quiet moment of work under the soft glow of a stall lamp.",
  },
  {
    slug: "lens-70-200",
    title: "Behind the Lens",
    src: lens.url,
    poster: lensPoster.url,
    story: "The 70-200 — the lens that lets me stay unseen and let moments stay honest.",
  },
];