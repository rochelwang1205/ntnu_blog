"use client";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
// import Logo from "./Logo";
export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [open]);

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

  return (
    <>
      <nav className="sticky top-0 px-4 py-4 flex justify-between items-center bg-white border-b-main border-b z-10">
        {/* <Logo /> */}
        <a href="#" className="text-2xl lg:ps-10">Rochelle&apos;s Graduate Life</a>
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
            <li key={link.title}>
              <a
                className="text-sm text-gray-400 hover:text-gray-500"
                href={link.path}
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className={clsx("navbar-menu relative z-50", !open && "hidden")}>
        <div
          className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"
          onClick={() => setOpen(!open)}
        />
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            {/* <Logo /> */}
            <button className="navbar-close" onClick={() => setOpen(!open)}>
              <svg
                className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div>
            <ul>
              {navLinks.map((link) => (
                <li className="mb-1" key={link.title}>
                  <a
                    className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-main rounded"
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