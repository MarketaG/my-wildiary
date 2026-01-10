import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import { Providers } from "./providers";
import TopNav from "../components/layout/TopNav";
import Footer from "@/components/layout/Footer";

import "./globals.css";

const font = Work_Sans({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Wildiary | Track Wildlife Observations, Notes & Sightings",
  description: "Track and share wildlife observations",
  icons: {
    icon: "/favicon.ico",
  },
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={`${font.variable}`}>
      <body>
        <Providers>
          <div className="h-screen flex flex-col">
            <TopNav />
            <main className="flex-1 overflow-hidden relative">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
