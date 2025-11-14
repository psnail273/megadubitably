import type { GalleryImage } from '@/types/galleryImage';
import { promises as fs } from 'fs';

export async function getDetails(path: string) {
  const file = await fs.readFile(`public/${path}/details.json`, 'utf8');
  const data: GalleryImage[] = JSON.parse(file);
  data.reverse();
  return data;
}