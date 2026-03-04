'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { Society } from '@/lib/types';
import { formatPercentageChange, getPercentageChangeColor, getImageUrl } from '@/lib/utils';

interface SocietyGridProps {
    societies: Society[];
}

export default function SocietyGrid({ societies }: SocietyGridProps) {
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
                    <h2 className="section-title">Browse by Society</h2>
                    <p className="section-subtitle mx-auto">
                        Explore Lahore's most prestigious residential communities
                    </p>
                </motion.div>

                {/* Society Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {societies.map((society, index) => (
                        <motion.div
                            key={society.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={`/buy?society=${society.slug}`}>
                                <div className="group relative h-80 overflow-hidden">
                                    {/* Background Image */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{
                                            backgroundImage: `url(${getImageUrl(society.coverImage, 'medium')})`,
                                        }}
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                                    {/* Content */}
                                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                        <h3 className="font-serif text-2xl text-white mb-2 group-hover:text-gold transition-colors">
                                            {society.name}
                                        </h3>

                                        {society.averagePricePerMarla && (
                                            <p className="text-gray-300 text-sm mb-3">
                                                Avg. PKR {(society.averagePricePerMarla / 100000).toFixed(1)} Lakh/Marla
                                            </p>
                                        )}

                                        {society.appreciationPercent !== undefined && (
                                            <div className="flex items-center space-x-2 mb-4">
                                                <TrendingUp className="w-4 h-4 text-green-400" />
                                                <span className={`text-sm ${getPercentageChangeColor(society.appreciationPercent)}`}>
                                                    {formatPercentageChange(society.appreciationPercent)} appreciation
                                                </span>
                                            </div>
                                        )}

                                        <div className="flex items-center text-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
                                            <span>Explore Properties</span>
                                            <ArrowUpRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
