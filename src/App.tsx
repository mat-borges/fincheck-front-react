import Footer from './components/Footer';
import Header from './components/Header';
import Transactions from './features/transactions';

function App() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-1 flex items-top justify-center p-4">
                <Transactions />
            </main>
            <Footer />
        </div>
    );
}

export default App;
