import { type PropsWithChildren, Suspense } from 'react';

export default function SearchLayout({ children }: PropsWithChildren) {
  return <Suspense>{children}</Suspense>;
}