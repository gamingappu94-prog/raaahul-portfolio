import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { photos } from "@/lib/photos";

// Placeholder — replace with Rahul's real email.
const EMAIL = "hello@rahulphotography.in";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Rahul — Chennai Photographer" },
      {
        name: "description",
        content: "Get in touch with Rahul for photo walks, portraits, prints or collaborations in Chennai.",
      },
      { property: "og:title", content: "Contact Rahul — Chennai Photographer" },
      {
        property: "og:description",
        content: "Get in touch with Rahul for photo walks, portraits, prints or collaborations in Chennai.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const bg = photos.find((p) => p.slug === "golden-hour-talk")!;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Hello from ${name || "your website"}`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="mx-auto grid max-w-7xl gap-16 px-5 pb-24 pt-32 md:px-10 lg:grid-cols-2">
      <div>
        <p className="eyebrow">Contact</p>
        <h1 className="mt-4 font-display text-6xl leading-none md:text-8xl">
          Let's tell a <em className="text-primary">story</em>.
        </h1>
        <p className="mt-6 max-w-md text-muted-foreground">
          For photo walks, portraits, prints or collaborations around Chennai — send a note and
          I'll get back to you.
        </p>

        <form onSubmit={onSubmit} className="mt-10 max-w-md space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Your name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <Button type="submit" size="lg">
            Send email
          </Button>
        </form>

        <div className="mt-12 space-y-1 text-sm">
          <span className="eyebrow block">Email</span>
          <a href={`mailto:${EMAIL}`} className="hover:text-primary">
            {EMAIL}
          </a>
        </div>
      </div>
      <img
        src={bg.src}
        alt={bg.title}
        loading="lazy"
        className="hidden max-h-[80vh] w-full object-cover shadow-print lg:block"
      />
    </section>
  );
}