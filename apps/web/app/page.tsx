import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import LazySections from "@/components/LazySections";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main id="top" className="relative min-h-screen">
      <ScrollProgress />
      <Nav />
      <Hero />
      <Ticker />
      <LazySections />
    </main>
  );
}