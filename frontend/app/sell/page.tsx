'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Users, FileCheck, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import { InquiryType, BuyerType } from '@/lib/types';
import { getWhatsAppLink, getSellingMessage, getValuationMessage } from '@/lib/whatsapp';

const steps = [
    {
        icon: Shield,
        title: 'Confidential Listing',
        description: 'Your property is listed discreetly to our network of qualified buyers only.',
    },
    {
        icon: Users,
        title: 'Targeted Marketing',
        description: 'We showcase your property to serious buyers matching your criteria.',
    },
    {
        icon: FileCheck,
        title: 'Smooth Closing',
        description: 'End-to-end support from offer to possession with complete documentation.',
    },
];

const inquiryTypes = [
    { value: 'sell', label: 'Sell my property' },
    { value: 'valuation', label: 'Free valuation' },
];

const buyerTypes = [
    { value: 'local', label: 'Local Owner' },
    { value: 'overseas', label: 'Overseas Pakistani' },
    { value: 'investor', label: 'Investor' },
];

export default function SellPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        inquiryType: 'sell' as InquiryType,
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

    return (
        <div className="min-h-screen bg-cream pt-24 pb-16">
            {/* Hero Section */}
            <section className="section-container mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <div className="gold-line mx-auto mb-4" />
                    <h1 className="font-serif text-4xl md:text-5xl text-navy mb-6">
                        Discreetly Sell Your Property
                    </h1>
                    <p className="text-gray-600 text-lg mb-8">
                        Connect with qualified buyers from our exclusive network.
                        We ensure a confidential, efficient, and profitable sale process.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href={getWhatsAppLink(getSellingMessage())}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 bg-gold text-navy px-8 py-4 font-medium hover:bg-gold-light transition-colors"
                        >
                            <span>Start the Process</span>
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </motion.div>
            </section>

            {/* Process Steps */}
            <section className="bg-white py-16 mb-16">
                <div className="section-container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="font-serif text-3xl text-navy mb-4">Our Selling Process</h2>
                        <p className="text-gray-600">Three simple steps to a successful sale</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 mx-auto mb-6 bg-navy rounded-full flex items-center justify-center">
                                    <step.icon className="w-8 h-8 text-gold" />
                                </div>
                                <h3 className="font-serif text-xl text-navy mb-3">{step.title}</h3>
                                <p className="text-gray-600 text-sm">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Valuation Form */}
            <section className="section-container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="gold-line mb-4" />
                        <h2 className="font-serif text-3xl text-navy mb-4">Free Property Valuation</h2>
                        <p className="text-gray-600 mb-8">
                            Get an accurate market valuation of your property from our experts.
                            No obligations, just professional advice to help you make informed decisions.
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start space-x-3">
                                <Check className="w-5 h-5 text-gold mt-0.5" />
                                <span className="text-gray-600">Complimentary market analysis</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <Check className="w-5 h-5 text-gold mt-0.5" />
                                <span className="text-gray-600">Comparative market study</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <Check className="w-5 h-5 text-gold mt-0.5" />
                                <span className="text-gray-600">Investment potential assessment</span>
                            </div>
                        </div>

                        <a
                            href={getWhatsAppLink(getValuationMessage())}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 text-navy font-medium hover:text-gold transition-colors"
                        >
                            <span>Request via WhatsApp</span>
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 border border-gray-100"
                    >
                        {submitted ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Check className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="font-serif text-xl text-navy mb-2">Request Received!</h3>
                                <p className="text-gray-600">We'll contact you shortly to schedule the valuation.</p>
                            </div>
                        ) : (
                            <>
                                <h3 className="font-serif text-xl text-navy mb-6">Request Valuation</h3>
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
                                        label="Seller Type"
                                        options={buyerTypes}
                                        value={formData.buyerType}
                                        onChange={(e) => setFormData({ ...formData, buyerType: e.target.value as BuyerType })}
                                    />
                                    <Textarea
                                        label="Property Details"
                                        rows={3}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Location, size, type of property..."
                                    />
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className="w-full"
                                        isLoading={isSubmitting}
                                    >
                                        Request Valuation
                                    </Button>
                                </form>
                            </>
                        )}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
