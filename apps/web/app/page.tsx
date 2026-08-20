import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Features from "@/components/Features";
import PinnedDemo from "@/components/PinnedDemo";
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
      <How />
      <Footer />
    </main>
  );
}