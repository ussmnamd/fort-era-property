'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { getWhatsAppLink, getDefaultInquiryMessage } from '@/lib/whatsapp';

export default function Hero() {
    return (
        <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80)',
                    }}
                />
                <div className="absolute inset-0 bg-navy/60" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 section-container text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Gold Accent Line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="w-16 h-0.5 bg-gold mx-auto mb-8"
                    />

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-semibold leading-tight mb-6"
                    >
                        Curated Properties.
                        <br />
                        <span className="text-gold">Trusted Guidance.</span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
                    >
                        Lahore's premier boutique real estate advisory for discerning investors
                    </motion.p>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="max-w-xl mx-auto mb-10"
                    >
                        <div className="relative flex items-center">
                            <Search className="absolute left-4 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by society or location..."
                                className="w-full pl-12 pr-32 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors"
                            />
                            <Link
                                href="/buy"
                                className="absolute right-2 bg-gold text-navy px-6 py-2 font-medium hover:bg-gold-light transition-colors"
                            >
                                Search
                            </Link>
                        </div>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            href="/buy"
                            className="group inline-flex items-center space-x-2 bg-gold text-navy px-8 py-4 font-medium hover:bg-gold-light transition-all"
                        >
                            <span>Explore Properties</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a
                            href={getWhatsAppLink(getDefaultInquiryMessage())}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 border-2 border-white/30 text-white px-8 py-4 font-medium hover:bg-white hover:text-navy transition-all"
                        >
                            <span>Speak to an Advisor</span>
                        </a>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
                    >
                        <div className="w-1 h-2 bg-white/60 rounded-full" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
