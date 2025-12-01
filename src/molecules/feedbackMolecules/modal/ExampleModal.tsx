import React, {useEffect, useState} from "react";
import { NModal } from "./NModal";
import {useModalManager} from "@hooks/useModalManager";
import Button from "@atoms/actionAtoms/Button/Button";

export const ExampleModal: React.FC = (props: any) => {
    const [isModalOpen, setIsModalOpen] = useState(true);

    const { open } = useModalManager();

    useEffect(() => {
        console.log("ExampleModal mounted", props);
    }, []);

    function onClose() {
        setIsModalOpen(false);

        setTimeout(() => {
            props?.onClose();
        }, 300);
    }

    function openNewModal() {
        open('example-modal', {})
    }

    const footer = (
        <>
            <Button variant={'ghost'} onClick={onClose}>Close</Button>
            <Button iconLeft="square" label="Accepteren" />
        </>
    )

    return (
        <NModal
            open={isModalOpen}
            modalTitle="Example Modal"
            modalSubTitle="Jaja"
            size="xl"
            onClose={onClose}
            closeButton
            footer={footer}
        >
            <p>This is a simple modal using the Modal component.</p>
            <button
                className="nd-btn nd-btn-primary"
                onClick={onClose}
            >
                Close Modal
            </button>
            <button
                className="nd-btn nd-btn-primary"
                onClick={openNewModal}
            >
                Open new modal
            </button>
        </NModal>
    );
};

export default ExampleModal;