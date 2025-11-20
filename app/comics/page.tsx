import Image from 'next/image';
import { promises as fs } from 'fs';
import { Comic } from '@/types/comic';

export default async function ComicsPage() {
  const file = await fs.readFile('public/comics/cottonwood/details.json', 'utf8');
  const data: Comic = JSON.parse(file);

  return (
    <>
      <div className="flex flex-col items-center gap-8 overflow-x-hidden">
        <Image className="hover:scale-105 transition-transform duration-300 ease-in-out" src={data['banner']['image']} alt="Cottonwood_Banner" width={data['banner']['width']} height={data['banner']['height']} />
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-8 mx-4">
            <div className="font-open-sans-light text-center max-w-[100ch]">
              Once upon a time in the land of enchantment...
              <br />
            </div>
            <Image src={data['title']['image']} alt="Cottonwood_Title" width={data['title']['width']} height={data['title']['height']} />
            <div className="font-open-sans-light text-[#6D6D6D] text-center max-w-[100ch]">
              <span className="font-bold italic">Under the Cottonwood Tree: El Susto de la Curandera</span> is a full color 166 page New Mexican folklore adventure graphic novel that I illustrated and designed, working from the script of brothers Paul and Carlos Meyer. I had just moved out to Los Angeles fresh from art school and found Paul’s artist wanted listing on Craigslist. I was drawn to the beautiful scenery and magical elements.
              <br />
              <br />

              This project was a little ambitious for my first comic book, but over eight years later we published it via a successful Kickstarter campaign, which you can view by clicking <a href="https://www.kickstarter.com/projects/250303295/under-the-cottonwood-tree-a-latinx-fairy-tale-adve" target="_blank" rel="noopener noreferrer" className="text-[#939BBA] hover:underline underline-offset-4 font-bold">here</a>.
              <br />
              <br />
              You can purchase the book via this <a href="https://www.underthecottonwoodtree.com/#buy_now" target="_blank" rel="noopener noreferrer" className="text-[#939BBA] hover:underline underline-offset-4 font-bold">link</a>.
              <br />
              <br />
              Below are some selected interior pages:
            </div>
          </div>
          <div className="flex flex-col">
            {data['pages']['images'].map((image) => (
              <Image key={image} src={image} alt="Cottonwood_Page" width={data['pages']['width']} height={data['pages']['height']} className="w-full h-auto" loading="lazy" />
            ))}
          </div>
          <div className="flex flex-col items-center gap-4 mx-4">
            <Image src={data['awards']['image']} alt="Cottonwood_Awards" width={data['awards']['width']} height={data['awards']['height']} loading="lazy" />
            <Image className="hover:scale-105 transition-transform duration-300 ease-in-out" src={data['leaf']['image']} alt="Cottonwood_Leaf" width={data['leaf']['width']} height={data['leaf']['height']} loading="lazy" />
            <div className="font-open-sans-light text-[#6D6D6D] text-center max-w-[100ch]">
              There are more comic projects in the works, stay tuned!
            </div>
          </div>
          <br />
          <br />
        </div>
      </div>
    </>
  )
}