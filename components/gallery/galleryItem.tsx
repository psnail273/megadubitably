import { GalleryImage } from '@/types/galleryImage';
import Image from 'next/image';

export default function GalleryItem({ image, isModal }: { image: GalleryImage, isModal?: boolean }) {
  return (
    <div className={`flex flex-col w-full ${isModal ? 'mt-29' : ''} gap-3`}>
      <div className={'flex flex-row items-center justify-center max-h-[80%]'}>
        <Image
          src={image.image}
          alt={image.title}
          width={image.width}
          height={image.height}
          className="flex-1 object-contain w-auto h-full"
        />
      </div>
      {/* {image.extra && image.extra.length > 0 && (
        <div className='flex flex-row gap-2 max-h-[10%] justify-center'>
          {image.extra.map((item) => (
            <Image 
              key={item.slug} 
              src={item.image} 
              alt={item.title} 
              width={item.width} 
              height={item.height} 
              className="object-contain w-auto h-full" />
          ))}
        </div>
      )} */}
      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex flex-col md:flex-row gap-0 md:gap-2 font-open-sans-light text-xl ">
          <span className="font-semibold">{image.title}</span>
          <span className="hidden md:block text-[#939BBA]">|</span>
          <span className="">{image.type}</span>
        </div>
        <div className="font-open-sans-light text-[#6D6D6D]">
          {image.description}
        </div>
      </div>
      
    </div>
  );
}