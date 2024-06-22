'use client';

import type { PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/providers/userProvider';
import { initializeApp } from 'firebase/app';

// currently just use storage service
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);

// TODO: handle different error by statusCode globally, ex: show toast

export default function DashboardLayout({ children }: PropsWithChildren) {
  const { isLogin } = useUserStore((state) => state);
  const router = useRouter();

  // can't use !isLogin, because it's null at first
  if (isLogin === false) {
    router.replace('/login');
  }

  return (
    <>
      {children}
    </>
  );
}
