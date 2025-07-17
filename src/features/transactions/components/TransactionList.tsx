import type { Category, Transaction } from '@/types/Transactions';

import TransactionItem from './TransactionItem';

export default function TransactionList({
    transactions,
    categories,
}: {
    transactions: Transaction[];
    categories: Category[];
}) {
    return (
        <ul className="space-y-2">
            {transactions.length > 0 ? (
                transactions.map((transaction) => (
                    <TransactionItem key={transaction.id} transaction={transaction} categories={categories} />
                ))
            ) : (
                <p>Não há nenhuma transação registrada ainda</p>
            )}
        </ul>
    );
}
