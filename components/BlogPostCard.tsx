import Image from "next/image";
import Link from "next/link";
import { AdaptiveImage } from "./AdaptiveImage";

interface BlogPostCardProps {
  post: {
    id: string;
    slug: string;
    metadata: {
      date: string;
      title: string;
    };
    imageUrl: string;
  };
  priority: boolean;
}

export async function BlogPostCard({ post, priority }: BlogPostCardProps) {

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="rounded-3xl bg-gray-100 h-80 w-72 md:h-[30rem] md:w-80 flex-shrink-0 overflow-hidden flex flex-col items-start justify-start relative z-10"
    >
      <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
      <div className="relative z-40 p-6">
        <p className="text-white text-sm md:text-base font-medium font-sans text-left">
          {post.metadata.date}
        </p>
        <p className="text-white text-lg md:text-2xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2">
          {post.metadata.title}
        </p>
      </div>
      {/* <AdaptiveImage
        src={post.imageUrl}
        alt={post.metadata.title}
        fill
        sizes="(max-width: 768px) 288px, 320px"
        className="object-cover"
        priority={priority}
      /> */}
    </Link>
  );
}