'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
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
  const [isNavigating, setIsNavigating] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateChevronSize = () => {
      if (window.innerWidth >= 768) {
        setChevronSize(64);
      } else if (window.innerWidth >= 640) {
        setChevronSize(54);
      } else {
        setChevronSize(44);
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

    // Focus management - focus the modal when it opens
    if (modalRef.current) {
      modalRef.current.focus();
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartTarget: EventTarget | null = null;
    // Increased from 50 to 75 for more deliberate swipes
    const minSwipeDistance = 75; // Minimum distance in pixels for a swipe

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
    setIsNavigating(true);
  }

  function handleNext(e: React.MouseEvent<HTMLAnchorElement>) {
    e.stopPropagation();
    setIsNavigating(true);
  }

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      tabIndex={-1}
      className="absolute inset-0 flex items-center justify-center z-20 bg-white/95 min-h-svh"
      onClick={() => router.back()}
    >
      <div className="flex flex-1 flex-row w-auto h-full justify-between items-center">
        <Link
          className="flex h-full items-center justify-center"
          href={`/${path}/${previousSlug}`}
          replace
          onClick={handlePrevious}
          aria-label="Previous image"
        >
          <Image src={'/chevron-left.svg'} alt='Previous' width={chevronSize} height={chevronSize} className="hover:-translate-x-2 active:scale-110 transition-all duration-200" />
        </Link>
        <div className="relative">
          <GalleryItem image={data[index]} isModal={true} chevronSize={chevronSize} path={path} />
          {isNavigating && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 animate-fadeIn">
              <div className="w-12 h-12 border-4 border-[#939BBA] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        <Link
          className="flex h-full items-center justify-center"
          href={`/${path}/${nextSlug}`}
          replace
          onClick={handleNext}
          aria-label="Next image"
        >
          <Image src={'/chevron-right.svg'} alt='Next' width={chevronSize} height={chevronSize} className="hover:translate-x-2 active:scale-110 transition-all duration-200" />
        </Link>
      </div>
    </div>
  );
}
