import { FloatingNavPage } from "@/components/floating-nav-page";

// Playground /6: same as /5 but with the "Ben Piggin" header/bio text removed —
// just the floating nav, section overlay, and "with / without mutual" toggle
// over the bottom-crop image.
export default function Page() {
  return <FloatingNavPage showSiteText={false} />;
}
