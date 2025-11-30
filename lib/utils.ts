import type { GalleryImage } from '@/types/galleryImage';
import { promises as fs } from 'fs';

export async function getDetails(path: string) {
  const file = await fs.readFile(`public/${path}/details.json`, 'utf8');
  const data: GalleryImage[] = JSON.parse(file);
  // data.reverse();
  return data;
}

export function getImage(slug: string, data: GalleryImage[]) {
  const image = data.find((item) => item.slug === slug);

  if (image) {
    return image;
  }

  // Check if the slug exists in the extra array and return that image if it does
  for (const parentImage of data) {
    if (parentImage.extra) {
      const extraIndex = parentImage.extra.findIndex((item) => item.slug === slug);

      if (extraIndex !== -1) {
        const foundImage = parentImage.extra[extraIndex];

        // Create a new extra array with the found image swapped with the parent
        const newExtra = [...parentImage.extra];
        newExtra[extraIndex] = {
          title: parentImage.title,
          image: parentImage.image,
          slug: parentImage.slug,
          type: parentImage.type,
          description: parentImage.description,
          width: parentImage.width,
          height: parentImage.height,
          ...(parentImage.hidden !== undefined && { hidden: parentImage.hidden })
        };

        return {
          ...foundImage,
          extra: newExtra
        };
      }
    }
  }

  return undefined;
}