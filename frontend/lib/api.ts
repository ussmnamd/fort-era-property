import {
    StrapiResponse,
    StrapiSingleResponse,
    Property,
    Society,
    Testimonial,
    MarketInsight,
    Lead,
    PropertyFilters,
    SortOption,
} from './types';
import { sanityClient, queries, mapSanityProperty, mapSanitySociety, mapSanityTestimonial, mapSanityMarketInsight } from './sanity';

// ==========================================
// SANITY API IMPLEMENTATION
// ==========================================

// Helper to convert Sanity data to Strapi-like response format
function toStrapiResponse<T>(data: any[], total?: number): StrapiResponse<T> {
    return {
        data: data.map((item, index) => ({
            id: item._id || index,
            attributes: item,
        })),
        meta: {
            pagination: total !== undefined ? {
                page: 1,
                pageSize: data.length,
                pageCount: 1,
                total: total,
            } : undefined,
        },
    };
}

function toStrapiSingleResponse<T>(data: any): StrapiSingleResponse<T> {
    return {
        data: {
            id: data._id,
            attributes: data,
        },
        meta: {},
    };
}

// ==========================================
// PROPERTY API
// ==========================================

export async function getProperties(
    filters?: PropertyFilters,
    sort?: SortOption,
    page = 1,
    pageSize = 12
): Promise<StrapiResponse<Property>> {
    // Build GROQ query with filters
    let query = `*[_type == "property"`;
    const params: Record<string, any> = {};

    // Add filters
    if (filters?.society?.length) {
        query += ` && society->slug.current in $societies`;
        params.societies = filters.society;
    }

    if (filters?.propertyType?.length) {
        query += ` && propertyType in $propertyTypes`;
        params.propertyTypes = filters.propertyType;
    }

    if (filters?.phase) {
        query += ` && phase match $phase`;
        params.phase = `*${filters.phase}*`;
    }

    if (filters?.minPrice !== undefined) {
        query += ` && price >= $minPrice`;
        params.minPrice = filters.minPrice;
    }

    if (filters?.maxPrice !== undefined) {
        query += ` && price <= $maxPrice`;
        params.maxPrice = filters.maxPrice;
    }

    if (filters?.minSize !== undefined) {
        query += ` && sizeValue >= $minSize`;
        params.minSize = filters.minSize;
    }

    if (filters?.maxSize !== undefined) {
        query += ` && sizeValue <= $maxSize`;
        params.maxSize = filters.maxSize;
    }

    if (filters?.bedrooms) {
        query += ` && bedrooms == $bedrooms`;
        params.bedrooms = filters.bedrooms;
    }

    if (filters?.status) {
        query += ` && status == $status`;
        params.status = filters.status;
    }

    query += `]`;

    // Add sorting
    if (sort === 'price-asc') {
        query += ` | order(price asc)`;
    } else if (sort === 'price-desc') {
        query += ` | order(price desc)`;
    } else {
        query += ` | order(_createdAt desc)`;
    }

    // Add pagination
    const start = (page - 1) * pageSize;
    query += ` [${start}...${start + pageSize}]`;

    // Add projection
    query += ` {
        _id,
        title,
        "slug": slug.current,
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
            "slug": slug.current,
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
    }`;

    const results = await sanityClient.fetch(query, params);
    return toStrapiResponse<Property>(results);
}

export async function getFeaturedProperties(limit = 8): Promise<StrapiResponse<Property>> {
    const query = `*[_type == "property" && featured == true && status == "available"] | order(_createdAt desc)[0...$limit] {
        _id,
        title,
        "slug": slug.current,
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
        "society": society->{ name, "slug": slug.current },
        "featuredImage": featuredImage.asset->{ url, metadata { dimensions { width, height } } },
        _createdAt
    }`;

    const results = await sanityClient.fetch(query, { limit });
    return toStrapiResponse<Property>(results);
}

