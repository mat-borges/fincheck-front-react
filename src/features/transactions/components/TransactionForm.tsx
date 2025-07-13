import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TRANSACTION_CATEGORIES } from '@/utils/transactionCategories';
import { TransactionCategory } from '@/types/TransactionCategory';
import type { TransactionFormData } from '@/types/Transactions';
import { useState, type ChangeEvent } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

export default function TransactionForm({ onSubmit }: { onSubmit: (data: TransactionFormData) => void }) {
    const [formData, setFormData] = useState<TransactionFormData>({
        title: '',
        description: '',
        type: 'expense',
        category: TransactionCategory.Outros,
        amount: 0,
        date: new Date().toISOString().split('T')[0],
    });

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
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
                    defaultValue={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value as TransactionCategory })}
                >
                    <SelectTrigger className="border border-border">
                        <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent className="border border-border">
                        {Object.entries(TRANSACTION_CATEGORIES).map(([key, value]) => (
                            <SelectItem
                                key={key}
                                value={key}
                                className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                                {value.label}
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

            <Button type="submit" className="w-full">
                Salvar transação
            </Button>
        </form>
    );
}
