import fs from 'fs';
import path from 'path';

// Helper to get all news
export async function getNews() {
    const filePath = path.join(process.cwd(), 'src', 'data', 'news.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const news = JSON.parse(fileContents);

    // Sort news by date descending
    news.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

    return news;
}

// Helper to get single news by ID
export async function getNewsById(id) {
    const news = await getNews();
    return news.find(item => item.id === parseInt(id));
}

// Helper to get single news by Slug
export async function getNewsBySlug(slug) {
    const news = await getNews();
    return news.find(item => item.slug === slug);
}

// Helper to get news by category
export async function getNewsByCategory(category) {
    const news = await getNews();
    return news.filter(item => item.category === category);
}
