import React from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import type { Metadata } from "next";
import { DynaPuff, Nunito } from "next/font/google";
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
    default: "Whizkids Learning Center | Nurturing Young Minds",
    template: "%s | Whizkids Learning Center",
  },
  description: "Whizkids provides a playful and enriching environment for early childhood education, focusing on playgroup, nursery, and kindergarten programs.",
  metadataBase: new URL("https://whizkids.edu.in"), 
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
        <Header />
        <main>{children}</main>
        {/* Floating WhatsApp button — always visible, bottom-right corner */}
        <WhatsAppFloat />
        <Footer />
      </body>
    </html>
  );
}
