import type { Category, Transaction } from '@/types/Transactions';

import AppModal from '@/components/AppModal';
import { Button } from '@/components/ui/button';
import type { ReactNode } from 'react';
import TransactionForm from './TransactionForm';

export default function TransactionModal({
    open,
    onOpenChange,
    setTransactions,
    categories,
    transactionToEdit,
    triggerButton,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
    categories: Category[];
    transactionToEdit?: Transaction;
    triggerButton: ReactNode;
}) {
    return (
        <AppModal
            open={open}
            onOpenChange={onOpenChange}
            title="Nova Transação"
            description="Preencha os campos abaixo para adicionar uma nova transação."
            trigger={triggerButton}
            footer={
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                    Cancelar
                </Button>
            }
        >
            <TransactionForm
                onSubmit={() => onOpenChange(false)}
                setTransactions={setTransactions}
                categories={categories}
                transactionToEdit={transactionToEdit}
            />
        </AppModal>
    );
}
