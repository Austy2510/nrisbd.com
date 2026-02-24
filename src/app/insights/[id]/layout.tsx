import type { Metadata } from "next";
import insights from "@/data/insights.json";

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const article = insights.find((i) => i.id === id);

    if (!article) {
        return {
            title: "Article Not Found",
        };
    }

    return {
        title: `${article.title} - ${article.category}`,
        description: article.excerpt,
        keywords: [
            article.category,
            "engineering insights Bangladesh",
            "NRIS article",
            "construction technology",
        ],
        alternates: {
            canonical: `https://nris.com.bd/insights/${id}`,
        },
        openGraph: {
            title: `${article.title} | NR Intellectual Solution`,
            description: article.excerpt,
            url: `https://nris.com.bd/insights/${id}`,
            type: "article",
            publishedTime: article.date,
            authors: [article.author],
            images: article.image
                ? [{ url: article.image, alt: article.title }]
                : undefined,
        },
    };
}

export default function InsightDetailLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
