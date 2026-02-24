import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us - Our Team & Engineering Expertise",
    description:
        "Meet the multidisciplinary experts behind NR Intellectual Solution. Established in 2022, NRIS provides sustainable infrastructure development solutions including Structural Audits, BIM, and Digital Twins in Bangladesh.",
    keywords: [
        "NRIS team",
        "engineering experts Bangladesh",
        "structural engineering Dhaka",
        "BIM consultants",
        "infrastructure development Bangladesh",
    ],
    alternates: {
        canonical: "https://nris.com.bd/about",
    },
    openGraph: {
        title: "About NR Intellectual Solution",
        description:
            "Meet the multidisciplinary engineering experts driving Bangladesh's digital construction renaissance.",
        url: "https://nris.com.bd/about",
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
