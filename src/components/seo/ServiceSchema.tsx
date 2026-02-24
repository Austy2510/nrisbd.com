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
            "telephone": "+8801913965059",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "31/1, 1st Floor, East Rajabazar, Amtala, Farmgate",
                "addressLocality": "Dhaka",
                "postalCode": "1215",
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
