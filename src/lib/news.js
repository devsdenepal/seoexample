import fs from 'fs';
import path from 'path';

// Helper to get all news
export async function getNews() {
    const filePath = path.join(process.cwd(), 'src', 'data', 'news.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const news = JSON.parse(fileContents);

    // Sanitize image paths
    return news.map(item => {
        // Handle local absolute paths
        const isLocalPath = item.image && (item.image.match(/^[a-zA-Z]:[\\\/]/) || item.image.startsWith('\\\\'));
        if (isLocalPath) {
            return {
                ...item,
                image: `https://placehold.co/600x400?text=${encodeURIComponent(item.category)}`
            };
        }
        // Prepend basePath for relative paths
        if (item.image && item.image.startsWith('/') && !item.image.startsWith('/seoexample')) {
            return {
                ...item,
                image: `/seoexample${item.image}`
            };
        }
        return item;
    });
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
