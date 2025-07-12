import type { Transaction } from '../../mockData';
import { formatCurrency } from '../../utils/format';

type Props = {
    transactions: Transaction[];
};

export default function SummaryCard({ transactions }: Props) {
    const expenses = transactions.filter((t) => t.type === 'expense');
    const incomes = transactions.filter((t) => t.type === 'income');

    const totalExpenses = expenses.reduce((acc, t) => acc + t.amount, 0);
    const totalIncomes = incomes.reduce((acc, t) => acc + t.amount, 0);

    const balance = totalIncomes - totalExpenses;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow p-4 border-l-4 border-secondary">
                <p className="text-sm text-gray-500">Entradas</p>
                <p className="text-xl font-semibold text-green-600">{formatCurrency(totalIncomes)}</p>
            </div>
            <div className="bg-white rounded-xl shadow p-4 border-l-4 border-red-500">
                <p className="text-sm text-gray-500">Saídas</p>
                <p className="text-xl font-semibold text-red-600">{formatCurrency(totalExpenses)}</p>
            </div>
            <div className="bg-white rounded-xl shadow p-4 border-l-4 border-primary">
                <p className="text-sm text-gray-500">Saldo</p>
                <p className={`text-xl font-semibold ${balance < 0 ? 'text-red-600' : 'text-gray-800'}`}>
                    {balance < 0 ? `- ${formatCurrency(Math.abs(balance))}` : formatCurrency(balance)}
                </p>
            </div>
        </div>
    );
}
