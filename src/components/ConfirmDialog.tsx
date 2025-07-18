import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

type ConfirmDialogProps = {
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => Promise<void> | void;
    children: React.ReactNode;
};

export function ConfirmDialog({
    title = 'Tem certeza?',
    description = 'Essa ação não pode ser desfeita.',
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    onConfirm,
    children,
}: ConfirmDialogProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            const activeTag = document.activeElement?.tagName;
            const isTyping = ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeTag ?? '');

            if (e.key === 'Escape') {
                setOpen(false);
            }

            if (e.key === 'Enter' && !isLoading && !isTyping) {
                e.preventDefault();
                handleConfirm();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [open, isLoading]);

    const handleConfirm = async () => {
        try {
            setIsLoading(true);
            await onConfirm();
            setOpen(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent className="w-[90vw] sm:w-[400px] lg:w-[500px]">
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>{cancelText}</AlertDialogCancel>
                    <Button type="button" variant="destructive" disabled={isLoading} onClick={handleConfirm}>
                        {isLoading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
                        {confirmText}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
