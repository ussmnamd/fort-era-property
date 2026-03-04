/**
 * WhatsApp Link Generator
 * Creates pre-filled WhatsApp message links for the luxury real estate platform
 */

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923001234567';

/**
 * Generate a WhatsApp click-to-chat link with pre-filled message
 */
export function getWhatsAppLink(message: string): string {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

/**
 * Default inquiry message for general property inquiries
 */
export function getDefaultInquiryMessage(): string {
    return "Hello, I'd like to inquire about a property.";
}

/**
 * Generate inquiry message for a specific property
 */
export function getPropertyInquiryMessage(propertyTitle: string, slug: string): string {
    return `Hello, I'm interested in the property "${propertyTitle}" (${slug}). Could you please provide more information?`;
}

/**
 * Generate message for overseas investors
 */
export function getOverseasInvestorMessage(): string {
    return "I'm an overseas investor and would like guidance on properties in Lahore.";
}

/**
 * Generate message for property valuation
 */
export function getValuationMessage(): string {
    return "I'd like to schedule a free valuation for my property.";
}

/**
 * Generate message for selling property
 */
export function getSellingMessage(): string {
    return "I'm interested in selling my property through your advisory service.";
}

/**
 * Generate message for scheduling a viewing
 */
export function getViewingMessage(propertyTitle: string): string {
    return `I'd like to schedule a private viewing for "${propertyTitle}".`;
}

/**
 * Open WhatsApp in a new tab
 */
export function openWhatsApp(message: string): void {
    if (typeof window !== 'undefined') {
        window.open(getWhatsAppLink(message), '_blank', 'noopener,noreferrer');
    }
}

/**
 * WhatsApp CTA Button Component Props Helper
 */
export interface WhatsAppCTAProps {
    message?: string;
    className?: string;
    children?: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'floating';
}
