import Gallery from '@/components/gallery/gallery';
import { getDetails } from '@/lib/utils';

export default async function Home() {
  const data = await getDetails('posters');
  return <Gallery data={data} path="poster" />;
}
