import { lazy } from 'react';
// Layout
import MainLayout from '@/layouts/MainLayout';
// Pages
const HomePage = lazy(() => import('@/pages/HomePage'));

// Types Routes
interface RouteItem {
    path: string;
    component: React.ElementType;
    layout?: React.ElementType | null;
    requiresAuth: boolean;
}

const publicRoutes: RouteItem[] = [
    { path: '/', component: HomePage, layout: MainLayout, requiresAuth: true },
    { path: '/home', component: HomePage, layout: MainLayout, requiresAuth: true },
];

export default publicRoutes;
