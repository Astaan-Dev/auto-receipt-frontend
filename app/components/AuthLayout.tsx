"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import { AppBar } from './AppBar';
import { Loading } from './Loading';
import { Suspense } from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <AppBar />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
} 