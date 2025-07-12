import SummaryCard from '../summary';
import TransactionList from './components/TransactionList';
import { transactions } from '../../mockData';

export default function Transactions() {
    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow space-y-6">
            <div className="text-center space-y-2 mb-6">
                <h1 className="text-3xl font-bold text-textPrimary">Bem-vindo ao FinCheck</h1>
                <p className="text-textSecondary">Gerencie suas finanças com clareza.</p>
            </div>
            <SummaryCard transactions={transactions} />
            <TransactionList />
        </div>
    );
}
