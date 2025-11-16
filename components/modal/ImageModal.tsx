'use client';

import { useRouter } from 'next/navigation';
import type { GalleryImage } from '@/types/galleryImage';
import GalleryItem from '../gallery/galleryItem';
import Image from 'next/image';
import Link from 'next/link';

interface ImageModalProps {
  data: GalleryImage[];
  index: number;
  path: string;
}

export default function ImageModal({ data, index, path }: ImageModalProps) {
  const previousSlug = index === 0 ? data[data.length - 1].slug : data[index - 1].slug
  const nextSlug = index === data.length - 1 ? data[0].slug : data[index + 1].slug

  const router = useRouter();

  function handlePrevious(e: React.MouseEvent<HTMLAnchorElement>) {
    e.stopPropagation();
  }

  function handleNext(e: React.MouseEvent<HTMLAnchorElement>) {
    e.stopPropagation();
  }

  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-1 bg-white/90 min-h-screen"
      onClick={() => router.back()}
    >
      <div className="flex flex-1 flex-row w-auto h-full justify-between">
        <Link className="flex h-full hover:opacity-50" href={`/${path}/${previousSlug}`} replace onClick={handlePrevious}>
          <Image src={'/chevron-left.svg'} alt='back' width={48} height={48} />
        </Link>
        <GalleryItem image={data[index]} isModal={true} />
        <Link className="flex h-full hover:opacity-50" href={`/${path}/${nextSlug}`} replace onClick={handleNext}>
          <Image src={'/chevron-right.svg'} alt='next' width={48} height={48}/>
        </Link>
      </div>
    </div>
  );
}
