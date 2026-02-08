import Link from 'next/link';
import { getNews } from '../lib/news';

export const metadata = {
  title: 'Daily Geopolitics - Latest Nepal News, OSINT & Strategic Analysis',
  description: 'Daily Geopolitics is your source for today news for Nepal, geopolitical situation analysis, and world strategic updates.',
  openGraph: {
    title: 'Daily Geopolitics - Nepal & Global Intel',
    description: 'Latest geopolitical news from Nepal and beyond.',
    images: ['/logo.png'],
  },
};

export default async function Home() {
  const news = await getNews();

  // Find the absolute latest news with a real image for the feature
  const newsWithImages = news.filter(item => item.image && !item.image.includes('placehold.co'));
  const heroNews = newsWithImages[0] || news[0];

  return (
    <>
      <section className="recent_update mt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              {/* Featured News Hero */}
              <div className="featured_hero">
                <Link href={`/news/${heroNews.slug}`} prefetch={false}>
                  <div style={{ position: 'relative', height: '450px' }}>
                    <img
                      src={heroNews.image}
                      alt={heroNews.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div className="hero_overlay_content">
                      <span className="badge_cat">{heroNews.category}</span>
                      <h1 className="h2 font-weight-bold mb-2">{heroNews.title}</h1>
                      <p className="d-none d-md-block small mb-3">{heroNews.summary.substring(0, 180)}...</p>
                      <div className="news_meta">
                        <i className="fas fa-clock mr-1"></i> {new Date(heroNews.published_at).toLocaleDateString('ne-NP')} |
                        <i className="fas fa-bolt ml-2 mr-1"></i> Latest Update
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="section_title">
                <h2>मुख्य समाचार (Top Stories)</h2>
              </div>
              <div className="row">
                {news.filter(n => n.id !== heroNews.id).slice(0, 6).map((item, index) => (
                  <div className="col-md-6 mb-4" key={index}>
                    <div className="news_card h-100">
                      <img src={item.image || `https://placehold.co/400x250?text=${item.category}`} alt={item.title} />
                      <div className="news_content">
                        <h3><Link href={`/news/${item.slug}`} prefetch={false}>{item.title}</Link></h3>
                        <div className="news_meta">
                          <i className="fas fa-clock mr-1"></i> {new Date(item.published_at).toLocaleDateString('ne-NP')}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-md-4">
              <div className="sidebar_widget mb-4">
                <div className="section_title">
                  <h2>लोकप्रिय (Trending)</h2>
                </div>
                <ul className="list-group list-group-flush">
                  {news.slice(10, 17).map((item, index) => (
                    <li className="list-group-item bg-light mb-2 border-0" key={index}>
                      <div className="media">
                        <img src={item.image || "https://placehold.co/60x60"} className="mr-3 rounded" alt="..." style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                        <div className="media-body">
                          <h6 className="mt-0 font-weight-bold" style={{ fontSize: '13px' }}>
                            <Link href={`/news/${item.slug}`} prefetch={false}>{item.title}</Link>
                          </h6>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sidebar_widget">
                <div className="section_title">
                  <h2>सूचना (Notice)</h2>
                </div>
                <div className="bg-white p-4 text-center border rounded shadow-sm">
                  <p className="text-muted small mb-0">हाम्रो विश्लेषण भ्रामक सूचना विरुद्ध OSINT पद्धतिमा आधारित छ।</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="category_section py-4 bg-white mt-4">
        <div className="container">
          <div className="section_title">
            <h2>द्वन्द्व निगरानी (Conflict Monitor)</h2>
          </div>
          <div className="row">
            {news.filter(n => n.category === 'conflict').slice(0, 4).map((item, index) => (
              <div className="col-md-3" key={index}>
                <div className="news_card">
                  <img src={item.image || "https://placehold.co/300x200?text=Conflict"} alt={item.title} />
                  <div className="news_content p-2">
                    <h5 style={{ fontSize: '14px', fontWeight: 'bold' }}><Link href={`/news/${item.slug}`} prefetch={false}>{item.title}</Link></h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="category_section py-4">
        <div className="container">
          <div className="section_title">
            <h2>गुप्तचर विश्लेषण (OSINT/Intel)</h2>
          </div>
          <div className="row">
            {news.filter(n => n.category === 'intelligence' || n.category === 'osint').slice(0, 4).map((item, index) => (
              <div className="col-md-3" key={index}>
                <div className="news_card">
                  <img src={item.image || "https://placehold.co/300x200?text=Intel"} alt={item.title} />
                  <div className="news_content p-2">
                    <h5 style={{ fontSize: '14px', fontWeight: 'bold' }}><Link href={`/news/${item.slug}`} prefetch={false}>{item.title}</Link></h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="category_section py-4 bg-white">
        <div className="container">
          <div className="section_title">
            <h2>साइबर वारफेयर (Cyber Warfare)</h2>
          </div>
          <div className="row">
            {news.filter(n => n.category === 'cyber').slice(0, 4).map((item, index) => (
              <div className="col-md-3" key={index}>
                <div className="news_card">
                  <img src={item.image || "https://placehold.co/300x200?text=Cyber"} alt={item.title} />
                  <div className="news_content p-2">
                    <h5 style={{ fontSize: '14px', fontWeight: 'bold' }}><Link href={`/news/${item.slug}`} prefetch={false}>{item.title}</Link></h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
