import Link from "next/link";
import { FlipWords } from "@/components/ac/flip-words";

export default function Page() {
  const words = ["gemeinsam", "aktiv", "stark"];

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">Startseite</h1>
      <p className="prose prose-neutral dark:prose-invert">
        hier gehts zum <Link href="/blog">Blog</Link>
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        hier gehts zum <Link href="/cal">Kalender</Link>
      </p>
      <div className="mt-24 flex flex-col justify-center items-center px-4">
      <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
        Graf-Anton-Schule <br />
      </div>
      <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
        <FlipWords words={words} /> 
      </div>
    </div>
    </section>
  );
}
