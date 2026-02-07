import Link from 'next/link';
import { getNewsBySlug, getNewsByCategory } from '@/lib/news';
import ShareButtons from '@/components/ShareButtons';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const news = await getNewsBySlug(slug);

    if (!news) {
        return {
            title: 'News Not Found',
        };
    }

    return {
        title: `${news.title} | Global Geopolitics`,
        description: news.summary,
        openGraph: {
            title: news.title,
            description: news.summary,
            images: [news.image],
            type: 'article',
            publishedTime: news.published_at,
        },
        twitter: {
            card: 'summary_large_image',
            title: news.title,
            description: news.summary,
            images: [news.image],
        },
    };
}

export default async function NewsDetailPage({ params }) {
    const { slug } = await params;
    const news = await getNewsBySlug(slug);

    if (!news) {
        return (
            <div className="container py-5 text-center alert alert-danger mt-5">
                <h3>रिपोर्ट फेला परेन (News Not Found)</h3>
                <p>तपाईंले खोज्नुभएको समाचार उपलब्ध छैन।</p>
                <Link href="/" className="btn btn-outline-secondary">मुख्य पृष्ठमा जानुहोस्</Link>
            </div>
        );
    }

    const relatedNews = (await getNewsByCategory(news.category))
        .filter(item => item.id !== news.id)
        .slice(0, 4);

    // JSON-LD Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: news.title,
        image: [news.image],
        datePublished: news.published_at,
        dateModified: news.published_at,
        description: news.summary,
        author: {
            '@type': 'Organization',
            name: 'Global Geopolitics Daily',
            url: 'https://globalgeopoliticsdaily.com'
        }
    };

    return (
        <div className="container py-5">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="row">
                <div className="col-12 mb-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb bg-transparent p-0">
                            <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                            <li className="breadcrumb-item text-capitalize"><Link href={`/category/${news.category}`}>{news.category}</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{news.title.slice(0, 30)}...</li>
                        </ol>
                    </nav>
                </div>

                <div className="col-lg-8">
                    <h1 className="mb-3 font-weight-bold display-4" style={{ fontSize: '2.5rem', lineHeight: '1.2' }}>{news.title}</h1>

                    <div className="d-flex align-items-center mb-4 text-muted border-bottom pb-2">
                        <span className="mr-3"><i className="far fa-user mr-1 text-danger"></i> विशेष प्रतिनिधि</span>
                        <span className="mr-3"><i className="far fa-clock mr-1 text-danger"></i> {new Date(news.published_at).toLocaleDateString('ne-NP')}</span>
                        <span className="badge badge-danger px-3 py-2 text-white">{news.category}</span>
                    </div>

                    <div className="news-image-wrapper mb-4 shadow-sm rounded overflow-hidden">
                        <img src={news.image || "https://placehold.co/800x500?text=Geopolitical+Intelligence"} className="img-fluid w-100" alt={news.title} />
                    </div>

                    <div className="news-body lead text-justify" style={{ lineHeight: '1.8' }}>
                        <p className="font-weight-bold">{news.summary}</p>
                        <p><strong>[पूर्ण प्रतिवेदन]</strong></p>
                        <p>{news.summary}</p>
                        <p>यस विषयमा थप जानकारी प्राप्त हुने क्रममा छ। स्थानीय र अन्तर्राष्ट्रिय प्रभावहरूको विस्तृत अध्ययन भइरहेको छ।</p>
                    </div>

                    <ShareButtons title={news.title} slug={news.slug} />
                </div>

                <div className="col-lg-4">
                    <div className="sidebar_widget mb-4 sticky-top" style={{ top: '20px' }}>
                        <div className="section_title">
                            <h2>सम्बन्धित विश्लेषण</h2>
                        </div>
                        <ul className="list-unstyled">
                            {relatedNews.length > 0 ? (
                                relatedNews.map((item, index) => (
                                    <li className="media mb-3 pb-3 border-bottom" key={index}>
                                        <img src={item.image || "https://placehold.co/100x80"} className="mr-3 rounded" alt={item.title} style={{ width: '100px', height: '80px', objectFit: 'cover' }} />
                                        <div className="media-body">
                                            <h6 className="mt-0 mb-1 font-weight-bold">
                                                <Link href={`/news/${item.slug}`} className="text-dark hover-danger">
                                                    {item.title}
                                                </Link>
                                            </h6>
                                            <small className="text-muted"><i className="far fa-clock mr-1"></i> {new Date(item.published_at).toLocaleDateString('ne-NP')}</small>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p className="text-muted">No related reports found.</p>
                            )}
                        </ul>

                        <div className="bg-light p-4 rounded border text-center mt-4">
                            <h5 className="font-weight-bold mb-3">सुरक्षा सूचना (Notice)</h5>
                            <p className="small text-muted mb-0">यो प्रतिवेदन आधिकारिक स्रोतहरू र OSINT विश्लेषणमा आधारित छ।</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
