import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// ==========================================
// SANITY CLIENT CONFIGURATION
// ==========================================

export const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-01',
    useCdn: process.env.NODE_ENV === 'production',
    token: process.env.SANITY_API_TOKEN,
});

// ==========================================
// IMAGE URL BUILDER
// ==========================================

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
    return builder.image(source);
}

// ==========================================
// SANITY GROQ QUERIES
// ==========================================

export const queries = {
    // Get all properties with optional filters
    allProperties: `*[_type == "property"] | order(_createdAt desc) {
        _id,
        title,
        slug,
        price,
        priceType,
        phase,
        propertyType,
        sizeValue,
        sizeUnit,
        bedrooms,
        bathrooms,
        description,
        investmentHighlights,
        status,
        featured,
        coordinates,
        seoTitle,
        seoDescription,
        "society": society->{
            _id,
            name,
            slug,
            overview,
            investmentInsight,
            familyInsight,
            averagePricePerMarla,
            appreciationPercent,
            mapEmbed,
            featured,
            seoTitle,
            seoDescription,
            "coverImage": coverImage.asset->{
                _id,
                url,
                metadata { dimensions { width, height } }
            }
        },
        "featuredImage": featuredImage.asset->{
            _id,
            url,
            metadata { dimensions { width, height } }
        },
        "gallery": gallery[].asset->{
            _id,
            url,
            metadata { dimensions { width, height } }
        },
        _createdAt,
        _updatedAt
    }`,

    // Get featured properties
    featuredProperties: `*[_type == "property" && featured == true] | order(_createdAt desc)[0...6] {
        _id,
        title,
        slug,
        price,
        priceType,
        phase,
        propertyType,
        sizeValue,
        sizeUnit,
        bedrooms,
        bathrooms,
        description,
        status,
        featured,
        "society": society->{ name, slug },
        "featuredImage": featuredImage.asset->{ url, metadata { dimensions { width, height } } },
        _createdAt
    }`,

    // Get single property by slug
    propertyBySlug: `*[_type == "property" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        price,
        priceType,
        phase,
        propertyType,
        sizeValue,
        sizeUnit,
        bedrooms,
        bathrooms,
        description,
        investmentHighlights,
        status,
        featured,
        coordinates,
        seoTitle,
        seoDescription,
        "society": society->{
            _id,
            name,
            slug,
            overview,
            investmentInsight,
            familyInsight,
            averagePricePerMarla,
            appreciationPercent,
            mapEmbed,
            featured,
            seoTitle,
            seoDescription,
            "coverImage": coverImage.asset->{ url, metadata { dimensions { width, height } } }
        },
        "featuredImage": featuredImage.asset->{ url, metadata { dimensions { width, height } } },
        "gallery": gallery[].asset->{ url, metadata { dimensions { width, height } } },
        _createdAt,
        _updatedAt
    }`,

    // Get all societies
    allSocieties: `*[_type == "society"] | order(name asc) {
        _id,
        name,
        slug,
        overview,
        investmentInsight,
        familyInsight,
        averagePricePerMarla,
        appreciationPercent,
        mapEmbed,
        featured,
        seoTitle,
        seoDescription,
        "coverImage": coverImage.asset->{ url, metadata { dimensions { width, height } } },
        "propertyCount": count(*[_type == "property" && references(^._id)]),
        _createdAt,
        _updatedAt
    }`,

    // Get featured societies
    featuredSocieties: `*[_type == "society" && featured == true] | order(name asc) {
        _id,
        name,
        slug,
        overview,
        featured,
        "coverImage": coverImage.asset->{ url, metadata { dimensions { width, height } } },
        "propertyCount": count(*[_type == "property" && references(^._id)])
    }`,

    // Get single society by slug
    societyBySlug: `*[_type == "society" && slug.current == $slug][0] {
        _id,
        name,
        slug,
        overview,
        investmentInsight,
        familyInsight,
        averagePricePerMarla,
        appreciationPercent,
        mapEmbed,
        featured,
        seoTitle,
        seoDescription,
        "coverImage": coverImage.asset->{ url, metadata { dimensions { width, height } } },
        "properties": *[_type == "property" && references(^._id)] | order(_createdAt desc) {
            _id,
            title,
            slug,
            price,
            priceType,
            phase,
            propertyType,
            sizeValue,
            sizeUnit,
            bedrooms,
            bathrooms,
            status,
            featured,
            "featuredImage": featuredImage.asset->{ url, metadata { dimensions { width, height } } }
        },
        _createdAt,
        _updatedAt
    }`,

    // Get testimonials
    allTestimonials: `*[_type == "testimonial"] | order(_createdAt desc) {
        _id,
        clientName,
        location,
        review,
        featured,
        "photo": photo.asset->{ url, metadata { dimensions { width, height } } },
        _createdAt
    }`,

    // Get featured testimonials
    featuredTestimonials: `*[_type == "testimonial" && featured == true] | order(_createdAt desc)[0...6] {
        _id,
        clientName,
        location,
        review,
        "photo": photo.asset->{ url, metadata { dimensions { width, height } } },
        _createdAt
    }`,

    // Get market insights
    marketInsights: `*[_type == "marketInsight"] | order(publishedAt desc) {
        _id,
        title,
        pricePerMarla,
        quarterlyChange,
        insight,
        publishedAt,
        "society": society->{ name, slug }
    }`,

    // Search properties
    searchProperties: `*[_type == "property" && [title, description, phase] match $searchTerm] | order(_createdAt desc) {
        _id,
        title,
        slug,
        price,
        priceType,
        phase,
        propertyType,
        sizeValue,
        sizeUnit,
        bedrooms,
        bathrooms,
        status,
        featured,
        "society": society->{ name, slug },
        "featuredImage": featuredImage.asset->{ url, metadata { dimensions { width, height } } },
        _createdAt
    }`,
};

