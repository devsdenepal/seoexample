import Link from 'next/link';
import { getNews } from '../lib/news';

export const metadata = {
  title: 'Global Geopolitics Daily - Latest OSINT, Conflict, and Cyber Warfare News',
  description: 'Your premier source for global geopolitics, conflict monitoring, OSINT analysis, defense strategy, and cyber warfare updates.',
  openGraph: {
    title: 'Global Geopolitics Daily',
    description: 'Latest OSINT, Conflict, and Cyber Warfare News for professionals and enthusiasts.',
    images: ['/logo.png'],
  },
};

export default async function Home() {
  const news = await getNews();
  const displayNews = [...news, ...news]; // Duplicate for UI fill if needed

  return (
    <>
      <section className="recent_update mt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="section_title">
                <h2>मुख्य समाचार (Top Stories)</h2>
              </div>
              <div className="row">
                {displayNews.slice(0, 1).map((item, index) => (
                  <div className="col-md-12 mb-4" key={index}>
                    <div className="news_card">
                      <img src={item.image || "https://placehold.co/800x400?text=Main+News"} alt={item.title} style={{ height: '400px' }} />
                      <div className="news_content">
                        <h1 className="h3 font-weight-bold"><Link href={`/news/${item.id}`}>{item.title}</Link></h1>
                        <p className="lead">{item.summary}</p>
                        <div className="news_meta">
                          <i className="fas fa-clock mr-1"></i> {new Date(item.published_at).toLocaleTimeString('ne-NP')} |
                          <i className="fas fa-tags ml-2 mr-1"></i> {item.category}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="row">
                {displayNews.slice(1, 5).map((item, index) => (
                  <div className="col-md-6 mb-4" key={index}>
                    <div className="news_card">
                      <img src={item.image || `https://placehold.co/400x250?text=News+${index}`} alt={item.title} />
                      <div className="news_content">
                        <h3><Link href={`/news/${item.id}`}>{item.title}</Link></h3>
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
                  {displayNews.slice(2, 7).map((item, index) => (
                    <li className="list-group-item bg-light mb-2 border-0" key={index}>
                      <div className="media">
                        <img src={item.image || "https://placehold.co/60x60"} className="mr-3 rounded" alt="..." style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                        <div className="media-body">
                          <h6 className="mt-0 font-weight-bold"><Link href={`/news/${item.id}`}>{item.title}</Link></h6>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sidebar_widget">
                <div className="section_title">
                  <h2>विज्ञापन</h2>
                </div>
                <div className="bg-light p-5 text-center text-muted border">
                  Geopolitics Ad Space
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="category_section py-4 bg-white">
        <div className="container">
          <div className="section_title">
            <h2>द्वन्द्व निगरानी (Conflict Monitor)</h2>
          </div>
          <div className="row">
            {displayNews.filter(n => n.category === 'conflict').slice(0, 4).map((item, index) => (
              <div className="col-md-3" key={index}>
                <div className="news_card">
                  <img src={item.image || "https://placehold.co/300x200?text=Conflict"} alt={item.title} />
                  <div className="news_content p-2">
                    <h5 style={{ fontSize: '16px' }}><Link href={`/news/${item.id}`}>{item.title}</Link></h5>
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
            {displayNews.filter(n => n.category === 'intelligence' || n.category === 'osint').slice(0, 4).map((item, index) => (
              <div className="col-md-3" key={index}>
                <div className="news_card">
                  <img src={item.image || "https://placehold.co/300x200?text=Intel"} alt={item.title} />
                  <div className="news_content p-2">
                    <h5 style={{ fontSize: '16px' }}><Link href={`/news/${item.id}`}>{item.title}</Link></h5>
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
            {displayNews.filter(n => n.category === 'cyber').slice(0, 4).map((item, index) => (
              <div className="col-md-3" key={index}>
                <div className="news_card">
                  <img src={item.image || "https://placehold.co/300x200?text=Cyber"} alt={item.title} />
                  <div className="news_content p-2">
                    <h5 style={{ fontSize: '16px' }}><Link href={`/news/${item.id}`}>{item.title}</Link></h5>
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
