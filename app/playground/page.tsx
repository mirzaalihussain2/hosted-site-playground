import Link from "next/link";

// Add a line here whenever you spin up a new /N test page.
const testPages = [
  { href: "/1", description: "Cropped image of Copenhagen, top-half crop." },
  { href: "/2", description: "Cropped image of Copenhagen, middle crop." },
  { href: "/3", description: "Cropped image of Copenhagen, middle-three crop." },
  { href: "/4", description: "Cropped image of Copenhagen, bottom crop." },
];

export default function Playground() {
  return (
    <main className="flex h-dvh flex-col gap-6 overflow-auto p-8">
      <h1 className="text-2xl">Playground</h1>
      <ul className="flex flex-col gap-3">
        {testPages.map(({ href, description }) => (
          <li key={href} className="flex flex-wrap gap-x-2">
            <Link
              href={href}
              className="font-medium underline underline-offset-4"
            >
              {href}
            </Link>
            <span className="text-foreground/70">— {description}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
