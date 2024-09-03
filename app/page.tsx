import Link from "next/link";
import { FlipWords } from "@/components/ac/flip-words";
import { getBlogPosts } from "@/lib/blog";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function Page() {
  const words = ["gemeinsam", "aktiv", "stark"];
  const colors = ["text-pink-500", "text-yellow-500", "text-lime-500"];
  let latestPosts = getBlogPosts().sort((a, b) => {
    if (
      new Date(a.metadata.date) > new Date(b.metadata.date)
    ) {
      return -1;
    }
    return 1;
  }).slice(0, 5).map(post => ({
    id: post.slug,
    title: post.metadata.title,
    imageUrl: `/images/${post.slug}-1.jpg`,
    ...post
  }));

  return (
    <section>
      <div className="mt-24 flex flex-col justify-center items-center px-4">
      <div className="mb-4">
        <svg
          id="logo"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 394.69 293.46"
          className="size-36 h-auto"
        >
          <g id="left">
            <path d="m142.61,206.49c2.37-3.6,5.34-6.92,8.86-11.41,2.96,3.82,4.75,5.35,6.98,9.23,2.53,4.39,4.34,9.03,5.84,13.77l19.81-52.72c-1.36-7.34-2.92-14.66-4.58-21.94-2.75-12.05-1.55-23.02,3.83-34.34,4.77-10.04,9.07-20.25,13.33-30.46,5.9-14.17,6.92-29.49,2.59-44.06-.51-1.72-1.02-3.17-1.49-4.18-2.23,4.68-3.74,7.41-4.85,10.24-4.03,10.28-7.62,20.7-11.94,30.89-8.69,20.49-22.85,36.79-49.09,43.05-16.3,3.89-32.67,2.15-49.04-.09-9.12-1.25-18.35-1.95-27.53-2.9-.3.76,5.13,6.87,8.53,8.66,11.63,6.11,23.37,12.08,35.19,17.94,18.78,9.3,26.19,23.27,22.18,41.22-.32,1.41-.66,2.81-1.03,4.2,2.94,4.56,5.29,9.89,6.99,15.92l.49,1.72-15.02,2.68c-2.49,5.2-5.35,10.24-8.52,15.15h24.84v5.46c4.94-5.73,9.48-11.75,13.62-18.04Z" className="fill-blue-800" />
            <path d="m78.63,250.62c-2.1,2.18-4.17,4.46-5.69,6.94-2.41,3.92-.11,6.53,4.52,5.57,4.88-1.01,9.97-2.76,13.98-5.31v-9.15h-10.95c-.61.65-1.23,1.3-1.85,1.94Z" className="fill-blue-800" />
            <path d="m107.06,73.09c.28-12.92,10.26-21.9,24.04-21.63,13.09.25,22.62,10.26,22.24,23.37-.37,12.86-10.35,21.47-24.45,21.09-13.1-.35-22.11-9.77-21.82-22.83Z" className="fill-blue-800" />
          </g>
          <path id="g" d="m125.74,222.32h-57.23v23.1h26.18v14.47l-.79.47c-5.21,3.1-9.91,5.33-13.99,6.63-4.11,1.31-8.49,1.98-13.02,1.98-9.66,0-17.33-3.15-22.78-9.37-5.4-6.15-8.14-16.39-8.14-30.45,0-13.24,2.7-23.11,8.04-29.35,5.4-6.31,12.72-9.51,21.75-9.51,6.06,0,11.15,1.37,15.13,4.08,3.65,2.49,6.35,6.01,8.06,10.47l34.61-6.18c-2.22-7.15-5.41-13.17-9.48-17.92-4.37-5.09-9.96-8.9-16.6-11.33-6.73-2.46-17.11-3.7-30.85-3.7s-25.62,2.01-33.95,5.98c-10.64,5.12-18.83,12.73-24.33,22.61-5.54,9.93-8.35,21.8-8.35,35.28s2.57,24.31,7.64,34.16c5.04,9.79,12.22,17.27,21.36,22.21,9.19,4.97,21.3,7.49,35.99,7.49,11.98,0,22.47-1.41,31.17-4.2,8.53-2.73,18.48-7.92,29.58-15.43v-51.51Z" className="fill-pink-500" />
          <path id="a" d="m229.68,270.39l6.34,20.91h37.43l-46.37-123.41h-40.44l-46.38,123.41h36.4l6.17-20.91h46.85Zm-23.31-76.85l16.19,52.72h-32.2l16.02-52.72Z" className="fill-yellow-500" />
          <g id="right">
            <path d="m321.31,49.56c-.32-14.99-11.9-25.41-27.89-25.11-15.2.29-26.25,11.9-25.81,27.12.43,14.92,12.01,24.91,28.37,24.48,15.2-.41,25.65-11.34,25.33-26.49Z" className="fill-blue-800" />
            <path d="m339.58,263.32c2.47,1.71,5.37,3.12,8.43,4.27,1.84-.59,3.42-1.43,4.7-2.54,2.68-2.32,3.98-4.9,3.98-7.89,0-.09-.01-.18-.02-.27-.41-.44-.82-.87-1.23-1.3-2.94-3.06-5.81-6.15-8.59-9.28-3.33-1.26-7.74-2.51-13.25-3.72-13.24-2.98-23.7-6.77-31.24-11.3,10.92,11.75,23.34,22.43,37.23,32.03Z" className="fill-blue-800" />
            <path d="m285.94,211.27c-.93-3.16-1.41-6.52-1.41-10.1,0-6.8,1.99-13.3,5.92-19.33,3.42-5.25,8.39-9.56,14.79-12.85-2.76-18.94,6.07-33.79,26.47-43.9,13.72-6.79,27.34-13.72,40.84-20.82,3.95-2.07,10.25-9.17,9.9-10.05-10.65,1.1-21.36,1.92-31.95,3.37-19,2.59-38,4.61-56.91.1-30.45-7.26-46.88-26.18-56.96-49.96-5.02-11.83-9.18-23.92-13.86-35.85-1.29-3.29-3.04-6.45-5.63-11.88-.55,1.18-1.14,2.85-1.73,4.85-5.02,16.9-3.84,34.69,3.01,51.13,4.94,11.86,9.93,23.7,15.47,35.35,6.24,13.14,7.64,25.87,4.44,39.86-2.85,12.48-5.46,25.07-7.42,37.69l22.21,59.1c2.36-8.97,4.93-17.92,9.67-26.14,2.6-4.51,4.67-6.28,8.11-10.72,4.08,5.22,7.53,9.07,10.28,13.25,1.54,2.33,3.13,4.63,4.76,6.89Z" className="fill-blue-800" />
          </g>
          <path id="s" d="m388.22,273.29c4.29-6.55,6.47-13.81,6.47-21.57,0-6.58-1.62-12.6-4.82-17.91-3.19-5.3-8.41-9.81-15.5-13.43-7.24-3.69-19.48-7.41-36.37-11.05-7.26-1.51-11.8-3.16-13.88-5.05-2.23-1.89-3.38-4.14-3.38-6.65,0-3.25,1.36-6.04,4.04-8.29,2.59-2.17,6.4-3.27,11.32-3.27,5.89,0,10.61,1.43,14.04,4.26,3.16,2.61,5.33,6.63,6.47,11.99l33.72-1.97c-1.77-11.73-6.56-20.43-14.25-25.88-8.18-5.79-20.32-8.73-36.08-8.73-12.9,0-23.16,1.63-30.5,4.83-7.25,3.17-12.73,7.56-16.31,13.05-3.58,5.49-5.4,11.4-5.4,17.56,0,9.5,3.43,17.1,10.5,23.22,7.08,6.19,19.19,11.24,36.01,15.02,10.86,2.39,17.65,4.91,20.77,7.72,3.22,2.9,4.86,6.27,4.86,10.02,0,3.93-1.71,7.41-5.1,10.34-3.31,2.87-8.01,4.33-13.98,4.33-7.98,0-14.22-2.8-18.56-8.31-2.43-3.11-4.12-7.52-5.04-13.11l-34.07,2.13c1.31,11.6,5.83,21.34,13.45,28.96,7.94,7.94,22.61,11.96,43.6,11.96,11.98,0,22.02-1.74,29.84-5.18,7.73-3.4,13.83-8.44,18.13-15Z" className="fill-lime-500" />
        </svg>
      </div>
      <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
        Graf-Anton-Schule <br />
      </div>
      <div className="text-4xl mx-auto font-normal">
        <FlipWords 
          className="font-caveat font-black tracking-widest" 
          words={words}
          colors={colors}
        /> 
      </div>
      
    </div>
    <ScrollArea className="mt-20 w-full">
      <div className="flex flex-row gap-4 pb-4">
        {latestPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="rounded-3xl bg-gray-100 dark:bg-neutral-900 h-80 w-72 md:h-[30rem] md:w-80 flex-shrink-0 overflow-hidden flex flex-col items-start justify-start relative z-10"
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
              className="object-cover absolute z-10 inset-0"
            />
          </Link>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
    <div className="mt-8">
      <p className="prose prose-neutral dark:prose-invert ">
        hier gehts zum <Link href="/blog">Blog</Link>
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        hier gehts zum <Link href="/cal">Kalender</Link>
      </p>
      </div>
    </section>
    
  );
}
