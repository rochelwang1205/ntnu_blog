"use client"

import { notFound } from 'next/navigation'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { allPosts } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import { useEffect, useState } from 'react'

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function PostLayout({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
  
  if (!post) notFound()

  const MDXContent = useMDXComponent(post.body.code)
  const [toc, setToc] = useState<TocItem[]>([])

  useEffect(() => {
    // 加上定時器或稍微等待，確保 MDX 內文已完全渲染到 DOM 上
    const timer = setTimeout(() => {
      const articleElement = document.querySelector('article')
      if (!articleElement) return

      const headings = articleElement.querySelectorAll('h2, h3')
      const parsedToc: TocItem[] = []

      headings.forEach((heading) => {
        const text = (heading.textContent || '').trim()
        if (!text) return

        // 核心修改：直接拿 rehype-slug 幫我們生成好的 id
        // 如果外層套件沒生成成功，我們再用文字當作備用 id
        const id = heading.id || text.toLowerCase().replace(/\s+/g, '-');
        if (!heading.id) heading.id = id; 

        const level = heading.tagName.toLowerCase() === 'h2' ? 2 : 3
        parsedToc.push({ id, text, level })
      })

      setToc(parsedToc)
    }, 100) // 延遲 100ms 確保 DOM 樹已掛載完畢

    return () => clearTimeout(timer)
  }, [post])

  // 處理點擊目錄時的平滑捲動 (Smooth Scroll Hack)
  // 處理點擊目錄時的平滑捲動 (加上 Navbar 高度補償防遮擋)
  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const targetElement = document.getElementById(id)
    if (targetElement) {
      // 1. 獲取目標元素距離網頁頂端的高度
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset
      
      // 2. 設定 Navbar 的補償高度（您的 Navbar 大約 70-80px，我們預留 90px 讓視覺更舒適）
      const navbarOffset = 90 
      const offsetPosition = elementPosition - navbarOffset

      // 3. 執行精準滾動
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })

      window.history.pushState(null, '', `#${id}`)
    } else {
      console.warn(`找不到對應的網頁節點 id: ${id}`)
    }
  }

  return (
    <div className="mx-auto max-w-2xl lg:max-w-5xl px-4 py-8 transition-colors duration-200">
      <div className="flex flex-col lg:flex-row lg:space-x-12">
        
        {/* 【主體區塊】：包含文章內文與手機版置頂目錄 */}
        <article className="w-full lg:max-w-2xl flex-grow order-1">
          <div className="mb-8 text-center lg:text-left">
            <time dateTime={post.date} className="text-xs text-gray-500 dark:text-gray-400">
              {format(parseISO(post.date), 'LLLL d, yyyy')}
            </time>
            <h1 className="mt-2 text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
              {post.title}
            </h1>
          </div>

          {/* 手機/平板版 (lg 以下) 置頂快捷目錄 */}
          {toc.length > 0 && (
            <div className="block lg:hidden mb-8 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-900">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">文章快速導覽</p>
              <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {toc.map((item, index) => (
                  <a
                    key={index}
                    href={`#${item.id}`}
                    onClick={(e) => handleTocClick(e, item.id)}
                    className={`text-sm text-gray-600 dark:text-gray-400 hover:text-violet-600 transition-colors ${
                      item.level === 3 ? 'ps-3 text-xs opacity-80' : 'font-medium'
                    }`}
                  >
                    {item.level === 2 ? '• ' : '  - '}{item.text}
                  </a>
                ))}
              </nav>
            </div>
          )}
          
          {/* Markdown 內文 */}
          <div className="prose prose-gray dark:prose-invert max-w-none 
            prose-headings:scroll-mt-24 prose-headings:font-bold
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-100 dark:prose-h2:border-gray-900 prose-h2:pb-2
            prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2
            prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6">
            <MDXContent />
          </div>
        </article>

        {/* 【桌機版側欄目錄】 */}
        {toc.length > 0 && (
          <aside className="hidden lg:block w-56 flex-shrink-0 sticky top-24 self-start h-[calc(100vh-8rem)] overflow-y-auto border-l border-gray-100 dark:border-gray-900 ps-4 order-2">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">文章目錄</p>
            <nav className="space-y-2">
              {toc.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.id}`}
                  onClick={(e) => handleTocClick(e, item.id)}
                  className={`block text-sm transition-colors duration-150 hover:text-violet-600 dark:hover:text-violet-400 ${
                    item.level === 3 
                      ? 'ps-4 text-gray-400 dark:text-gray-500 text-xs' 
                      : 'font-medium text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {item.text}
                </a>
              ))}
            </nav>
          </aside>
        )}

      </div>
    </div>
  )
}