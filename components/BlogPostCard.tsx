import Image from "next/image";
import Link from "next/link";
import sharp from "sharp";
import path from "path";

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

const shimmer = (w: number, h: number) => `
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink">
  <style>
    @media (prefers-color-scheme: dark) {
      .background {
        fill: #374151;
      }
      .icon {
        fill: #4b5563;
      }
    }
    @media (prefers-color-scheme: light) {
      .background {
        fill: #d1d5db;
      }
      .icon {
        fill: #e5e7eb;
      }
    }
  </style>
  <g>
    <rect width="100%" height="100%" class="background">
      <animate attributeName="opacity" values="1;0.1;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite" keySplines="0.4 0 0.6 1; 0.4 0 0.6 1" calcMode="spline" />
    </rect>
    <svg x="50%" y="50%" height="40" width="40" viewBox="0 0 20 18" overflow="visible">
      <g transform="translate(-10,-9)">
        <path class="icon" d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z">
          <animate attributeName="opacity" values="1;0.1;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite" keySplines="0.4 0 0.6 1; 0.4 0 0.6 1" calcMode="spline" />
      </path>
      </g>
    </svg>
    <animate attributeName="opacity" values="1;0.5;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" calcMode="spline" />
  </g>
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export async function BlogPostCard({ post, priority }: BlogPostCardProps) {
  const imagePath = path.join(process.cwd(), "public", post.imageUrl);
  const image = sharp(imagePath);
  const metadata = await image.metadata();

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
      <Image
        src={post.imageUrl}
        alt={post.metadata.title}
        fill
        sizes="(max-width: 768px) 288px, 320px"
        className="object-cover"
        placeholder={`data:image/svg+xml;base64,${toBase64(
          shimmer(metadata.width || 1200, metadata.height || 900),
        )}`}
        priority={priority}
      />
    </Link>
  );
}