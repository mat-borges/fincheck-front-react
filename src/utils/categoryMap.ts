// utils/categoryMap.ts

import {
    AcademicCapIcon,
    BuildingStorefrontIcon,
    HeartIcon,
    ShoppingBagIcon,
    SparklesIcon,
    TagIcon,
    TruckIcon,
} from '@heroicons/react/16/solid';
import { Banknote, PiggyBankIcon } from 'lucide-react';

export const TRANSACTION_CATEGORIES = {
    alimentacao: { label: 'Alimentação', icon: ShoppingBagIcon },
    mercado: { label: 'Mercado', icon: BuildingStorefrontIcon },
    salario: { label: 'Salário', icon: Banknote },
    lazer: { label: 'Lazer', icon: SparklesIcon },
    transporte: { label: 'Transporte', icon: TruckIcon },
    poupanca: { label: 'Poupança', icon: PiggyBankIcon },
    educacao: { label: 'Educação', icon: AcademicCapIcon },
    saude: { label: 'Saúde', icon: HeartIcon },
    outros: { label: 'Outros', icon: TagIcon },
} as const;

export type TransactionCategory = keyof typeof TRANSACTION_CATEGORIES;

export function createCategoryIdToSlugMap(
    categoriesFromAPI: { id: string; name: string }[],
): Record<string, TransactionCategory> {
    const map: Record<string, TransactionCategory> = {};

    for (const cat of categoriesFromAPI) {
        const slug = cat.name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

        if (slug in TRANSACTION_CATEGORIES) {
            map[cat.id] = slug as TransactionCategory;
        } else {
            map[cat.id] = 'outros';
        }
    }

    return map;
}
