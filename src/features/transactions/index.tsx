import type { Category, Transaction } from '@/types/Transactions';
import { useEffect, useState } from 'react';

import SummaryCard from '../summary';
import type { TransactionCategory } from '@/types/TransactionCategory';
import TransactionList from './components/TransactionList';
import TransactionModal from './components/TransactionModal';
import axios from 'axios';
import { createCategoryIdToSlugMap } from '@/utils/categoryMap';

export default function Transactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [categoryMap, setCategoryMap] = useState<Record<string, TransactionCategory>>({});

    useEffect(() => {
        async function loadInitialData() {
            try {
                const [transactionsRes, categoriesRes] = await Promise.all([
                    axios.get<Transaction[]>('http://localhost:3000/transactions'),
                    axios.get<Category[]>('http://localhost:3000/categories'),
                ]);

                const map = createCategoryIdToSlugMap(categoriesRes.data);
                setCategoryMap(map as Record<string, TransactionCategory>);
                setTransactions(transactionsRes.data);
            } catch (err) {
                console.error('Erro ao buscar dados:', err);
            }
        }

        loadInitialData();
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow space-y-6">
            <div className="text-center space-y-2 mb-6">
                <h1 className="text-3xl font-bold text-textPrimary">Bem-vindo ao FinCheck</h1>
                <p className="text-textSecondary">Gerencie suas finanças com clareza.</p>
            </div>
            <SummaryCard transactions={transactions} />

            <section className="bg-white rounded-xl p-4 shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Transações</h2>
                    <TransactionModal
                        open={modalOpen}
                        onOpenChange={setModalOpen}
                        transactions={transactions}
                        setTransactions={setTransactions}
                    />
                </div>

                <TransactionList transactions={transactions} categoryMap={categoryMap} />
            </section>
        </div>
    );
}
