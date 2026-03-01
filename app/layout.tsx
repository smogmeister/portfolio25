import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jan-brinkmann.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jan Brinkmann - Product Designer",
    template: "%s | Jan Brinkmann",
  },
  description: "Design Lead at Schaeffler medias. Creating human-centered products, design strategies, and delightful software backed by data.",
  keywords: [
    "design lead",
    "product designer",
    "UX designer",
    "design strategy",
    "Schaeffler",
    "B2B eCommerce",
    "user experience",
    "product design",
    "design system",
    "AI design",
    "data-driven design",
  ],
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
    images: [
      {
        url: `${siteUrl}/avatar.png`,
        width: 1200,
        height: 630,
        alt: "Jan Brinkmann - Product Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jan Brinkmann - Product Designer",
    description: "Design Lead at Schaeffler medias. Creating human-centered products, design strategies, and delightful software backed by data.",
    images: [`${siteUrl}/avatar.png`],
    creator: "@janbrinkmann",
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  other: {
    "geo.region": "global",
    "geo.placename": "Remote",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jan-brinkmann.com";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jan Brinkmann",
    jobTitle: "Design Lead",
    description: "Design Lead at Schaeffler medias. Creating human-centered products, design strategies, and delightful software backed by data.",
    url: siteUrl,
    image: `${siteUrl}/avatar.png`,
    sameAs: [
      "https://www.linkedin.com/in/jan-brinkmann-13a939181/",
      "mailto:jbrinkmann31@gmail.com",
    ],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=plus-jakarta-sans@400,500,600&f[]=zodiak@700&display=swap"
          rel="stylesheet"
        />
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
      </body>
    </html>
  );
}
