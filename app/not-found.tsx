import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <main className="min-h-screen w-full bg-background flex flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-foreground text-2xl font-[family-name:var(--font-zodiak)]">Page not found</h1>
      <p className="text-muted-foreground text-base">This page doesn&apos;t exist (anymore).</p>
      <Link href="/" className="text-foreground underline underline-offset-4">
        Back to the portfolio
      </Link>
    </main>
  );
}
