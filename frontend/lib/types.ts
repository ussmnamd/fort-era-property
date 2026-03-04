// ==========================================
// STRAPI API TYPES
// ==========================================

export interface StrapiImage {
    id: number;
    attributes: {
        url: string;
        name: string;
        width: number;
        height: number;
        formats: {
            thumbnail?: { url: string };
            small?: { url: string };
            medium?: { url: string };
            large?: { url: string };
        };
    };
}

export interface StrapiData<T> {
    id: number;
    attributes: T;
}

export interface StrapiResponse<T> {
    data: StrapiData<T>[];
    meta: {
        pagination?: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

export interface StrapiSingleResponse<T> {
    data: StrapiData<T>;
    meta: {};
}

// ==========================================
// SOCIETY TYPES
// ==========================================

export interface Society {
    name: string;
    slug: string;
    overview: string;
    investmentInsight: string;
    familyInsight: string;
    averagePricePerMarla: number;
    appreciationPercent: number;
    mapEmbed: string;
    featured: boolean;
    seoTitle: string;
    seoDescription: string;
    coverImage: {
        data: StrapiImage | null;
    };
    createdAt: string;
    updatedAt: string;
}

// ==========================================
// PROPERTY TYPES
// ==========================================

export type PriceType = 'fixed' | 'negotiable' | 'on-request';
export type PropertyType = 'house' | 'plot' | 'apartment' | 'commercial' | 'farmhouse';
export type SizeUnit = 'marla' | 'kanal' | 'sqft';
export type PropertyStatus = 'available' | 'sold' | 'reserved';

export interface Property {
    title: string;
    slug: string;
    price: number;
    priceType: PriceType;
    phase: string;
    propertyType: PropertyType;
    sizeValue: number;
    sizeUnit: SizeUnit;
    bedrooms: number;
    bathrooms: number;
    description: string;
    investmentHighlights: string;
    status: PropertyStatus;
    featured: boolean;
    coordinates: { lat: number; lng: number } | null;
    seoTitle: string;
    seoDescription: string;
    society: {
        data: StrapiData<Society> | null;
    };
    featuredImage: {
        data: StrapiImage | null;
    };
    gallery: {
        data: StrapiImage[];
    };
    createdAt: string;
    updatedAt: string;
}

// ==========================================
// TESTIMONIAL TYPES
// ==========================================

export interface Testimonial {
    clientName: string;
    location: string;
    review: string;
    featured: boolean;
    photo: {
        data: StrapiImage | null;
    };
    createdAt: string;
}

// ==========================================
// MARKET INSIGHT TYPES
// ==========================================

export interface MarketInsight {
    title: string;
    pricePerMarla: number;
    quarterlyChange: number;
    insight: string;
    publishedAt: string;
    society: {
        data: StrapiData<Society> | null;
    };
}

// ==========================================
// LEAD TYPES
// ==========================================

export type InquiryType = 'buy' | 'sell' | 'invest' | 'valuation' | 'general';
export type BuyerType = 'local' | 'overseas' | 'investor';

export interface Lead {
    fullName: string;
    email: string;
    phone?: string;
    inquiryType: InquiryType;
    message?: string;
    buyerType: BuyerType;
    source: string;
    propertyReference?: {
        data: StrapiData<Property> | null;
    };
}

export interface LeadFormData {
    fullName: string;
    email: string;
    phone: string;
    inquiryType: InquiryType;
    message: string;
    buyerType: BuyerType;
    propertySlug?: string;
    propertyTitle?: string;
}

// ==========================================
// FILTER TYPES
// ==========================================

export interface PropertyFilters {
    society?: string[];
    phase?: string;
    propertyType?: PropertyType[];
    minPrice?: number;
    maxPrice?: number;
    minSize?: number;
    maxSize?: number;
    sizeUnit?: SizeUnit;
    bedrooms?: number;
    status?: PropertyStatus;
}

export type SortOption = 'price-asc' | 'price-desc' | 'newest';

// ==========================================
// COMPONENT PROP TYPES
// ==========================================

export interface NavLink {
    label: string;
    href: string;
}

export interface HeroProps {
    title: string;
    subtitle: string;
    backgroundImage: string;
}

export interface PropertyCardProps {
    property: Property;
    slug: string;
}

export interface SocietyCardProps {
    society: Society;
    slug: string;
}

export interface TestimonialCardProps {
    testimonial: Testimonial;
}

export interface InquiryFormProps {
    propertySlug?: string;
    propertyTitle?: string;
    inquiryType?: InquiryType;
}
