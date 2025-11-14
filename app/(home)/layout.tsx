import type { ReactNode } from 'react';

export default function HomeLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <>
      <div className="h-full">
        {children}
      </div>
      {modal}
    </>
  );
}
