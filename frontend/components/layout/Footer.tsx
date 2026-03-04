'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Buy', href: '/buy' },
    { label: 'Sell', href: '/sell' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-navy text-white">
            <div className="section-container py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="inline-flex items-center space-x-3 mb-6">
                            <Image
                                src="/logo.jpeg"
                                alt="Fort Era Properties and Developers"
                                width={44}
                                height={44}
                                className="rounded-full object-cover"
                            />
                            <span className="font-serif text-xl font-bold">
                                Fort Era<span className="text-gold"> Properties</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Fort Era – Lahore's premier boutique real estate advisory for discerning investors.
                            Curated properties. Trusted guidance.
                        </p>
                        <div className="space-y-3">
                            <a href="tel:+923001234567" className="flex items-center space-x-3 text-gray-300 hover:text-gold transition-colors">
                                <Phone className="w-4 h-4" />
                                <span className="text-sm">+92 300 1234567</span>
                            </a>
                            <a href="mailto:info@fortera.pk" className="flex items-center space-x-3 text-gray-300 hover:text-gold transition-colors">
                                <Mail className="w-4 h-4" />
                                <span className="text-sm">info@fortera.pk</span>
                            </a>
                            <div className="flex items-start space-x-3 text-gray-300">
                                <MapPin className="w-4 h-4 mt-0.5" />
                                <span className="text-sm">DHA Phase 6, Lahore, Pakistan</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-serif text-lg mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 text-sm hover:text-gold transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Property Types */}
                    <div>
                        <h4 className="font-serif text-lg mb-6">Property Types</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/buy?type=house" className="text-gray-400 text-sm hover:text-gold transition-colors">
                                    Luxury Houses
                                </Link>
                            </li>
                            <li>
                                <Link href="/buy?type=plot" className="text-gray-400 text-sm hover:text-gold transition-colors">
                                    Residential Plots
                                </Link>
                            </li>
                            <li>
                                <Link href="/buy?type=apartment" className="text-gray-400 text-sm hover:text-gold transition-colors">
                                    Apartments
                                </Link>
                            </li>
                            <li>
                                <Link href="/buy?type=commercial" className="text-gray-400 text-sm hover:text-gold transition-colors">
                                    Commercial
                                </Link>
                            </li>
                            <li>
                                <Link href="/buy?type=farmhouse" className="text-gray-400 text-sm hover:text-gold transition-colors">
                                    Farmhouses
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Popular Areas */}
                    <div>
                        <h4 className="font-serif text-lg mb-6">Popular Areas</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/buy?society=dha-lahore" className="text-gray-400 text-sm hover:text-gold transition-colors">
                                    DHA Lahore
                                </Link>
                            </li>
                            <li>
                                <Link href="/buy?society=bahria-town" className="text-gray-400 text-sm hover:text-gold transition-colors">
                                    Bahria Town
                                </Link>
                            </li>
                            <li>
                                <Link href="/buy?society=gulberg" className="text-gray-400 text-sm hover:text-gold transition-colors">
                                    Gulberg
                                </Link>
                            </li>
                            <li>
                                <Link href="/buy?society=bedian-road" className="text-gray-400 text-sm hover:text-gold transition-colors">
                                    Bedian Road
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
                    <p className="text-gray-500 text-sm mb-4 md:mb-0">
                        &copy; {currentYear} Fort Era Properties and Developers. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-6">
                        {legalLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-gray-500 text-sm hover:text-gold transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
