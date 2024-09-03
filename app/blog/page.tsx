import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog';

export const metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, design, and more.',
};

export default function BlogPage() {
  let allBlogs = getBlogPosts();

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        News
      </h1>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.date) > new Date(b.metadata.date)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col">
              <p className="text-neutral-900 tracking-tight flex">
                <span className="text-gray-400 w-24 flex-shrink-0">{post.metadata.date}</span>
                <span>{post.metadata.title}</span>
              </p>
            </div>
          </Link>
        ))}
    </section>
  );
}