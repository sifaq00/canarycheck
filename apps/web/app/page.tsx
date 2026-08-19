import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Features from "@/components/Features";
import How from "@/components/How";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="top" className="relative min-h-screen overflow-x-hidden">
      <Nav />
      <Hero />
      <Ticker />
      <Features />
      <How />
      <Footer />
    </main>
  );
}