'use client'

import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import useEmblaCarousel from 'embla-carousel-react'

interface BlogPost {
  id: string
  title: string
  imageUrl: string
}

interface BlogPostCarouselProps {
  posts: BlogPost[]
}

export function BlogPostCarousel({ posts }: BlogPostCarouselProps) {
  const [emblaRef] = useEmblaCarousel({
    slidesToScroll: 1,
    align: 'start',
    containScroll: 'trimSnaps',
  })

  return (
    <Carousel 
      className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
      opts={{
        align: 'start',
        loop: true,
      }}
    >
      <CarouselContent ref={emblaRef} className="-ml-4">
        {posts.map((post) => (
          <CarouselItem key={post.id} className="pl-4 md:basis-1/2 lg:basis-2/5">
            <Card 
              className="h-[400px] flex flex-col justify-end bg-cover bg-center" 
              style={{ backgroundImage: `url(${post.imageUrl})` }}
            >
              <CardHeader className="bg-black bg-opacity-50 text-white">
                <CardTitle className="text-lg font-bold">{post.title}</CardTitle>
              </CardHeader>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}