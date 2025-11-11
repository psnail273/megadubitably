import Gallery from '@/components/gallery/gallery';
import { promises as fs } from 'fs';
import type { Poster } from '@/types/poster';

export default async function Home() {
  const file = await fs.readFile('public/posters/details.json', 'utf8');
  const data: Poster[] = JSON.parse(file);

  return (
    <>
      <Gallery data={data} />
    </>
  );
}
