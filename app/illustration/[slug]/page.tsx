import { notFound } from 'next/navigation';
import GalleryItem from '@/components/gallery/galleryItem';
import { getDetails, getImage } from '@/lib/utils';

export default async function IllustrationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Load the illustrations data
  const data = await getDetails('illustrations');

  // Find the image by matching the slug
  const image = getImage(slug, data);

  if (!image) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center justify-start h-full">
      <GalleryItem image={image} isModal={false} chevronSize={0} path="illustration" />
    </div>
  );
}
