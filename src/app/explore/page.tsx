import type { Metadata } from "next";

import OurJourney from "@/components/explore/our-journey";
import CoreValues from "@/components/explore/core-values";
import ExploreTimeline from "@/components/explore/explore-timeline";
import TechnologyMarquee from "@/components/explore/technology-marquee";

export const metadata: Metadata = {
  title: "Танилцах",
  description:
    "SODTECH компанийн хөгжил, түүх болон үйл ажиллагаатай танилцана уу.",
};

export default function ExplorePage() {
  return (
    <main>
      <OurJourney />

      <CoreValues />

      <TechnologyMarquee />

      <ExploreTimeline />
    </main>
  );
}
