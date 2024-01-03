import React from "react";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer>
      <SocialLinks />
      <p className="text-center text-xs text-gray-400 mt-4 border-t p-4 border-main">
        © 2023-{new Date().getFullYear()} Rochelle Wang. Made with{" "}
        <a href="https://nextjs.org/" target="_blank">
          Nextjs
        </a>
      </p>
    </footer>
  );
}