import { PlusIcon } from '@heroicons/react/16/solid';
import TransactionItem from './TransactionItem';
import { transactions } from '../../../mockData';

export default function TransactionList() {
    return (
        <section className="bg-white rounded-xl p-4 shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Transações</h2>
                <button
                    className="flex items-center gap-x-2 bg-secondary hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-[#afef94] text-white px-4 py-2 rounded-md font-medium shadow transition"
                    title="Adicionar nova transação"
                    onClick={() => console.log('Nova Transação')}
                >
                    <PlusIcon className="w-5 h-5" />
                    Nova
                </button>
            </div>
            <ul className="space-y-2">
                {transactions.map((transaction) => (
                    <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
            </ul>
        </section>
    );
}
