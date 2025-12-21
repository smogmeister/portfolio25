import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jan Brinkmann",
  description: "Personal portfolio of Jan, a product designer.",
  icons: {
    icon: "/favicon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=plus-jakarta-sans@400,500,600&f[]=zodiak@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-neutral-50 text-neutral-900">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
