import Image from 'next/image';
import { promises as fs } from 'fs';
import { AboutData } from '@/types/about';
import Contact from '@/components/contact/contact';

export default async function AboutPage() {
  const file = await fs.readFile('public/about/details.json', 'utf8');
  const data: AboutData = JSON.parse(file);
  
  return (
    <>
      <div className="flex flex-col items-center gap-8 max-w-[100ch] mx-8 lg:mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <Image
            src={data.image}
            alt="About"
            width={data.width / 2}
            height={data.height / 2}
            className="max-w-[75%] h-auto w-full md:w-auto"
          />
          <div className="flex flex-col gap-4">
            <div className="font-open-sans-light text-[#6D6D6D] text-md">
              Hi, I&apos;m Margaret aka Meg! I am an art director and illustrator who has been
              working in the Hollywood key art industry for over a decade. In addition to
              film and TV branding, I love to explore comics, fine art, and many other
              mediums. When I&apos;m not arting around, I&apos;m either outside playing or trying to
              DIY some house project with my fabulous husband. Or, let&apos;s be honest, watching
              too much TV (it&apos;s for work, I swear!).
            </div>
            <div className="font-open-sans-light text-[#6D6D6D] text-md">
              For inquiries, contact me here or email me at{ ' ' }
              <a className='text-[#939BBA] hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#939BBA] rounded' href='mailto:meg@meghardyart.com' target="_blank" rel="noopener noreferrer">
                {process.env.CONTACT_EMAIL}
              </a>.
            </div>
          </div>
        </div>
        <Contact />
      </div>
    </>
  )
}