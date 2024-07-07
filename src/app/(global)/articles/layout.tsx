import { Suspense, type PropsWithChildren } from 'react';

export default function ArticlesLayout({ children }: PropsWithChildren) {
  return (
    <Suspense>{children}</Suspense>
  );
}