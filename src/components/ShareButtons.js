'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ShareButtons({ title, slug }) {
    const [shareUrl, setShareUrl] = useState('');

    useEffect(() => {
        setShareUrl(window.location.href);
    }, []);

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + shareUrl)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    };

    const handleShare = (platform) => {
        window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    };

    return (
        <div className="share-icons mt-5">
            <h5 className="mb-3 font-weight-bold">यो विश्लेषण शेयर गर्नुहोस्:</h5>
            <button
                onClick={() => handleShare('facebook')}
                className="btn btn-primary btn-sm mr-2 shadow-sm"
            >
                <i className="fab fa-facebook-f mr-1"></i> Facebook
            </button>
            <button
                onClick={() => handleShare('twitter')}
                className="btn btn-info btn-sm mr-2 shadow-sm text-white"
            >
                <i className="fab fa-twitter mr-1"></i> Twitter
            </button>
            <button
                onClick={() => handleShare('whatsapp')}
                className="btn btn-success btn-sm mr-2 shadow-sm"
            >
                <i className="fab fa-whatsapp mr-1"></i> Whatsapp
            </button>
            <button
                onClick={() => handleShare('linkedin')}
                className="btn btn-secondary btn-sm shadow-sm"
            >
                <i className="fab fa-linkedin-in mr-1"></i> LinkedIn
            </button>
        </div>
    );
}
