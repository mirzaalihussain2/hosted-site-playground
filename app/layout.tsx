import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const vercetti = localFont({
  src: "./fonts/Vercetti-Regular.woff2",
  variable: "--font-vercetti",
  weight: "400",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ben Piggin",
  description: "Personal website of Ben Piggin",
  icons: {
    icon: [
      { url: "/original/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/original/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/original/apple-touch-icon.png",
  },
  manifest: "/original/site.webmanifest",
};

const themeScript = `
(function () {
  try {
    document.documentElement.classList.remove("dark");
  } catch (_) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${vercetti.variable} ${vercetti.className} h-dvh select-none overflow-hidden antialiased`}
      suppressHydrationWarning
    >
      <body className="h-dvh overflow-hidden font-sans">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
