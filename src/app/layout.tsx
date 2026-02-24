import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
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
  metadataBase: new URL('https://nris.com.bd'),
  verification: {
    google: 'gs4MaZrepPE3zf1N3dYgDYdz9S_UdnD90Mv4_EqNr-k',
  },
  title: {
    default: 'NR Intellectual Solution | Advanced Engineering Consultancy in Bangladesh',
    template: '%s | NR Intellectual Solution'
  },
  description: 'NR Intellectual Solution (NRIS) is Bangladesh\'s leading AEC consultancy specializing in Digital Twins, Structural Audits, BIM, and Sustainable Infrastructure Development in Dhaka.',
  keywords: ['NR Intellectual Solution', 'NRIS', 'Structural Engineering Bangladesh', 'Digital Twin Dhaka', 'BIM Consultancy Bangladesh', 'Structural Audit Savar', 'Civil Engineering Experts', 'Retrofitting Bangladesh', 'Architecture Dhaka', 'engineering consultancy Dhaka', 'structural audit Bangladesh', 'construction consultancy BD'],
  authors: [{ name: 'NR Intellectual Solution' }],
  creator: 'NR Intellectual Solution',
  alternates: {
    canonical: 'https://nris.com.bd',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nris.com.bd',
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
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "NR Intellectual Solution",
              "alternateName": "NRIS",
              "url": "https://nris.com.bd",
              "logo": "https://nris.com.bd/assets/brand/logo.jpeg",
              "image": "https://nris.com.bd/assets/brand/logo.jpeg",
              "telephone": "+880-1711-556677",
              "email": "projects@nrisbd.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Level 12, Crystal Palace, Road 140, Gulshan 1",
                "addressLocality": "Dhaka",
                "postalCode": "1212",
                "addressCountry": "BD"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 23.7808,
                "longitude": 90.4178
              },
              "areaServed": [
                { "@type": "Country", "name": "Bangladesh" }
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+880-1711-556677",
                "contactType": "customer service",
                "areaServed": "BD",
                "availableLanguage": ["en", "bn"]
              },
              "sameAs": [
                "https://www.linkedin.com/company/nrisbd",
                "https://twitter.com/nrisbd",
                "https://instagram.com/nrisbd"
              ],
              "description": "Bangladesh's leading AEC consultancy specializing in Structural Audits, BIM, Digital Twins, and Sustainable Infrastructure Development.",
              "priceRange": "$$",
              "knowsAbout": ["Structural Engineering", "BIM", "Digital Twins", "Environmental Impact Assessment", "Retrofitting", "Non-Destructive Testing"]
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
