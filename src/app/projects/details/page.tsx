import { Suspense } from 'react';
import DetailsRedirectClient from './redirect-client';

export const metadata = {
  title: 'Project Details - Tommy SK',
};

export default function DetailsPage() {
  return (
    <Suspense fallback={null}>
      <DetailsRedirectClient />
    </Suspense>
  );
}

