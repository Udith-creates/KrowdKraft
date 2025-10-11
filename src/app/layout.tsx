import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { QueryProvider } from "@/providers/query-provider"
import Script from "next/script"
import "@/styles/globals.css"
import ScrollToTop from '@/components/ScrollToTop'

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "KrowdKraft - Culture Moves Fast. We Move Faster.",
  description: "Modern marketing agency targeting Gen Z & Millennials. Creator collabs, community builds, and authentic brand connections.",
  keywords: ["marketing", "Gen Z", "Millennials", "creator", "community", "brand"],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QM44WYFLFR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QM44WYFLFR');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <ScrollToTop />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}