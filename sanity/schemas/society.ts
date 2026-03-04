import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'society',
    title: 'Society',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Society Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'overview',
            title: 'Overview',
            type: 'text',
            rows: 5,
            description: 'General description of the society',
        }),
        defineField({
            name: 'investmentInsight',
            title: 'Investment Insight',
            type: 'text',
            rows: 3,
            description: 'Why is this society good for investment?',
        }),
        defineField({
            name: 'familyInsight',
            title: 'Family Insight',
            type: 'text',
            rows: 3,
            description: 'Why is this society good for families?',
        }),
        defineField({
            name: 'averagePricePerMarla',
            title: 'Average Price Per Marla (PKR)',
            type: 'number',
            description: 'Current market average price',
        }),
        defineField({
            name: 'appreciationPercent',
            title: 'Appreciation Percentage',
            type: 'number',
            description: 'Annual price appreciation percentage',
        }),
        defineField({
            name: 'mapEmbed',
            title: 'Map Embed URL',
            type: 'url',
            description: 'Google Maps embed URL for the society location',
        }),
        defineField({
            name: 'featured',
            title: 'Featured Society',
            type: 'boolean',
            initialValue: false,
            description: 'Show this society in featured sections',
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            description: 'Main image representing the society',
        }),
        defineField({
            name: 'seoTitle',
            title: 'SEO Title',
            type: 'string',
            description: 'Title for search engines (optional)',
        }),
        defineField({
            name: 'seoDescription',
            title: 'SEO Description',
            type: 'text',
            rows: 2,
            description: 'Description for search engines (optional)',
        }),
    ],
    preview: {
        select: {
            title: 'name',
            media: 'coverImage',
        },
    },
});