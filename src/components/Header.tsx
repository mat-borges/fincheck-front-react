import { LogOut } from 'lucide-react';
import Logo from '../assets/FinCheck-logo.png';
import { useAuth } from '@/context/auth/useAuth';

export default function Header() {
    const { user, logout } = useAuth();

    return (
        <header className="bg-primary text-secondary px-6 py-4 shadow-md flex justify-between items-center">
            <div className="flex items-center gap-4">
                <img src={Logo} alt="Logo" className="w-12" />
                <h1 className="text-2xl font-bold tracking-tight">FinCheck</h1>
            </div>
            {user ? (
                <div className="flex items-center justify-center gap-3">
                    <p className="text-sm font-bold">Olá, Mateus!</p>
                    <button className="cursor-pointer hover:size-7 transform" title="LogOut" onClick={logout}>
                        <LogOut className="w-6 h-6 hover:size-7" />
                    </button>
                </div>
            ) : (
                ''
            )}
        </header>
    );
}
