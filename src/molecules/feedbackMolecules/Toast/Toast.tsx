import React, { useState, useEffect, useCallback } from 'react';
import Icon from "@atoms/basicAtoms/Icon/Icon.tsx";

export interface ToastProps {
    message: string;
    visible: boolean;
    duration?: number;
    onClose: () => void;
}

export const useToast = (duration = 3000) => {
    const [toast, setToast] = useState<{ message: string; visible: boolean }>({
        message: '',
        visible: false,
    });

    const showToast = useCallback((message: string) => {
        setToast({ message, visible: true });
        setTimeout(() => {
            setToast(prev => ({ ...prev, visible: false }));
        }, duration);
    }, [duration]);

    const hideToast = useCallback(() => {
        setToast(prev => ({ ...prev, visible: false }));
    }, []);

    return { toast, showToast, hideToast };
};

const Toast: React.FC<ToastProps> = ({ message, visible, onClose }) => {
    if (!visible) return null;

    return (
        <div className="fixed bottom-4 left-4 z-[60] max-w-sm animate-fade-in">
            <div className="flex items-center gap-xs p-s shadow-lg border bg-background-default border-border-gray-subtle">
                <p
                    className="text-body-light text-text-default flex-1"
                    dangerouslySetInnerHTML={{ __html: message }}
                />
                <button
                    onClick={onClose}
                    className="p-1 hover:bg-background-gray-subtle rounded transition-colors"
                    aria-label="Sluiten"
                >
                    <Icon name={'x-mark'} size="s" color="default" variant="outline"/>
                </button>
            </div>
        </div>
    );
};

export default Toast;