import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Toaster } from '@/components/ui/sonner';
import Transactions from '@/features/transactions';

export default function Dashboard() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Toaster />
            <Header />
            <div className="flex-1 flex items-top justify-center p-4">
                <Transactions />
            </div>
            <Footer />
        </main>
    );
}
