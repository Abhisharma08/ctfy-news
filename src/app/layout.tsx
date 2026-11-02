import type { Metadata, Viewport } from "next";
import { Playfair_Display, Manrope, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FFFFFF",
};

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://contentify-tribute.vercel.app"),
  title: "Happy Birthday, Nirupam Sir | The Boss of One of a Kind",
  description:
    "A special birthday tribute celebrating Nirupam Sir: the legendary leadership, trackers, automation obsession and kindness behind Contentify.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  openGraph: {
    title: "Happy Birthday, Nirupam Sir | The Boss of One of a Kind",
    description:
      "A special birthday tribute celebrating Nirupam Sir: the legendary leadership, trackers, automation obsession and kindness behind Contentify.",
    url: "https://contentify.com",
    siteName: "Contentify Tributes",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Happy Birthday, Nirupam Sir - A Contentify Birthday Tribute",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Happy Birthday, Nirupam Sir | The Boss of One of a Kind",
    description:
      "A special birthday tribute celebrating Nirupam Sir: the legendary leadership, trackers, automation obsession and kindness behind Contentify.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${manrope.variable} ${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-paper text-ink antialiased selection:bg-gold-light selection:text-ink font-sans">
        {children}
      </body>
    </html>
  );
}
