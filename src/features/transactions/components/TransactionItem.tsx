import { CalendarDaysIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/16/solid';
import { formatCurrency, normalizeCategory } from '../../../utils/format';

import { TRANSACTION_CATEGORIES } from '@/utils/categoryMap';
import type { Transaction } from '../../../mockData';
import type { TransactionCategory } from '@/types/TransactionCategory';

export default function TransactionItem({
    transaction,
    categoryMap,
}: {
    transaction: Transaction;
    categoryMap: Record<string, TransactionCategory>;
}) {
    const isExpense = transaction.type === 'expense';

    const rawCategory = categoryMap[transaction.categoryId] ?? 'outros';
    const categoryKey = normalizeCategory(rawCategory);
    const categoryData =
        categoryKey in TRANSACTION_CATEGORIES
            ? TRANSACTION_CATEGORIES[categoryKey as keyof typeof TRANSACTION_CATEGORIES]
            : TRANSACTION_CATEGORIES['outros'];
    const CategoryIcon = categoryData?.icon;

    return (
        <li className="flex justify-between items-start p-4 rounded-md bg-gray-50 border hover:shadow-sm transition">
            <div className="flex gap-3">
                {CategoryIcon && <CategoryIcon className="w-6 h-6 text-gray-500 mt-1" />}

                <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                        <CalendarDaysIcon className="w-4 h-4" />
                        <span>{transaction.date}</span>
                    </div>
                    <p className="text-textPrimary font-semibold leading-none">{transaction.title}</p>
                    {transaction.description && <p className="text-sm text-gray-600">{transaction.description}</p>}
                </div>
            </div>

            <div className="flex items-center gap-3">
                <span className={`font-semibold ${isExpense ? 'text-red-500' : 'text-green-600'}`}>
                    {isExpense ? '-' : '+'} {formatCurrency(transaction.amount)}
                </span>
                <div>
                    <button
                        onClick={() => console.log('Editar', transaction.id)}
                        className="text-gray-400 hover:text-blue-600 transition"
                        title="Editar transação"
                    >
                        <PencilSquareIcon className="w-5 h-5" />
                    </button>

                    <button
                        onClick={() => console.log('Deletar', transaction.id)}
                        className="text-gray-400 hover:text-red-600 transition"
                        title="Excluir transação"
                    >
                        <TrashIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </li>
    );
}
