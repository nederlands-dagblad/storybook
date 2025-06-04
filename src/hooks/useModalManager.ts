import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { eventbus } from "@helpers/eventbus";

type ModalData = {
    key: string;
    component: React.FC<any>;
};

type ActiveModalData = {
    id: string;
    key: string;
    component: React.FC<any>;
    props: object;
};

export type ConfirmModalData = {
    title: string;
    description: string;
    cancelAction: () => void;
    confirmAction: () => void;
};

const modals: ModalData[] = [];
const activeModals: ActiveModalData[] = [];

const registerModal = (key: string, component: React.FC<any>) => {
    if (!modals.some((modal) => modal.key === key)) {
        modals.push({ key, component });
    }
};

const open = (key: string, props: object = {}): string | undefined => {

    console.log('open', modals, key)

    const modal = modals.find((m) => m.key === key);
    if (!modal) return;

    const id = uuidv4();

    activeModals.push({ id, key: modal.key, component: modal.component, props });

    eventbus.emit("update-modals");

    return id;
};

const close = (id: string) => {

    console.log('close', id)

    const index = activeModals.findIndex((m) => m.id === id);
    if (index !== -1) {
        activeModals.splice(index, 1);
        eventbus.emit("update-modals");
    }
};

// 🔹 React Hook to Sync with Global State
export function useModalManager() {
    const [modalsState, setModalsState] = useState([...modals]);
    const [activeModalsState, setActiveModalsState] = useState([...activeModals]);

    useEffect(() => {
        const updateModals = () => {
            setModalsState([...modals]);
            setActiveModalsState([...activeModals]);
        };

        eventbus.on("update-modals", updateModals);
        return () => eventbus.off("update-modals", updateModals);
    }, []);

    return {
        modals: modalsState,
        activeModals: activeModalsState,
        registerModal,
        open,
        close,
    };
}
