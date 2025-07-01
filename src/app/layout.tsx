import type { Metadata } from "next";
import { Roboto_Mono, Lexend_Deca } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const lexendDeca = Lexend_Deca({
  variable: "--font-lexend-deca",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cat-typing.vercel.app/"), // Set your domain here
  title: "Cat Typing",
  description: "Practice typing website",
  openGraph: {
    title: "Cat Typing",
    description: "Practice typing website",
    url: "/",
    siteName: "Cat Typing",
    images: [
      {
        url: "/assets/images/screenshot.png", // Will be resolved to absolute URL
        width: 1200,
        height: 600,
        alt: "screenshot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cat Typing",
    description: "Practice typing website",
    images: ["/assets/images/screenshot.png"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoMono.variable} ${lexendDeca.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
