'use client';

import { motion } from 'framer-motion';
import { Search, Home, TrendingUp, FileCheck, Shield, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const services = [
    {
        icon: Search,
        title: 'Property Search',
        description: 'Personalized property search based on your specific requirements, budget, and preferences.',
        features: ['Curated listings', 'Virtual tours', 'Neighborhood analysis'],
    },
    {
        icon: Home,
        title: 'Property Sales',
        description: 'Strategic marketing and sale of your property to qualified buyers in our exclusive network.',
        features: ['Market valuation', 'Professional photography', 'Private viewings'],
    },
    {
        icon: TrendingUp,
        title: 'Investment Advisory',
        description: 'Expert guidance on real estate investments with focus on ROI and capital appreciation.',
        features: ['Portfolio analysis', 'Market reports', 'Risk assessment'],
    },
    {
        icon: FileCheck,
        title: 'Legal Support',
        description: 'Complete legal assistance for property transactions, documentation, and verification.',
        features: ['Title verification', 'Contract review', 'Transfer facilitation'],
    },
    {
        icon: Shield,
        title: 'Property Management',
        description: 'End-to-end property management services for overseas and local investors.',
        features: ['Tenant screening', 'Rent collection', 'Maintenance'],
    },
    {
        icon: Users,
        title: 'Overseas Services',
        description: 'Specialized services for overseas Pakistanis looking to invest in Lahore real estate.',
        features: ['Remote viewing', 'Power of attorney', 'Tax consultation'],
    },
];

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-cream pt-24 pb-16">
            {/* Hero */}
            <section className="section-container mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <div className="gold-line mx-auto mb-4" />
                    <h1 className="font-serif text-4xl md:text-5xl text-navy mb-6">Our Services</h1>
                    <p className="text-gray-600 text-lg">
                        Comprehensive real estate solutions tailored to your needs.
                        From property search to investment advisory, we've got you covered.
                    </p>
                </motion.div>
            </section>

            {/* Services Grid */}
            <section className="section-container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 border border-gray-100 hover:border-gold transition-colors group"
                        >
                            <div className="w-14 h-14 bg-navy/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors">
                                <service.icon className="w-7 h-7 text-gold" />
                            </div>
                            <h3 className="font-serif text-xl text-navy mb-3">{service.title}</h3>
                            <p className="text-gray-600 text-sm mb-6">{service.description}</p>
                            <ul className="space-y-2 mb-6">
                                {service.features.map((feature) => (
                                    <li key={feature} className="flex items-center text-gray-500 text-sm">
                                        <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="/contact"
                                className="inline-flex items-center text-navy text-sm font-medium hover:text-gold transition-colors"
                            >
                                Learn More
                                <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-container mt-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-navy p-12 text-center"
                >
                    <h2 className="font-serif text-3xl text-white mb-4">Need a Custom Solution?</h2>
                    <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                        Every client has unique requirements. Contact us to discuss how we can
                        create a tailored package that meets your specific needs.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center space-x-2 bg-gold text-navy px-8 py-4 font-medium hover:bg-gold-light transition-colors"
                    >
                        <span>Get in Touch</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}