export async function getPropertyBySlug(slug: string): Promise<StrapiSingleResponse<Property>> {
    const query = `*[_type == "property" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
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
            "slug": slug.current,
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
    }`;

    const result = await sanityClient.fetch(query, { slug });

    if (!result) {
        throw new Error('Property not found');
    }

    return toStrapiSingleResponse<Property>(result);
}

// ==========================================
// SOCIETY API
// ==========================================

export async function getSocieties(): Promise<StrapiResponse<Society>> {
    const query = `*[_type == "society"] | order(name asc) {
        _id,
        name,
        "slug": slug.current,
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
    }`;

    const results = await sanityClient.fetch(query);
    return toStrapiResponse<Society>(results);
}

export async function getFeaturedSocieties(limit = 6): Promise<StrapiResponse<Society>> {
    const query = `*[_type == "society" && featured == true] | order(name asc)[0...$limit] {
        _id,
        name,
        "slug": slug.current,
        overview,
        featured,
        "coverImage": coverImage.asset->{ url, metadata { dimensions { width, height } } },
        "propertyCount": count(*[_type == "property" && references(^._id)])
    }`;

    const results = await sanityClient.fetch(query, { limit });
    return toStrapiResponse<Society>(results);
}

export async function getSocietyBySlug(slug: string): Promise<StrapiSingleResponse<Society>> {
    const query = `*[_type == "society" && slug.current == $slug][0] {
        _id,
        name,
        "slug": slug.current,
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
            "slug": slug.current,
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
    }`;

    const result = await sanityClient.fetch(query, { slug });

    if (!result) {
        throw new Error('Society not found');
    }

    return toStrapiSingleResponse<Society>(result);
}

// ==========================================
// TESTIMONIAL API
// ==========================================

export async function getTestimonials(): Promise<StrapiResponse<Testimonial>> {
    const query = `*[_type == "testimonial"] | order(_createdAt desc) {
        _id,
        clientName,
        location,
        review,
        featured,
        "photo": photo.asset->{ url, metadata { dimensions { width, height } } },
        _createdAt
    }`;

    const results = await sanityClient.fetch(query);
    return toStrapiResponse<Testimonial>(results);
}

export async function getFeaturedTestimonials(limit = 4): Promise<StrapiResponse<Testimonial>> {
    const query = `*[_type == "testimonial" && featured == true] | order(_createdAt desc)[0...$limit] {
        _id,
        clientName,
        location,
        review,
        "photo": photo.asset->{ url, metadata { dimensions { width, height } } },
        _createdAt
    }`;

    const results = await sanityClient.fetch(query, { limit });
    return toStrapiResponse<Testimonial>(results);
}

// ==========================================
// MARKET INSIGHT API
// ==========================================

export async function getMarketInsights(limit = 4): Promise<StrapiResponse<MarketInsight>> {
    const query = `*[_type == "marketInsight"] | order(publishedAt desc)[0...$limit] {
        _id,
        title,
        pricePerMarla,
        quarterlyChange,
        insight,
        publishedAt,
        "society": society->{ name, "slug": slug.current }
    }`;

    const results = await sanityClient.fetch(query, { limit });
    return toStrapiResponse<MarketInsight>(results);
}

// ==========================================
// LEAD API (Using Next.js API Route)
// ==========================================

export async function submitLead(leadData: Lead): Promise<void> {
    // For now, submit to the Next.js API route which can handle storage
    // This maintains compatibility with the existing lead submission flow
    const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Lead submission failed: ${error}`);
    }
}

// ==========================================
// STATIC PARAMS FOR DYNAMIC ROUTES
// ==========================================

export async function getAllPropertySlugs(): Promise<string[]> {
    const query = `*[_type == "property"] { "slug": slug.current }`;
    const results = await sanityClient.fetch(query);
    return results.map((item: any) => item.slug);
}

export async function getAllSocietySlugs(): Promise<string[]> {
    const query = `*[_type == "society"] { "slug": slug.current }`;
    const results = await sanityClient.fetch(query);
    return results.map((item: any) => item.slug);
}

// ==========================================
// SANITY-SPECIFIC EXPORTS
// ==========================================

export { sanityClient, queries };
