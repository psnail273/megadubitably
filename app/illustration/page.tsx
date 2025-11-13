import Gallery from '@/components/gallery/gallery';
import { promises as fs } from 'fs';
import type { GalleryImage } from '@/types/galleryImage';

export default async function Illustration() {
  const file = await fs.readFile('public/illustrations/details.json', 'utf8');
  const data: GalleryImage[] = JSON.parse(file);

  return ( 
    <>
      <Gallery data={data} />
    </>
  );
}
