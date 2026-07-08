import { HomePage } from "@/components/home-page";

// Identical to the index page (theme toggle, day/night rotation, loading gate),
// but sourcing the 4K assets from /public/hires instead of /public/original.
export default function Hires() {
  return <HomePage basePath="/hires" />;
}
