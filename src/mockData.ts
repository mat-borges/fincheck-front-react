import { TransactionCategory } from './types/TransactionCategory';

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

export const transactions: Transaction[] = [
    {
        id: 1,
        title: 'Grocery Shopping',
        type: 'expense',
        category: TransactionCategory.Mercado,
        amount: 50.25,
        date: '2023-10-01',
        createdAt: '2023-10-01T12:00:00Z',
        updatedAt: '2023-10-01T12:00:00Z',
    },
    {
        id: 2,
        title: 'Salary',
        type: 'income',
        category: TransactionCategory.Salario,
        amount: 1800,
        date: '2023-10-01',
        createdAt: '2023-10-01T09:00:00Z',
        updatedAt: '2023-10-01T09:00:00Z',
    },
    {
        id: 3,
        title: 'Netflix Subscription',
        type: 'expense',
        category: TransactionCategory.Lazer,
        amount: 39.9,
        date: '2023-10-05',
        createdAt: '2023-10-05T08:00:00Z',
        updatedAt: '2023-10-05T08:00:00Z',
    },
    {
        id: 4,
        title: 'Freelance Project',
        type: 'income',
        category: TransactionCategory.Outros,
        amount: 600,
        date: '2023-10-10',
        createdAt: '2023-10-10T10:00:00Z',
        updatedAt: '2023-10-10T10:00:00Z',
    },
    {
        id: 5,
        title: 'Pharmacy',
        type: 'expense',
        category: TransactionCategory.Saude,
        amount: 120,
        date: '2023-10-12',
        createdAt: '2023-10-12T14:30:00Z',
        updatedAt: '2023-10-12T14:30:00Z',
    },
    {
        id: 6,
        title: 'Negativar',
        description: 'Teste de descrição',
        type: 'expense',
        category: TransactionCategory.Outros,
        amount: 3000,
        date: '2023-10-12',
        createdAt: '2023-10-12T14:30:00Z',
        updatedAt: '2023-10-12T14:30:00Z',
    },
];
