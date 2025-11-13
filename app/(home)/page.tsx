import Gallery from '@/components/gallery/gallery';
import { promises as fs } from 'fs';
import type { GalleryImage } from '@/types/galleryImage';

export default async function Home() {
  const file = await fs.readFile('public/posters/details.json', 'utf8');
  const data: GalleryImage[] = JSON.parse(file);
  data.reverse();
  
  return (
    <>
      <Gallery data={data} />
    </>
  );
}
