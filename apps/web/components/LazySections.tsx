"use client";

import dynamic from "next/dynamic";
import LazySection from "./LazySection";

const LazyDisclaimer = dynamic(() => import("./Disclaimer"), { ssr: false });
const LazyInnovationTrio = dynamic(() => import("./InnovationTrio"), { ssr: false });
const LazyProblem = dynamic(() => import("./Problem"), { ssr: false });
const LazyPinnedDemo = dynamic(() => import("./PinnedDemo"), { ssr: false });
const LazyPlatformSelector = dynamic(() => import("./PlatformSelector"), { ssr: false });
const LazyFeatures = dynamic(() => import("./Features"), { ssr: false });
const LazyHow = dynamic(() => import("./How"), { ssr: false });
const LazyCommunityWall = dynamic(() => import("./CommunityWall"), { ssr: false });
const LazyCompare = dynamic(() => import("./Compare"), { ssr: false });
const LazyPricing = dynamic(() => import("./Pricing"), { ssr: false });
const LazyReliability = dynamic(() => import("./Reliability"), { ssr: false });
const LazyInstall = dynamic(() => import("./Install"), { ssr: false });
const LazyFaq = dynamic(() => import("./Faq"), { ssr: false });
const LazyCtaHorizon = dynamic(() => import("./CtaHorizon"), { ssr: false });
const LazyFooter = dynamic(() => import("./Footer"), { ssr: false });

export default function LazySections() {
  return (
    <>
      <LazySection><LazyDisclaimer /></LazySection>
      <LazySection><LazyInnovationTrio /></LazySection>
      <LazySection><LazyProblem /></LazySection>
      <LazySection><LazyPinnedDemo /></LazySection>
      <LazySection><LazyPlatformSelector /></LazySection>
      <LazySection><LazyFeatures /></LazySection>
      <LazySection><LazyHow /></LazySection>
      <LazySection><LazyCommunityWall /></LazySection>
      <LazySection><LazyCompare /></LazySection>
      <LazySection><LazyPricing /></LazySection>
      <LazySection><LazyReliability /></LazySection>
      <LazySection><LazyInstall /></LazySection>
      <LazySection><LazyFaq /></LazySection>
      <LazySection><LazyCtaHorizon /></LazySection>
      <LazySection><LazyFooter /></LazySection>
    </>
  );
}