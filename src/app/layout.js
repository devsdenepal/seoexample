import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getNews } from '../lib/news';

// Perfect SEO Metadata Configuration
export const metadata = {
  metadataBase: new URL('https://geo.itzdev.co.uk'), // Matches the primary domain
  title: {
    default: 'Global Geopolitics Daily',
    template: '%s | Global Geopolitics Daily',
  },
  description: 'Leading source for global geopolitics, OSINT analysis, defense strategy, conflict monitoring, and cyber warfare intelligence.',
  keywords: ['Geopolitics', 'OSINT', 'Cyber Warfare', 'Defense Strategy', 'Global Conflict', 'Intelligence Analysis', 'Nepal News'],
  authors: [{ name: 'Global Geopolitics Team' }],
  creator: 'Global Geopolitics Daily',
  publisher: 'Global Geopolitics Daily',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ne_NP',
    url: 'https://globalgeopoliticsdaily.com',
    siteName: 'Global Geopolitics Daily',
    title: 'Global Geopolitics Daily - OSINT & Conflict Monitor',
    description: 'In-depth analysis of global affairs, security, and strategic developments.',
    images: [
      {
        url: '/logo.png', // Uses the local logo we configured
        width: 800,
        height: 600,
        alt: 'Global Geopolitics Daily Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Global Geopolitics Daily',
    description: 'Real-time geopolitical intelligence and OSINT analysis.',
    images: ['/logo.png'],
    creator: '@GeopoliticsDaily',
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({ children }) {
  const news = await getNews();
  const tickerNews = news.slice(0, 10); // Pass recent news to ticker

  return (
    <html lang="ne">
      <head>
        {/* CDNs for styles - Kept for design stability */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Header initialNews={tickerNews} />
        {children}
        <Footer />

        {/* Bootstrap Scripts - Consider moving to a client component if interactive features break, but fine here for basic usage */}
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
      </body>
    </html>
  )
}
