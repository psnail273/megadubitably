import { notFound } from 'next/navigation';
import GalleryItem from '@/components/gallery/galleryItem';
import { getDetails, getImage } from '@/lib/utils';

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await getDetails('posters');

  // Find the image by matching the title (convert underscores back to spaces)
  const image = getImage(slug, data);

  if (!image) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-row w-auto h-full justify-center">
      <GalleryItem image={image} isModal={false} chevronSize={0} path="poster" />
    </div>
  );
}
