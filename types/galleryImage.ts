export interface GalleryImage {
  title: string;
  image: string;
  slug: string;
  type: string;
  description: string;
  width: number;
  height: number;
  hidden?: boolean;
  extra?: GalleryImage[];
} 