'use client';

import { motion } from 'framer-motion';
import { ListChecks, Globe, Lock, Award } from 'lucide-react';

const features = [
    {
        icon: ListChecks,
        title: 'Curated Listings',
        description: 'Every property is personally vetted and verified by our team of experts, ensuring only the finest options for our clients.',
    },
    {
        icon: Globe,
        title: 'Overseas Network',
        description: 'Specialized services for overseas Pakistanis with virtual tours, legal assistance, and seamless transactions.',
    },
    {
        icon: Lock,
        title: 'Confidential Process',
        description: 'Discretion is our hallmark. Your privacy and the confidentiality of your transactions are guaranteed.',
    },
    {
        icon: Award,
        title: 'Expert Advisory',
        description: 'Benefit from our deep market knowledge and personalized guidance throughout your property journey.',
    },
];

export default function WhyUs() {
    return (
        <section className="py-20 bg-navy text-white">
            <div className="section-container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="w-16 h-0.5 bg-gold mx-auto mb-4" />
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">Why Choose Us</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        We combine deep local expertise with international standards of service
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 mx-auto mb-6 bg-gold/10 rounded-full flex items-center justify-center">
                                <feature.icon className="w-8 h-8 text-gold" />
                            </div>
                            <h3 className="font-serif text-xl mb-3">{feature.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
