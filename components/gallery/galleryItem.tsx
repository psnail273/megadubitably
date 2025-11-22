'use client';

import { useState, useEffect, useRef } from 'react';
import { GalleryImage } from '@/types/galleryImage';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function GalleryItem({ image, isModal, chevronSize = 0 }: { image: GalleryImage, isModal?: boolean, chevronSize: number }) {
  const CONTAINER_VERTICAL_PADDING = 24;
  const CONTAINER_GAP = 8;
  const EXTRA_IMAGES_SIDE_WIDTH = 200; // Width when positioned to the right
  const EXTRA_IMAGES_BOTTOM_HEIGHT = 64; // Height when positioned below

  const router = useRouter();
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
  const [extraImagesPosition, setExtraImagesPosition] = useState<'side' | 'bottom'>('side');
  const textDivRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleImageSwap = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
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

      // Determine if extra images exist and where they should be positioned
      const hasExtraImages = extra && extra.length > 0;
      let positionMode: 'side' | 'bottom' = 'bottom';
      let maxWidth = availableWidth;
      let maxHeight = availableHeight;
      const aspectRatio = visibleImage.width / visibleImage.height;

      if (hasExtraImages) {
        const spaceForSideImages = EXTRA_IMAGES_SIDE_WIDTH + CONTAINER_GAP;

        console.log('=== Layout Calculation ===');
        console.log('Available:', { availableWidth, availableHeight });
        console.log('Text height:', textHeight);
        console.log('Aspect ratio:', aspectRatio);

        // Calculate how much space we'd have for main image with side layout
        const widthWithSideImages = availableWidth - spaceForSideImages;
        const heightWithSideImages = availableHeight - textHeight - CONTAINER_GAP;

        // Calculate how much space we'd have for main image with bottom layout
        const widthWithBottomImages = availableWidth;
        const heightWithBottomImages = availableHeight - EXTRA_IMAGES_BOTTOM_HEIGHT - CONTAINER_GAP - textHeight - CONTAINER_GAP;

        console.log('Side layout space:', { widthWithSideImages, heightWithSideImages });
        console.log('Bottom layout space:', { widthWithBottomImages, heightWithBottomImages });

        // Calculate the actual main image dimensions for side layout
        let sideLayoutImageWidth, sideLayoutImageHeight;
        const sideWidthIfHeightConstrained = heightWithSideImages * aspectRatio;
        if (sideWidthIfHeightConstrained <= widthWithSideImages) {
          sideLayoutImageWidth = sideWidthIfHeightConstrained;
          sideLayoutImageHeight = heightWithSideImages;
        } else {
          sideLayoutImageWidth = widthWithSideImages;
          sideLayoutImageHeight = widthWithSideImages / aspectRatio;
        }
        const sideLayoutArea = sideLayoutImageWidth * sideLayoutImageHeight;

        // Calculate the actual main image dimensions for bottom layout
        let bottomLayoutImageWidth, bottomLayoutImageHeight;
        const bottomWidthIfHeightConstrained = heightWithBottomImages * aspectRatio;
        if (bottomWidthIfHeightConstrained <= widthWithBottomImages) {
          bottomLayoutImageWidth = bottomWidthIfHeightConstrained;
          bottomLayoutImageHeight = heightWithBottomImages;
        } else {
          bottomLayoutImageWidth = widthWithBottomImages;
          bottomLayoutImageHeight = widthWithBottomImages / aspectRatio;
        }
        const bottomLayoutArea = bottomLayoutImageWidth * bottomLayoutImageHeight;

        console.log('Side layout image:', { width: sideLayoutImageWidth, height: sideLayoutImageHeight, area: sideLayoutArea });
        console.log('Bottom layout image:', { width: bottomLayoutImageWidth, height: bottomLayoutImageHeight, area: bottomLayoutArea });

        // Choose the layout that gives us the larger main image
        if (sideLayoutArea > bottomLayoutArea && widthWithSideImages >= 400) {
          // Position to the side - gives us a larger image
          maxWidth = widthWithSideImages;
          maxHeight = heightWithSideImages;
          positionMode = 'side';
          console.log('✓ CHOSEN: SIDE layout');
        } else {
          // Position to the bottom
          maxWidth = widthWithBottomImages;
          maxHeight = heightWithBottomImages;
          positionMode = 'bottom';
          console.log('✓ CHOSEN: BOTTOM layout');
        }
        console.log('=========================');
        setExtraImagesPosition(positionMode);
      } else {
        // No extra images, just account for text
        maxHeight = availableHeight - textHeight - CONTAINER_GAP;
      }

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
  }, [visibleImage.width, visibleImage.height, isModal, chevronSize, extra]);

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

      // If not in modal, no top margin needed
      if (!isModal) {
        setTopMargin(0);
        return;
      }

      const containerHeight = window.innerHeight - (CONTAINER_VERTICAL_PADDING * 2);

      let contentHeight = dimensions.divHeight + textDivRef.current.offsetHeight + CONTAINER_GAP;

      // If extra images are positioned at the bottom, add their height to content calculation
      if (extra && extra.length > 0 && extraImagesPosition === 'bottom') {
        contentHeight += EXTRA_IMAGES_BOTTOM_HEIGHT + CONTAINER_GAP;
      }

      const calculatedMargin = Math.max(0, (containerHeight - contentHeight) / 2);

      setTopMargin(calculatedMargin);
    };

    updateMargin();
    window.addEventListener('resize', updateMargin);
    return () => window.removeEventListener('resize', updateMargin);
  }, [dimensions.divHeight, isModal, extra, extraImagesPosition]);

  return (
    <div
      ref={containerRef}
      style={{
        paddingTop: isModal ? `${CONTAINER_VERTICAL_PADDING}px` : '0',
        paddingBottom: `${CONTAINER_VERTICAL_PADDING}px`
      }}
      onClick={(e) => (e.stopPropagation())}
    >
      <div style={{ marginTop: `${topMargin}px`, marginLeft: 'auto', marginRight: 'auto', width: 'fit-content' }}>
        {/* Main image and extra images container */}
        <div style={{
          position: 'relative',
          width: extraImagesPosition === 'side' && extra && extra.length > 0
            ? `${dimensions.divWidth + EXTRA_IMAGES_SIDE_WIDTH + CONTAINER_GAP}px`
            : `${dimensions.divWidth}px`,
          whiteSpace: 'nowrap'
        }}>
          {/* Main image */}
          <div
            style={{
              width: `${dimensions.divWidth}px`,
              height: `${dimensions.divHeight}px`,
              display: 'inline-block',
              verticalAlign: 'top',
              position: 'relative'
            }}
          >
            <Image
              src={visibleImage.image}
              alt={visibleImage.title}
              width={dimensions.imageWidth}
              height={dimensions.imageHeight}
            />

            {/* Close button - only shown in modal */}
            {isModal && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.back();
                }}
                className="absolute top-2 right-2 z-10 w-[32px] h-[32px] sm:w-[44px] sm:h-[44px] rounded-full p-2 bg-white/20 hover:bg-white/40 focus:bg-white/60 active:bg-white/60 transition-all duration-200"
                aria-label="Close"
              >
                <Image src="/close.svg" alt="Close" fill />
              </button>
            )}
          </div>

          {/* Extra images thumbnails - Side position */}
          {extra && extra.length > 0 && extraImagesPosition === 'side' && (
            <div
              data-extra-images-container="true"
              style={{
                width: `${EXTRA_IMAGES_SIDE_WIDTH}px`,
                maxHeight: `${dimensions.divHeight}px`,
                overflowY: 'auto',
                overflowX: 'hidden',
                display: 'inline-block',
                verticalAlign: 'top',
                marginLeft: `${CONTAINER_GAP}px`
              }}
            >
              {extra.map((extraImage, index) => {
                const isCurrentlyVisible = extraImage.slug === visibleImage.slug;
                const extraAspectRatio = extraImage.width / extraImage.height;
                const thumbWidth = EXTRA_IMAGES_SIDE_WIDTH;
                const thumbHeight = Math.round(EXTRA_IMAGES_SIDE_WIDTH / extraAspectRatio);

                return (
                  <button
                    key={index}
                    onClick={(e) => handleImageSwap(e, index)}
                    style={{
                      width: `${thumbWidth}px`,
                      height: `${thumbHeight}px`,
                      cursor: 'pointer',
                      transition: 'opacity 0.2s ease',
                      display: 'block',
                      marginBottom: index < extra.length - 1 ? `${CONTAINER_GAP}px` : '0'
                    }}
                    onMouseEnter={(e) => {
                      if (!isCurrentlyVisible) {
                        e.currentTarget.style.opacity = '0.8';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                  >
                    <Image
                      src={extraImage.image}
                      alt={extraImage.title}
                      width={thumbWidth}
                      height={thumbHeight}
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Extra images thumbnails - Bottom position */}
        {extra && extra.length > 0 && extraImagesPosition === 'bottom' && (
          <div
            data-extra-images-container="true"
            style={{
              height: `${EXTRA_IMAGES_BOTTOM_HEIGHT}px`,
              maxWidth: `${dimensions.divWidth}px`,
              overflowX: 'auto',
              overflowY: 'hidden',
              whiteSpace: 'nowrap',
              marginTop: `${CONTAINER_GAP}px`
            }}
          >
            {extra.map((extraImage, index) => {
              const isCurrentlyVisible = extraImage.slug === visibleImage.slug;
              const extraAspectRatio = extraImage.width / extraImage.height;
              const thumbHeight = EXTRA_IMAGES_BOTTOM_HEIGHT;
              const thumbWidth = Math.round(EXTRA_IMAGES_BOTTOM_HEIGHT * extraAspectRatio);

              return (
                <button
                  key={index}
                  onClick={(e) => handleImageSwap(e, index)}
                  style={{
                    width: `${thumbWidth}px`,
                    height: `${thumbHeight}px`,
                    // border: isCurrentlyVisible ? '2px solid #939BBA' : '2px solid transparent',
                    cursor: 'pointer',
                    padding: 0,
                    background: 'none',
                    transition: 'transform 0.2s ease, opacity 0.2s ease',
                    opacity: isCurrentlyVisible ? 0.6 : 1,
                    display: 'inline-block',
                    verticalAlign: 'top',
                    marginRight: index < extra.length - 1 ? `${CONTAINER_GAP}px` : '0'
                  }}
                  onMouseEnter={(e) => {
                    if (!isCurrentlyVisible) {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <Image
                    src={extraImage.image}
                    alt={extraImage.title}
                    width={thumbWidth}
                    height={thumbHeight}
                    // style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </button>
              );
            })}
          </div>
        )}

        {/* Text description */}
        <div
          ref={textDivRef}
          style={{
            marginTop: `${CONTAINER_GAP}px`,
            maxWidth: extraImagesPosition === 'side'
              ? `${dimensions.divWidth + EXTRA_IMAGES_SIDE_WIDTH + CONTAINER_GAP}px`
              : `${dimensions.divWidth}px`
          }}
        >
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