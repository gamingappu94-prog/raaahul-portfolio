import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Phone,
  Mail,
  Instagram,
  Copy,
  Check,
  ArrowUpRight,
  MapPin,
  Clock,
  Camera,
  Compass,
  Printer,
  Sparkles,
} from "lucide-react";
import { photos } from "@/lib/photos";
import { cameraSound } from "@/lib/camera-audio";

const CONTACT_INFO = {
  name: "Rahul",
  phone: "+91 9360476964",
  rawPhone: "9360476964",
  email: "rahul107825@gmail.com",
  instagram: "rahhuulll.l",
  instagramUrl: "https://instagram.com/rahhuulll.l",
  whatsappUrl:
    "https://wa.me/919360476964?text=Hi%20Rahul%2C%20I%20saw%20your%20photography%20portfolio%20and%20would%20love%20to%20connect!",
  location: "Chennai, Tamil Nadu, India",
};

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Rahul — Chennai Street & Documentary Photography" },
      {
        name: "description",
        content:
          "Connect directly with Rahul for street photography assignments, editorial photo walks, prints, or creative collaborations across Chennai.",
      },
      { property: "og:title", content: "Contact Rahul — Chennai Photography" },
      {
        property: "og:description",
        content:
          "Connect directly with Rahul via Phone, WhatsApp, Email, or Instagram for photography assignments and prints in Chennai.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const featuredPhoto = photos.find((p) => p.slug === "fire-keeper") || photos[0]!;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    cameraSound.playDial();
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((curr) => (curr === key ? null : curr));
    }, 2200);
  };

  return (
    <div className="mx-auto max-w-7xl px-5 pb-28 pt-28 md:px-10 lg:pt-36">
      {/* 1. Editorial Header Section */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 font-mono text-xs text-primary">
          <span className="size-1.5 rounded-full bg-primary animate-pulse" />
          <span className="uppercase tracking-widest font-semibold">DIRECT COMMUNICATIONS</span>
          <span className="text-muted-foreground/40">·</span>
          <span className="text-muted-foreground uppercase tracking-wider">CHENNAI STUDIO</span>
        </div>

        <h1 className="mt-4 font-display text-5xl leading-[0.98] sm:text-6xl md:text-7xl lg:text-8xl text-foreground">
          Let’s make something <em className="text-primary not-italic">timeless</em>.
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Available for documentary assignments, editorial photo walks, archival prints, and
          creative commissions across Chennai. Reach out directly through your preferred channel
          below.
        </p>
      </div>

      {/* 2. The Three Main Contact Channels — Completely Unified in Styling & Proportions */}
      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Card 1: Phone & WhatsApp */}
        <div className="group relative flex flex-col justify-between rounded-sm border border-border/70 bg-card/50 p-6 shadow-print transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-card/80">
          <div>
            <div className="flex items-center justify-between border-b border-border/50 pb-4">
              <span className="font-mono text-[11px] tracking-widest text-primary font-semibold">
                01 / DIRECT LINE
              </span>
              <span className="flex size-8 items-center justify-center rounded-sm border border-border/70 bg-background text-primary">
                <Phone className="size-4" />
              </span>
            </div>

            <div className="mt-6">
              <span className="eyebrow block text-muted-foreground">Phone & WhatsApp</span>
              <a
                href={`tel:${CONTACT_INFO.rawPhone}`}
                className="mt-1.5 block font-mono text-xl font-semibold tracking-tight text-foreground transition-colors hover:text-primary sm:text-2xl"
              >
                {CONTACT_INFO.phone}
              </a>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                For urgent inquiries, direct phone conversations, and quick WhatsApp messaging.
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2 border-t border-border/50 pt-5">
            <a
              href={`tel:${CONTACT_INFO.rawPhone}`}
              className="flex-1 inline-flex h-9 items-center justify-center gap-1.5 rounded-sm border border-border bg-background px-3 font-mono text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <span>Call</span>
            </a>

            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex h-9 items-center justify-center gap-1.5 rounded-sm border border-primary/40 bg-primary/10 px-3 font-mono text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
            >
              <span>WhatsApp</span>
              <ArrowUpRight className="size-3" />
            </a>

            <button
              type="button"
              onClick={() => handleCopy(CONTACT_INFO.rawPhone, "phone")}
              title="Copy phone number"
              aria-label="Copy phone number"
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-sm border border-border bg-background text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            >
              {copiedKey === "phone" ? (
                <Check className="size-3.5 text-primary" />
              ) : (
                <Copy className="size-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Card 2: Email Inquiries */}
        <div className="group relative flex flex-col justify-between rounded-sm border border-border/70 bg-card/50 p-6 shadow-print transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-card/80">
          <div>
            <div className="flex items-center justify-between border-b border-border/50 pb-4">
              <span className="font-mono text-[11px] tracking-widest text-primary font-semibold">
                02 / ASSIGNMENTS
              </span>
              <span className="flex size-8 items-center justify-center rounded-sm border border-border/70 bg-background text-primary">
                <Mail className="size-4" />
              </span>
            </div>

            <div className="mt-6">
              <span className="eyebrow block text-muted-foreground">Email Address</span>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="mt-1.5 block font-mono text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-primary break-all"
              >
                {CONTACT_INFO.email}
              </a>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Best for project briefs, editorial assignments, press licensing, and print orders.
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2 border-t border-border/50 pt-5">
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="flex-1 inline-flex h-9 items-center justify-center gap-1.5 rounded-sm border border-primary/40 bg-primary/10 px-3 font-mono text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
            >
              <Mail className="size-3.5" />
              <span>Send Email</span>
              <ArrowUpRight className="size-3" />
            </a>

            <button
              type="button"
              onClick={() => handleCopy(CONTACT_INFO.email, "email")}
              title="Copy email address"
              aria-label="Copy email address"
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-sm border border-border bg-background text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            >
              {copiedKey === "email" ? (
                <Check className="size-3.5 text-primary" />
              ) : (
                <Copy className="size-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Card 3: Instagram Journal */}
        <div className="group relative flex flex-col justify-between rounded-sm border border-border/70 bg-card/50 p-6 shadow-print transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-card/80">
          <div>
            <div className="flex items-center justify-between border-b border-border/50 pb-4">
              <span className="font-mono text-[11px] tracking-widest text-primary font-semibold">
                03 / VISUAL JOURNAL
              </span>
              <span className="flex size-8 items-center justify-center rounded-sm border border-border/70 bg-background text-primary">
                <Instagram className="size-4" />
              </span>
            </div>

            <div className="mt-6">
              <span className="eyebrow block text-muted-foreground">Instagram Handle</span>
              <a
                href={CONTACT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 block font-mono text-xl font-semibold tracking-tight text-foreground transition-colors hover:text-primary sm:text-2xl"
              >
                @{CONTACT_INFO.instagram}
              </a>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Daily 35mm street reels, behind-the-lens fieldwork, and open Instagram DMs.
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2 border-t border-border/50 pt-5">
            <a
              href={CONTACT_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex h-9 items-center justify-center gap-1.5 rounded-sm border border-primary/40 bg-primary/10 px-3 font-mono text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
            >
              <Instagram className="size-3.5" />
              <span>View Profile</span>
              <ArrowUpRight className="size-3" />
            </a>

            <button
              type="button"
              onClick={() => handleCopy(`@${CONTACT_INFO.instagram}`, "instagram")}
              title="Copy Instagram handle"
              aria-label="Copy Instagram handle"
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-sm border border-border bg-background text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            >
              {copiedKey === "instagram" ? (
                <Check className="size-3.5 text-primary" />
              ) : (
                <Copy className="size-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3. "Something Missing" Section: Studio Commission Scope & Exhibition Print */}
      <div className="mt-16 grid gap-10 border-t border-border/70 pt-16 lg:grid-cols-12 lg:items-center">
        {/* Left: What We Can Work On Together */}
        <div className="lg:col-span-7">
          <span className="eyebrow text-primary">Collaboration & Services</span>
          <h2 className="mt-3 font-display text-3xl font-medium text-foreground sm:text-4xl md:text-5xl">
            Ways we can collaborate
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Whether for independent cultural projects, global publications, or personal collector
            prints, every engagement is approached with documentary integrity and human empathy.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-sm border border-border/50 bg-card/30 p-5">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-semibold uppercase tracking-wider">
                <Camera className="size-4" />
                <span>Documentary & Editorial</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                In-depth photo stories, press assignments, cultural archives, and on-location
                reportage across Tamil Nadu.
              </p>
            </div>

            <div className="rounded-sm border border-border/50 bg-card/30 p-5">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-semibold uppercase tracking-wider">
                <Compass className="size-4" />
                <span>Chennai Photo Walks</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Private, 1-on-1 dawn or twilight street photography walks through Kasimedu harbor,
                Mylapore, and the old markets.
              </p>
            </div>

            <div className="rounded-sm border border-border/50 bg-card/30 p-5">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-semibold uppercase tracking-wider">
                <Printer className="size-4" />
                <span>Fine Art Prints</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Signed, museum-grade archival pigment prints (Hahnemühle Photo Rag & Silver Gelatin
                baryta) for private collections.
              </p>
            </div>

            <div className="rounded-sm border border-border/50 bg-card/30 p-5">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="size-4" />
                <span>Creative Direction</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Visual identity storytelling, film color grading, and editorial curation for brands
                and independent publications.
              </p>
            </div>
          </div>

          {/* Studio Quick Meta */}
          <div className="mt-8 flex flex-wrap items-center gap-6 font-mono text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="size-3.5 text-primary" />
              <span>Chennai, Tamil Nadu, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="size-3.5 text-primary" />
              <span>Prompt response · IST (UTC +5:30)</span>
            </div>
          </div>
        </div>

        {/* Right: Exhibition Print Frame */}
        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-sm border border-border/70 bg-card/60 p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]">
            <div className="mb-3 flex items-center justify-between font-mono text-[10px] tracking-widest text-muted-foreground">
              <span className="text-primary font-semibold">STUDIO EXHIBITION PRINT</span>
              <span>CHENNAI · 35MM</span>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-black">
              <img
                src={featuredPhoto.src}
                alt={featuredPhoto.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />

              {/* Viewfinder Lens Framing */}
              <div className="pointer-events-none absolute inset-3">
                <span className="absolute left-0 top-0 h-4 w-4 border-l border-t border-white/70" />
                <span className="absolute right-0 top-0 h-4 w-4 border-r border-t border-white/70" />
                <span className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-white/70" />
                <span className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-white/70" />
              </div>

              {/* Bottom Quote Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5">
                <p className="font-display text-xl leading-snug text-white">
                  “My camera is my language. Chennai is my story. Photography is my forever love.”
                </p>
                <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-primary">
                  <span>— RAHUL</span>
                  <span className="text-white/70">KASIMEDU & NIGHT STREETS</span>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
              <span>LEICA M11 / FUJIFILM SYSTEM</span>
              <span className="text-primary">13.0827° N, 80.2707° E</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}