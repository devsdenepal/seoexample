export const dynamic = 'force-static';

const BASE_URL = 'https://geo.itzdev.co.uk/seoexample';

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
