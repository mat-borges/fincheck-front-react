import type { Category, Transaction } from '@/types/Transactions';

import AppModal from '@/components/AppModal';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import TransactionForm from './TransactionForm';

export default function TransactionModal({
    open,
    onOpenChange,
    transactions,
    setTransactions,
    categories,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    transactions: Transaction[];
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
    categories: Category[];
}) {
    return (
        <AppModal
            open={open}
            onOpenChange={onOpenChange}
            title="Nova Transação"
            description="Preencha os campos abaixo para adicionar uma nova transação."
            trigger={
                <Button className="flex items-center gap-x-2 hover:bg-lime-700 text-white shadow transition cursor-pointer">
                    <PlusIcon className="w-5 h-5" />
                </Button>
            }
            footer={
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                    Cancelar
                </Button>
            }
        >
            <TransactionForm
                onSubmit={() => onOpenChange(false)}
                transactions={transactions}
                setTransactions={setTransactions}
                categories={categories}
            />
        </AppModal>
    );
}
