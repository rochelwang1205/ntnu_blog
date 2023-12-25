import React from "react";

const socialLinks = [
  {
    title: "rochelleWang",
    path: "https://github.com/rochelwang1205",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>GitHub</title>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    title: "Rochelle Wang",
    path: "https://twitter.com/RochelWang4",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>Twitter</title>
        <path d="M18.9014 0H22.5816L14.5415 8.4718L24 20H16.5941L10.7935 13.0082L4.15631 20H0.473926L9.07356 10.9385L0 0H7.59394L12.8372 6.39077L18.9014 0ZM17.6098 17.9692H19.649L6.48589 1.9241H4.29759L17.6098 17.9692Z" fill="black"/>
      </svg>
    ),
  },
  {
    title: "liuyingfeng57@gmail.com",
    path: "mailto:liuyingfeng57@gmail.com",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>Gmail</title>
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
      </svg>
    ),
  },
];

export default function SocialLinks() {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center">
      {socialLinks.map((link) => (
        <a
          key={link.title}
          href={link.path}
          target="_blank"
          className="text-link text-xs hover:text-gray-400 flex items-center justify-center gap-1"
        >
          <span className="h-6 w-6 ">{link.icon}</span>
          <span>{link.title}</span>
        </a>
      ))}
    </div>
  );
}