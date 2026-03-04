'use client';

import { motion } from 'framer-motion';
import { Award, Users, Building, TrendingUp } from 'lucide-react';

const stats = [
    { icon: Building, value: '500+', label: 'Properties Sold' },
    { icon: Users, value: '300+', label: 'Happy Clients' },
    { icon: Award, value: '10+', label: 'Years Experience' },
    { icon: TrendingUp, value: '95%', label: 'Client Satisfaction' },
];

const values = [
    {
        title: 'Integrity',
        description: 'We believe in transparent dealings and honest advice. Your trust is our most valuable asset.',
    },
    {
        title: 'Excellence',
        description: 'We maintain the highest standards in everything we do, from property selection to client service.',
    },
    {
        title: 'Discretion',
        description: 'We understand the importance of privacy in high-value transactions and maintain strict confidentiality.',
    },
    {
        title: 'Innovation',
        description: 'We leverage technology and market insights to provide cutting-edge solutions for our clients.',
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-cream pt-24 pb-16">
            {/* Hero */}
            <section className="section-container mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="gold-line mb-4" />
                        <h1 className="font-serif text-4xl md:text-5xl text-navy mb-6">
                            Lahore's Trusted Real Estate Advisors
                        </h1>
                        <p className="text-gray-600 text-lg mb-6">
                            For over a decade, Fort Era Properties and Developers has been the premier choice for discerning buyers
                            and sellers in Lahore's luxury property market. Our boutique approach ensures
                            personalized attention and exceptional results for every client.
                        </p>
                        <p className="text-gray-600">
                            Founded with a vision to transform the real estate experience, we combine
                            deep local expertise with international service standards. Our team of
                            seasoned professionals brings together decades of experience in luxury
                            real estate, investment advisory, and property management.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative"
                    >
                        <div className="aspect-[4/3] bg-gray-200">
                            <img
                                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
                                alt="Luxury building"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-navy py-16 mb-16">
                <div className="section-container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <stat.icon className="w-8 h-8 text-gold mx-auto mb-4" />
                                <p className="font-serif text-3xl md:text-4xl text-white mb-2">{stat.value}</p>
                                <p className="text-gray-400 text-sm">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section-container mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="gold-line mx-auto mb-4" />
                    <h2 className="font-serif text-3xl text-navy mb-4">Our Values</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        The principles that guide everything we do
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {values.map((value, index) => (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 border border-gray-100"
                        >
                            <h3 className="font-serif text-xl text-navy mb-3">{value.title}</h3>
                            <p className="text-gray-600">{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Mission */}
            <section className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gold/10 p-12 text-center"
                >
                    <h2 className="font-serif text-3xl text-navy mb-6">Our Mission</h2>
                    <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
                        To redefine the luxury real estate experience in Lahore by combining
                        personalized service, market expertise, and unwavering integrity. We
                        strive to be the trusted partner for every client's property journey,
                        whether they are buying their dream home, selling a cherished property,
                        or building an investment portfolio.
                    </p>
                </motion.div>
            </section>
        </div>
    );
}
