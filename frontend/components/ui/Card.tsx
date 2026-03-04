'use client';

import { cn } from '@/lib/utils';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
    return (
        <div
            className={cn(
                'bg-white border border-gray-100 overflow-hidden',
                hover && 'transition-all duration-300 hover:scale-[1.02] hover:shadow-xl',
                className
            )}
        >
            {children}
        </div>
    );
}

export function CardImage({
    src,
    alt,
    className
}: {
    src: string;
    alt: string;
    className?: string;
}) {
    return (
        <div className={cn('relative overflow-hidden aspect-[4/3]', className)}>
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
        </div>
    );
}

export function CardContent({
    children,
    className
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn('p-5', className)}>
            {children}
        </div>
    );
}

export function CardTitle({
    children,
    className
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <h3 className={cn('font-serif text-xl text-navy mb-2', className)}>
            {children}
        </h3>
    );
}

export function CardText({
    children,
    className
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <p className={cn('text-gray-600 text-sm', className)}>
            {children}
        </p>
    );
}
