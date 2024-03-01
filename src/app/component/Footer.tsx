import React from "react";
import SocialLinks from "./SocialLinks";
import backgroundImage from 'public/images/Rochelle-Blog_web-footer-visual_1920-400px.png'

export default function Footer() {
  return (
    <footer className="py-10 mb-0" style={{
      // use the src property of the image object
      backgroundImage: `url(${backgroundImage.src})`}}>
      <SocialLinks />
      <p className="text-center text-xs text-black mt-4">
        © 2023-{new Date().getFullYear()} Rochelle Wang. Made with{" "}
        <a href="https://nextjs.org/" target="_blank">
          Nextjs
        </a>
      </p>
    </footer>
  );
}