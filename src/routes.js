import { lazy } from 'react';

// Lazy load components
export const routes = {
  dashboard: {
    path: '/',
    component: lazy(() => import('./components/Dashboard'))
  },
  dataIngestion: {
    path: '/data-ingestion',
    component: lazy(() => import('./components/DataIngestion'))
  },
  benchmarks: {
    path: '/benchmarks', 
    component: lazy(() => import('./components/Benchmarks'))
  }
  // ... other routes
};