// ==========================================
// TYPE MAPPING HELPERS (Sanity -> App Types)
// ==========================================

export function mapSanityImage(sanityImage: any): any {
    if (!sanityImage) return null;
    return {
        id: sanityImage._id,
        attributes: {
            url: sanityImage.url,
            name: sanityImage._id,
            width: sanityImage.metadata?.dimensions?.width || 0,
            height: sanityImage.metadata?.dimensions?.height || 0,
            formats: {},
        },
    };
}

export function mapSanityProperty(sanityProperty: any): any {
    if (!sanityProperty) return null;
    return {
        ...sanityProperty,
        id: sanityProperty._id,
        attributes: {
            ...sanityProperty,
            createdAt: sanityProperty._createdAt,
            updatedAt: sanityProperty._updatedAt,
            featuredImage: {
                data: mapSanityImage(sanityProperty.featuredImage),
            },
            gallery: {
                data: (sanityProperty.gallery || []).map(mapSanityImage).filter(Boolean),
            },
            society: {
                data: sanityProperty.society ? {
                    id: sanityProperty.society._id,
                    attributes: {
                        ...sanityProperty.society,
                        coverImage: {
                            data: mapSanityImage(sanityProperty.society.coverImage),
                        },
                    },
                } : null,
            },
        },
    };
}

export function mapSanitySociety(sanitySociety: any): any {
    if (!sanitySociety) return null;
    return {
        ...sanitySociety,
        id: sanitySociety._id,
        attributes: {
            ...sanitySociety,
            createdAt: sanitySociety._createdAt,
            updatedAt: sanitySociety._updatedAt,
            coverImage: {
                data: mapSanityImage(sanitySociety.coverImage),
            },
        },
    };
}

export function mapSanityTestimonial(sanityTestimonial: any): any {
    if (!sanityTestimonial) return null;
    return {
        ...sanityTestimonial,
        id: sanityTestimonial._id,
        attributes: {
            ...sanityTestimonial,
            createdAt: sanityTestimonial._createdAt,
            photo: {
                data: mapSanityImage(sanityTestimonial.photo),
            },
        },
    };
}

export function mapSanityMarketInsight(sanityInsight: any): any {
    if (!sanityInsight) return null;
    return {
        ...sanityInsight,
        id: sanityInsight._id,
        attributes: {
            ...sanityInsight,
            society: {
                data: sanityInsight.society ? {
                    id: sanityInsight.society._id,
                    attributes: sanityInsight.society,
                } : null,
            },
        },
    };
}
