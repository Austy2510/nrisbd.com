import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us - Engineering Consultation in Dhaka",
    description:
        "Schedule a consultation with NR Intellectual Solution's Principal Engineers. Based in Gulshan 1, Dhaka, we provide structural audits, BIM consultation, digital twins, and feasibility studies across Bangladesh.",
    keywords: [
        "contact NRIS",
        "engineering consultation Dhaka",
        "structural audit inquiry",
        "BIM consultation Bangladesh",
        "construction consultancy contact",
    ],
    alternates: {
        canonical: "https://nris.com.bd/contact",
    },
    openGraph: {
        title: "Contact NR Intellectual Solution",
        description:
            "Start the dialogue. Schedule a consultation with our Principal Engineers for your next infrastructure project.",
        url: "https://nris.com.bd/contact",
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
