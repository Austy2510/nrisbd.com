import type { Metadata } from "next";
import projects from "@/data/projects.json";

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const project = projects.find((p) => p.id === id);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    return {
        title: `${project.title} - ${project.category} Project`,
        description: project.description,
        keywords: [
            project.category,
            project.location,
            "engineering project Bangladesh",
            "NRIS project",
        ],
        alternates: {
            canonical: `https://nris.com.bd/projects/${id}`,
        },
        openGraph: {
            title: `${project.title} | NR Intellectual Solution`,
            description: project.description,
            url: `https://nris.com.bd/projects/${id}`,
            images: project.image
                ? [{ url: project.image, alt: project.title }]
                : undefined,
        },
    };
}

export default function ProjectDetailLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
