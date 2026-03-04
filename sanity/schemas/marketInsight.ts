import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'marketInsight',
    title: 'Market Insight',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
            description: 'e.g., "DHA Phase 8 Market Update - Q1 2024"',
        }),
        defineField({
            name: 'society',
            title: 'Society',
            type: 'reference',
            to: [{ type: 'society' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'pricePerMarla',
            title: 'Current Price Per Marla (PKR)',
            type: 'number',
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: 'quarterlyChange',
            title: 'Quarterly Change (%)',
            type: 'number',
            description: 'Price change percentage from last quarter (can be negative)',
        }),
        defineField({
            name: 'insight',
            title: 'Market Insight',
            type: 'text',
            rows: 5,
            validation: (Rule) => Rule.required(),
            description: 'Detailed analysis and insights about the market trends',
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'society.name',
        },
    },
});