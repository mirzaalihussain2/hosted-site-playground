"use client";

import { ImageBackground } from "./image-background";
import { LoadingScreen } from "./loading-screen";
import { SiteReadyProvider } from "./site-ready-provider";
import { SiteShell } from "./site-shell";

/**
 * A playground page identical to the main index page — same pre-React asset
 * loading, loading screen, and click-to-toggle text — except the animated
 * day/night video background is replaced by a single static image, and the
 * theme toggle is removed (so there is no day↔night rotation).
 */
export function ImagePage({ image }: { image: string }) {
  return (
    <SiteReadyProvider>
      <div className="relative h-dvh overflow-hidden">
        <ImageBackground image={image} />
        <LoadingScreen />
        <SiteShell showThemeToggle={false} />
      </div>
    </SiteReadyProvider>
  );
}
