'use client';

import { useState, useEffect, useRef } from 'react';
import { GalleryImage } from '@/types/galleryImage';
import Image from 'next/image';

export default function GalleryItem({ image, isModal, chevronSize = 0 }: { image: GalleryImage, isModal?: boolean, chevronSize: number }) {
  const CONTAINER_VERTICAL_PADDING = 4;
  const CONTAINER_GAP = 4;

  const [visibleImage, setVisibleImage] = useState(image);
  const [extra, setExtra] = useState(image.extra);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [dimensions, setDimensions] = useState<{
    divWidth: number,
    divHeight: number,
    imageWidth: number,
    imageHeight: number
  }>({ divWidth: 0, divHeight: 0, imageWidth: 0, imageHeight: 0 });
  const [topMargin, setTopMargin] = useState(0);
  const textDivRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleImageSwap = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    e.stopPropagation();
    if (!extra) return;

    const newExtra = [...extra];
    const clickedImage = newExtra[index];
    newExtra[index] = visibleImage;

    setVisibleImage(clickedImage);
    setExtra(newExtra);
    setCurrentIndex(index);

    // Update URL without navigation
    const newPath = window.location.pathname.replace(/\/[^/]+$/, `/${clickedImage.slug}`);
    window.history.replaceState(null, '', newPath);
  };

  useEffect(() => {
    const updateDimensions = () => {
      let availableWidth: number;
      let availableHeight: number;

      // If in modal, the entire screen is available
      if (isModal) {
        // Just subtract the next buttons from the width
        availableWidth = window.innerWidth - (chevronSize * 2);
        availableHeight = window.innerHeight - (CONTAINER_VERTICAL_PADDING * 2);
      } else {
        // If not in modal, calculate space available from top most container
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          availableWidth = window.innerWidth;
          // Available height is from the top of the container to the bottom of the viewport
          availableHeight = window.innerHeight - rect.top - (CONTAINER_VERTICAL_PADDING * 2);
        } else {
          // Fallback if ref not available yet
          availableWidth = window.innerWidth;
          availableHeight = window.innerHeight - (CONTAINER_VERTICAL_PADDING * 2);
        }
      }

      // Measure the text div height
      const textHeight = textDivRef.current?.offsetHeight || 0;

      // Calculate available space for image (total height minus text div height and gap)
      const maxWidth = availableWidth;
      const maxHeight = availableHeight - textHeight - CONTAINER_GAP;

      const aspectRatio = visibleImage.width / visibleImage.height;

      // Calculate what the width would be if constrained by height
      const widthIfHeightConstrained = maxHeight * aspectRatio;

      // Determine which dimension is the limiting factor
      if (widthIfHeightConstrained <= maxWidth) {
        // Height is the limiting factor
        setDimensions({
          divWidth: widthIfHeightConstrained,
          divHeight: maxHeight,
          imageWidth: Math.round(widthIfHeightConstrained),
          imageHeight: Math.round(maxHeight)
        });
      } else {
        // Width is the limiting factor
        const heightIfWidthConstrained = maxWidth / aspectRatio;
        setDimensions({
          divWidth: maxWidth,
          divHeight: heightIfWidthConstrained,
          imageWidth: Math.round(maxWidth),
          imageHeight: Math.round(heightIfWidthConstrained)
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [visibleImage.width, visibleImage.height, isModal, chevronSize]);

  useEffect(() => {
    if (!isModal || !extra || extra.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();

        const totalImages = extra.length;
        let nextIndex: number;

        if (currentIndex === -1) {
          // First time, go to first extra image
          nextIndex = 0;
        } else if (e.key === 'ArrowDown') {
          nextIndex = (currentIndex + 1) % totalImages;
        } else {
          nextIndex = (currentIndex - 1 + totalImages) % totalImages;
        }

        // Swap images
        const newExtra = [...extra];
        const nextImage = newExtra[nextIndex];
        newExtra[nextIndex] = visibleImage;

        setVisibleImage(nextImage);
        setExtra(newExtra);
        setCurrentIndex(nextIndex);

        // Update URL without navigation
        const newPath = window.location.pathname.replace(/\/[^/]+$/, `/${nextImage.slug}`);
        window.history.replaceState(null, '', newPath);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModal, extra, visibleImage, currentIndex]);

  useEffect(() => {
    const updateMargin = () => {
      if (!containerRef.current || !textDivRef.current) {
        setTopMargin(0);
        return;
      }

      const containerHeight = isModal
        ? window.innerHeight - (CONTAINER_VERTICAL_PADDING * 2)
        : window.innerHeight - containerRef.current.getBoundingClientRect().top - (CONTAINER_VERTICAL_PADDING * 2);

      const contentHeight = dimensions.divHeight + textDivRef.current.offsetHeight + CONTAINER_GAP;
      const calculatedMargin = Math.max(0, (containerHeight - contentHeight) / 2);

      setTopMargin(calculatedMargin);
    };

    updateMargin();
    window.addEventListener('resize', updateMargin);
    return () => window.removeEventListener('resize', updateMargin);
  }, [dimensions.divHeight, isModal]);

  return (
    <div ref={containerRef} style={{ paddingTop: `${CONTAINER_VERTICAL_PADDING}px`, paddingBottom: `${CONTAINER_VERTICAL_PADDING}px`, display: 'flex', flexDirection: 'column', gap: `${CONTAINER_GAP}px` }}>
      <div style={{ marginTop: `${topMargin}px`, marginLeft: 'auto', marginRight: 'auto', width: 'fit-content', display: 'flex', flexDirection: 'column', gap: `${CONTAINER_GAP}px` }}>
        <div
          style={{
            width: `${dimensions.divWidth}px`,
            height: `${dimensions.divHeight}px`
          }}
        >
          <Image
            src={visibleImage.image}
            alt={visibleImage.title}
            width={dimensions.imageWidth}
            height={dimensions.imageHeight}
          />
        </div>
        <div ref={textDivRef}>
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
    </div>
  );
}