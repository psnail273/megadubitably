import { GalleryImage } from '@/types/galleryImage';
import Image from 'next/image';

export default function GalleryItem({ image, isModal }: { image: GalleryImage, isModal?: boolean }) {
  return (
    <div className={`flex flex-col gap-3 ${isModal ? 'justify-center' : 'justify-start' } w-full max-h-svh`}>
      <Image
        src={image.image}
        alt={image.title}
        width={image.width}
        height={image.height}
        className="object-contain max-h-[90%] w-auto"
      />
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