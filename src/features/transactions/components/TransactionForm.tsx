import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TRANSACTION_CATEGORIES } from '@/utils/transactionCategories';
import { TransactionCategory } from '@/types/TransactionCategory';
import type { TransactionFormData } from '@/types/Transactions';
import { useState, type ChangeEvent } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function TransactionForm({ onSubmit }: { onSubmit: (data: TransactionFormData) => void }) {
    const [formData, setFormData] = useState<TransactionFormData>({
        title: '',
        description: '',
        type: 'expense',
        category: TransactionCategory.Outros,
        amount: 0,
        date: new Date().toISOString().split('T')[0],
    });

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: name === 'amount' ? Number(value) : value });
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(formData);
            }}
            className="space-y-4"
        >
            <div>
                <Label htmlFor="title">Título</Label>
                <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>

            <div>
                <Label htmlFor="type">Tipo</Label>
                <RadioGroup
                    defaultValue={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value as 'income' | 'expense' })}
                    className="flex gap-4"
                    id="type"
                >
                    <RadioGroupItem value="income" id="income" />
                    <Label htmlFor="income">Entrada</Label>
                    <RadioGroupItem value="expanse" id="expanse" />
                    <Label htmlFor="expanse">Saída</Label>
                </RadioGroup>
            </div>

            <div>
                <Label htmlFor="category">Categoria</Label>
                <Select
                    defaultValue={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value as TransactionCategory })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(TRANSACTION_CATEGORIES).map(([key, value]) => (
                            <SelectItem key={key} value={key}>
                                {value.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label htmlFor="amount">Valor (R$)</Label>
                <Input
                    type="number"
                    step="0.01"
                    min={0}
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <Label htmlFor="date">Data</Label>
                <Input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>

            <Button type="submit" className="w-full">
                Salvar transação
            </Button>
        </form>
    );
}
