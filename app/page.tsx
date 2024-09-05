import Link from "next/link";
import { FlipWords } from "@/components/ac/flip-words";
import { BlogPostCard } from "@/components/BlogPostCard";
import { Logo } from "@/components/logo";
import { getBlogPosts } from "@/lib/blog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default async function Page() {
  const words = ["gemeinsam", "aktiv", "stark"];
  const colors = ["text-pink-500", "text-yellow-500", "text-lime-500"];
  let latestPosts = (await getBlogPosts()).sort((a, b) => {
    if (new Date(a.metadata.date) > new Date(b.metadata.date)) {
      return -1;
    }
    return 1;
  }).slice(0, 5);

  return (
    <section>
      <div className="mt-12 flex flex-col justify-center items-center px-4">
      <div className="mb-4">
        <Logo className="size-36 h-auto" />
      </div>
      <div className="text-4xl mx-auto font-normal text-neutral-600">
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
          {latestPosts.map((post, index) => (
            <BlogPostCard key={post.slug} post={post} priority={index === 0} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    <div className="mt-8">
      <p className="prose prose-neutral">
        hier gehts zum <Link href="/blog">Blog</Link>
      </p>
      <p className="prose prose-neutral">
        hier gehts zum <Link href="/cal">Kalender</Link>
      </p>
      </div>
    </section>
    
  );
}
