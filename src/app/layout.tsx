import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from "./component/Header";
import Footer from "./component/Footer";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rochelle Graduate Life',
  description: 'Life of DEAS in NTNU',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <Header/>
          {children}
          </main>
          <Footer/>
        </body>
    </html>
  )
}
