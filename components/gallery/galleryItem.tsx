'use client';

import { useState } from 'react';
import { GalleryImage } from '@/types/galleryImage';
import Image from 'next/image';

export default function GalleryItem({ image, isModal }: { image: GalleryImage, isModal?: boolean }) {
  const [visibleImage, setVisibleImage] = useState(image);
  const [extra, setExtra] = useState(image.extra);

  const handleImageSwap = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    e.stopPropagation();
    if (!extra) return;

    const newExtra = [...extra];
    const clickedImage = newExtra[index];
    newExtra[index] = visibleImage;

    setVisibleImage(clickedImage);
    setExtra(newExtra);

    // Update URL without navigation
    const newPath = window.location.pathname.replace(/\/[^/]+$/, `/${clickedImage.slug}`);
    window.history.replaceState(null, '', newPath);
  };

  return (
    <div className={'flex flex-col w-full gap-3 justify-center'}>
      <div className={`flex flex-row items-center justify-center ${extra && extra.length > 0 ? 'max-h-[54vh] sm:max-h-[67vh]' : 'max-h-[64vh] sm:max-h-[77vh]'} `}>
        <Image
          src={visibleImage.image}
          alt={visibleImage.title}
          width={visibleImage.width}
          height={visibleImage.height}
          className="flex-1 object-contain w-auto h-full "
        />
      </div>
      
      {extra && extra.length > 0 && (
        <div className='flex flex-row items-center justify-center gap-1 max-h-[10vh]'>
          {extra.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              onClick={(e) => handleImageSwap(e, index)}
              aria-label={`View ${item.title}`}
              className="h-full w-auto cursor-pointer hover:scale-115 transition-transform duration-150 ease-in-out"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={item.width}
                height={item.height}
                className="object-contain w-auto h-full" />
            </button>
          ))}
        </div>
      )}
      
      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex flex-col md:flex-row gap-0 md:gap-2 font-open-sans-light text-xl ">
          <span className="font-semibold">{visibleImage.title}</span>
          <span className="hidden md:block font-semibold text-[#939BBA]">|</span>
          <span className="">{visibleImage.type}</span>
        </div>
        <div className="font-open-sans-light text-[#6D6D6D]">
          {visibleImage.description}
        </div>
      </div>
      
    </div>
  );
}