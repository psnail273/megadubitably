'use client';

import Masonry from '@mui/lab/Masonry';
import type { Poster } from '@/types/poster';
import Image from 'next/image';

export default function Gallery({ data }: { data: Poster[] }) {
  return (
    <Masonry columns={5} spacing={0}>
      {data.map((poster, index) => (
        <Image key={index} src={poster.image} alt={poster.title} width={poster.width} height={poster.height} />
      ))}
    </Masonry>
  );
}