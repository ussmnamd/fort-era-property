'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Bed, Bath, Maximize } from 'lucide-react';
import { Card, CardImage, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Property } from '@/lib/types';
import { formatPrice, formatPropertyType, formatSize, getImageUrl } from '@/lib/utils';

interface FeaturedCollectionProps {
    properties: Property[];
}

export default function FeaturedCollection({ properties }: FeaturedCollectionProps) {
    return (
        <section className="py-20 bg-cream">
            <div className="section-container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
                >
                    <div>
                        <div className="gold-line mb-4" />
                        <h2 className="section-title">Featured Collection</h2>
                        <p className="section-subtitle">
                            Handpicked properties representing the finest in Lahore's luxury real estate
                        </p>
                    </div>
                    <Link
                        href="/buy"
                        className="mt-6 md:mt-0 inline-flex items-center space-x-2 text-navy font-medium hover:text-gold transition-colors"
                    >
                        <span>View All Properties</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>

                {/* Property Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {properties.map((property, index) => (
                        <motion.div
                            key={property.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
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
                                    {property.status !== 'available' && (
                                        <div className="absolute top-3 right-3">
                                            <Badge variant={property.status === 'sold' ? 'sold' : 'outline'}>
                                                {property.status}
                                            </Badge>
                                        </div>
                                    )}
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
                                    <div className="flex items-center space-x-4 text-gray-500 text-sm">
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
                                        className="mt-4 block w-full text-center py-2 border border-gold text-navy hover:bg-gold hover:text-white transition-colors text-sm font-medium"
                                    >
                                        View Property
                                    </Link>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
