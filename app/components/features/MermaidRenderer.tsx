"use client";
import { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: true,
  theme: "dark",
  securityLevel: "loose",
  themeVariables: {
    fontFamily: "var(--font-geist-sans)",
    primaryColor: "#1e293b",
    lineColor: "#334155", 
  }
});

export default function MermaidRenderer({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true, theme: "dark" });
    if (ref.current) {
      mermaid.run({ nodes: [ref.current] });
    }
  }, [chart]);

  return <div className="mermaid flex justify-center py-4" ref={ref}>{chart}</div>;
}