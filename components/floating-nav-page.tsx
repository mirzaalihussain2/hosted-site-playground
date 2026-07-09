"use client";

import { FloatingNav } from "./floating-nav";
import { ImageBackground } from "./image-background";
import { LoadingScreen } from "./loading-screen";
import { SiteReadyProvider } from "./site-ready-provider";
import { SiteShell } from "./site-shell";

/**
 * Playground page for the floating product chrome — a glass pill nav, a
 * "with / without mutual" toggle, and a translucent section overlay (see
 * `FloatingNav`) — layered over /4's bottom-anchored Copenhagen image and
 * pre-React loading gate.
 *
 * `showSiteText` controls the site header/bio text (via `SiteShell`):
 *  - /5 keeps it (so /5 == /4 plus the nav and mutual toggle);
 *  - /6 drops it (nav and toggle over a bare image).
 */
export function FloatingNavPage({
  showSiteText = true,
}: {
  showSiteText?: boolean;
}) {
  return (
    <SiteReadyProvider>
      <div className="relative h-dvh overflow-hidden">
        <ImageBackground
          image="/copenhagen_real/copenhagen_building_bottomcrop.png"
          anchor="bottom"
        />
        <LoadingScreen />
        {showSiteText && <SiteShell showThemeToggle={false} />}
        <FloatingNav />
      </div>
    </SiteReadyProvider>
  );
}
