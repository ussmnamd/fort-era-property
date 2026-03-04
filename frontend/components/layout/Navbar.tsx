'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Buy', href: '/buy' },
    { label: 'Sell', href: '/sell' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                    isScrolled
                        ? 'bg-white/95 backdrop-blur-md shadow-sm'
                        : 'bg-transparent'
                )}
            >
                <div className="section-container">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-3">
                            <Image
                                src="/logo.jpeg"
                                alt="Fort Era Properties and Developers"
                                width={44}
                                height={44}
                                className="rounded-full object-cover"
                            />
                            <span className={cn(
                                'font-serif text-xl font-bold transition-colors duration-300 leading-tight',
                                isScrolled ? 'text-navy' : 'text-white'
                            )}>
                                Fort Era<span className="text-gold"> Properties</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        'text-sm font-medium transition-colors duration-300 hover:text-gold',
                                        isScrolled ? 'text-navy' : 'text-white'
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Desktop CTA */}
                        <div className="hidden lg:flex items-center space-x-4">
                            <a
                                href="tel:+923001234567"
                                className={cn(
                                    'flex items-center space-x-2 text-sm font-medium transition-colors duration-300',
                                    isScrolled ? 'text-navy' : 'text-white'
                                )}
                            >
                                <Phone className="w-4 h-4" />
                                <span>+92 300 1234567</span>
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className={cn(
                                'lg:hidden p-2 transition-colors duration-300',
                                isScrolled ? 'text-navy' : 'text-white'
                            )}
                            aria-label="Open menu"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-navy"
                    >
                        <div className="section-container py-6">
                            <div className="flex items-center justify-between">
                                <Link href="/" className="flex items-center space-x-3">
                                    <Image
                                        src="/logo.jpeg"
                                        alt="Fort Era Properties and Developers"
                                        width={40}
                                        height={40}
                                        className="rounded-full object-cover"
                                    />
                                    <span className="font-serif text-xl font-bold text-white leading-tight">
                                        Fort Era<span className="text-gold"> Properties</span>
                                    </span>
                                </Link>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 text-white"
                                    aria-label="Close menu"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="flex flex-col items-center justify-center min-h-[60vh] space-y-8"
                            >
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + index * 0.05 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="text-3xl font-serif text-white hover:text-gold transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="pt-8"
                                >
                                    <a
                                        href="tel:+923001234567"
                                        className="flex items-center space-x-3 text-gold"
                                    >
                                        <Phone className="w-5 h-5" />
                                        <span className="text-lg">+92 300 1234567</span>
                                    </a>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
