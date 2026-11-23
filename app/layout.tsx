import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";

const jakarta = localFont({
  src: [
    { path: "./fonts/plus-jakarta-sans-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/plus-jakarta-sans-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/plus-jakarta-sans-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-jakarta",
  display: "swap",
});

const zodiak = localFont({
  src: [{ path: "./fonts/zodiak-700.woff2", weight: "700", style: "normal" }],
  variable: "--font-zodiak",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.jan-brinkmann.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jan Brinkmann - Product Designer",
    template: "%s | Jan Brinkmann",
  },
  description: "Design Lead at Schaeffler medias. Creating human-centered products, design strategies, and delightful software backed by data.",
  authors: [{ name: "Jan Brinkmann" }],
  creator: "Jan Brinkmann",
  publisher: "Jan Brinkmann",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Jan Brinkmann Portfolio",
    title: "Jan Brinkmann - Product Designer",
    description: "Design Lead at Schaeffler medias. Creating human-centered products, design strategies, and delightful software backed by data.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jan Brinkmann - Product Designer",
    description: "Design Lead at Schaeffler medias. Creating human-centered products, design strategies, and delightful software backed by data.",
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/icon-48.png",
    shortcut: "/icon-48.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.jan-brinkmann.com";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jan Brinkmann",
    jobTitle: "Design Lead",
    description: "Design Lead at Schaeffler medias. Creating human-centered products, design strategies, and delightful software backed by data.",
    url: siteUrl,
    image: `${siteUrl}/avatar.jpg`,
    sameAs: [
      "https://www.linkedin.com/in/jan-brinkmann-13a939181/",
    ],
    email: "mailto:jbrinkmann31@gmail.com",
    worksFor: {
      "@type": "Organization",
      name: "Schaeffler",
      url: "https://medias.schaeffler.com",
    },
    knowsAbout: [
      "Product Design",
      "UX Design",
      "Design Strategy",
      "Design Systems",
      "AI Design",
      "Data-Driven Design",
      "B2B eCommerce",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Jan Brinkmann Portfolio",
    url: siteUrl,
    description: "Design Lead at Schaeffler medias. Creating human-centered products, design strategies, and delightful software backed by data.",
    author: {
      "@type": "Person",
      name: "Jan Brinkmann",
    },
  };

  return (
    <html lang="en" className={`${jakarta.variable} ${zodiak.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // DARK MODE DISABLED: Always use light theme
                // const storedTheme = localStorage.getItem('theme');
                // const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                // const theme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
                const theme = 'light'; // Force light theme
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased bg-background text-foreground">
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
