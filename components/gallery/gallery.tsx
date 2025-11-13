'use client';

import Masonry from '@mui/lab/Masonry';
import type { GalleryImage } from '@/types/galleryImage';
import Image from 'next/image';

export default function Gallery({ data }: { data: GalleryImage[] }) {
  return (
    <Masonry columns={{xxl: 5, xl: 4, lg: 3, md: 2, sm: 1}} spacing={0}>
      {data.map((poster) => (
        <Image
          key={poster.title}
          src={poster.image}
          alt={poster.title}
          width={poster.width}
          height={poster.height}
          className="w-full h-auto"
        />
      ))}
    </Masonry>
  );
}