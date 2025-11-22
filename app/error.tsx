'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 px-8 text-center">
      <h1 className="font-playfair-display-sc text-[#939BBA] font-black italic text-4xl md:text-6xl">
        Oops!
      </h1>
      <div className="flex flex-col gap-4">
        <h2 className="font-open-sans-light text-[#6D6D6D] text-xl md:text-2xl font-semibold">
          Something went wrong
        </h2>
        <p className="font-open-sans-light text-[#6D6D6D] text-lg max-w-md">
          We encountered an unexpected error. Don&apos;t worry, it&apos;s not your fault!
        </p>
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-4 text-left bg-gray-100 p-4 rounded max-w-2xl mx-auto">
            <summary className="cursor-pointer font-semibold text-[#6D6D6D] mb-2">
              Error Details (Development Only)
            </summary>
            <pre className="text-sm text-red-600 overflow-auto whitespace-pre-wrap break-words">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <button
          onClick={reset}
          className="bg-[#939BBA] text-white px-8 py-3 font-open-sans-light hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#939BBA] transition-all"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="border-2 border-[#939BBA] text-[#939BBA] px-8 py-3 font-open-sans-light hover:bg-[#939BBA] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#939BBA] transition-all inline-block"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
