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
  description: 'NR Intellectual Solution (NRIS) is an autonomous multi-disciplinary consulting firm in Dhaka, Bangladesh. Established in 2018, specializing in Environmental Assessment, Feasibility Studies, Structural Design, Construction Supervision, and Renewable Energy across Power, Transportation, and Urban Infrastructure sectors.',
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

import { GlobalLoader } from "@/components/layout/GlobalLoader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground`}
      >
        <GoogleAnalytics />
        <GlobalLoader />
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
              "telephone": "+8801913965059",
              "email": "nris.bd71@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "House-14/7, Block-B, Babor Road, Mohammadpur",
                "addressLocality": "Dhaka",
                "postalCode": "1207",
                "addressCountry": "BD"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 23.7663,
                "longitude": 90.3633
              },
              "areaServed": [
                { "@type": "Country", "name": "Bangladesh" }
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+8801913965059",
                "contactType": "customer service",
                "areaServed": "BD",
                "availableLanguage": ["en", "bn"]
              },
              "sameAs": [
                "https://www.linkedin.com/company/nrisbd",
                "https://twitter.com/nrisbd",
                "https://instagram.com/nrisbd"
              ],
              "description": "Autonomous multi-disciplinary consulting firm providing sustainable infrastructure solutions from inception to completion. Specializing in Environmental Assessment, Feasibility Studies, Structural Design, and Construction Supervision across Power & Energy, Transportation, Water Resources, and Urban Infrastructure sectors.",
              "foundingDate": "2018",
              "priceRange": "$$",
              "knowsAbout": ["Environmental Impact Assessment", "Feasibility Studies", "Structural Design", "Construction Supervision", "Topographic Survey", "GIS Mapping", "Resettlement Action Plan", "Power & Energy", "Transportation", "Water Resources", "Urban Infrastructure", "BIM", "Solar Power"]
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
