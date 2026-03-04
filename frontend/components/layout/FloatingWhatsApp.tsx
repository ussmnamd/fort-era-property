'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { getWhatsAppLink, getDefaultInquiryMessage } from '@/lib/whatsapp';

export default function FloatingWhatsApp() {
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);

    const handleClick = () => {
        const message = getDefaultInquiryMessage();
        window.open(getWhatsAppLink(message), '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isTooltipOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-full right-0 mb-3 w-72 bg-white rounded-lg shadow-xl border border-gray-100 p-4"
                    >
                        <button
                            onClick={() => setIsTooltipOpen(false)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                            aria-label="Close tooltip"
                            title="Close"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <p className="text-navy font-medium text-sm mb-1">Need assistance?</p>
                        <p className="text-gray-500 text-xs mb-3">
                            Chat with us on WhatsApp for immediate support
                        </p>
                        <button
                            onClick={handleClick}
                            className="w-full bg-[#25D366] text-white text-sm font-medium py-2 px-4 rounded-full hover:bg-[#128C7E] transition-colors"
                        >
                            Start Chat
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => isTooltipOpen ? handleClick() : setIsTooltipOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
                aria-label="Chat on WhatsApp"
            >
                <MessageCircle className="w-7 h-7" fill="currentColor" />

                {/* Pulse Animation */}
                <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
            </motion.button>
        </div>
    );
}
