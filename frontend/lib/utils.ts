/**
 * Utility functions for the luxury real estate platform
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Property, PriceType, PropertyType, SizeUnit } from './types';

/**
 * Merge tailwind classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Format price in PKR with proper formatting
 */
export function formatPrice(price: number, priceType: PriceType): string {
    if (priceType === 'on-request') {
        return 'Price on Request';
    }

    let formatted: string;

    if (price >= 10000000) {
        // Crores
        const crores = price / 10000000;
        formatted = `PKR ${crores.toFixed(2)} Crore`;
    } else if (price >= 100000) {
        // Lakhs
        const lakhs = price / 100000;
        formatted = `PKR ${lakhs.toFixed(1)} Lakh`;
    } else {
        formatted = `PKR ${price.toLocaleString()}`;
    }

    if (priceType === 'negotiable') {
        formatted += ' (Negotiable)';
    }

    return formatted;
}

/**
 * Format property type for display
 */
export function formatPropertyType(type: PropertyType): string {
    const typeMap: Record<PropertyType, string> = {
        house: 'House',
        plot: 'Plot',
        apartment: 'Apartment',
        commercial: 'Commercial',
        farmhouse: 'Farmhouse',
    };
    return typeMap[type] || type;
}

/**
 * Format size with unit
 */
export function formatSize(value: number, unit: SizeUnit): string {
    const unitMap: Record<SizeUnit, string> = {
        marla: 'Marla',
        kanal: 'Kanal',
        sqft: 'Sq. Ft.',
    };
    return `${value} ${unitMap[unit]}`;
}

/**
 * Format bedrooms for display
 */
export function formatBedrooms(count: number): string {
    if (count === 0) return 'Studio';
    return `${count} Bedroom${count > 1 ? 's' : ''}`;
}

/**
 * Format bathrooms for display
 */
export function formatBathrooms(count: number): string {
    return `${count} Bathroom${count > 1 ? 's' : ''}`;
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
}

/**
 * Generate property URL slug
 */
export function getPropertyUrl(slug: string): string {
    return `/property/${slug}`;
}

/**
 * Generate society URL slug
 */
export function getSocietyUrl(slug: string): string {
    return `/buy?Society=${slug}`;
}

/**
 * Get image URL from Strapi image data
 */
export function getImageUrl(image: any, size: 'thumbnail' | 'small' | 'medium' | 'large' | 'original' = 'original'): string {
    if (!image?.data?.attributes) {
        return '/images/placeholder.jpg';
    }

    const { url, formats } = image.data.attributes;

    if (size !== 'original' && formats?.[size]?.url) {
        return formats[size].url.startsWith('http')
            ? formats[size].url
            : `${process.env.NEXT_PUBLIC_STRAPI_URL}${formats[size].url}`;
    }

    return url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}

/**
 * Generate metadata title
 */
export function generateMetaTitle(title: string, suffix = ' | Fort Era Properties and Developers'): string {
    return `${title}${suffix}`;
}

/**
 * Generate metadata description
 */
export function generateMetaDescription(description: string): string {
    return truncateText(description, 160);
}

/**
 * Debounce function for search/filter inputs
 */
export function debounce<T extends (...args: any[]) => void>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

/**
 * Format percentage change
 */
export function formatPercentageChange(value: number): string {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
}

/**
 * Get color class for percentage change
 */
export function getPercentageChangeColor(value: number): string {
    return value >= 0 ? 'text-green-600' : 'text-red-600';
}
