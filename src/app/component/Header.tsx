"use client"
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Image from 'next/image';
import ThemeSwitch from 'src/app/component/ThemeSwitch'
import { useIsClient } from 'usehooks-ts';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [logoColor, setLogoColor] = useState<'black' | 'white'>('black');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const navLinks = [
    {
      title: "首頁",
      path: "/",
    },
    {
      title: "關於",
      path: "/about",
    },
  ];

  useEffect(() => {
  
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (darkModeMediaQuery.matches) {
      setTheme('dark');
    }
  
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };
  
    darkModeMediaQuery.addEventListener('change', handleChange);
  
    return () => {
      darkModeMediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
  

  useEffect(() => {
    setLogoColor(theme === 'light' ? 'white' : 'black'); // 在主题切换时更新 logo 颜色
  }, [theme]);

  return (
    <>
      <nav className="sticky top-0 px-4 flex justify-between items-center bg-opacity z-10">
        <a href="/" className="text-2xl lg:ps-10">
          <Image
            priority
            src={`/images/Rochelle-Blog_logo-${logoColor}.png`}
            height={200}
            width={200}
            alt="Rochelle-Blog_logo"
          />
        </a>
        <div className="lg:hidden">
          <button
            className="navbar-burger flex items-center text-main p-3"
            onClick={() => setOpen(!open)}
          >
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <ul className="hidden absolute top-1/2 right-[5%] transform -translate-y-1/2 -translate-x-1/2 lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
          {navLinks.map((link) => (
            <li key={link.title} className="list-none">
              <a
                className="text-sm text-gray-400 hover:text-gray-500"
                href={link.path}
              >
                {link.title}
              </a>
            </li>
          ))}
          <ThemeSwitch onChange={toggleTheme}/>
        </ul>
      </nav>
      <div className={clsx("navbar-menu relative z-50", !open && "hidden")}>
        <div
          className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"
          onClick={() => setOpen(!open)}
        />
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            <a href="/" className="text-2xl lg:ps-10">
              <Image
                priority
                src={`/images/Rochelle-Blog_logo-${logoColor}.png`}
                height={200}
                width={200}
                alt="Rochelle-Blog_logo"
              />
            </a>
          </div>
          <div>
            <ul className="justify-center">
              <div className="p-4"></div>
              <ThemeSwitch onChange={toggleTheme}/>
              {navLinks.map((link) => (
                <li className="mb-1 list-none" key={link.title}>
                  <a
                    className="block p-4 text-sm font-semibold text-gray-900 hover:bg-violet-100 hover:text-main rounded"
                    href={link.path}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
