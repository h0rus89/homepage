"use client"

import { useState } from 'react'
import Image from 'next/image'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

// Dummy data for blog posts
const blogPosts = [
  { id: 1, title: "Abschlussfeier 2024", date: "2023-06-15", image: "/images/abschlussfeier-2024-1.jpg" },
  { id: 2, title: "Bigband der Polizei vor Ort", date: "2023-06-10", image: "/images/bigband-der-polizei-vor-ort-1.jpg" },
  { id: 3, title: "Erstes Schachturnier", date: "2023-06-05", image: "/images/erstes-schachturnier-1.jpg" },
  { id: 4, title: "herzlich Willkommen", date: "2023-05-30", image: "/images/herzlich-willkommen-1.jpg" },
]

export default function BlogPostCarousel() {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {blogPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

function BlogPostCard({ post }) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Card className="w-[300px] overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-[200px]">
          {!imageLoaded && (
            <Skeleton className="absolute inset-0 z-10" />
          )}
          <Image
            src={post.image}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent p-4">
            <p className="text-sm font-medium text-white">{post.date}</p>
            <h3 className="mt-2 text-lg font-bold text-white">{post.title}</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}