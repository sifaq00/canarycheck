"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

const STATS = [
  { value: 148_230, suffix: "+", label: "tokens scored on-chain" },
  { value: 2_847, suffix: "", label: "dev sells alerted in real time" },
  { value: 19_402, suffix: "", label: "AI rug reports generated" },
  { value: 96, suffix: "%", label: "of flags are correct" },
];

function Counter({ value, suffix, start }: { value: number; suffix: string; start: boolean }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf: number;
    const t0 = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / dur, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value]);

  return (
    <div className="font-display text-4xl font-bold text-white sm:text-5xl">
      {n.toLocaleString("en-US")}
      <span className="grad-text">{suffix}</span>
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative border-y border-white/10 bg-white/[0.02] py-16">
      <p className="mb-10 text-center font-mono text-xs uppercase tracking-widest text-cyan-400">
        — BY THE NUMBERS
      </p>
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} ref={ref} className="text-center">
            <Counter value={s.value} suffix={s.suffix} start={inView} />
            <div className="mt-2 font-mono text-xs uppercase tracking-widest text-slate-500">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}