export const dynamic = 'force-static';
import { getNews } from '@/lib/news';

const BASE_URL = 'https://geo.itzdev.co.uk';

export default async function sitemap() {
    const news = await getNews();

    // Static routes
    const routes = [
        '',
        '/category/geopolitics',
        '/category/defense',
        '/category/intelligence',
        '/category/cyber',
        '/category/conflict',
        '/category/international',
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 1.0,
    }));

    // Dynamic routes based on news items using slugs
    const newsRoutes = news.map((item) => ({
        url: `${BASE_URL}/news/${item.slug}`,
        lastModified: item.published_at,
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    return [...routes, ...newsRoutes];
}
