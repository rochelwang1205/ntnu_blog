import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from "./component/Header";
import Footer from "./component/Footer";
// import ThemeSwitch from "./component/ThemeSwitch";

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
        <main className="bg-white text-black dark:bg-black dark:text-white">
            {/* <ThemeSwitch /> */}
          <Header/>
          {children}
          </main>
          <Footer/>
        </body>
    </html>
  )
}
