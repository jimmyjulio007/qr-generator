import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Pro QR Generator | Professional Grade QR Codes",
    template: "%s | Pro QR Generator",
  },
  description: "Generate high-quality, customizable QR codes with logos, colors, and live preview. Export to PNG, SVG, and PDF. Best free QR code generator online.",
  keywords: [
    "QR code generator",
    "professional QR codes",
    "custom QR designer",
    "QR code with logo",
    "SVG QR code",
    "free QR generator",
    "QR code for business",
  ],
  authors: [{ name: "QR Flow Team" }],
  creator: "QR Flow",
  publisher: "QR Flow",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://qr-generator.pro"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pro QR Generator | Professional Grade QR Codes",
    description: "Create stunning, high-quality QR codes in seconds. Fully customizable colors, shapes, and logos.",
    url: "https://qr-generator.pro",
    siteName: "Pro QR Generator",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Pro QR Generator Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pro QR Generator | Professional Grade QR Codes",
    description: "Create stunning, high-quality QR codes in seconds. Fully customizable colors, shapes, and logos.",
    images: ["/twitter-image.png"],
    creator: "@qrflow",
  },
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
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#6366f1",
  width: "device-width",
  initialScale: 1,
};

import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Pro QR Generator",
              "description": "Professional grade QR code generator with high customization and export options.",
              "url": "https://qr-generator.pro",
              "applicationCategory": "Utility",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "Custom colors",
                "Logo integration",
                "Multiple export formats (PNG, SVG, PDF)",
                "Live preview",
                "QR History"
              ]
            })
          }}
        />
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
