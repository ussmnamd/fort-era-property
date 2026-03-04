import PropertyDetailClient from './PropertyDetailClient';

// Generate static params for all property slugs
export function generateStaticParams() {
    return [
        { slug: '1-kanal-luxury-house-dha-phase-6' },
        { slug: '10-marla-plot-bahria-town-phase-8' },
        { slug: '2-kanal-farmhouse-bedian-road' },
        { slug: '500-sqft-commercial-gulberg' },
        { slug: '5-marla-modern-house-dha-phase-9' },
    ];
}

export default function PropertyPage({ params }: { params: { slug: string } }) {
    return <PropertyDetailClient slug={params.slug} />;
}
