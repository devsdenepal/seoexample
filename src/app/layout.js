import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getNews } from '../lib/news';

// Comprehensive SEO Metadata Configuration for Daily Geopolitics
export const metadata = {
  metadataBase: new URL('https://geo.itzdev.co.uk'),
  title: {
    default: 'Daily Geopolitics - Nepal News & Global Analysis',
    template: '%s | Daily Geopolitics',
  },
  description: 'Daily Geopolitics provides the latest news about Nepal today, including geopolitical situations, political scenarios of Nepal, and global defense strategy updates.',
  keywords: [
    'Daily Geopolitics', 'Nepal News Today', 'Political Scenario of Nepal',
    'Geopolitical Website', 'Recent Nepal News Today', 'Current Geopolitical Issues',
    'Geopolitics Definition', 'Nepal Democracy Status', 'Nepali News', 'International Conflicts',
    'OSINT Nepal', 'Defense Strategy News', 'Geopolitics Meaning'
  ],
  authors: [{ name: 'Daily Geopolitics Team' }],
  creator: 'Daily Geopolitics',
  publisher: 'Daily Geopolitics',
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
    url: 'https://dailygeopolitics.com',
    siteName: 'Daily Geopolitics',
    title: 'Daily Geopolitics - Latest Nepal News & OSINT Analysis',
    description: 'Expert analysis on the geopolitical situation of Nepal and current world affairs.',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Daily Geopolitics Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daily Geopolitics',
    description: 'Real-time Nepal news today and geopolitical intelligence.',
    images: ['/logo.png'],
    creator: '@DailyGeopolitics',
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
