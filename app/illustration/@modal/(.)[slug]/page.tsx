import ImageModal from '@/components/modal/ImageModal';
import { getDetails } from '@/lib/utils';

export default async function IllustrationModalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Load the illustrations data
  const data = await getDetails('illustrations');

  const index = data.findIndex((item) => item.slug === slug);

  return <ImageModal data={data} index={index} path="illustration" />;
}
