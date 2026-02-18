import React, {useState, useEffect, useCallback} from 'react';
import RadioButton from "@atoms/actionAtoms/RadioButton/RadioButton.tsx";
import Icon from "@atoms/basicAtoms/Icon/Icon.tsx";
import Modal from "@molecules/feedbackMolecules/Modal/Modal";

declare global {
    interface Window {
        handleShareAsGift?: (platform: string) => void;
        handleShareAsStandard?: (platform: string) => void;
    }
}

export interface ArtikelCadeauModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    remainingGifts?: number;
    onShareAsGift?: (platform: string) => void;
    onShareAsStandard?: (platform: string) => void;
}

interface ToastState {
    message: string;
    visible: boolean;
}

interface ToastProps {
    message: string;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({message, onClose}) => {
    return (
        <div className="fixed bottom-4 left-4 z-[60] max-w-sm animate-fade-in">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border bg-white border-border-gray-subtle">
                <p className="font-fira-sans text-body-regular flex-1 text-black" dangerouslySetInnerHTML={{__html: message}}/>
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

export const ArtikelCadeauModal: React.FC<ArtikelCadeauModalProps> = ({
                                                                          isOpen: controlledIsOpen,
                                                                          onClose: controlledOnClose,
                                                                          remainingGifts = 5,
                                                                          onShareAsGift,
                                                                          onShareAsStandard,
                                                                      }) => {
    const [internalIsOpen, setInternalIsOpen] = useState(controlledIsOpen ?? false);
    const [selectedOption, setSelectedOption] = useState<'gift' | 'standard'>('gift');
    const [currentRemainingGifts, setCurrentRemainingGifts] = useState(Math.max(0, remainingGifts));
    const [toast, setToast] = useState<ToastState>({message: '', visible: false});

    // Sync with controlled prop when provided
    useEffect(() => {
        if (controlledIsOpen !== undefined) {
            setInternalIsOpen(controlledIsOpen);
        }
    }, [controlledIsOpen]);

    // Listen for DOM event to open modal (for Razor/cshtml usage)
    useEffect(() => {
        const handleOpen = () => setInternalIsOpen(true);
        window.addEventListener('open-artikel-cadeau', handleOpen);
        return () => window.removeEventListener('open-artikel-cadeau', handleOpen);
    }, []);

    // Listen for remaining gifts updates
    useEffect(() => {
        const handleUpdate = (e: CustomEvent<{ remainingGifts: number }>) => {
            const newCount = Math.max(0, e.detail.remainingGifts);
            setCurrentRemainingGifts(newCount);

            const badgeEl = document.querySelector('.bg-background-brand.text-text-inverse.size-m');
            if (badgeEl) {
                badgeEl.textContent = newCount.toString();
            }
        };
        window.addEventListener('update-remaining-gifts', handleUpdate as EventListener);
        return () => window.removeEventListener('update-remaining-gifts', handleUpdate as EventListener);
    }, []);

    // Listen for toast messages from cshtml
    useEffect(() => {
        const handleToast = (e: CustomEvent<{ message: string }>) => {
            showToast(e.detail.message);
        };
        window.addEventListener('artikel-cadeau-toast', handleToast as EventListener);
        return () => window.removeEventListener('artikel-cadeau-toast', handleToast as EventListener);
    }, []);

    const showToast = (message: string) => {
        setToast({message, visible: true});
        setTimeout(() => {
            setToast(prev => ({...prev, visible: false}));
        }, 3000);
    };

    const handleClose = useCallback(() => {
        setInternalIsOpen(false);
        controlledOnClose?.();
    }, [controlledOnClose]);

    if (!internalIsOpen) return (
        <>
            {toast.visible && (
                <Toast message={toast.message} onClose={() => setToast(prev => ({...prev, visible: false}))}/>
            )}
        </>
    );

    type ShareOption = {
        iconName: string;
        label: string;
        platform: string;
    };

    const shareOptions: ShareOption[] = [
        {iconName: 'link', label: 'Kopieer link', platform: 'copy'},
        {iconName: 'mail', label: 'E-mail', platform: 'email'},
        {iconName: 'whatsapp', label: 'WhatsApp', platform: 'whatsapp'},
        {iconName: 'facebook', label: 'Facebook', platform: 'facebook'},
        {iconName: 'x', label: 'X', platform: 'x'},
        {iconName: 'linkedin', label: 'LinkedIn', platform: 'linkedin'},
        {iconName: 'bluesky', label: 'Bluesky', platform: 'bluesky'},
    ];

    const handleShareClick = (platform: string) => {
        if (selectedOption === 'gift') {
            if (currentRemainingGifts <= 0) {
                showToast('Je hebt geen artikelen meer over om cadeau te geven deze maand.');
                return;
            }
            if (onShareAsGift) {
                onShareAsGift(platform);
            } else if (window.handleShareAsGift) {
                window.handleShareAsGift(platform);
            }
        } else {
            if (onShareAsStandard) {
                onShareAsStandard(platform);
            } else if (window.handleShareAsStandard) {
                window.handleShareAsStandard(platform);
            }
        }
    };

    return (
        <>
            <Modal isOpen={internalIsOpen} onClose={handleClose} heading={'Artikel delen'} children={
                <>
                    <div className="flex flex-col gap-m">
                        {/* Radio Options */}
                        <div className="grid grid-cols-2 gap-s">
                            <RadioButton
                                variant="card"
                                label="Door iedereen te lezen"
                                heading="Als cadeau"
                                badgeText={currentRemainingGifts.toString()}
                                name="shareType"
                                value="gift"
                                checked={selectedOption === 'gift'}
                                onChange={() => setSelectedOption('gift')}
                            />
                            <RadioButton
                                variant="card"
                                label="Door abonnees te lezen"
                                heading="Standaard delen"
                                name="shareType"
                                value="standard"
                                checked={selectedOption === 'standard'}
                                onChange={() => setSelectedOption('standard')}
                            />
                        </div>

                        {/* Info Text */}
                        <div className="text-body-light text-text-default">
                            {selectedOption === 'gift' ? (
                                <>
                                    <p>
                                        Geef <span className="text-body-bold">7 dagen</span> gratis toegang tot dit
                                        artikel.
                                    </p>
                                    <p>
                                        Je kunt deze maand nog <span
                                        className="text-body-bold">{currentRemainingGifts} artikelen</span> cadeau geven.
                                    </p>
                                </>
                            ) : (
                                <p>
                                    Deel dit artikel met een ND-abonnee. Niet-abonnees krijgen een betaalmuur te
                                    zien.
                                </p>
                            )}
                        </div>

                        {/* Share Buttons */}
                        <div className="grid grid-cols-2 gap-xs">
                            {shareOptions.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleShareClick(option.platform)}
                                    className="flex items-center gap-s p-xs border border-border-gray-subtle hover:border-border-brand bg-background-default transition-colors"
                                >
                                    <Icon name={option.iconName} size="s" color="default" variant="outline"/>
                                    <span className="text-body-light text-text-default">{option.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            }/>

            {/* Toast */}
            {toast.visible && (
                <Toast message={toast.message} onClose={() => setToast(prev => ({...prev, visible: false}))}/>
            )}
        </>
    );
};

export default ArtikelCadeauModal;