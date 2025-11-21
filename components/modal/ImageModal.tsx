'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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

  const [chevronSize, setChevronSize] = useState(48);

  useEffect(() => {
    const updateChevronSize = () => {
      if (window.innerWidth >= 1024) {
        setChevronSize(64);
      } else if (window.innerWidth >= 768) {
        setChevronSize(56);
      } else if (window.innerWidth >= 640) {
        setChevronSize(48);
      } else {
        setChevronSize(32);
      }
    };

    updateChevronSize();
    window.addEventListener('resize', updateChevronSize);
    return () => window.removeEventListener('resize', updateChevronSize);
  }, []);

  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.back();
      } else if (e.key === 'ArrowLeft') {
        router.replace(`/${path}/${previousSlug}`);
      } else if (e.key === 'ArrowRight') {
        router.replace(`/${path}/${nextSlug}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router, path, previousSlug, nextSlug]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartTarget: EventTarget | null = null;
    const minSwipeDistance = 50; // Minimum distance in pixels for a swipe

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartTarget = e.target;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };

    const handleSwipe = () => {
      // Check if the touch started inside an extra images container
      if (touchStartTarget instanceof Element) {
        const extraImagesContainer = touchStartTarget.closest('[data-extra-images-container="true"]');
        if (extraImagesContainer) {
          return; // Don't navigate if swipe started in extra images container
        }
      }

      const swipeDistance = touchEndX - touchStartX;

      if (Math.abs(swipeDistance) < minSwipeDistance) {
        return; // Swipe too short, ignore
      }

      if (swipeDistance > 0) {
        // Swipe right - go to previous
        router.replace(`/${path}/${previousSlug}`);
      } else {
        // Swipe left - go to next
        router.replace(`/${path}/${nextSlug}`);
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [router, path, previousSlug, nextSlug]);

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
        <Link className="flex h-full hover:shadow-2xl hover:bg-[#6D6D6D]/20 focus:bg-[#6D6D6D]/40 active:bg-[#6D6D6D]/40 transition-all duration-200" href={`/${path}/${previousSlug}`} replace onClick={handlePrevious}>
          <Image src={'/chevron-left.svg'} alt='back' width={chevronSize} height={chevronSize} />
        </Link>
        <GalleryItem image={data[index]} isModal={true} chevronSize={chevronSize} />
        <Link className="flex h-full hover:shadow-2xl hover:bg-[#6D6D6D]/20 focus:bg-[#6D6D6D]/40 active:bg-[#6D6D6D]/40 transition-all duration-200" href={`/${path}/${nextSlug}`} replace onClick={handleNext}>
          <Image src={'/chevron-right.svg'} alt='next' width={chevronSize} height={chevronSize}/>
        </Link>
      </div>
    </div>
  );
}
