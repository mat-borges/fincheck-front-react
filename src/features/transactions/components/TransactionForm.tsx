import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Category, Transaction, TransactionFormData } from '@/types/Transactions';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import LoadingSpinner from '@/components/Loader';
import fincheckApi from '@/api/fincheckApi';

export default function TransactionForm({
    onSubmit,
    setTransactions,
    categories,
    transactionToEdit,
}: {
    onSubmit: () => void;
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
    categories: Category[];
    transactionToEdit?: Transaction;
}) {
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState<TransactionFormData>({
        title: transactionToEdit ? transactionToEdit.title : '',
        description: transactionToEdit ? transactionToEdit.description : '',
        type: transactionToEdit ? transactionToEdit.type : 'expense',
        categoryId: transactionToEdit ? transactionToEdit.categoryId : '',
        amount: transactionToEdit ? transactionToEdit.amount : 0,
        date: transactionToEdit ? transactionToEdit.date : new Date().toISOString().split('T')[0],
    });

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: name === 'amount' ? Number(value) : value });
    }

    function newTransaction(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        const method = transactionToEdit ? 'put' : 'post';
        const url = transactionToEdit ? `/transactions/${transactionToEdit.id}` : '/transactions';

        fincheckApi[method](url, formData)
            .then((res) => {
                const updated = res.data as Transaction;

                if (transactionToEdit) {
                    setTransactions((transactions) => transactions.map((t) => (t.id === updated.id ? updated : t)));
                    toast.success('Transação atualizada com sucesso 📝');
                } else {
                    setTransactions((transactions) => [...transactions, updated]);
                    toast.success(' Transação criada com sucesso 👍🏻');
                }

                onSubmit();
                setIsLoading(false);
            })
            .catch((err) => {
                console.error('Erro ao salvar transação:', err?.response?.data ?? err.message);
                toast.error('Erro ao salvar transação');
                setIsLoading(false);
            });
    }

    return (
        <form onSubmit={newTransaction} className="space-y-4">
            <div className="space-y-1.5">
                <Label htmlFor="title">Título</Label>
                <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="border border-border"
                    required
                />
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="border border-border"
                />
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="type">Tipo</Label>
                <RadioGroup
                    defaultValue={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value as 'income' | 'expense' })}
                    className="flex items-center gap-6 p-2"
                    id="type"
                >
                    <RadioGroupItem
                        value="income"
                        id="income"
                        className="border border-primary data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                    />
                    <Label htmlFor="income">Entrada</Label>
                    <RadioGroupItem
                        value="expense"
                        id="expense"
                        className="border border-primary data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                    />
                    <Label htmlFor="expense">Saída</Label>
                </RadioGroup>
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="category">Categoria</Label>
                <Select
                    defaultValue={formData.categoryId}
                    onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                >
                    <SelectTrigger className="border border-border">
                        <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent className="border border-border">
                        {categories.map((category) => (
                            <SelectItem
                                key={category.id}
                                value={category.id}
                                className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="amount">Valor (R$)</Label>
                <Input
                    type="number"
                    step="0.01"
                    min={0}
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="border border-border"
                    required
                />
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="date">Data</Label>
                <Input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="border border-border"
                    required
                />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <LoadingSpinner /> : 'Salvar transação'}
            </Button>
        </form>
    );
}
