import Link from 'next/link'
import { compareDesc, format, parseISO } from 'date-fns'
import { allPosts, Post } from 'contentlayer/generated'


function PostCard(post: Post) {
  // const MDXContent = useMDXComponent(post.body.code)
  return (
    <div className="m-8">
      <h2 className="mb-1 text-xl">
        <Link href={post.url} className="text-gray-900 hover:text-gray-400 dark:text-gray-400 font-bold">
          {post.title}
        </Link>
      </h2>
      <time dateTime={post.date} className="mb-2 block text-xs text-gray-600">
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      {/* <div className="text-sm [&>*]:mb-3 [&>*:last-child]:mb-0" dangerouslySetInnerHTML={{ __html: post.body.html }} /> */}
      <div>{post.description}</div>
    </div>
  )
}

export default function Home() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return (
    <div>
    <div className="mx-auto max-w-2xl py-8">
      <h1 className="mb-8 text-center text-2xl font-black">最新文章</h1>
      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
    </div>
  )
}