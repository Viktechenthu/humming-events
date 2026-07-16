"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export type GalleryItem = { src: string; alt: string; caption: string };

export default function Gallery({ items: defaults }: { items: GalleryItem[] }) {
  const [items, setItems] = useState<GalleryItem[]>(defaults);
  const [active, setActive] = useState<number | null>(null);

  // Photos uploaded via /admin (Vercel Blob) replace the built-in set.
  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((j) => {
        if (Array.isArray(j.photos) && j.photos.length > 0) {
          setItems(
            j.photos.map((p: { src: string; caption: string }) => ({
              src: p.src,
              alt: p.caption || "Humming Events gallery photo",
              caption: p.caption || "Humming Events",
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close, step]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {items.map((item, i) => (
          <button
            key={item.src}
            onClick={() => setActive(i)}
            className={`group relative block w-full overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-gold ${
              i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-[4/3]" : "aspect-[4/3]"
            }`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            <span className="absolute bottom-3 left-3 right-3 text-left text-sm font-medium text-white opacity-0 transition group-hover:opacity-100">
              {item.caption}
            </span>
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          onClick={close}
        >
          <button
            aria-label="Close"
            className="absolute right-5 top-5 text-3xl text-white/80 hover:text-white"
            onClick={close}
          >
            ×
          </button>
          <button
            aria-label="Previous"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
          >
            ‹
          </button>
          <figure
            className="max-h-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={items[active].src}
              alt={items[active].alt}
              className="max-h-[80vh] w-auto rounded-lg object-contain"
            />
            <figcaption className="mt-3 text-center text-sm text-white/80">
              {items[active].caption}
            </figcaption>
          </figure>
          <button
            aria-label="Next"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
