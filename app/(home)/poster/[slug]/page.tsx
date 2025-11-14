import { notFound } from 'next/navigation';
import GalleryItem from '@/components/gallery/galleryItem';
import { getDetails } from '@/lib/utils';

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await getDetails('posters');

  // Find the image by matching the title (convert underscores back to spaces)
  const image = data.find((item) => item.slug === slug);

  if (!image) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <GalleryItem image={image} />
    </div>
  );
}
