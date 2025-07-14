import type { Transaction } from '@/types/Transactions';
import type { TransactionCategory } from '@/types/TransactionCategory';
import TransactionItem from './TransactionItem';

export default function TransactionList({
    transactions,
    categoryMap,
}: {
    transactions: Transaction[];
    categoryMap: Record<string, TransactionCategory>;
}) {
    return (
        <ul className="space-y-2">
            {transactions.length > 0 ? (
                transactions.map((transaction) => (
                    <TransactionItem key={transaction.id} transaction={transaction} categoryMap={categoryMap} />
                ))
            ) : (
                <p>Não há nenhuma transação registrada ainda</p>
            )}
        </ul>
    );
}
