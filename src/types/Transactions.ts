import type { TransactionCategory } from './TransactionCategory';

export type Transaction = {
    [x: string]: any;
    id: string;
    title: string;
    description?: string | '';
    type: 'income' | 'expense';
    category: Category;
    amount: number;
    date: string;
    createdAt: string;
    updatedAt: string;
};

export type TransactionFormData = {
    title: string;
    description?: string;
    type: 'income' | 'expense';
    categoryId: string;
    amount: number;
    date: string;
};

export type Category = {
    id: string;
    name: TransactionCategory;
};
