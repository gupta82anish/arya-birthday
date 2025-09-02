import Slideshow from '@/components/Slideshow'
import { LOCAL_SLIDES } from '@/lib/localSlides'


export const dynamic = 'force-static'

export default function SlideshowPage() {
  return <Slideshow slides={LOCAL_SLIDES} />
}
