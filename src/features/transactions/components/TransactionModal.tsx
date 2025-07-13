import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import TransactionForm from './TransactionForm';

export default function TransactionModal({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button
                    className="flex items-center gap-x-2 hover:bg-lime-700 text-white shadow transition cursor-pointer"
                    variant="secondary"
                >
                    <PlusIcon className="w-5 h-5" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nova Transação</DialogTitle>
                    <DialogDescription>Preencha os campos abaixo para adicionar uma nova transação.</DialogDescription>
                </DialogHeader>
                <TransactionForm onSubmit={() => onOpenChange(false)} />
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
