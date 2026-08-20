import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Disclaimer from "@/components/Disclaimer";
import InnovationTrio from "@/components/InnovationTrio";
import Problem from "@/components/Problem";
import PinnedDemo from "@/components/PinnedDemo";
import PlatformSelector from "@/components/PlatformSelector";
import Features from "@/components/Features";
import How from "@/components/How";
import CommunityWall from "@/components/CommunityWall";
import Compare from "@/components/Compare";
import Pricing from "@/components/Pricing";
import Reliability from "@/components/Reliability";
import Install from "@/components/Install";
import Faq from "@/components/Faq";
import CtaHorizon from "@/components/CtaHorizon";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main id="top" className="relative min-h-screen">
      <ScrollProgress />
      <Nav />
      <Hero />
      <Ticker />
      <Disclaimer />
      <InnovationTrio />
      <Problem />
      <PinnedDemo />
      <PlatformSelector />
      <Features />
      <How />
      <CommunityWall />
      <Compare />
      <Pricing />
      <Reliability />
      <Install />
      <Faq />
      <CtaHorizon />
      <Footer />
    </main>
  );
}