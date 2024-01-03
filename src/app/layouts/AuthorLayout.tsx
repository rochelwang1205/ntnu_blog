import { useRouter } from 'next/router';
import Image from 'next/image';

type Props = {
  children: React.ReactNode;
};

export default function AuthorLayout({ children }: Props) {

  return (
    <>

      <div className="mx-auto max-w-prose select-none">
        <div className="space-y-2 pt-12 p-6 md:space-y-5">
          <h1 className="mb-8 font-black">
            關於
          </h1>
          <h2 className=" mb-8 font-black">這個部落格內容...</h2>
          <p>是紀錄在NTNU東亞學系研究所的寫作練習，<br/>可能包含文獻摘要、修課心得等等研究生的生活。<br/>同時懷抱著分享與「或許能夠幫助到某人也說不定」的心情，持續鍛鍊寫作。</p>
          <h2 className="mb-8 font-black">使用...</h2>
          <ul className="ms-4">
            <li className="list-disc">Next.js 13</li>
            <li className="list-disc">ContentLayer</li>
            <li className="list-disc">Vercel</li>
            <li className="list-disc">...</li>
          </ul>
        </div>
        </div>
    </>
  );
}