import React from 'react'
import HeroCarousel from './HeroCarousel'
import { Button } from '../ui/button'
import Link from 'next/link'

function Hero() {
  return <section className='grid grid-cols-1 lg:grid-cols-2 gap-24 items-center'>
          <div>
               <h1 className='max-w-2xl font-bold text-4xl tracking-tight sm:text-6xl'>
                   Changing the way you experience everyday style
               </h1>
               <p className='mt-8 max-w-xl text-lg leading-8 text-muted-foreground'>Discover a fresh approach to fashion where comfort meets confidence. From timeless essentials to bold statements, we craft pieces that elevate your daily style and reflect your true self effortlessly</p>
               <Button asChild size='lg' className='mt-10'>
                  <Link href='/products'>our Products</Link>
               </Button>
          </div>
          <HeroCarousel />
  </section>
}

export default Hero