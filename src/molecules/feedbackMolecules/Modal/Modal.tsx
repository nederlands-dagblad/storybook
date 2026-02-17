import React, { useState } from 'react';
import Icon from "@atoms/basicAtoms/Icon/Icon.tsx";

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    heading: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, heading }) => {

    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full md:w-[600px] md:mx-4 bg-white p-m max-h-[60vh] md:h-auto md:max-h-[90vh] overflow-y-auto bg-background-default">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-heading-2 text-text-default">{heading}</h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-background-gray-subtle rounded transition-colors"
                        aria-label="Sluiten"
                    >
                        <Icon name={'x-mark'} size="s" color="default" variant="outline"/>
                    </button>
                </div>
                {
                    children
                }
            </div>
        </div>
    );
};

export default Modal;