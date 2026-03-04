'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Testimonial } from '@/lib/types';
import { getImageUrl } from '@/lib/utils';

interface TestimonialsProps {
    testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
    return (
        <section className="py-20 bg-white">
            <div className="section-container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="gold-line mx-auto mb-4" />
                    <h2 className="section-title">What Our Clients Say</h2>
                    <p className="section-subtitle mx-auto">
                        Real experiences from our valued clients around the world
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-cream p-8 relative"
                        >
                            <Quote className="w-10 h-10 text-gold/30 absolute top-6 right-6" />

                            <p className="text-navy text-lg leading-relaxed mb-6 relative z-10">
                                &ldquo;{testimonial.review}&rdquo;
                            </p>

                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                                    {testimonial.photo?.data ? (
                                        <img
                                            src={getImageUrl(testimonial.photo, 'thumbnail')}
                                            alt={testimonial.clientName}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gold/20 flex items-center justify-center text-gold font-serif text-lg">
                                            {testimonial.clientName.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-serif text-navy">{testimonial.clientName}</h4>
                                    <p className="text-gray-500 text-sm">{testimonial.location}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
