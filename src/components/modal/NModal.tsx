import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Icon from "@atoms/Icon/Icon";
import {Property} from "csstype";

export type NModalProps = {
    id?: string;
    open?: boolean;
    size?: "md" | "xl";
    backdrop?: boolean;
    modalTitle?: string;
    modalSubTitle?: string;
    hideHeader?: boolean;
    simplified?: boolean;
    closeButton?: boolean;
    noFooter?: boolean;
    noCloseOnBackdrop?: boolean;
    bodyClass?: string;
    compactOnMobile?: boolean;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    onClose?: () => void;
    onAfterClose?: () => void;
};

export const NModal: React.FC<NModalProps> = (props) => {

    const {
        id,
        open = false,
        size = "md",
        backdrop = true,
        modalTitle,
        modalSubTitle,
        hideHeader = false,
        simplified = false,
        closeButton = true,
        noFooter = false,
        noCloseOnBackdrop = false,
        bodyClass,
        compactOnMobile = false,
        children,
        footer,
        onClose,
        onAfterClose,
    } = props;

    const [isOpen, setIsOpen] = useState(open);

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    const closeModal = () => {
        if (onClose) onClose();
        setIsOpen(false);

        setTimeout(() => {
            if (onAfterClose) onAfterClose();
        }, 500);
    };

    const handleCloseOnBackdrop = () => {
        if (!noCloseOnBackdrop) {
            closeModal();
        }
    };

    const dialogStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: '100vw',
        overflowY: 'auto',
        zIndex: 45
    }

    const dialogWrapperStyle: React.CSSProperties = {
        position: 'fixed',
        width: '100vw',
        overflowY: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        paddingLeft: 16,
        paddingRight: 16,
        textAlign: 'center'
    }

    return (
        <Transition appear show={isOpen} as={React.Fragment}>
            <Dialog as="div" style={dialogStyle} onClose={handleCloseOnBackdrop}>
                <div style={dialogWrapperStyle}>
                    <Transition.Child
                        enter="ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        {backdrop && <div className="modal-overlay" onClick={handleCloseOnBackdrop}></div>}
                    </Transition.Child>

                    <Transition.Child
                        enter="ease-out duration-300 transform"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200 transform"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className={`modal-dialog modal-dialog-scrollable ${size === "xl" ? "modal-dialog-xl" : ""} ${simplified ? "modal-simplified" : ""} ${compactOnMobile ? "modal-compact" : ""}`}>
                            <div className="modal-container">

                                {/* Close Button */}
                                {closeButton && (
                                    <button type="button" className="modal-close-button" onClick={closeModal}>
                                        <Icon name="close-outline" />
                                    </button>
                                )}

                                {/* Header */}
                                {!hideHeader && (
                                    <div className="modal-header">
                                        {modalSubTitle && <p className="text-gray-500">{modalSubTitle}</p>}
                                        {modalTitle && <h6 className="text-lg font-semibold">{modalTitle}</h6>}
                                    </div>
                                )}

                                {/* Body */}
                                <div className={`modal-body overflow-x-clip ${bodyClass}`}>
                                    {children}
                                </div>

                                {/* Footer */}
                                {!noFooter && (
                                    <div className="modal-footer flex justify-end space-x-2">
                                        {footer}
                                    </div>
                                )}
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};
