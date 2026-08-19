"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      ref={ref}
      style={{ scaleX }}
      className={`fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}