import TransactionItem from './TransactionItem';
import TransactionModal from './TransactionModal';
import { transactions } from '../../../mockData';
import { useState } from 'react';

export default function TransactionList() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <section className="bg-white rounded-xl p-4 shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Transações</h2>
                <TransactionModal open={modalOpen} onOpenChange={setModalOpen} />
            </div>
            <ul className="space-y-2">
                {transactions.map((transaction) => (
                    <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
            </ul>
        </section>
    );
}
