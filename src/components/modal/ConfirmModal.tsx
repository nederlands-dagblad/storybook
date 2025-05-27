import React, {useEffect, useState} from "react";
import {NModal, NModalProps} from "./NModal";
import {useModalManager} from "@hooks/useModalManager";
import Button from "@atoms/Button/Button";

export interface ConfirmModalProps extends NModalProps {
    title?: string;
    message?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm?: (props: ConfirmModalProps) => void;
    onCancel?: (props: ConfirmModalProps) => void;
}

export const ConfirmModal: React.FC = (props: ConfirmModalProps) => {
    const [isModalOpen, setIsModalOpen] = useState(true);

    const {
        title = "Bevestigen",
        message = "Weet je zeker dat je dit wilt doen?",
        confirmLabel = "Bevestigen",
        cancelLabel = "Annuleren",
    } = props;

    const { open } = useModalManager();

    useEffect(() => {
        console.log("ConfirmModal mounted", props);
    }, []);

    function onConfirm() {
        props.onConfirm ? props.onConfirm(props) : null;
    }

    function onCancel() {
        setIsModalOpen(false);

        setTimeout(() => {
            props.onCancel ? props.onCancel(props) : null;
        }, 300);
    }

    function onClose() {
        setIsModalOpen(false);

        setTimeout(() => {
            props?.onClose ? props?.onClose() : null;
        }, 300);
    }

    function footer() {
        return (
            <div className="flex flex-row flex-wrap ml-auto gap-4">

                { props.onCancel && (<Button variant="light" noDot onClick={onCancel} >{ cancelLabel }</Button>)}

                { props.onConfirm && (<Button onClick={onConfirm} >{ confirmLabel }</Button>)}

            </div>
        )
    }

    return (
        <NModal
            open={isModalOpen}
            modalTitle={title}
            size="md"
            onClose={onClose}
            closeButton
            simplified
            compactOnMobile
            footer={footer()}
        >
            <div className="my-4">
                { message }
            </div>
        </NModal>
    );
};

export default ConfirmModal;
