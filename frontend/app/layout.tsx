import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "Fort Era Properties and Developers | Curated Properties. Trusted Guidance.",
  description: "Fort Era Properties and Developers – Lahore's premier boutique real estate advisory for discerning investors. Curated luxury properties in DHA, Bahria Town, and Gulberg.",
  keywords: "Fort Era, fort era properties, real estate, Lahore property, DHA Lahore, Bahria Town, Pakistan real estate, overseas investment, property developers",
  openGraph: {
    title: "Fort Era Properties and Developers",
    description: "Fort Era Properties and Developers – Lahore's premier boutique real estate advisory for discerning investors.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
