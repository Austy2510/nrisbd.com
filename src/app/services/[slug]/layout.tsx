import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Structural Audit Services - Forensic Engineering & NDT",
    description:
        "Comprehensive structural audit services by NR Intellectual Solution. Forensic engineering, Non-Destructive Testing (NDT), seismic assessment, and condition surveys for commercial and industrial buildings in Bangladesh.",
    keywords: [
        "structural audit Dhaka",
        "forensic engineering Bangladesh",
        "NDT testing",
        "building inspection",
        "seismic assessment Bangladesh",
    ],
    alternates: {
        canonical: "https://nris.com.bd/services/structural-audit",
    },
    openGraph: {
        title: "Structural Audit Services | NR Intellectual Solution",
        description:
            "Precision diagnostics for critical infrastructure through data-driven forensic engineering.",
        url: "https://nris.com.bd/services/structural-audit",
    },
};

export default function ServiceDetailLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
