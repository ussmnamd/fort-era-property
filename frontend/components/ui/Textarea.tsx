'use client';

import { cn } from '@/lib/utils';
import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, rows = 4, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-navy mb-2">
                        {label}
                        {props.required && <span className="text-gold ml-1">*</span>}
                    </label>
                )}
                <textarea
                    ref={ref}
                    rows={rows}
                    className={cn(
                        'w-full px-4 py-3 bg-white border border-gray-200 text-navy placeholder-gray-400 resize-none',
                        'focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold',
                        'transition-colors duration-200',
                        error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';

export default Textarea;
