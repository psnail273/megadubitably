import ImageModal from '@/components/modal/ImageModal';
import { getDetails } from '@/lib/utils';

export default async function PhotoModalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Load the posters data
  const data = await getDetails('posters');

  const index = data.findIndex((item) => item.slug === slug);

  return <ImageModal data={data} index={index} path="poster" />;
} 
