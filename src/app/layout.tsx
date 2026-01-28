import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nrisbd.com'),
  title: {
    default: 'NRIS BD | Advanced Engineering Consultancy',
    template: '%s | NRIS BD'
  },
  description: 'Redefining infrastructure with Digital Twins & Algorithmic Design. Bangladesh\'s premier engineering consultancy for high-rise, industrial, and infrastructure projects.',
  keywords: ['Structural Engineering', 'Digital Twin', 'Bangladesh', 'NRIS BD', 'Civil Engineering', 'Retrofitting', 'High-Rise Design', 'BIM'],
  authors: [{ name: 'NRIS BD' }],
  creator: 'NRIS BD',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nrisbd.com',
    title: 'NRIS BD | Engineering Resilience',
    description: 'Bridging the gap between physics and code. We deploy Digital Twins to de-risk Bangladesh\'s most complex infrastructure.',
    siteName: 'NRIS BD',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200&h=630', // Fallback OG Image
        width: 1200,
        height: 630,
        alt: 'NRIS BD Operations'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NRIS BD | Advanced Engineering',
    description: 'Redefining infrastructure with Digital Twins & Algorithmic Design.',
    images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200&h=630'],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
