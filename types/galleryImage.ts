export interface GalleryImage {
  title: string;
  image: string;
  slug: string;
  type: string;
  description: string;
  width: number;
  height: number;
  extra?: {
    title: string;
    slug: string;
    type: string;
    description: string;
    image: string;
    width: number;
    height: number;
  }[];
} 