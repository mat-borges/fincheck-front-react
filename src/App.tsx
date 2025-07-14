import Footer from './components/Footer';
import Header from './components/Header';
import { Toaster } from './components/ui/sonner';
import Transactions from './features/transactions';

function App() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Toaster />
            <Header />
            <main className="flex-1 flex items-top justify-center p-4">
                <Transactions />
            </main>
            <Footer />
        </div>
    );
}

export default App;
