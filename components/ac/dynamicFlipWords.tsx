'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const FlipWords = dynamic(() => import('@/components/ac/flip-words').then(mod => mod.FlipWords), {
  loading: () => <p>gemeinsam aktiv stark</p>,
})

interface DynamicFlipWordsProps {
  className: string
  words: string[]
  colors: string[]
}

export function DynamicFlipWords({ className, words, colors }: DynamicFlipWordsProps) {
  return (
    <Suspense fallback={<p>gemeinsam aktiv stark</p>}>
      <FlipWords className={className} words={words} colors={colors} />
    </Suspense>
  )
}