'use client';

import { motion } from 'framer-motion';
import { Globe, Shield, Video, FileCheck } from 'lucide-react';
import { getWhatsAppLink, getOverseasInvestorMessage } from '@/lib/whatsapp';

const benefits = [
    {
        icon: Video,
        title: 'Virtual Tours',
        description: 'High-definition video walkthroughs of every property',
    },
    {
        icon: Shield,
        title: 'Secure Transactions',
        description: 'End-to-end support with verified documentation',
    },
    {
        icon: FileCheck,
        title: 'Legal Assistance',
        description: 'Complete legal support for overseas buyers',
    },
];

export default function OverseasSection() {
    return (
        <section className="py-20 bg-cream">
            <div className="section-container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="gold-line mb-4" />
                        <h2 className="section-title">
                            Trusted by Pakistanis Across the Globe
                        </h2>
                        <p className="section-subtitle mb-8">
                            We specialize in helping overseas Pakistanis from the UK, USA, UAE, and beyond
                            invest confidently in Lahore's premium real estate market. Our dedicated team
                            ensures a seamless experience from initial inquiry to final possession.
                        </p>

                        {/* Benefits */}
                        <div className="space-y-6 mb-8">
                            {benefits.map((benefit) => (
                                <div key={benefit.title} className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center flex-shrink-0">
                                        <benefit.icon className="w-6 h-6 text-gold" />
                                    </div>
                                    <div>
                                        <h4 className="font-serif text-lg text-navy mb-1">{benefit.title}</h4>
                                        <p className="text-gray-600 text-sm">{benefit.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <a
                            href={getWhatsAppLink(getOverseasInvestorMessage())}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 bg-gold text-navy px-8 py-4 font-medium hover:bg-gold-light transition-colors"
                        >
                            <Globe className="w-5 h-5" />
                            <span>Connect as Overseas Investor</span>
                        </a>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-[4/3] overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80"
                                alt="Luxury property"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Stats Card */}
                        <div className="absolute -bottom-6 -left-6 bg-navy text-white p-6 shadow-xl">
                            <p className="text-4xl font-serif text-gold mb-1">500+</p>
                            <p className="text-sm text-gray-300">Overseas Clients Served</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
