import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "INFRAA — Construction Procurement Platform",
  description: "INFRAA helps construction professionals discover materials, connect with verified suppliers, and manage procurement workflows through a unified digital platform.",
  keywords: "construction procurement, material discovery, supplier network, BOQ management, RFQ, construction materials, Hyderabad",
  authors: [{ name: "INFRAA" }],
  openGraph: {
    title: "INFRAA — Construction Procurement Platform",
    description: "Discover materials, connect with verified suppliers, and streamline procurement workflows.",
    url: "https://infraa.in",
    siteName: "INFRAA",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
