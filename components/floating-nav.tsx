"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { X } from "react-feather";
import { useSiteReady } from "./site-ready-provider";

type SectionId = "home" | "how-it-works" | "the-team" | "join-waitlist";

const sections: { id: SectionId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "how-it-works", label: "How it works" },
  { id: "the-team", label: "The team" },
  { id: "join-waitlist", label: "Join waitlist" },
];

// Placeholder copy — every section shows the same two lorem paragraphs for now.
const loremParagraphs = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
];

const spring = {
  type: "spring" as const,
  stiffness: 280,
  damping: 32,
  mass: 0.9,
};

const glassClass =
  "border border-white/20 bg-white/10 shadow-lg backdrop-blur-md";

/**
 * Product chrome for the /5 playground page: a floating glass pill nav, a
 * "with / without mutual" toggle (visual only, no effect yet), and a
 * translucent section overlay. Appearance is gated on `isSiteReady` and
 * animated in, mirroring the reveal pattern the rest of the site uses.
 */
export function FloatingNav() {
  const { isSiteReady } = useSiteReady();
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const [withMutual, setWithMutual] = useState(true);

  // Dismiss the section overlay with Escape.
  useEffect(() => {
    if (!activeSection) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveSection(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeSection]);

  const activeLabel = sections.find((section) => section.id === activeSection)
    ?.label;

  return (
    <>
      {/* Floating pill nav — top center */}
      <AnimatePresence>
        {isSiteReady && (
          <motion.nav
            key="floating-nav"
            aria-label="Primary"
            className="pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center px-4 sm:top-8"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={spring}
          >
            <ul
              className={`pointer-events-auto flex items-center gap-1 rounded-full p-1.5 ${glassClass}`}
            >
              {sections.map((section) => {
                const isActive = section.id === activeSection;
                return (
                  <li key={section.id}>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveSection((current) =>
                          current === section.id ? null : section.id,
                        )
                      }
                      aria-haspopup="dialog"
                      aria-expanded={isActive}
                      className={`rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors duration-100 sm:px-4 sm:text-base ${
                        isActive
                          ? "bg-white/25 text-white"
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      {section.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* "with / without mutual" toggle — top right (no effect yet) */}
      <AnimatePresence>
        {isSiteReady && (
          <motion.div
            key="mutual-toggle"
            className="pointer-events-none fixed top-4 right-4 z-40 sm:top-8 sm:right-8"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={spring}
          >
            <div
              role="group"
              aria-label="Mutual mode"
              className={`pointer-events-auto flex items-center rounded-full p-1 ${glassClass}`}
            >
              {[
                { value: true, label: "with mutual" },
                { value: false, label: "without mutual" },
              ].map(({ value, label }) => {
                const isActive = withMutual === value;
                return (
                  <button
                    key={label}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setWithMutual(value)}
                    className={`rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors duration-100 sm:text-sm ${
                      isActive
                        ? "bg-white/25 text-white"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section overlay — translucent white sheen over the whole page */}
      <AnimatePresence>
        {activeSection && (
          <motion.div
            key="section-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="section-overlay-heading"
            className="fixed inset-0 z-30 flex items-center justify-center overflow-y-auto bg-white/70 px-6 py-16 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => setActiveSection(null)}
          >
            <div
              className="w-full max-w-xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <h2
                  id="section-overlay-heading"
                  className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
                >
                  {activeLabel}
                </h2>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setActiveSection(null)}
                  className="shrink-0 rounded-full p-1 text-foreground/60 transition-colors duration-100 hover:text-foreground"
                >
                  <X className="size-6" aria-hidden />
                </button>
              </div>
              <div className="flex flex-col gap-4 text-base leading-relaxed text-foreground/80 sm:text-lg">
                {loremParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
