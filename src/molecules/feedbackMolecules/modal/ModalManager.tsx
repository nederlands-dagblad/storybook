import React, { useEffect } from "react";
import { useModalManager } from "@hooks/useModalManager";
import ExampleModal from "./ExampleModal";
import mitt from "mitt";
import ConfirmModal from "./ConfirmModal";

const eventbus = mitt();

export const ModalManager: React.FC = () => {
    const { registerModal, modals, activeModals, open, close } = useModalManager();

    useEffect(() => {
        registerModal("confirm-modal", ConfirmModal);
        registerModal("example-modal", ExampleModal);
    }, []);

    useEffect(() => {
        console.log("Updated modals:", modals);
    }, [modals]);

    // useEffect(() => {
    //
    //     const handleOpenModal = (event: any) => {
    //         const { key, props } = event;
    //         console.log(`Opening modal: ${key}`, props);
    //         open(key, props);
    //     };
    //
    //     eventbus.on("open-modal", handleOpenModal);
    //     return () => eventbus.off("open-modal", handleOpenModal);
    // }, [open]);

    function onClose(modal: any) {
        setTimeout(() => {
            close(modal.id)
        }, 200);
    }

    return (
        <>
            {activeModals.length}
            {activeModals.map((modal) => (
                <div key={modal.id}>
                    <modal.component {...modal.props} onClose={() => onClose(modal)} />
                </div>
            ))}
        </>
    );
};
