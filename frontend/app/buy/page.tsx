import { Suspense } from 'react';
import BuyPageClient from './BuyPageClient';

export default function BuyPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-cream pt-24 flex items-center justify-center"><div className="text-navy">Loading...</div></div>}>
            <BuyPageClient />
        </Suspense>
    );
}
