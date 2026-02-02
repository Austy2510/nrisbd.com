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
    default: 'NR Intellectual Solution | Advanced Engineering Consultancy',
    template: '%s | NR Intellectual Solution'
  },
  description: 'NR Intellectual Solution (NRIS) is Bangladesh\'s leading AEC consultancy. specializing in Digital Twins, Structural Audits, BIM, and Sustainable Infrastructure Development.',
  keywords: ['NR Intellectual Solution', 'NRIS', 'Structural Engineering Bangladesh', 'Digital Twin Dhaka', 'BIM Consultancy Bangladesh', 'Structural Audit Savar', 'Civil Engineering Experts', 'Retrofitting Bangladesh', 'Architecture Dhaka'],
  authors: [{ name: 'NR Intellectual Solution' }],
  creator: 'NR Intellectual Solution',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nrisbd.com',
    title: 'NR Intellectual Solution | Engineering Resilience',
    description: 'Bridging the gap between physics and code. We deploy Digital Twins to de-risk Bangladesh\'s most complex infrastructure.',
    siteName: 'NR Intellectual Solution',
    images: [
      {
        url: '/assets/brand/logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'NR Intellectual Solution Logo'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NR Intellectual Solution | Advanced Engineering',
    description: 'Redefining infrastructure with Digital Twins & Algorithmic Design.',
    images: ['/assets/brand/logo.jpeg'],
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
