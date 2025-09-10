import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'Akshat Khandelwal Portfolio',
  description: 'Aspiring software developer with strong technical skills in Python, Java, C, and web technologies. Computer Science Engineering student at CMR Institute of Technology, Bangalore.',
  keywords: ['Akshat Khandelwal', 'Portfolio', 'Software Developer', 'Computer Science', 'Python', 'Java', 'C', 'Web Development', 'HTML', 'CSS', 'JavaScript'],
  authors: [{ name: 'Akshat Khandelwal' }],
  creator: 'Akshat Khandelwal',
  openGraph: {
    title: 'Akshat Khandelwal Portfolio',
    description: 'Aspiring software developer with strong technical skills and passion for innovation.',
    url: 'https://akshatkhandelwal.dev',
    siteName: 'Akshat Khandelwal Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akshat Khandelwal Portfolio',
    description: 'Aspiring software developer with strong technical skills and passion for innovation.',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon_new.png', type: 'image/png', sizes: '32x32' },
    ],
    shortcut: '/favicon_new.png',
    apple: '/favicon_new.png',
    other: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        url: '/favicon.svg',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon_new.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        url: '/favicon_new.png',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-50YY4S6JDH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-50YY4S6JDH');
          `}
        </Script>
        
        {children}
        <Analytics />
      </body>
    </html>
  )
}
