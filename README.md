# seoexample — Daily Geopolitics

A production-style **Nepali news & geopolitical analysis site** built with Next.js (App Router). It demonstrates modern SEO patterns: server-side rendering, dynamic slugs, a `sitemap.xml`, `robots.txt`, Open Graph meta tags, and category-based routing.

## Features

- **News home** — featured hero, top stories, trending sidebar, and category sections (conflict, OSINT/intel, cyber, defense, geopolitics, international).
- **Dynamic article pages** — `/news/[slug]` with SSR per-route metadata.
- **Category pages** — `/category/[slug]` filter news by topic.
- **SEO out of the box** — `sitemap.xml`, `robots.txt`, Open Graph tags, and per-page metadata.
- **Local data source** — all articles live in `src/data/news.json` (no external DB needed).
- **Nepali locale** — dates and UI text rendered in `ne-NP`, with a breaking-news ticker.

## Tech stack

| Layer     | Tech                              |
| --------- | --------------------------------- |
| Framework | Next.js 16 (App Router)           |
| UI        | React 19, Bootstrap-style classes |
| Data      | Static `news.json` server reads   |

## Getting started

```bash
npm install

# development
npm run dev
# open http://localhost:3000

# production
npm run build
npm run start
```

## Project structure

```
src/
├── app/
│   ├── page.js                    # Home (hero + sections)
│   ├── layout.js                  # Root layout + metadata
│   ├── robots.js                  # robots.txt route
│   ├── sitemap.js                 # sitemap.xml route
│   ├── category/[slug]/page.js    # Category list pages
│   └── news/[slug]/page.js        # Article pages
├── components/
│   ├── Header.js                  # Nav + breaking-news ticker
│   ├── Footer.js
│   └── ShareButtons.js
├── data/news.json                 # Article content (source of truth)
└── lib/news.js                    # Data read + lookup helpers
```

## Adding articles

Append entries to `src/data/news.json`:

```json
{
  "id": 103,
  "slug": "your-article-slug",
  "title": "Article Title",
  "category": "geopolitics",
  "summary": "Short intro…",
  "content": "<p>Full article…</p>",
  "image": "https://…/image.jpg",
  "published_at": "2026-01-01T12:00:00Z"
}
```

Run `npm run build` — the new article is statically generated at `/news/<slug>` automatically.

## SEO specifics

- `src/app/robots.js` and `src/app/sitemap.js` generate `robots.txt` and `sitemap.xml` at build time.
- Each `[slug]/page.js` exports `generateMetadata` for per-article title/description/OG tags. *(Check the news/category pages for the current metadata helpers.)*
- Images use plain `<img>` tags; for stricter optimization, swap to `next/image`.

## Notes

- `intel`/`osint` articles combine under the **गुप्तचर विश्लेषण** (OSINT/Intel) home section; categories are defined by the string value in each article.
- The site is a demo/example of SEO architecture — review content and imagery before public deployment.

## License

MIT