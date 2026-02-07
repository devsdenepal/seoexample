export const dynamic = 'force-static';

const BASE_URL = 'https://globalgeopoliticsdaily.com';

export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}
