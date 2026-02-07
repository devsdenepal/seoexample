import { getNews } from '@/lib/news';

const BASE_URL = 'https://globalgeopoliticsdaily.com';

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
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 1.0,
    }));

    // Dynamic routes based on news items
    const newsRoutes = news.map((item) => ({
        url: `${BASE_URL}/news/${item.id}`,
        lastModified: item.published_at, // Use the article's publish date
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    return [...routes, ...newsRoutes];
}
