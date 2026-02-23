import React, { useState, useEffect, useCallback } from 'react';

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
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border bg-white border-border-gray-subtle">
                <p
                    className="font-fira-sans text-body-regular flex-1 text-black"
                    dangerouslySetInnerHTML={{ __html: message }}
                />
                <button
                    onClick={onClose}
                    className="p-1 hover:bg-background-gray rounded transition-colors text-lg leading-none"
                    aria-label="Sluiten"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default Toast;