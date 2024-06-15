// Reading search parameters through useSearchParams() without a Suspense boundary will opt the entire page into client-side rendering. This could cause your page to be blank until the client-side JavaScript has loaded.
// Refer to https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout

import { Suspense, type PropsWithChildren } from 'react';

export default function LoginLayout({ children }: PropsWithChildren) {
  return (
    <Suspense>{children}</Suspense>
  );
}