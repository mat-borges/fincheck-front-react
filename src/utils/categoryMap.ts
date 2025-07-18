// utils/categoryMap.ts

import {
    BanknoteArrowDown,
    Car,
    GraduationCap,
    Hospital,
    PartyPopper,
    PiggyBank,
    ShoppingCart,
    Tag,
    TvMinimalPlay,
    Utensils,
} from 'lucide-react';

export const TRANSACTION_CATEGORIES = {
    alimentacao: { label: 'Alimentação', icon: Utensils },
    mercado: { label: 'Mercado', icon: ShoppingCart },
    salario: { label: 'Salário', icon: BanknoteArrowDown },
    lazer: { label: 'Lazer', icon: PartyPopper },
    transporte: { label: 'Transporte', icon: Car },
    poupanca: { label: 'Poupança', icon: PiggyBank },
    educacao: { label: 'Educação', icon: GraduationCap },
    saude: { label: 'Saúde', icon: Hospital },
    assinaturas: { label: 'Assinaturas', icon: TvMinimalPlay },
    outros: { label: 'Outros', icon: Tag },
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
