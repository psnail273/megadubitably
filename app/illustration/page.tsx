import Gallery from '@/components/gallery/gallery';
import { getDetails } from '@/lib/utils';

export default async function Illustration() {
  const data = await getDetails('illustrations');

  return ( 
    <>
      <Gallery data={data} path="illustration" />
    </>
  );
}
