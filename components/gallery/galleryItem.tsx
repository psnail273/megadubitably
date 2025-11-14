import { GalleryImage } from '@/types/galleryImage';
import Image from 'next/image';

export default function GalleryItem({ image }: { image: GalleryImage }) {
  return (
    <div className="flex flex-col h-full gap-3">
      <Image
        src={image.image}
        alt={image.title}
        width={image.width}
        height={image.height}
        className="h-[90%] w-auto object-contain"
      />
      <div>
        <div className="flex flex-row gap-2 font-open-sans-light text-xl">
          <span>{image.title}</span>
          <span className="text-[#939BBA]">|</span>
          <span>{image.type}</span>
        </div>
        <div className="font-open-sans-light text-[#6D6D6D]">
          {image.description}
        </div>
      </div>
      
    </div>
  );
}