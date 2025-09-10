import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment, Suspense } from 'react';
import publicRoutes from './publicRoutes';
import RouteGuard from './RouteGuard';
import MainLayout from '@/layouts/MainLayout';

const AppRouter = () => {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {publicRoutes.map(({ path, component: Component, layout, requiresAuth }, index) => {
                        const Layout = layout === null ? Fragment : layout || MainLayout;
                        return (
                            <Route
                                key={index}
                                path={path}
                                element={
                                    <RouteGuard requiresAuth={requiresAuth}>
                                        <Layout>
                                            <Component />
                                        </Layout>
                                    </RouteGuard>
                                }
                            >
                                <Route index element={<Component />} />
                            </Route>
                        );
                    })}
                </Routes>
            </Suspense>
        </Router>
    );
};

export default AppRouter;
