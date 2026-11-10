import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { photos } from "@/lib/photos";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Rahul — Chennai Photographer" },
      {
        name: "description",
        content:
          "Rahul is a photographer documenting the soul of Chennai — its chaos, character, emotions and beauty.",
      },
      { property: "og:title", content: "About Rahul — Chennai Photographer" },
      {
        property: "og:description",
        content:
          "Rahul is a photographer documenting the soul of Chennai — its chaos, character, emotions and beauty.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const side = photos.find((p) => p.slug === "rigging")!;
  const side2 = photos.find((p) => p.slug === "the-catch-mono")!;

  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 pt-32 md:px-10">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow">About me</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.02] md:text-7xl">
            I'm Rahul, a photographer driven by an endless love for photography and an unbreakable
            connection with <em className="text-primary">Chennai</em>.
          </h1>

          <div className="mt-12 max-w-2xl space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              Photography is more than a passion to me — it's the way I see the world, feel its
              stories, and connect with moments that words cannot describe. Every frame I capture
              holds a little piece of my perspective, my emotions, and my love for the streets I
              walk through.
            </p>
            <p>
              Chennai is more than just a city to me. It's a feeling, a collection of stories, and
              an endless source of inspiration. From its crowded streets and quiet corners to its
              people, culture, and everyday moments, there's always something beautiful waiting to
              be discovered.
            </p>
            <p>
              Through my lens, I want to document the soul of Chennai — its chaos, character,
              emotions, and beauty — one frame at a time.
            </p>
          </div>

          <p className="mt-12 font-display text-3xl leading-snug text-foreground md:text-4xl">
            My camera is my language. Chennai is my story. Photography is my forever love.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link to="/work">See the stories</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">Get in touch</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 self-start lg:col-span-5 lg:sticky lg:top-28">
          <img
            src={side.src}
            alt={side.title}
            loading="lazy"
            className="aspect-[3/5] w-full object-cover shadow-print"
          />
          <img
            src={side2.src}
            alt={side2.title}
            loading="lazy"
            className="mt-16 aspect-[3/5] w-full object-cover shadow-print"
          />
        </div>
      </div>
    </section>
  );
}