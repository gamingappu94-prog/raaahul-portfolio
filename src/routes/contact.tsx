import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Phone,
  Mail,
  Instagram,
  MessageCircle,
  Copy,
  Check,
  ArrowUpRight,
  MapPin,
  Clock,
  Sparkles,
  Camera,
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
      { title: "Contact Rahul — Chennai Street & Documentary Photographer" },
      {
        name: "description",
        content:
          "Connect directly with Rahul for street photography assignments, editorial photo walks, prints, or creative collaborations across Chennai.",
      },
      { property: "og:title", content: "Contact Rahul — Chennai Photographer" },
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
  const bg = photos.find((p) => p.slug === "golden-hour-talk") || photos[0]!;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    cameraSound.playDial();
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((curr) => (curr === key ? null : curr));
    }, 2200);
  };

  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 pt-28 md:px-10 lg:pt-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        {/* Left Column: Contact Header & Main Action Hub */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2">
            <span className="eyebrow text-primary">Direct Communication · Studio Rahul</span>
            <span className="text-muted-foreground/40">·</span>
            <span className="flex items-center gap-1 font-mono text-[11px] text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for Commissions
            </span>
          </div>

          <h1 className="mt-4 font-display text-5xl leading-[0.98] sm:text-6xl md:text-7xl">
            Let's connect & tell a <em className="text-primary not-italic">story</em>.
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Whether you want to discuss a documentary assignment, book an editorial photo walk,
            order fine art prints, or collaborate on a creative project in Chennai — reach out
            directly through any channel below.
          </p>

          {/* Main Contact Channels */}
          <div className="mt-10 space-y-4">
            {/* 1. Phone & WhatsApp Card */}
            <div className="group relative rounded-sm border border-border/80 bg-card/75 p-6 shadow-print transition-all duration-300 hover:border-primary/60 hover:bg-card">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-sm border border-border bg-background/80 text-primary">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="eyebrow text-primary">Phone & WhatsApp</span>
                      <span className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-primary">
                        Direct Line
                      </span>
                    </div>
                    <a
                      href={`tel:${CONTACT_INFO.rawPhone}`}
                      className="mt-1 block font-mono text-xl font-semibold tracking-wide text-foreground transition-colors hover:text-primary sm:text-2xl"
                    >
                      {CONTACT_INFO.phone}
                    </a>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Direct phone calls & WhatsApp messaging
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:self-center">
                  <a
                    href={`tel:${CONTACT_INFO.rawPhone}`}
                    className="inline-flex h-9 items-center gap-1.5 rounded-sm border border-border bg-background px-3 font-mono text-xs text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <Phone className="size-3.5" />
                    <span>Call</span>
                  </a>

                  <a
                    href={CONTACT_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center gap-1.5 rounded-sm border border-emerald-500/30 bg-emerald-500/10 px-3.5 font-mono text-xs font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20 hover:text-emerald-300"
                  >
                    <MessageCircle className="size-3.5" />
                    <span>WhatsApp</span>
                    <ArrowUpRight className="size-3 opacity-70" />
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopy(CONTACT_INFO.rawPhone, "phone")}
                    aria-label="Copy phone number"
                    title="Copy phone number"
                    className="inline-flex size-9 items-center justify-center rounded-sm border border-border bg-background text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                  >
                    {copiedKey === "phone" ? (
                      <Check className="size-4 text-primary" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Direct Email Card */}
            <div className="group relative rounded-sm border border-border/80 bg-card/75 p-6 shadow-print transition-all duration-300 hover:border-primary/60 hover:bg-card">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-sm border border-border bg-background/80 text-primary">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="eyebrow text-primary">Direct Email</span>
                      <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                        Assignments & Inquiries
                      </span>
                    </div>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="mt-1 block font-mono text-lg font-medium tracking-tight text-foreground transition-colors hover:text-primary sm:text-xl"
                    >
                      {CONTACT_INFO.email}
                    </a>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Best for briefs, editorial inquiries, and print licensing
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:self-center">
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="inline-flex h-9 items-center gap-1.5 rounded-sm border border-primary/50 bg-primary/10 px-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                  >
                    <Mail className="size-3.5" />
                    <span>Send Email</span>
                    <ArrowUpRight className="size-3" />
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopy(CONTACT_INFO.email, "email")}
                    aria-label="Copy email address"
                    title="Copy email address"
                    className="inline-flex size-9 items-center justify-center rounded-sm border border-border bg-background text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                  >
                    {copiedKey === "email" ? (
                      <Check className="size-4 text-primary" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Instagram Handle Card */}
            <div className="group relative rounded-sm border border-border/80 bg-card/75 p-6 shadow-print transition-all duration-300 hover:border-primary/60 hover:bg-card">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-sm border border-border bg-background/80 text-primary">
                    <Instagram className="size-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="eyebrow text-primary">Instagram</span>
                      <span className="rounded bg-rose-500/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-rose-400">
                        Visual Journal
                      </span>
                    </div>
                    <a
                      href={CONTACT_INFO.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block font-mono text-xl font-semibold text-foreground transition-colors hover:text-primary sm:text-2xl"
                    >
                      @{CONTACT_INFO.instagram}
                    </a>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Follow daily street reels, behind-the-scenes & direct messages
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:self-center">
                  <a
                    href={CONTACT_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center gap-1.5 rounded-sm border border-rose-500/40 bg-rose-500/10 px-3.5 font-mono text-xs font-medium text-rose-400 transition-colors hover:bg-rose-500/20 hover:text-rose-300"
                  >
                    <Instagram className="size-3.5" />
                    <span>View Profile</span>
                    <ArrowUpRight className="size-3 opacity-70" />
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopy(`@${CONTACT_INFO.instagram}`, "instagram")}
                    aria-label="Copy Instagram handle"
                    title="Copy Instagram handle"
                    className="inline-flex size-9 items-center justify-center rounded-sm border border-border bg-background text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                  >
                    {copiedKey === "instagram" ? (
                      <Check className="size-4 text-primary" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Studio & Collaboration Metadata */}
          <div className="mt-10 grid gap-4 border-t border-border/70 pt-8 sm:grid-cols-3">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="size-3.5 text-primary" />
                <span className="font-mono text-[10px] uppercase tracking-wider">Base of Operations</span>
              </div>
              <p className="font-medium text-foreground">Chennai, Tamil Nadu</p>
              <p className="text-xs text-muted-foreground">Kasimedu · Marina · Mylapore</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="size-3.5 text-primary" />
                <span className="font-mono text-[10px] uppercase tracking-wider">Response Time</span>
              </div>
              <p className="font-medium text-foreground">Prompt & Active</p>
              <p className="text-xs text-muted-foreground">Usually within a few hours</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Camera className="size-3.5 text-primary" />
                <span className="font-mono text-[10px] uppercase tracking-wider">Focus</span>
              </div>
              <p className="font-medium text-foreground">Street & Documentary</p>
              <p className="text-xs text-muted-foreground">Editorial · Portraits · Prints</p>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Atmosphere Plate with Camera Frame HUD */}
        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-sm border border-border/80 bg-card p-3 shadow-print">
            {/* Top Plate Info */}
            <div className="mb-3 flex items-center justify-between px-1 font-mono text-[10px] tracking-wider text-muted-foreground">
              <span className="text-primary font-semibold">PLATE · ARCHIVE 01</span>
              <span>CHENNAI STREETS</span>
            </div>

            {/* Photo Image */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-muted">
              <img
                src={bg.src}
                alt={bg.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />

              {/* Viewfinder Corner Overlays */}
              <div className="pointer-events-none absolute inset-3">
                <span className="absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-white/80" />
                <span className="absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2 border-white/80" />
                <span className="absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-white/80" />
                <span className="absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-white/80" />
              </div>

              {/* Bottom Scrim with Quote */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5">
                <p className="font-display text-xl leading-snug text-white">
                  “Every picture here comes with the human story behind the shutter.”
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-primary">
                  — Rahul · Chennai
                </p>
              </div>
            </div>

            {/* Bottom Plate Strip */}
            <div className="mt-3 flex items-center justify-between px-1 font-mono text-[10px] text-muted-foreground">
              <span>LEICA / FUJIFILM SYSTEM</span>
              <span className="text-primary">35MM FIXED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}