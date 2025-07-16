import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LoadingSpinner from '@/components/Loader';
import { Toaster } from '@/components/ui/sonner';
import { useAuth } from '@/context/auth/useAuth';
import { useNavigate } from 'react-router';
import { useState, type FormEvent } from 'react';
import fincheckApi from '@/api/fincheckApi';

export default function Login() {
    const { user, login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(e: FormEvent) {
        e.preventDefault();
        try {
            setIsLoading(true);
            const res = await fincheckApi.post<{ accessToken: string }>('/auth/signin', formData);
            // console.log(res.data.accessToken);
            login(res.data?.accessToken);
            navigate('/dashboard');
        } catch (err) {
            console.log(err);
            console.error('Erro ao realizar Login!', err);
        } finally {
            setIsLoading(false);
        }
    }

    if (user) navigate('/');

    return (
        <main>
            <Toaster />
            <Header />
            <div className="flex-1 flex items-top justify-center p-4">
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="email">E-Mail</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="E-mail"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value.toLowerCase() })}
                            required
                            className="border border-border"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="password">Senha</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Senha"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            className="border border-border"
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        {isLoading ? <LoadingSpinner /> : 'Entrar'}
                    </Button>
                </form>
            </div>
            <Footer />
        </main>
    );
}
