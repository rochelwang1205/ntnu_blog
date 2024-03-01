import { useRouter } from 'next/router';
import Image from 'next/image';

type Props = {
  children: React.ReactNode;
};

export default function AuthorLayout({ children }: Props) {

  return (
    <>
      <div className="mx-auto max-w-prose select-none">
        <div className="space-y-2 pt-12 p-8 md:space-y-5">
          <h1 className="mb-8 font-black">
            關於
          </h1>
          <h2 className=" mb-8 font-black">這個部落格內容...</h2>
          <p className="leading-8">是紀錄在 NTNU 東亞學系研究所的寫作練習，<br/>可能包含文獻摘要、修課心得等等研究生的生活，<br/>或許還有會有些前端技術學習的筆記。<br/>同時懷抱著分享與「或許能夠幫助到某人也說不定」的心情，持續鍛鍊寫作。</p>
          <h2 className="mb-8 font-black">使用...</h2>
          <ul className="ms-4 leading-8">
            <li>Next.js 13</li>
            <li>ContentLayer</li>
            <li>Vercel</li>
            <li>Tailwind</li>
          </ul>
          <h2 className="mb-8 font-black">專案里程碑😎</h2>
          <ul className="ms-4 leading-8">
            <li>2024/03/01: Logo來了!!!</li>
            <li>2023/12/25: 部落格上線</li>
          </ul>
        </div>
        </div>
    </>
  );
}