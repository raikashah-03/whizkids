import Footer from "@/components/footer";
import Header from "@/components/header";
import { InquiryModalProvider } from "@/components/InquiryModalContext";
import InquiryModalRoot from "@/components/InquiryModalRoot";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import type { Metadata } from "next";
import { DynaPuff, Nunito } from "next/font/google";
import React from "react";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const dynaPuff = DynaPuff({
  variable: "--font-dynapuff",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Whizkids International Preschool Jayamahal | Nurturing Young Minds",
    template: "%s | Whizkids International Preschool Jayamahal",
  },
  description: "Whizkids International Preschool Jayamahal provides a playful and enriching environment for early childhood education, focusing on playgroup, nursery, and kindergarten programs.",
  keywords: [
    "preschool in jayamahal",
    "best playgroup near me",
    "nursery school bangalore",
    "kindergarten jayamahal",
    "early childhood education",
    "Whizkids International Preschool",
    "top preschools in jayamahal",
  ],
  metadataBase: new URL("https://whizkidsinternational.in"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
    shortcut: "/favicon/favicon.ico",
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: "Whizkids International Preschool Jayamahal",
    description: "Nurturing young minds through play, exploration, and structured learning.",
    url: "https://whizkidsinternational.in",
    siteName: "Whizkids International Preschool",
    images: [
      {
        url: "/images/home-page-screenshot.png",
        width: 1200,
        height: 630,
        alt: "Whizkids International Preschool Jayamahal",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Whizkids International Preschool Jayamahal",
    description: "Nurturing young minds through play, exploration, and structured learning.",
    images: ["/images/home-page-screenshot.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${dynaPuff.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <InquiryModalProvider>
          <Header />
          <main>{children}</main>
          {/* Global inquiry modal — opened via useInquiryModal() from anywhere */}
          <InquiryModalRoot />
          {/* Floating WhatsApp button — always visible, bottom-right corner */}
          <WhatsAppFloat />
          <Footer />
        </InquiryModalProvider>
      </body>
    </html>
  );
}
