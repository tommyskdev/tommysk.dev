'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function DetailsRedirectClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get('id');
    router.replace(id ? `/projects/${encodeURIComponent(id)}` : '/projects');
  }, [router, searchParams]);

  return null;
}
