import Link from 'next/link';
import { getNewsById } from '@/lib/news';

export async function generateMetadata({ params }) {
    const { id } = await params;
    const news = await getNewsById(id);

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
    const { id } = await params;
    const news = await getNewsById(id);

    if (!news) {
        return (
            <div className="container py-5 text-center alert alert-danger">
                <h3>News Not Found</h3>
                <p>The news article you are looking for does not exist.</p>
                <Link href="/" className="btn btn-outline-secondary">Go Home</Link>
            </div>
        );
    }

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
            {/* Add JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="row">
                <div className="col-12 mb-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                            <li className="breadcrumb-item"><Link href={`/category/${news.category}`}>{news.category}</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{news.title}</li>
                        </ol>
                    </nav>
                </div>

                <div className="col-lg-8">
                    <h1 className="mb-3 font-weight-bold display-4">{news.title}</h1>

                    <div className="d-flex align-items-center mb-4 text-muted border-bottom pb-2">
                        <span className="mr-3"><i className="far fa-user mr-1"></i> Special Correspondent</span>
                        <span className="mr-3"><i className="far fa-clock mr-1"></i> {new Date(news.published_at).toLocaleDateString('ne-NP')}</span>
                        <span className="badge badge-primary px-3 py-2 text-white">{news.category}</span>
                    </div>

                    <img src={news.image || "https://placehold.co/800x500"} className="img-fluid rounded mb-4 w-100 shadow-sm" alt={news.title} />

                    <div className="news-body lead text-justify">
                        <p>{news.summary}</p>
                        <p><strong>[विस्तृत विश्लेषण]</strong></p>
                        <p>काठमाडौं — {news.summary} थप विवरण आउन बाँकी छ। यस घटनाको बारेमा सम्बन्धित निकायले अनुसन्धान सुरु गरेको छ।</p>
                        <p>स्थानीय प्रत्यक्षदर्शीका अनुसार, घटनाको समय र स्थान निकै संवेदनशील क्षेत्र हो। यसले क्षेत्रीय सुरक्षामा गम्भीर असर पार्न सक्ने विश्लेषकहरूको भनाइ छ।</p>
                        <blockquote className="blockquote border-left pl-3 my-4 text-secondary font-italic">
                            "हामी यस विषयमा गम्भीर छौं र दोषीलाई कारबाही गरिनेछ। यो कुनै सामान्य घटना होइन, यसको पछाडि ठूलो भू-राजनीतिक स्वार्थ लुकेको हुन सक्छ।" - सुरक्षा विज्ञ
                        </blockquote>
                        <p>थप जानकारीका लागि ग्लोबल जियोपोलिटिक्स डेली हेर्दै गर्नुहोला।</p>
                    </div>

                    <div className="share-icons mt-5">
                        <h5 className="mb-3">Share this analysis:</h5>
                        <button className="btn btn-primary btn-sm mr-2"><i className="fab fa-facebook-f"></i> Facebook</button>
                        <button className="btn btn-info btn-sm mr-2"><i className="fab fa-twitter"></i> Twitter</button>
                        <button className="btn btn-success btn-sm"><i className="fab fa-whatsapp"></i> Whatsapp</button>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="bg-light p-4 rounded mb-4 sticky-top" style={{ top: '20px' }}>
                        <h4 className="mb-3 border-bottom pb-2">Related Analysis</h4>
                        <ul className="list-unstyled">
                            <li className="media mb-3">
                                <img src="https://placehold.co/100x80" className="mr-3 rounded" alt="..." />
                                <div className="media-body">
                                    <h6 className="mt-0 mb-1"><a href="#" className="text-dark">Satellite images confirm new build-up</a></h6>
                                    <small className="text-muted">Feb 12, 2024</small>
                                </div>
                            </li>
                            <li className="media mb-3">
                                <img src="https://placehold.co/100x80" className="mr-3 rounded" alt="..." />
                                <div className="media-body">
                                    <h6 className="mt-0 mb-1"><a href="#" className="text-dark">New cyber threat group identified</a></h6>
                                    <small className="text-muted">Feb 11, 2024</small>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white p-4 rounded border text-center">
                        <h5>Partner Content</h5>
                        <img src="https://placehold.co/300x250?text=Defense+Expo" className="img-fluid" alt="Ad" />
                    </div>
                </div>
            </div>
        </div>
    );
}
