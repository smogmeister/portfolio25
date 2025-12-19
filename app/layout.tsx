import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio of Jan – product designer.",
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
      </body>
    </html>
  );
}
