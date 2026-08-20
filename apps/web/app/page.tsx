import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Features from "@/components/Features";
import PinnedDemo from "@/components/PinnedDemo";
import Stats from "@/components/Stats";
import Pricing from "@/components/Pricing";
import Reliability from "@/components/Reliability";
import Faq from "@/components/Faq";
import How from "@/components/How";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main id="top" className="relative min-h-screen">
      <ScrollProgress />
      <Nav />
      <Hero />
      <Ticker />
      <Features />
      <PinnedDemo />
      <Stats />
      <Pricing />
      <Reliability />
      <Faq />
      <How />
      <Footer />
    </main>
  );
}