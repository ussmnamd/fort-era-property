import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fortera.pk';

    // Static routes
    const routes = [
        '',
        '/buy',
        '/sell',
        '/services',
        '/about',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // In production, fetch dynamic routes from Strapi
    // const properties = await getAllPropertySlugs();
    // const propertyRoutes = properties.map((slug) => ({
    //   url: `${baseUrl}/property/${slug}`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly' as const,
    //   priority: 0.6,
    // }));

    return routes;
}
