import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Noto_Serif_JP } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});
const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-serif-jp",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    template: '%s | Portal Hub',
    default: 'Portal Hub - ブログ＆まとめポータル',
  },
  description: 'ゲーム技術、AI、制作日記、日常、趣味エンタメの最新情報をまとめたポータルサイト',
  generator: 'v0.app',
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
    locale: 'ja_JP',
    url: '/',
    siteName: 'Portal Hub',
    title: 'Portal Hub - ブログ＆まとめポータル',
    description: 'ゲーム技術、AI、制作日記、日常、趣味エンタメの最新情報をまとめたポータルサイト',
    images: [
      {
        url: '/images/hero-game.jpg', // Placeholder global OGP mapping
        width: 1200,
        height: 630,
        alt: 'Portal Hub - ブログ＆まとめポータル',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portal Hub - ブログ＆まとめポータル',
    description: 'ゲーム技術、AI、制作日記、日常、趣味エンタメの最新情報をまとめたポータルサイト',
    images: ['/images/hero-game.jpg'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#f5f5f0',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`${geist.variable} ${geistMono.variable} ${notoSerifJP.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
