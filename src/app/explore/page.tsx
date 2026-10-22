import type { Metadata } from "next";

import ExploreHero from "@/components/explore/explore-hero";
import OurJourney from "@/components/explore/our-journey";
import CoreValues from "@/components/explore/core-values";
import TechnologyMarquee from "@/components/explore/technology-marquee";
import ExploreTimeline from "@/components/explore/explore-timeline";

export const metadata: Metadata = {
  title: "Танилцах",
  description:
    "Математикийн үзүүлэн, сургалтын материалаас эхэлсэн Maka.mn-ийн түүх болон бидний үнэт зүйлстэй танилцана уу.",
};

export default function ExplorePage() {
  return (
    <main className="bg-white">
      <ExploreHero />

      <OurJourney />

      <CoreValues />

      <TechnologyMarquee />

      <ExploreTimeline />
    </main>
  );
}
