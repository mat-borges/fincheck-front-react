import type { Category, Transaction } from '@/types/Transactions';
import type { Dispatch, SetStateAction } from 'react';

import TransactionItem from './TransactionItem';

export default function TransactionList({
    transactions,
    setTransactions,
    categories,
}: {
    transactions: Transaction[];
    setTransactions: Dispatch<SetStateAction<Transaction[]>>;
    categories: Category[];
}) {
    return (
        <ul className="space-y-2">
            {transactions.length > 0 ? (
                transactions.map((transaction) => (
                    <TransactionItem
                        key={transaction.id}
                        transaction={transaction}
                        setTransactions={setTransactions}
                        categories={categories}
                    />
                ))
            ) : (
                <p>Não há nenhuma transação registrada ainda</p>
            )}
        </ul>
    );
}
