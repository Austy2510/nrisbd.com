interface ServiceSchemaProps {
    name: string;
    description: string;
    url: string;
    provider?: string;
    areaServed?: string;
    serviceType?: string;
}

export function ServiceSchema({
    name,
    description,
    url,
    provider = "NR Intellectual Solution",
    areaServed = "Bangladesh",
    serviceType,
}: ServiceSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": name,
        "description": description,
        "url": url,
        "provider": {
            "@type": "ProfessionalService",
            "name": provider,
            "url": "https://nris.com.bd",
            "telephone": "+880-1711-556677",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Level 12, Crystal Palace, Road 140, Gulshan 1",
                "addressLocality": "Dhaka",
                "postalCode": "1212",
                "addressCountry": "BD"
            }
        },
        "areaServed": {
            "@type": "Country",
            "name": areaServed
        },
        ...(serviceType && { "serviceType": serviceType })
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
