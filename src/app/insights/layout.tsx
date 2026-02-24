import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Engineering Insights - Industry Intelligence & Technical Analysis",
    description:
        "Deep dives into the technical trends defining infrastructure in Bangladesh. Read expert analysis on Digital Twins, Structural Engineering, BIM, Seismic Retrofitting, and more from NR Intellectual Solution.",
    keywords: [
        "engineering insights Bangladesh",
        "structural engineering articles",
        "digital twin analysis",
        "BIM trends",
        "construction technology Bangladesh",
        "seismic retrofitting guide",
    ],
    alternates: {
        canonical: "https://nris.com.bd/insights",
    },
    openGraph: {
        title: "Engineering Insights | NR Intellectual Solution",
        description:
            "Deep dives into the technical trends defining infrastructure in Bangladesh and beyond.",
        url: "https://nris.com.bd/insights",
    },
};

export default function InsightsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
