import Link from "next/link";

export default function Page() {
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">Startseite</h1>
      <p className="prose prose-neutral dark:prose-invert">
        hier gehts zum <Link href="/blog">Blog</Link>
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        hier gehts zum <Link href="/cal">Kalender</Link>
      </p>
      
    </section>
  );
}
