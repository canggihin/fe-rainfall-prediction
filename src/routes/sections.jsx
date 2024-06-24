import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const DevicePage = lazy(() => import('src/pages/device'));
export const IndexPage = lazy(() => import('src/pages/app'));
export const UserPage = lazy(() => import('src/pages/user'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const LoginPage = lazy(() => import('src/pages/login'))

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'data', element: <UserPage /> },
        { path: 'device', element: <DevicePage /> },
      ],
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
