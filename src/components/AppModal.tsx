import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { type ReactNode, useEffect } from 'react';

type AppModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    description?: string;
    trigger?: ReactNode;
    footer?: ReactNode;
    children: ReactNode;
    onConfirm?: () => Promise<void> | void;
    confirmLoading?: boolean;
};

export default function AppModal({
    open,
    onOpenChange,
    title,
    description,
    trigger,
    footer,
    children,
    onConfirm,
    confirmLoading = false,
}: AppModalProps) {
    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onOpenChange(false);
            }
            if (e.key === 'Enter' && onConfirm && !confirmLoading) {
                onConfirm();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [open, onOpenChange, onConfirm, confirmLoading]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

            <DialogContent className="w-[90vw] sm:w-[400px] lg:w-[500px]">
                {(title || description) && (
                    <DialogHeader>
                        {title && <DialogTitle>{title}</DialogTitle>}
                        {description && <DialogDescription>{description}</DialogDescription>}
                    </DialogHeader>
                )}

                <div>{children}</div>

                {footer && <DialogFooter>{footer}</DialogFooter>}
            </DialogContent>
        </Dialog>
    );
}
