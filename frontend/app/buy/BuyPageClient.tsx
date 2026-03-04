'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bed, Bath, Maximize, Filter, X } from 'lucide-react';
import { Card, CardImage, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Property, PropertyFilters, SortOption, PropertyType } from '@/lib/types';
import { formatPrice, formatPropertyType, formatSize, getImageUrl } from '@/lib/utils';

// Demo properties data
const demoProperties: Property[] = [
    {
        title: '1 Kanal Luxury House in DHA Phase 6',
        slug: '1-kanal-luxury-house-dha-phase-6',
        price: 75000000,
        priceType: 'negotiable',
        phase: 'Phase 6',
        propertyType: 'house',
        sizeValue: 1,
        sizeUnit: 'kanal',
        bedrooms: 5,
        bathrooms: 6,
        description: 'A stunning 1 Kanal luxury house featuring modern architecture.',
        investmentHighlights: 'Prime location with excellent appreciation potential.',
        status: 'available',
        featured: true,
        coordinates: null,
        seoTitle: '',
        seoDescription: '',
        society: { data: { id: 1, attributes: { name: 'DHA Lahore', slug: 'dha-lahore', overview: '', investmentInsight: '', familyInsight: '', averagePricePerMarla: 2500000, appreciationPercent: 15, mapEmbed: '', featured: true, seoTitle: '', seoDescription: '', coverImage: { data: null }, createdAt: '', updatedAt: '' } } },
        featuredImage: { data: null },
        gallery: { data: [] },
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
    },
    {
        title: '10 Marla Plot in Bahria Town Phase 8',
        slug: '10-marla-plot-bahria-town-phase-8',
        price: 18000000,
        priceType: 'fixed',
        phase: 'Phase 8',
        propertyType: 'plot',
        sizeValue: 10,
        sizeUnit: 'marla',
        bedrooms: 0,
        bathrooms: 0,
        description: 'Ideal 10 Marla plot in prime location.',
        investmentHighlights: 'Ready for construction.',
        status: 'available',
        featured: true,
        coordinates: null,
        seoTitle: '',
        seoDescription: '',
        society: { data: { id: 2, attributes: { name: 'Bahria Town', slug: 'bahria-town', overview: '', investmentInsight: '', familyInsight: '', averagePricePerMarla: 1800000, appreciationPercent: 12, mapEmbed: '', featured: true, seoTitle: '', seoDescription: '', coverImage: { data: null }, createdAt: '', updatedAt: '' } } },
        featuredImage: { data: null },
        gallery: { data: [] },
        createdAt: '2024-01-02',
        updatedAt: '2024-01-02',
    },
    {
        title: '2 Kanal Farmhouse on Bedian Road',
        slug: '2-kanal-farmhouse-bedian-road',
        price: 120000000,
        priceType: 'negotiable',
        phase: 'Zone 5',
        propertyType: 'farmhouse',
        sizeValue: 2,
        sizeUnit: 'kanal',
        bedrooms: 4,
        bathrooms: 4,
        description: 'Exquisite farmhouse with lush gardens.',
        investmentHighlights: 'Perfect for weekend retreats.',
        status: 'available',
        featured: true,
        coordinates: null,
        seoTitle: '',
        seoDescription: '',
        society: { data: { id: 3, attributes: { name: 'Bedian Road', slug: 'bedian-road', overview: '', investmentInsight: '', familyInsight: '', averagePricePerMarla: 1500000, appreciationPercent: 18, mapEmbed: '', featured: false, seoTitle: '', seoDescription: '', coverImage: { data: null }, createdAt: '', updatedAt: '' } } },
        featuredImage: { data: null },
        gallery: { data: [] },
        createdAt: '2024-01-03',
        updatedAt: '2024-01-03',
    },
    {
        title: '500 Sqft Commercial Space Gulberg',
        slug: '500-sqft-commercial-gulberg',
        price: 32000000,
        priceType: 'on-request',
        phase: 'Main Boulevard',
        propertyType: 'commercial',
        sizeValue: 500,
        sizeUnit: 'sqft',
        bedrooms: 0,
        bathrooms: 2,
        description: 'Prime commercial space with high footfall.',
        investmentHighlights: 'Excellent rental yield.',
        status: 'available',
        featured: true,
        coordinates: null,
        seoTitle: '',
        seoDescription: '',
        society: { data: { id: 4, attributes: { name: 'Gulberg', slug: 'gulberg', overview: '', investmentInsight: '', familyInsight: '', averagePricePerMarla: 8000000, appreciationPercent: 10, mapEmbed: '', featured: true, seoTitle: '', seoDescription: '', coverImage: { data: null }, createdAt: '', updatedAt: '' } } },
        featuredImage: { data: null },
        gallery: { data: [] },
        createdAt: '2024-01-04',
        updatedAt: '2024-01-04',
    },
    {
        title: '5 Marla Modern House DHA Phase 9',
        slug: '5-marla-modern-house-dha-phase-9',
        price: 21000000,
        priceType: 'fixed',
        phase: 'Phase 9',
        propertyType: 'house',
        sizeValue: 5,
        sizeUnit: 'marla',
        bedrooms: 3,
        bathrooms: 3,
        description: 'Brand new modern house with contemporary design.',
        investmentHighlights: 'Move-in ready.',
        status: 'available',
        featured: true,
        coordinates: null,
        seoTitle: '',
        seoDescription: '',
        society: { data: { id: 1, attributes: { name: 'DHA Lahore', slug: 'dha-lahore', overview: '', investmentInsight: '', familyInsight: '', averagePricePerMarla: 2500000, appreciationPercent: 15, mapEmbed: '', featured: true, seoTitle: '', seoDescription: '', coverImage: { data: null }, createdAt: '', updatedAt: '' } } },
        featuredImage: { data: null },
        gallery: { data: [] },
        createdAt: '2024-01-05',
        updatedAt: '2024-01-05',
    },
];

