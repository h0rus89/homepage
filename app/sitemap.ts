import { getBlogPosts } from '@/lib/blog';

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `https://leerob.io/blog/${post.slug}`,
    lastModified: post.metadata.date,
  }));

  let routes = ['', '/blog'].map((route) => ({
    url: `https://leerob.io${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogs];
}
