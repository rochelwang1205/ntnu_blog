"use client"

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Image from 'next/image';
import Link from 'next/link'; // 引入 Next.js Link 元件，防止硬換頁閃爍
import { useTheme } from 'next-themes'; // 引入套件大腦
import ThemeSwitch from './ThemeSwitch'; // 移除路徑中的 src/app/，改用相對路徑

export default function Header() {
  const [open, setOpen] = useState(false);
  const { resolvedTheme } = useTheme(); // 獲取經套件解析後的最終主題 (light 或 dark)
  const [mounted, setMounted] = useState(false);

  // 關鍵 QA 防線：確保組件已在瀏覽器掛載，徹底防範 SSR 階段與客戶端狀態不一致的 Hydration 錯誤
  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { title: "首頁", path: "/" },
    { title: "關於", path: "/about" },
  ];

  // 核心 QA 邏輯修正：
  // 1. 在掛載完成前，或是主題為 light 時，使用黑色 logo (black)
  // 2. 只有在掛載完成且 resolvedTheme 確實為 dark 時，才切換為白色 logo (white)
  const logoColor = mounted && resolvedTheme === "dark" ? "white" : "black";

  return (
    <>
      {/* 加上背景色 transition 與 補上透明背景、高斯模糊的現代 UI 樣式 */}
      <nav className="sticky top-0 px-4 py-3 flex justify-between items-center bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-900 transition-colors duration-200 z-50">
        <Link href="/" className="text-2xl lg:ps-10">
          <Image
            priority
            src={`/images/Rochelle-Blog_logo-${logoColor}.png`}
            height={40} // 建議設定符合導覽列常規比例的高度與寬度，防止版面跳動
            width={150}
            alt="Rochelle-Blog_logo"
            className="h-auto w-auto object-contain"
          />
        </Link>
        
        <div className="lg:hidden">
          <button
            className="navbar-burger flex items-center text-gray-600 dark:text-gray-300 p-3"
            onClick={() => setOpen(!open)}
          >
            <svg
              className="block h-5 w-5 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        {/* 桌機版導覽列 */}
        <ul className="hidden lg:flex lg:items-center lg:space-x-8 lg:ms-auto lg:me-10">
          {navLinks.map((link) => (
            <li key={link.title} className="list-none">
              <Link
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                href={link.path}
              >
                {link.title}
              </Link>
            </li>
          ))}
          {/* 因為 next-themes 在全站統一控制主題，ThemeSwitch 不需要再傳入 onChange */}
          <li className="list-none flex items-center">
            <ThemeSwitch />
          </li>
        </ul>
      </nav>

      {/* 手機版側邊欄選單 */}
      <div className={clsx("navbar-menu relative z-50 transition-opacity duration-200", !open && "hidden")}>
        <div
          className="navbar-backdrop fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 overflow-y-auto transition-colors duration-200">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" onClick={() => setOpen(false)}>
              <Image
                priority
                src={`/images/Rochelle-Blog_logo-${logoColor}.png`}
                height={40}
                width={150}
                alt="Rochelle-Blog_logo"
              />
            </Link>
            {/* 手機選單關閉鈕 */}
            <button className="text-gray-500" onClick={() => setOpen(false)}>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div>
            <ul className="flex flex-col space-y-2">
              <li className="list-none py-2 flex justify-start border-b border-gray-100 dark:border-gray-900">
                <ThemeSwitch />
              </li>
              {navLinks.map((link) => (
                <li className="list-none" key={link.title}>
                  <Link
                    className="block p-4 text-sm font-semibold text-gray-900 dark:text-gray-100 hover:bg-violet-50 dark:hover:bg-violet-950/50 hover:text-violet-600 dark:hover:text-violet-400 rounded transition-colors"
                    href={link.path}
                    onClick={() => setOpen(false)} // 點擊後自動關閉抽屜選單
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}