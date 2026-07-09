"use client";

import { FloatingNav } from "./floating-nav";
import { ImageBackground } from "./image-background";
import { LoadingScreen } from "./loading-screen";
import { SiteReadyProvider } from "./site-ready-provider";
import { SiteShell } from "./site-shell";

/**
 * Playground page /5: identical to /4 (bottom-anchored Copenhagen image, same
 * pre-React loading and click-to-toggle text) with an added product-style
 * chrome layered on top — a floating glass pill nav, a "with / without mutual"
 * toggle, and a translucent section overlay (see `FloatingNav`).
 */
export function FloatingNavPage() {
  return (
    <SiteReadyProvider>
      <div className="relative h-dvh overflow-hidden">
        <ImageBackground
          image="/copenhagen_real/copenhagen_building_bottomcrop.png"
          anchor="bottom"
        />
        <LoadingScreen />
        <SiteShell showThemeToggle={false} />
        <FloatingNav />
      </div>
    </SiteReadyProvider>
  );
}
