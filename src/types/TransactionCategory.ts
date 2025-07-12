export const TransactionCategory = {
    Alimentacao: 'alimentação',
    Mercado: 'mercado',
    Salario: 'salário',
    Lazer: 'lazer',
    Transporte: 'transporte',
    Poupanca: 'poupança',
    Educacao: 'educação',
    Saude: 'saúde',
    Outros: 'outros',
} as const;

export type TransactionCategory = (typeof TransactionCategory)[keyof typeof TransactionCategory];
