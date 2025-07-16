import type { Category, Transaction } from '@/types/Transactions';
import { useEffect, useState } from 'react';

import LoadingSpinner from '@/components/Loader';
import SummaryCard from '../summary';
import type { TransactionCategory } from '@/types/TransactionCategory';
import TransactionList from './components/TransactionList';
import TransactionModal from './components/TransactionModal';
import axios from 'axios';
import { createCategoryIdToSlugMap } from '@/utils/categoryMap';
import fincheckApi from '@/api/fincheckApi';

export default function Transactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [categoryMap, setCategoryMap] = useState<Record<string, TransactionCategory>>({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function loadInitialData() {
            try {
                setIsLoading(true);
                const [transactionsRes, categoriesRes] = await Promise.all([
                    fincheckApi.get<Transaction[]>('/transactions'),
                    fincheckApi.get<Category[]>('/categories'),
                ]);

                const map = createCategoryIdToSlugMap(categoriesRes.data);
                setCategoryMap(map as Record<string, TransactionCategory>);
                setTransactions(transactionsRes.data);
            } catch (err) {
                console.error('Erro ao buscar dados:', err);
            } finally {
                setIsLoading(false);
            }
        }

        loadInitialData();
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow space-y-6">
            {isLoading ? <LoadingSpinner /> : <SummaryCard transactions={transactions} />}

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

                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <TransactionList transactions={transactions} categoryMap={categoryMap} />
                )}
            </section>
        </div>
    );
}
