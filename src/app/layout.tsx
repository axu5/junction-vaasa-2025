import { Navbar } from "@/components/navbar";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./providers";

import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PowerPulse • Veo",
  description:
    "Join PowerPulse to monitor every asset, coordinate field crews in real time and keep your power network running smoothly.",
  icons: {
    icon: "/veo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang='en'>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Providers>{children}</Providers>
          <Toaster />
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
