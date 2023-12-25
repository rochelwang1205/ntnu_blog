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
          <h1 className="mb-8 text-3xl font-black">
            關於
          </h1>
          <Image src="https://images.unsplash.com/photo-1577909659949-2302826adf26?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Rochelle Wang Profile" className="rounded-full w-1/2 mx-auto md:w-2/5  md:mx-0"/>
          <h2 className=" mb-8 text-2xl font-black">這個部落格內容...</h2>
          <p>是紀錄在NTNU東亞學系研究所的寫作練習，<br/>可能包含文獻摘要、修課心得等等研究生的生活。<br/>同時懷抱著分享與「或許能夠幫助到某人也說不定」的心情，持續鍛鍊寫作。</p>
          <h2 className="mb-8 text-2xl font-black">使用...</h2>
          <ul className="ms-4">
            <li className="text-md list-disc">Next.js 13</li>
            <li className="text-md list-disc">ContentLayer</li>
            <li className="text-md list-disc">Vercel</li>
            <li className="text-md list-disc">...</li>
          </ul>
        </div>
        </div>
    </>
  );
}