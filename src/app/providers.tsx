// src/app/providers.tsx
'use client'

import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  // attribute="class" 代表套件會自動將 'dark' 或 'light' 加到 <html> 標籤的 class 中，完美對齊 Tailwind CSS
  return <ThemeProvider attribute="class" defaultTheme="system" enableSystem>{children}</ThemeProvider>
}