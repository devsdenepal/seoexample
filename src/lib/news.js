import fs from 'fs';
import path from 'path';

// Helper to get all news
export async function getNews() {
    const filePath = path.join(process.cwd(), 'src', 'data', 'news.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
}

// Helper to get single news by ID
export async function getNewsById(id) {
    const news = await getNews();
    return news.find(item => item.id === parseInt(id));
}

// Helper to get news by category
export async function getNewsByCategory(category) {
    const news = await getNews();
    // Handle the 'international' -> 'geopolitics' mapping here if needed, 
    // or keep it in the page logic. Let's keep it simple here.
    return news.filter(item => item.category === category);
}
