import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE_URL } from "../data/portfolio";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Varad Joshi | Software Engineer, AI & GenAI",
    template: "%s | Varad Joshi",
  },
  description:
    "Varad Joshi builds intelligent systems and practical software across AI, Generative AI, automation, privacy and enterprise technology.",
  applicationName: "Varad Joshi Portfolio",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    url: "/",
    title: "Varad Joshi | Software Engineer, AI & GenAI",
    description:
      "Building intelligent systems and engineering real-world solutions.",
    firstName: "Varad",
    lastName: "Joshi",
    username: "Varad-Joshi",
    images: [{ url: "/photo/Profile.jpg", alt: "Varad Joshi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Varad Joshi | Software Engineer, AI & GenAI",
    description:
      "Building intelligent systems and engineering real-world solutions.",
    images: ["/photo/Profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  icons: {
    icon: "/image_2725b09a.jpg",
  },
};

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
        {children}
      </body>
    </html>
  );
}
