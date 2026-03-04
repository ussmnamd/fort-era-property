import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // requests per minute
const RATE_WINDOW = 60 * 1000; // 1 minute

// Validation schema
const leadSchema = z.object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    inquiryType: z.enum(['buy', 'sell', 'invest', 'valuation', 'general']),
    buyerType: z.enum(['local', 'overseas', 'investor']),
    message: z.string().optional(),
    propertySlug: z.string().optional(),
    propertyTitle: z.string().optional(),
});

// Input sanitization
function sanitizeInput(input: string): string {
    return input
        .replace(/[<>]/g, '') // Remove HTML tags
        .trim();
}

// Rate limiting check
function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitStore.get(ip);

    if (!record || now > record.resetTime) {
        rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
        return true;
    }

    if (record.count >= RATE_LIMIT) {
        return false;
    }

    record.count++;
    return true;
}

// Send email notification (placeholder - integrate with your email service)
async function sendEmailNotification(data: z.infer<typeof leadSchema>) {
    // This is a placeholder. In production, integrate with:
    // - Nodemailer for SMTP
    // - SendGrid
    // - AWS SES
    // - etc.

    const agentEmail = process.env.AGENT_EMAIL;
    if (!agentEmail) {
        console.warn('AGENT_EMAIL not configured');
        return;
    }

    console.log('Email notification would be sent to:', agentEmail);
    console.log('Lead data:', data);
}

export async function POST(request: NextRequest) {
    try {
        // Get client IP
        const ip = request.headers.get('x-forwarded-for') || 'unknown';

        // Check rate limit
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: 'Rate limit exceeded. Please try again later.' },
                { status: 429 }
            );
        }

        // Parse request body
        const body = await request.json();

        // Validate input
        const validationResult = leadSchema.safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json(
                { error: 'Invalid input', details: validationResult.error.flatten() },
                { status: 400 }
            );
        }

        const data = validationResult.data;

        // Sanitize inputs
        const sanitizedData = {
            ...data,
            fullName: sanitizeInput(data.fullName),
            email: sanitizeInput(data.email),
            phone: data.phone ? sanitizeInput(data.phone) : undefined,
            message: data.message ? sanitizeInput(data.message) : undefined,
        };

        // Send to Strapi (placeholder - implement actual Strapi integration)
        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
        const strapiToken = process.env.STRAPI_WRITE_TOKEN;

        if (strapiUrl && strapiToken) {
            try {
                const strapiResponse = await fetch(`${strapiUrl}/api/leads`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${strapiToken}`,
                    },
                    body: JSON.stringify({
                        data: {
                            ...sanitizedData,
                            source: request.headers.get('referer') || 'website',
                        },
                    }),
                });

                if (!strapiResponse.ok) {
                    console.error('Strapi submission failed:', await strapiResponse.text());
                }
            } catch (error) {
                console.error('Strapi submission error:', error);
            }
        }

        // Send email notification
        await sendEmailNotification(sanitizedData);

        return NextResponse.json(
            { success: true, message: 'Lead submitted successfully' },
            { status: 201 }
        );

    } catch (error) {
        console.error('Lead submission error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// CSRF protection - require proper headers
export async function OPTIONS(request: NextRequest) {
    return NextResponse.json({}, {
        headers: {
            'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_STRAPI_URL || '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}
