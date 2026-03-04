'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getWhatsAppLink, getDefaultInquiryMessage } from '@/lib/whatsapp';

export default function FinalCTA() {
    return (
        <section className="py-20 bg-navy relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            <div className="section-container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6">
                        Ready to Invest? <span className="text-gold">Let's Talk.</span>
                    </h2>
                    <p className="text-gray-300 text-lg mb-10">
                        Whether you're looking to buy your dream home, sell your property,
                        or explore investment opportunities, our team is here to guide you every step of the way.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href={getWhatsAppLink(getDefaultInquiryMessage())}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center space-x-2 bg-gold text-navy px-8 py-4 font-medium hover:bg-gold-light transition-all"
                        >
                            <span>Chat on WhatsApp</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <Link
                            href="/contact"
                            className="inline-flex items-center space-x-2 border-2 border-gold text-gold px-8 py-4 font-medium hover:bg-gold hover:text-navy transition-all"
                        >
                            <span>Contact Form</span>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
