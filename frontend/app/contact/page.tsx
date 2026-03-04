'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import { InquiryType, BuyerType } from '@/lib/types';
import { getWhatsAppLink, getDefaultInquiryMessage } from '@/lib/whatsapp';

const contactInfo = [
    {
        icon: Phone,
        title: 'Phone',
        details: ['+92 300 1234567', '+92 321 7654321'],
    },
    {
        icon: Mail,
        title: 'Email',
        details: ['info@fortera.pk', 'sales@fortera.pk'],
    },
    {
        icon: MapPin,
        title: 'Office',
        details: ['DHA Phase 6, Lahore', 'Pakistan'],
    },
    {
        icon: Clock,
        title: 'Hours',
        details: ['Mon - Sat: 9AM - 7PM', 'Sunday: By Appointment'],
    },
];

const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'buy', label: 'Buy a Property' },
    { value: 'sell', label: 'Sell a Property' },
    { value: 'invest', label: 'Investment Inquiry' },
];

const buyerTypes = [
    { value: 'local', label: 'Local Buyer' },
    { value: 'overseas', label: 'Overseas Pakistani' },
    { value: 'investor', label: 'Investor' },
];

export default function ContactPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        inquiryType: 'general' as InquiryType,
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
            {/* Header */}
            <section className="section-container mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <div className="gold-line mx-auto mb-4" />
                    <h1 className="font-serif text-4xl md:text-5xl text-navy mb-6">Get in Touch</h1>
                    <p className="text-gray-600 text-lg">
                        Whether you're looking to buy, sell, or invest, we're here to help.
                        Reach out to our team for personalized assistance.
                    </p>
                </motion.div>
            </section>

            <section className="section-container">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-1"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
                            {contactInfo.map((info, index) => (
                                <motion.div
                                    key={info.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start space-x-4"
                                >
                                    <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center flex-shrink-0">
                                        <info.icon className="w-5 h-5 text-gold" />
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-lg text-navy mb-2">{info.title}</h3>
                                        {info.details.map((detail) => (
                                            <p key={detail} className="text-gray-600 text-sm">{detail}</p>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* WhatsApp CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-12 p-6 bg-navy text-white"
                        >
                            <h3 className="font-serif text-xl mb-3">Prefer WhatsApp?</h3>
                            <p className="text-gray-300 text-sm mb-4">
                                Chat with us directly for quick responses and instant updates.
                            </p>
                            <a
                                href={getWhatsAppLink(getDefaultInquiryMessage())}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-2 bg-[#25D366] text-white px-6 py-3 rounded hover:bg-[#128C7E] transition-colors"
                            >
                                <span>Chat on WhatsApp</span>
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-white p-8 border border-gray-100">
                            {submitted ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Check className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h3 className="font-serif text-2xl text-navy mb-2">Thank You!</h3>
                                    <p className="text-gray-600">We've received your message and will get back to you within 24 hours.</p>
                                </div>
                            ) : (
                                <>
                                    <h2 className="font-serif text-2xl text-navy mb-2">Send us a Message</h2>
                                    <p className="text-gray-500 mb-8">Fill out the form below and we'll respond promptly</p>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                        </div>
                                        <Select
                                            label="Buyer Type"
                                            options={buyerTypes}
                                            value={formData.buyerType}
                                            onChange={(e) => setFormData({ ...formData, buyerType: e.target.value as BuyerType })}
                                        />
                                        <Textarea
                                            label="Message"
                                            rows={5}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            placeholder="Tell us about your requirements..."
                                        />
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            className="w-full"
                                            isLoading={isSubmitting}
                                        >
                                            Send Message
                                        </Button>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
