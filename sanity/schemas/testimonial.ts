import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'testimonial',
    title: 'Testimonial',
    type: 'document',
    fields: [
        defineField({
            name: 'clientName',
            title: 'Client Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
            description: 'e.g., Lahore, Pakistan or London, UK',
        }),
        defineField({
            name: 'review',
            title: 'Review',
            type: 'text',
            rows: 5,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'featured',
            title: 'Featured Testimonial',
            type: 'boolean',
            initialValue: false,
            description: 'Show this testimonial in featured sections',
        }),
        defineField({
            name: 'photo',
            title: 'Client Photo',
            type: 'image',
            options: {
                hotspot: true,
            },
            description: 'Profile photo of the client (optional)',
        }),
    ],
    preview: {
        select: {
            title: 'clientName',
            subtitle: 'location',
            media: 'photo',
        },
    },
});