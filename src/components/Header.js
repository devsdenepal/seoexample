'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header({ initialNews = [] }) {
    const [newsTicker, setNewsTicker] = useState(initialNews);
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        // Set date on client side to avoid hydration mismatch
        setCurrentDate(new Date().toLocaleDateString('ne-NP', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    }, []);

    return (
        <header>
            <div className="top_header">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-3">
                            <div className="logo_area">
                                <Link href="/" prefetch={false}>
                                    <img src="/logo.png" alt="logo" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="time_date text-secondary">
                                <p><span><i className="fas fa-map-marker-alt mr-2"></i></span>काठमाडौं, {currentDate}</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="header_social">
                                <ul>
                                    <li className="facebook"><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                    <li className="twitter"><a href="#"><i className="fab fa-twitter"></i></a></li>
                                    <li className="youtube"><a href="#"><i className="fab fa-youtube"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bottom_header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="manu_area">
                                <ul>
                                    <li className="active"><Link href="/" prefetch={false}><i className="fas fa-globe"></i> ग्लोबल</Link></li>
                                    <li><Link href="/category/geopolitics" prefetch={false}>भू-राजनीति</Link></li>
                                    <li><Link href="/category/defense" prefetch={false}>रक्षा रणनीति</Link></li>
                                    <li><Link href="/category/intelligence" prefetch={false}>गुप्तचर/OSINT</Link></li>
                                    <li><Link href="/category/cyber" prefetch={false}>साइबर सुरक्षा</Link></li>
                                    <li><Link href="/category/conflict" prefetch={false}>द्वन्द्व</Link></li>
                                    <li><Link href="/category/international" prefetch={false}>अन्तर्राष्ट्रिय</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="breakingnews_section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="breaking_title">
                                <h2>ताजा समाचार</h2>
                                <div className="ticker_wrapper">
                                    <div className="breaking_ticker">
                                        {newsTicker.length > 0 ? (
                                            newsTicker.map((item, index) => (
                                                <span key={index} className="mr-5">
                                                    <i className="fas fa-dot-circle text-danger mr-2"></i>
                                                    <Link href={`/news/${item.slug}`} prefetch={false} className="text-white hover-info">{item.title}</Link>
                                                </span>
                                            ))
                                        ) : (
                                            <span className="mr-5">ताजा समाचार लोड हुँदैछ...</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </header>
    );
}
