"use client";

import { useEffect, useRef } from "react";

type NetworkInformation = {
  effectiveType?: string;
  saveData?: boolean;
};

const warmedPdfs = new Set<string>();

function shouldConserveData() {
  const connection = (
    navigator as Navigator & { connection?: NetworkInformation }
  ).connection;

  return (
    connection?.saveData === true ||
    connection?.effectiveType === "slow-2g" ||
    connection?.effectiveType === "2g"
  );
}

export default function MediaWarmup({
  pdf,
  eager = false,
}: {
  pdf: string;
  eager?: boolean;
}) {
  const markerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) return;

    let timer: number | undefined;
    let observer: IntersectionObserver | undefined;

    const warm = () => {
      if (shouldConserveData()) return;

      const video = marker.closest("article")?.querySelector("video");
      if (video && video.preload !== "auto") {
        video.preload = "auto";
        if (video.paused && video.currentTime === 0 && video.readyState < 3) {
          video.load();
        }
      }

      if (!warmedPdfs.has(pdf)) {
        warmedPdfs.add(pdf);
        void fetch(pdf, { cache: "force-cache" }).catch(() => {
          warmedPdfs.delete(pdf);
        });
      }
    };

    if (eager) {
      timer = window.setTimeout(warm, 600);
    } else if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            warm();
            observer?.disconnect();
          }
        },
        { rootMargin: "800px 0px" },
      );
      observer.observe(marker);
    } else {
      timer = window.setTimeout(warm, 1200);
    }

    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
      observer?.disconnect();
    };
  }, [eager, pdf]);

  return (
    <span
      ref={markerRef}
      className="media-warmup"
      data-media-warmup={pdf}
      aria-hidden="true"
    />
  );
}
