'use client';

import Masonry from '@mui/lab/Masonry';
import type { GalleryImage } from '@/types/galleryImage';
import Image from 'next/image';
import Link from 'next/link';

export default function Gallery({ data, path }: { data: GalleryImage[], path: string }) {
  return (
    <Masonry columns={{xxl: 5, xl: 4, lg: 3, md: 2, sm: 1}} spacing={0} className="overflow-hidden">
      {data.filter((poster) => !poster.hidden).map((poster: GalleryImage) => {
        const slug = poster.slug;

        return (
          <Link
            key={poster.slug} href={`/${path}/${slug}`}
            className="cursor-pointer w-full hover:scale-102 active:scale-100 transition-transform duration-150 ease-in-out">
            <Image
              src={poster.image}
              alt={poster.title}
              width={poster.width}
              height={poster.height}
              className="w-full h-auto"
              priority
            />
          </Link>
        );
      })}
    </Masonry>
  );
}