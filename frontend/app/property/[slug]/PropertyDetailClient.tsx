'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bed, Bath, Maximize, MapPin, ChevronLeft, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import { Property, InquiryType, BuyerType } from '@/lib/types';
import { formatPrice, formatPropertyType, formatSize, getImageUrl } from '@/lib/utils';
import { getWhatsAppLink, getPropertyInquiryMessage } from '@/lib/whatsapp';

// Demo properties
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
        description: 'This stunning 1 Kanal luxury house in DHA Phase 6 represents the pinnacle of modern living.',
        investmentHighlights: 'Located in one of DHAs most prestigious phases with excellent appreciation history.',
        status: 'available',
        featured: true,
        coordinates: { lat: 31.4704, lng: 74.3767 },
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
        description: 'Ideal 10 Marla plot in the prime location of Bahria Town Phase 8.',
        investmentHighlights: 'Ready for construction with all utilities available.',
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
        description: 'Exquisite 2 Kanal farmhouse with lush gardens and modern amenities.',
        investmentHighlights: 'Perfect for weekend retreats and high rental yields.',
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
        description: 'Prime commercial space on Gulberg Main Boulevard with high footfall.',
        investmentHighlights: 'Excellent rental yield in the commercial hub of Lahore.',
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
        description: 'Brand new 5 Marla modern house with contemporary design.',
        investmentHighlights: 'Move-in ready with premium fixtures and fittings.',
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

const inquiryTypes: { value: InquiryType; label: string }[] = [
    { value: 'buy', label: 'I want to buy this property' },
    { value: 'invest', label: 'Investment inquiry' },
    { value: 'valuation', label: 'Request valuation' },
    { value: 'general', label: 'General inquiry' },
];

const buyerTypes: { value: BuyerType; label: string }[] = [
    { value: 'local', label: 'Local Buyer' },
    { value: 'overseas', label: 'Overseas Pakistani' },
    { value: 'investor', label: 'Investor' },
];

interface PropertyDetailClientProps {
    slug: string;
}

export default function PropertyDetailClient({ slug }: PropertyDetailClientProps) {
    const property = demoProperties.find((p) => p.slug === slug) || demoProperties[0];

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        inquiryType: 'buy' as InquiryType,
        buyerType: 'local' as BuyerType,
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setSubmitted(true);
    };

    const features = [
        { icon: Bed, label: 'Bedrooms', value: property.bedrooms },
        { icon: Bath, label: 'Bathrooms', value: property.bathrooms },
        { icon: Maximize, label: 'Size', value: formatSize(property.sizeValue, property.sizeUnit) },
    ];

    return (
        <div className="min-h-screen bg-cream pt-24 pb-16">
            <div className="section-container">
                {/* Breadcrumb */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-6"
                >
                    <Link href="/buy" className="inline-flex items-center text-gray-500 hover:text-navy transition-colors">
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back to Listings
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Image Gallery */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative aspect-[16/10] bg-gray-200 mb-6 overflow-hidden"
                        >
                            <img
                                src={getImageUrl(property.featuredImage, 'large')}
                                alt={property.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4">
                                <Badge variant="gold">{formatPropertyType(property.propertyType)}</Badge>
                            </div>
                            {property.priceType === 'on-request' && (
                                <div className="absolute top-4 right-4">
                                    <Badge variant="navy">Price on Request</Badge>
                                </div>
                            )}
                        </motion.div>

                        {/* Title & Price */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="mb-8"
                        >
                            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                <div>
                                    <h1 className="font-serif text-2xl md:text-3xl text-navy mb-2">{property.title}</h1>
                                    <div className="flex items-center text-gray-500">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        <span>{property.society?.data?.attributes?.name}{property.phase && `, ${property.phase}`}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl md:text-3xl font-serif text-gold">
                                        {formatPrice(property.price, property.priceType)}
                                    </p>
                                </div>
                            </div>

                            {/* Quick Specs */}
                            <div className="flex flex-wrap gap-6 py-4 border-y border-gray-200">
                                {features.map((feature) => (
                                    <div key={feature.label} className="flex items-center space-x-2">
                                        <feature.icon className="w-5 h-5 text-gold" />
                                        <span className="text-gray-600">{feature.value} {feature.label}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mb-8"
                        >
                            <h2 className="font-serif text-xl text-navy mb-4">Property Description</h2>
                            <p className="text-gray-600 leading-relaxed">{property.description}</p>
                        </motion.div>

                        {/* Investment Highlights */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-navy/5 p-6 mb-8"
                        >
                            <h2 className="font-serif text-xl text-navy mb-4">Investment Highlights</h2>
                            <p className="text-gray-600 leading-relaxed">{property.investmentHighlights}</p>
                        </motion.div>

                        {/* Location */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h2 className="font-serif text-xl text-navy mb-4">Location</h2>
                            <div className="aspect-video bg-gray-200">
                                <iframe
                                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13601.23456789!2d${property.coordinates?.lng || 74.3767}!3d${property.coordinates?.lat || 31.4704}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDI4JzEzLjQiTiA3NMKwMjInMzYuMSJF!5e0!3m2!1sen!2s!4v1234567890`}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar - Inquiry Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-1"
                    >
                        <div className="sticky top-24">
                            <Card>
                                <CardContent>
                                    {submitted ? (
                                        <div className="text-center py-8">
                                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Check className="w-8 h-8 text-green-600" />
                                            </div>
                                            <h3 className="font-serif text-xl text-navy mb-2">Inquiry Submitted!</h3>
                                            <p className="text-gray-600 text-sm">We'll get back to you within 24 hours.</p>
                                        </div>
                                    ) : (
                                        <>
                                            <h3 className="font-serif text-xl text-navy mb-1">Interested?</h3>
                                            <p className="text-gray-500 text-sm mb-6">Fill out the form and we'll get in touch</p>

                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <Input
                                                    label="Full Name"
                                                    required
                                                    value={formData.fullName}
                                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                />
                                                <Input
                                                    label="Email"
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                />
                                                <Input
                                                    label="Phone"
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                />
                                                <Select
                                                    label="Inquiry Type"
                                                    options={inquiryTypes}
                                                    value={formData.inquiryType}
                                                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value as InquiryType })}
                                                />
                                                <Select
                                                    label="Buyer Type"
                                                    options={buyerTypes}
                                                    value={formData.buyerType}
                                                    onChange={(e) => setFormData({ ...formData, buyerType: e.target.value as BuyerType })}
                                                />
                                                <Textarea
                                                    label="Message"
                                                    rows={3}
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    placeholder="Tell us more about your requirements..."
                                                />
                                                <Button
                                                    type="submit"
                                                    variant="primary"
                                                    className="w-full"
                                                    isLoading={isSubmitting}
                                                >
                                                    Submit Inquiry
                                                </Button>
                                            </form>

                                            <div className="mt-6 pt-6 border-t border-gray-100">
                                                <a
                                                    href={getWhatsAppLink(getPropertyInquiryMessage(property.title, property.slug))}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center space-x-2 w-full py-3 bg-[#25D366] text-white rounded hover:bg-[#128C7E] transition-colors"
                                                >
                                                    <span>Chat on WhatsApp</span>
                                                </a>
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
