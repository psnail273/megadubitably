'use client';

import Masonry from '@mui/lab/Masonry';
import type { GalleryImage } from '@/types/galleryImage';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Gallery({ data, path }: { data: GalleryImage[], path: string }) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const visibleData = data.filter((poster) => !poster.hidden);

  if (visibleData.length === 0) {
    return (
      <div className="flex items-center justify-center py-16 text-center">
        <p className="text-[#6D6D6D] text-lg">No items to display</p>
      </div>
    );
  }

  return (
    <Masonry columns={{xxl: 5, xl: 4, lg: 3, md: 2, sm: 1}} spacing={0} className="overflow-hidden">
      {visibleData.map((poster: GalleryImage, index: number) => {
        const slug = poster.slug;
        const isLoaded = loadedImages.has(slug);
        // Only prioritize first 5 images
        const shouldPriority = index < 5;

        return (
          <Link
            key={poster.slug}
            href={`/${path}/${slug}`}
            className="cursor-pointer w-full hover:scale-102 active:scale-100 transition-transform duration-150 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#939BBA] relative"
          >
            {!isLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" style={{ aspectRatio: `${poster.width}/${poster.height}` }} />
            )}
            <Image
              src={poster.image}
              alt={poster.title}
              width={poster.width}
              height={poster.height}
              className={`w-full h-auto transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              priority={shouldPriority}
              loading={shouldPriority ? undefined : 'lazy'}
              onLoad={() => {
                setLoadedImages(prev => new Set(prev).add(slug));
              }}
            />
          </Link>
        );
      })}
    </Masonry>
  );
}