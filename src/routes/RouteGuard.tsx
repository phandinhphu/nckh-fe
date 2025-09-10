import { Navigate } from 'react-router-dom';
import useAuth from '@/hooks/auth';

const RouteGuard = ({ children, requiresAuth }: { children: React.ReactElement; requiresAuth: boolean }) => {
    const { user } = useAuth();

    // if (requiresAuth && !user) {
    //     return <Navigate to="/login" replace />;
    // }

    if (!requiresAuth && user) {
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default RouteGuard;
