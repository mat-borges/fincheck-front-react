import Filters from './features/filters';
import Footer from './components/Footer';
import Header from './components/Header';
import Transactions from './features/transactions';

function App() {
    return (
        <main>
            <Header />
            <Filters />
            <h1>Welcome to FinCheck</h1>
            <p>This is your personal finance management application.</p>
            <Transactions />
            <Footer />
        </main>
    );
}

export default App;
