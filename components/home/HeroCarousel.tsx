import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import hero1 from '@/public/images/hero1.jpg';
import hero2 from '@/public/images/hero2.jpg';
import hero3 from '@/public/images/hero3.jpg';
import hero4 from '@/public/images/hero4.jpg';
import { fetchSlider } from '@/utils/actions';

// const carouselImages = [hero1,hero2,hero3,hero4]

async function HeroCarousel() {
  const carouselImages = await fetchSlider();
  return <div className='hidden lg:block'>
    <Carousel>
       <CarouselContent>
          {carouselImages.map((item)=>{
              return <CarouselItem key={item.id}>
                       <Card>
                           <CardContent className='p-2'>
                                  <div className="relative w-full h-[24rem] rounded-md overflow-hidden">
                                    <Image
                                      src={item.imageUrl}
                                      alt='hero'
                                      fill
                                      className='object-cover'
                                    />
                                </div>
                           </CardContent>
                       </Card>
                  </CarouselItem>
          })}
       </CarouselContent>
       <CarouselPrevious />
       <CarouselNext />
    </Carousel>

  </div>
}

export default HeroCarousel