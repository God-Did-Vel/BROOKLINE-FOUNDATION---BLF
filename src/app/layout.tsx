import type { Metadata } from "next";
import "./globals.css";
import ClientLayoutWrapper from "@/components/layout/ClientLayoutWrapper";

export const metadata: Metadata = {
  title: "Brookline Foundation (BLF) | Building Strong Girls. Transforming Communities.",
  description: "Brookline Foundation (BLF) is a non-profit organization dedicated to empowering adolescent girls and young women, and building healthier communities through sustainable development initiatives.",
  keywords: "Brookline Foundation, BLF, NGO, girls education, women leadership, STEM academy, community health, economic empowerment, non-profit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="h-full text-navy bg-white selection:bg-gold/20">
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
