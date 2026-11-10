export const categories = ["Market", "Coast", "Night", "Street", "Portrait"] as const;
export type Category = (typeof categories)[number];

export type Photo = {
  slug: string;
  title: string;
  src: string;
  width: number;
  height: number;
  category: Category;
  mono?: boolean;
  /** The short story told under the picture. */
  story: string;
};

const V = { width: 900, height: 1600 };

export const photos: Photo[] = [
  {
    slug: "fire-keeper",
    title: "The Fire Keeper",
    src: "/photos/fire-keeper.jpg",
    ...V,
    category: "Night",
    story:
      "Every evening she lights the same small fire and feeds it until the sparks start to dance. She doesn't look up for the camera — her eyes stay on the flame, because the fire is her livelihood. For a second the whole dark street seems to glow from her hands.",
  },
  {
    slug: "harbour-reflections",
    title: "Harbour Reflections",
    src: "/photos/harbour-reflections.jpg",
    width: 1413,
    height: 1600,
    category: "Coast",
    story:
      "The boats come in, the flags still fluttering, and the harbour turns into a second sky. Men untangle nets that will go back out tomorrow. In one shallow puddle, the whole working day is reflected upside down — painted boats, tired legs and a clear blue morning.",
  },
  {
    slug: "under-the-bulb",
    title: "Under the Bulb",
    src: "/photos/under-the-bulb.jpg",
    ...V,
    category: "Night",
    story:
      "One bare bulb, a sack of puffed rice and a smile that sells better than any sign. A payment QR code sits beside a steel plate — the old street and the new one, side by side. She has done this a thousand nights, and she still laughs with every customer.",
  },
  {
    slug: "waiting-by-the-sea",
    title: "Waiting by the Sea",
    src: "/photos/waiting-by-the-sea.jpg",
    ...V,
    category: "Portrait",
    story:
      "Flowers in her hair, turmeric and kumkum on her brow, a basket at her side. Behind her the beach is a blur of plastic chairs and colour, but she is perfectly still, looking somewhere past the waves. Some people wait for customers; she seems to be waiting for something only she can see.",
  },
  {
    slug: "fish-seller",
    title: "The Fish Seller",
    src: "/photos/fish-seller.jpg",
    ...V,
    category: "Portrait",
    story:
      "Rows of silver mackerel lie in front of her like a carefully laid floor. She counts her money in a black pouch, head bowed, ignoring the noise of carts and scooters behind her. The morning's work is almost done — and every fish in front of her is a small promise for home.",
  },
  {
    slug: "fish-seller-mono",
    title: "The Fish Seller, in Silver",
    src: "/photos/fish-seller-mono.jpg",
    ...V,
    category: "Portrait",
    mono: true,
    story:
      "Take away the colour and only the essentials remain: tired hands, a folded sari, and fish that shine like coins. In black and white she becomes timeless — she could be selling in this same spot today or fifty years ago. The market changes; women like her are why it keeps going.",
  },
  {
    slug: "fish-cart",
    title: "The Long Push",
    src: "/photos/fish-cart.jpg",
    ...V,
    category: "Market",
    story:
      "No face, just a back, a sweat-marked shirt and a cart heavy with the day's catch. He pushes it through the crowd one step at a time. This picture is for everyone whose work we eat but never see.",
  },
  {
    slug: "fish-cart-mono",
    title: "The Long Push, in Mono",
    src: "/photos/fish-cart-mono.jpg",
    ...V,
    category: "Market",
    mono: true,
    story:
      "In monochrome the cart feels even heavier. The fish turn into a river of silver, the shirt into a map of hard work. The man ahead looks back for a moment — the market never stops moving, and neither can he.",
  },
  {
    slug: "the-catch",
    title: "The Catch",
    src: "/photos/the-catch.jpg",
    ...V,
    category: "Market",
    story:
      "A trevally almost as long as his leg, held by the tail like a briefcase. He walks through the market without ceremony — for him it's just another fish, for the family who buys it, tonight's dinner. Big moments are often carried casually.",
  },
  {
    slug: "the-catch-mono",
    title: "The Catch, in Silver",
    src: "/photos/the-catch-mono.jpg",
    ...V,
    category: "Market",
    mono: true,
    story:
      "In black and white the fish's eye becomes the centre of the frame — still, wide open, looking straight back at us. It's a quiet reminder that every market starts with the sea, and the sea always gives something up.",
  },
  {
    slug: "morning-catch",
    title: "Morning Catch",
    src: "/photos/morning-catch.jpg",
    ...V,
    category: "Market",
    story:
      "Red snappers piled high in blue crates, still wet from the boat. The colours are the sea's own — coral against ocean blue. Within an hour, all of this will be gone, spread across a hundred kitchens in Chennai.",
  },
  {
    slug: "morning-catch-mono",
    title: "Morning Catch, in Mono",
    src: "/photos/morning-catch-mono.jpg",
    ...V,
    category: "Market",
    mono: true,
    story:
      "Without colour, the fish become pure texture — scales, fins and open mouths stacked like sculpture. It's the same crate, but it tells a harder story: of nets hauled before dawn and the quiet weight of a fisherman's night.",
  },
  {
    slug: "prawn-hands",
    title: "Hands That Sort",
    src: "/photos/prawn-hands.jpg",
    ...V,
    category: "Market",
    story:
      "Two hands sorting prawns into a plastic bag, quick and sure. You don't need to see the face to know the experience — the fingers know exactly how much a kilo feels like. This is skill that no one ever writes down.",
  },
  {
    slug: "prawn-hands-mono",
    title: "Hands That Sort, in Mono",
    src: "/photos/prawn-hands-mono.jpg",
    ...V,
    category: "Market",
    mono: true,
    story:
      "In black and white, the hands become the whole story. Every crease and vein shows years of the same motion, repeated every single morning. Work, done well, is its own kind of art.",
  },
  {
    slug: "steel-and-silver",
    title: "Steel & Silver",
    src: "/photos/steel-and-silver.jpg",
    ...V,
    category: "Market",
    story:
      "A battered steel drum in the front, a basket of fish behind it, and a flash of red from someone passing by. The market is full of these small still-lifes if you slow down long enough to see them.",
  },
  {
    slug: "steel-and-silver-mono",
    title: "Steel & Silver, in Mono",
    src: "/photos/steel-and-silver-mono.jpg",
    ...V,
    category: "Market",
    mono: true,
    story:
      "Light slides down the curve of the drum like water. Behind it, the fish wait their turn. Stripped to black and white, ordinary tools of trade look almost precious.",
  },
  {
    slug: "rigging",
    title: "Above the Deck",
    src: "/photos/rigging.jpg",
    ...V,
    category: "Coast",
    story:
      "Ropes, masts and a small Indian flag against a white sky. A fisherman leans over the edge, watching the shore like he's done since he was a boy. On the boat, everyone has a place — and his is always up top, keeping watch.",
  },
  {
    slug: "rigging-mono",
    title: "Above the Deck, in Mono",
    src: "/photos/rigging-mono.jpg",
    ...V,
    category: "Coast",
    mono: true,
    story:
      "In black and white the boat becomes a web of lines, and the man in the middle a silhouette. It looks less like a fishing boat and more like a stage — the sea is the audience, and the show runs every single day.",
  },
  {
    slug: "late-shift",
    title: "Late Shift",
    src: "/photos/late-shift.jpg",
    ...V,
    category: "Night",
    story:
      "Under a faded ice-cream umbrella, a vendor in a red shirt weighs out his goods on an old scale. The city is winding down, but his day isn't over. He looks up with a half smile — the kind you give when you're tired but still glad someone stopped by.",
  },
  {
    slug: "midnight-rider",
    title: "Midnight Rider",
    src: "/photos/welders-spark.jpg",
    width: 603,
    height: 1072,
    category: "Night",
    story:
      "A beach horse dressed for the night — yellow crown, blue harness and glowing LED feathers. By day it carries children along the sand; by night it becomes a little carnival on four legs. Its eye catches the light and, for a moment, it looks like it knows it's the star.",
  },
  {
    slug: "golden-hour-talk",
    title: "Golden Hour Talk",
    src: "/photos/golden-hour-talk.jpg",
    ...V,
    category: "Street",
    story:
      "Two men lean on a railing as the sun melts behind them, heads bent over a phone. Maybe it's a cricket score, maybe a family photo, maybe directions home. The sky puts on its best show and neither of them notices — which is exactly what makes it beautiful.",
  },
  {
    slug: "city-cruiser",
    title: "City Cruiser",
    src: "/photos/city-cruiser.jpg",
    ...V,
    category: "Street",
    story:
      "A black Range Rover glides down the evening road, headlights on, a TN plate gleaming. Behind it, ordinary shops and walkers carry on. Chennai is a city where luxury and everyday life share the same lane.",
  },
  {
    slug: "field-of-crosses",
    title: "Field of Crosses",
    src: "/photos/field-of-crosses.jpg",
    width: 1599,
    height: 899,
    category: "Street",
    story:
      "Hundreds of white crosses, names written by hand in Tamil and English, stretching across the sand. In the middle, one woman sits quietly with someone she has lost. Among so many names, grief is always personal.",
  },
  {
    slug: "two-strays",
    title: "Two Strays",
    src: "/photos/two-strays.jpg",
    width: 1600,
    height: 1069,
    category: "Street",
    story:
      "One proudly carries a plastic bag like a trophy; the other trots along to see what's inside. Their long shadows stretch across the empty road. The street belongs to everyone — and these two seem to know it best.",
  },
];

export const featuredSlugs = [
  "fire-keeper",
  "waiting-by-the-sea",
  "harbour-reflections",
  "under-the-bulb",
] as const;

export const featured: Photo[] = photos.filter((p) =>
  (featuredSlugs as readonly string[]).includes(p.slug),
);