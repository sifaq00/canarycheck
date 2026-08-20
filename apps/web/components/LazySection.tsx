"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

export default function LazySection({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            setShow(true);
            io.disconnect();
          }
        },
        { rootMargin: "500px 0px" }
      );
      io.observe(el);
      return () => io.disconnect();
    }
    setShow(true);
  }, []);

  return <div ref={ref}>{show ? children : null}</div>;
}