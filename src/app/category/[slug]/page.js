import Link from 'next/link';
import { getNews } from '@/lib/news';

export async function generateStaticParams() {
    return [
        { slug: 'geopolitics' },
        { slug: 'defense' },
        { slug: 'intelligence' },
        { slug: 'cyber' },
        { slug: 'conflict' },
        { slug: 'international' },
    ];
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const title = slug.charAt(0).toUpperCase() + slug.slice(1);
    return {
        title: `${title} News | Global Geopolitics Daily`,
        description: `Latest updates and analysis on ${title} and global affairs.`,
    };
}

export default async function CategoryPage({ params }) {
    const { slug } = await params;

    const allNews = await getNews();
    const news = allNews.filter(item => item.category === slug);

    return (
        <div className="container py-5">
            <div className="row mb-4 border-bottom pb-2 align-items-center">
                <div className="col-md-6">
                    <h2 className="text-capitalize font-weight-bold text-danger mb-0">
                        <i className="fas fa-newspaper mr-2"></i> {slug} Analysis
                    </h2>
                </div>
                <div className="col-md-6 text-md-right mt-2 mt-md-0">
                    <nav aria-label="breadcrumb" className="d-inline-block">
                        <ol className="breadcrumb bg-transparent mb-0 p-0">
                            <li className="breadcrumb-item"><Link href="/" className="text-secondary">Home</Link></li>
                            <li className="breadcrumb-item active text-capitalize text-dark font-weight-bold" aria-current="page">{slug}</li>
                        </ol>
                    </nav>
                </div>
            </div>

            {news.length === 0 ? (
                <div className="alert alert-light py-5 text-center border rounded shadow-sm">
                    <div className="mb-3 text-muted" style={{ fontSize: '3rem' }}><i className="far fa-newspaper"></i></div>
                    <h4>No reports available in this sector yet.</h4>
                    <p className="text-muted">Our analysts are monitoring the situation. Please check back later.</p>
                    <Link href="/" className="btn btn-outline-danger mt-3">Return to Global Dashboard</Link>
                </div>
            ) : (
                <div className="row">
                    {news.map((item, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div className="card h-100 shadow-sm border-0 news_card">
                                <div className="position-relative overflow-hidden">
                                    <img src={item.image || "https://placehold.co/400x250"} className="card-img-top transition-zoom" alt={item.title} style={{ height: '200px', objectFit: 'cover' }} />
                                    <span className="badge badge-danger position-absolute shadow-sm" style={{ top: '10px', right: '10px', fontSize: '0.8rem' }}>{item.category}</span>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title font-weight-bold mb-2">
                                        <Link href={`/news/${item.slug}`} className="text-dark hover-danger text-decoration-none">
                                            {item.title}
                                        </Link>
                                    </h5>
                                    <p className="card-text text-muted small line-clamp-3">{item.summary}</p>
                                </div>
                                <div className="card-footer bg-white border-top-0 d-flex justify-content-between align-items-center pt-0 pb-3">
                                    <small className="text-muted">
                                        <i className="far fa-clock mr-1 text-danger"></i> {new Date(item.published_at).toLocaleDateString('ne-NP')}
                                    </small>
                                    <Link href={`/news/${item.slug}`} className="btn btn-sm btn-outline-danger font-weight-bold">Read Analysis</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
