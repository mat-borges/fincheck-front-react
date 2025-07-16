import type { JSX } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '@/context/auth/useAuth';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" replace />;
}
