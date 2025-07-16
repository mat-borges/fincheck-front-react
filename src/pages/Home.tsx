import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Link } from 'react-router';
import { Toaster } from '@/components/ui/sonner';
import { useAuth } from '@/context/auth/useAuth';

export default function Home() {
    const { user } = useAuth();

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Toaster />
            <Header />
            <div className="w-full flex flex-col items-center justify-center max-w-4xl mx-auto p-6 space-y-6">
                <div className="text-center space-y-2 mb-6">
                    <h1 className="text-3xl font-bold text-textPrimary">Bem-vindo ao FinCheck!</h1>
                    <p className="text-textSecondary">Gerencie suas finanças com clareza</p>
                </div>
                <Button className="text-center space-y-2 mb-6 w-fit">
                    {user ? <Link to="/dashboard">Ir para o painel</Link> : <Link to="/login">Faça login</Link>}
                </Button>
            </div>
            <Footer />
        </main>
    );
}
