import type { TransactionCategory } from './TransactionCategory';

export type Transaction = {
    [x: string]: any;
    id: number;
    title: string;
    description?: string | '';
    type: 'income' | 'expense';
    category?: TransactionCategory;
    amount: number;
    date: string;
    createdAt: string;
    updatedAt: string;
};

export type TransactionFormData = {
    title: string;
    description?: string;
    type: 'income' | 'expense';
    category?: TransactionCategory;
    amount: number;
    date: string;
};
