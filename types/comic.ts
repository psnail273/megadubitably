export interface Comic {
  banner: {
    image: string;
    width: number;
    height: number;
  },
  awards: {
    image: string;
    width: number;
    height: number;
  },
  title: {
    image: string;
    width: number;
    height: number;
  },
  leaf: {
    image: string;
    width: number;
    height: number;
  },
  pages: {
    width: number;
    height: number;
    images: string[];
  }
}