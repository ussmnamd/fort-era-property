import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'property',
    title: 'Property',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'price',
            title: 'Price (PKR)',
            type: 'number',
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: 'priceType',
            title: 'Price Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Fixed', value: 'fixed' },
                    { title: 'Negotiable', value: 'negotiable' },
                    { title: 'On Request', value: 'on-request' },
                ],
            },
            initialValue: 'fixed',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'phase',
            title: 'Phase/Block',
            type: 'string',
            description: 'e.g., Phase 1, Block A, etc.',
        }),
        defineField({
            name: 'propertyType',
            title: 'Property Type',
            type: 'string',
            options: {
                list: [
                    { title: 'House', value: 'house' },
                    { title: 'Plot', value: 'plot' },
                    { title: 'Apartment', value: 'apartment' },
                    { title: 'Commercial', value: 'commercial' },
                    { title: 'Farmhouse', value: 'farmhouse' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'sizeValue',
            title: 'Size Value',
            type: 'number',
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: 'sizeUnit',
            title: 'Size Unit',
            type: 'string',
            options: {
                list: [
                    { title: 'Marla', value: 'marla' },
                    { title: 'Kanal', value: 'kanal' },
                    { title: 'Sq. Ft.', value: 'sqft' },
                ],
            },
            initialValue: 'marla',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'bedrooms',
            title: 'Bedrooms',
            type: 'number',
            validation: (Rule) => Rule.min(0),
        }),
        defineField({
            name: 'bathrooms',
            title: 'Bathrooms',
            type: 'number',
            validation: (Rule) => Rule.min(0),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 5,
        }),
        defineField({
            name: 'investmentHighlights',
            title: 'Investment Highlights',
            type: 'text',
            rows: 3,
            description: 'Key points about why this is a good investment',
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Available', value: 'available' },
                    { title: 'Sold', value: 'sold' },
                    { title: 'Reserved', value: 'reserved' },
                ],
            },
            initialValue: 'available',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'featured',
            title: 'Featured Property',
            type: 'boolean',
            initialValue: false,
            description: 'Show this property in featured sections',
        }),
        defineField({
            name: 'coordinates',
            title: 'Map Coordinates',
            type: 'object',
            fields: [
                { name: 'lat', title: 'Latitude', type: 'number' },
                { name: 'lng', title: 'Longitude', type: 'number' },
            ],
        }),
        defineField({
            name: 'society',
            title: 'Society',
            type: 'reference',
            to: [{ type: 'society' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'featuredImage',
            title: 'Featured Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'gallery',
            title: 'Image Gallery',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
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
            title: 'title',
            subtitle: 'society.name',
            media: 'featuredImage',
        },
    },
});