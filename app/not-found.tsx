import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 px-8 text-center">
      <h1 className="font-playfair-display-sc text-[#939BBA] font-black italic text-6xl md:text-8xl">404</h1>
      <div className="flex flex-col gap-4">
        <h2 className="font-open-sans-light text-[#6D6D6D] text-2xl md:text-3xl font-semibold">Page Not Found</h2>
        <p className="font-open-sans-light text-[#6D6D6D] text-lg max-w-md">
          Oops! The page you&apos;re looking for seems to have wandered off. Let&apos;s get you back on track.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Link
          href="/"
          className="bg-[#939BBA] text-white px-8 py-3 font-open-sans-light hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#939BBA] transition-all"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}