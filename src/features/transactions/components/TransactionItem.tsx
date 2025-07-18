import { CalendarDays, SquarePen, Trash } from 'lucide-react';
import type { Category, Transaction } from '@/types/Transactions';
import type { Dispatch, SetStateAction } from 'react';
import { formatCurrency, normalizeCategory } from '../../../utils/format';

import { ConfirmDialog } from '@/components/confirmDialog';
import { TRANSACTION_CATEGORIES } from '@/utils/categoryMap';
import fincheckApi from '@/api/fincheckApi';
import { toast } from 'sonner';

export default function TransactionItem({
    transaction,
    setTransactions,
    categories,
}: {
    transaction: Transaction;
    setTransactions: Dispatch<SetStateAction<Transaction[]>>;
    categories: Category[];
}) {
    const isExpense = transaction.type === 'expense';

    const category = categories.find((cat) => cat.id === transaction.categoryId);

    let CategoryIcon;

    if (category) {
        const categoryKey = normalizeCategory(category.name);
        const categoryData =
            categoryKey in TRANSACTION_CATEGORIES
                ? TRANSACTION_CATEGORIES[categoryKey as keyof typeof TRANSACTION_CATEGORIES]
                : TRANSACTION_CATEGORIES['outros'];

        CategoryIcon = categoryData?.icon;
    }

    function handleEdit(id: string) {
        console.log(id);
    }

    function handleDelete(id: string) {
        fincheckApi
            .delete(`transactions/${id}`)
            .then((res) => {
                console.log(res);
                setTransactions((transactions) => transactions.filter((t) => t.id !== id));
                toast.success(' Transação excluída com sucesso 🗑️');
            })
            .catch((err) => {
                console.error('Error deleting transaction', err?.response?.data ?? err.message);
                toast.error('Erro ao excluir transação');
            });
    }

    return (
        <li className="flex justify-between items-start p-4 rounded-md bg-gray-50 border hover:shadow-sm transition">
            <div className="flex gap-3">
                {CategoryIcon && <CategoryIcon className="w-6 h-6 text-gray-500 mt-1" />}

                <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                        <CalendarDays className="w-4 h-4" />
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
                        onClick={() => handleEdit(transaction.id)}
                        className="text-gray-400 hover:text-blue-600 transition"
                        title="Editar transação"
                    >
                        <SquarePen className="w-5 h-5" />
                    </button>

                    <ConfirmDialog
                        title="Tem certeza que deseja deletar essa transação?"
                        description="Essa ação irá remover o item permanentemente."
                        onConfirm={() => handleDelete(transaction.id)}
                    >
                        <button className="text-gray-400 hover:text-red-600 transition" title="Excluir transação">
                            <Trash className="w-5 h-5" />
                        </button>
                    </ConfirmDialog>
                </div>
            </div>
        </li>
    );
}
