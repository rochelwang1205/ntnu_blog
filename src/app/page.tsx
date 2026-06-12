import { allPosts, Post } from 'contentlayer/generated';
import { compareDesc, format, parseISO } from 'date-fns';
import Link from 'next/link';

const POSTS_PER_PAGE = 6;

function PostCard(post: Post) {
  return (
    <div className="my-8 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-900 transition-all hover:shadow-md">
      <h2 className="mb-2 text-xl font-bold">
        <Link href={post.url} className="text-gray-900 hover:text-violet-600 dark:text-gray-100 dark:hover:text-violet-400 transition-colors">
          {post.title}
        </Link>
      </h2>
      <time dateTime={post.date} className="mb-3 block text-xs text-gray-500 dark:text-gray-400">
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      <div className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{post.description || "點擊閱讀更多..." }</div>
    </div>
  )
}


export default function Home({
  searchParams,
}: {
  searchParams: { page?: string }
}) {

  const sortedPosts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
  const totalPosts = sortedPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);


  const rawPage = Number(searchParams.page) || 1;
  const currentPage = Math.max(1, Math.min(totalPages, rawPage));


  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const displayedPosts = sortedPosts.slice(startIndex, endIndex);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 transition-colors duration-200">
      <h1 className="mb-8 text-center text-2xl font-black tracking-wider text-gray-900 dark:text-gray-100">最新文章</h1>
      

      {totalPosts === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-4.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293H13m-3.914-2.414a1 1 0 00-.707-.293L5.964 13H4" />
          </svg>
          <p className="text-sm">目前尚無文章，敬請期待！</p>
        </div>
      ) : (
        <>

          <div className="space-y-4">
            {displayedPosts.map((post, idx) => (
              <PostCard key={idx} {...post} />
            ))}
          </div>


          {totalPages > 1 && (
            <div className="mt-12 flex justify-between items-center border-t border-gray-100 dark:border-gray-900 pt-6">
              {currentPage > 1 ? (
                <Link
                  href={`/?page=${currentPage - 1}`}
                  className="px-4 py-2 text-sm font-medium text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-900 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-colors"
                >
                  ← prev
                </Link>
              ) : (
                <div /> 
              )}
              
              <span className="text-sm text-gray-500 dark:text-gray-400">
                 {currentPage}  /  {totalPages} 
              </span>

              {currentPage < totalPages ? (
                <Link
                  href={`/?page=${currentPage + 1}`}
                  className="px-4 py-2 text-sm font-medium text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-900 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-colors"
                >
                  next →
                </Link>
              ) : (
                <div />
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}