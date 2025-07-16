import { BrowserRouter, Route, Routes } from 'react-router';

import Footer from './components/Footer';
import Header from './components/Header';
import { Toaster } from './components/ui/sonner';
import Transactions from './features/transactions';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <div className="min-h-screen bg-background flex flex-col">
                            <Toaster />
                            <Header />
                            <main className="flex-1 flex items-top justify-center p-4">
                                <Transactions />
                            </main>
                            <Footer />
                        </div>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
