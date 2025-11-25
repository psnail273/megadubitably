'use client';

const isDevMode = process.env.NEXT_PUBLIC_DEV_MODE === 'true';

export default function DevModeBanner() {
  if (!isDevMode) {
    return null;
  }

  return (
    <div className="bg-red-500 text-white text-center py-2 px-4 text-sm font-semibold">
      🚧 DEVELOPMENT MODE 🚧
    </div>
  );
}
