"use client";

import { useEffect } from "react";
import { preload } from "react-dom";
import { useSiteReady } from "./site-ready-provider";

/**
 * Full-bleed static image background for the playground pages.
 *
 * Plays the same role as `ThemeBackground` on the main page, minus the videos
 * and theme switching:
 *  - preloads the image (`preload`) so the browser starts fetching it from the
 *    initial HTML, before React hydrates — mirroring the `<link rel="preload">`
 *    hints in `app/layout.tsx`;
 *  - flips the site to "ready" once the image has loaded, which dismisses the
 *    loading screen and reveals the text — mirroring how `ThemeBackground`
 *    waits for its videos.
 *
 * Rendering reuses the shared `.bg-layer-image` rules in `app/globals.css`
 * (full-bleed, `cover`, centered, with a slight right shift on mobile).
 */
export function ImageBackground({ image }: { image: string }) {
  const { setSiteReady } = useSiteReady();

  // Emitted into the document head from the initial render, before hydration.
  preload(image, { as: "image" });

  useEffect(() => {
    const img = new Image();
    img.src = image;

    if (img.complete) {
      setSiteReady(true);
      return;
    }

    const markReady = () => setSiteReady(true);
    img.addEventListener("load", markReady);
    img.addEventListener("error", markReady); // fail open — don't hang on a bad URL
    return () => {
      img.removeEventListener("load", markReady);
      img.removeEventListener("error", markReady);
    };
  }, [image, setSiteReady]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black"
    >
      <div
        className="bg-layer-image"
        style={{ backgroundImage: `url(${image})` }}
      />
    </div>
  );
}
