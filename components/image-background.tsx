/**
 * Full-bleed static image background for the playground pages.
 *
 * Mirrors the day-poster layer of the main site: a fixed, full-screen CSS
 * background sized `cover` and centered (with a slight right shift on mobile),
 * via the shared `.bg-layer-image` rules in `app/globals.css`.
 */
export function ImageBackground({ image }: { image: string }) {
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