const propertyTypes: { value: PropertyType; label: string }[] = [
    { value: 'house', label: 'House' },
    { value: 'plot', label: 'Plot' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'farmhouse', label: 'Farmhouse' },
];

const societies = [
    { value: 'dha-lahore', label: 'DHA Lahore' },
    { value: 'bahria-town', label: 'Bahria Town' },
    { value: 'gulberg', label: 'Gulberg' },
    { value: 'bedian-road', label: 'Bedian Road' },
];

export default function BuyPageClient() {
    const searchParams = useSearchParams();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState<PropertyFilters>({
        society: searchParams.get('society') ? [searchParams.get('society')!] : [],
    });
    const [sort, setSort] = useState<SortOption>('newest');
    const [filteredProperties, setFilteredProperties] = useState(demoProperties);

    useEffect(() => {
        let result = [...demoProperties];

        if (filters.society?.length) {
            result = result.filter((p) =>
                filters.society?.includes(p.society?.data?.attributes?.slug || '')
            );
        }

        if (filters.propertyType?.length) {
            result = result.filter((p) =>
                filters.propertyType?.includes(p.propertyType)
            );
        }

        if (filters.minPrice) {
            result = result.filter((p) => p.price >= filters.minPrice!);
        }

        if (filters.maxPrice) {
            result = result.filter((p) => p.price <= filters.maxPrice!);
        }

        if (sort === 'price-asc') {
            result.sort((a, b) => a.price - b.price);
        } else if (sort === 'price-desc') {
            result.sort((a, b) => b.price - a.price);
        }

        setFilteredProperties(result);
    }, [filters, sort]);

    const toggleSociety = (slug: string) => {
        setFilters((prev) => ({
            ...prev,
            society: prev.society?.includes(slug)
                ? prev.society.filter((s) => s !== slug)
                : [...(prev.society || []), slug],
        }));
    };

    const togglePropertyType = (type: PropertyType) => {
        setFilters((prev) => ({
            ...prev,
            propertyType: prev.propertyType?.includes(type)
                ? prev.propertyType.filter((t) => t !== type)
                : [...(prev.propertyType || []), type],
        }));
    };

    const clearFilters = () => {
        setFilters({});
    };

    return (
        <div className="min-h-screen bg-cream pt-24 pb-16">
            <div className="section-container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="font-serif text-3xl md:text-4xl text-navy mb-2">Properties for Sale</h1>
                    <p className="text-gray-600">Discover premium properties in Lahores finest societies</p>
                </motion.div>

                {/* Controls Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="flex items-center space-x-2 bg-white px-4 py-2 border border-gray-200 text-navy hover:border-gold transition-colors"
                    >
                        <Filter className="w-4 h-4" />
                        <span>Filters</span>
                        {(filters.society?.length || filters.propertyType?.length) ? (
                            <span className="bg-gold text-white text-xs px-2 py-0.5 rounded-full">
                                {(filters.society?.length || 0) + (filters.propertyType?.length || 0)}
                            </span>
                        ) : null}
                    </button>

                    <div className="flex items-center space-x-3">
                        <span className="text-gray-500 text-sm">Sort by:</span>
                        <select
                            title="Sort properties"
                            value={sort}
                            onChange={(e) => setSort(e.target.value as SortOption)}
                            className="bg-white border border-gray-200 px-4 py-2 text-navy focus:outline-none focus:border-gold"
                        >
                            <option value="newest">Newest</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Filters Panel */}
                {isFilterOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white p-6 mb-8 border border-gray-200"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-serif text-lg text-navy">Filter Properties</h3>
                            <button
                                title="Close filters"
                                onClick={() => setIsFilterOpen(false)}
                                className="text-gray-400 hover:text-navy"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Society Filter */}
                            <div>
                                <h4 className="font-medium text-navy mb-3">Society</h4>
                                <div className="space-y-2">
                                    {societies.map((society) => (
                                        <label key={society.value} className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filters.society?.includes(society.value)}
                                                onChange={() => toggleSociety(society.value)}
                                                className="w-4 h-4 accent-gold"
                                            />
                                            <span className="text-gray-600">{society.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Property Type Filter */}
                            <div>
                                <h4 className="font-medium text-navy mb-3">Property Type</h4>
                                <div className="space-y-2">
                                    {propertyTypes.map((type) => (
                                        <label key={type.value} className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filters.propertyType?.includes(type.value)}
                                                onChange={() => togglePropertyType(type.value)}
                                                className="w-4 h-4 accent-gold"
                                            />
                                            <span className="text-gray-600">{type.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <h4 className="font-medium text-navy mb-3">Price Range (PKR)</h4>
                                <div className="space-y-3">
                                    <input
                                        type="number"
                                        placeholder="Min Price"
                                        value={filters.minPrice || ''}
                                        onChange={(e) => setFilters((prev) => ({ ...prev, minPrice: Number(e.target.value) || undefined }))}
                                        className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-gold"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max Price"
                                        value={filters.maxPrice || ''}
                                        onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) || undefined }))}
                                        className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-gold"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end">
                            <button
                                onClick={clearFilters}
                                className="text-gray-500 hover:text-navy text-sm"
                            >
                                Clear all filters
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Results Count */}
                <p className="text-gray-500 text-sm mb-6">
                    Showing {filteredProperties.length} properties
                </p>

                {/* Property Grid */}
                {filteredProperties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProperties.map((property, index) => (
                            <motion.div
                                key={property.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Card hover>
                                    <div className="relative">
                                        <CardImage
                                            src={getImageUrl(property.featuredImage, 'medium')}
                                            alt={property.title}
                                            className="aspect-[4/3]"
                                        />
                                        <div className="absolute top-3 left-3">
                                            <Badge variant="gold">
                                                {formatPropertyType(property.propertyType)}
                                            </Badge>
                                        </div>
                                    </div>
                                    <CardContent>
                                        <p className="text-gold font-medium text-sm mb-1">
                                            {formatPrice(property.price, property.priceType)}
                                        </p>
                                        <h3 className="font-serif text-lg text-navy mb-2 line-clamp-1">
                                            {property.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm mb-4">
                                            {property.society?.data?.attributes?.name}
                                            {property.phase && `, ${property.phase}`}
                                        </p>
                                        <div className="flex items-center space-x-4 text-gray-500 text-sm mb-4">
                                            {property.bedrooms > 0 && (
                                                <div className="flex items-center space-x-1">
                                                    <Bed className="w-4 h-4" />
                                                    <span>{property.bedrooms}</span>
                                                </div>
                                            )}
                                            {property.bathrooms > 0 && (
                                                <div className="flex items-center space-x-1">
                                                    <Bath className="w-4 h-4" />
                                                    <span>{property.bathrooms}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center space-x-1">
                                                <Maximize className="w-4 h-4" />
                                                <span>{formatSize(property.sizeValue, property.sizeUnit)}</span>
                                            </div>
                                        </div>
                                        <Link
                                            href={`/property/${property.slug}`}
                                            className="block w-full text-center py-2 border border-gold text-navy hover:bg-gold hover:text-white transition-colors text-sm font-medium"
                                        >
                                            View Details
                                        </Link>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-lg mb-4">No properties found matching your criteria</p>
                        <Button onClick={clearFilters} variant="secondary">
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
