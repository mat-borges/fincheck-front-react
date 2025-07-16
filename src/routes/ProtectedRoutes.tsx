import type { JSX } from 'react';
import LoadingSpinner from '@/components/Loader';
import { Navigate } from 'react-router';
import { useAuth } from '@/context/auth/useAuth';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { user, isLoading } = useAuth();
    console.log(user);

    if (isLoading) return <LoadingSpinner />;

    return user ? children : <Navigate to="/login" replace />;
}
