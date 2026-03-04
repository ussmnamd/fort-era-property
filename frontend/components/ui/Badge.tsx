'use client';

import { cn } from '@/lib/utils';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'gold' | 'navy' | 'outline' | 'success' | 'sold';
    className?: string;
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
    const variants = {
        default: 'bg-gray-100 text-gray-800',
        gold: 'bg-gold text-white',
        navy: 'bg-navy text-white',
        outline: 'bg-transparent border border-gold text-navy',
        success: 'bg-green-100 text-green-800',
        sold: 'bg-red-100 text-red-800',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center px-3 py-1 text-xs font-medium uppercase tracking-wider',
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    );
}
