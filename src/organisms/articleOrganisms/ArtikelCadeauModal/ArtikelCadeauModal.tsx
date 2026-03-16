import React, {useState, useEffect, useCallback} from 'react';
import RadioButton from "@atoms/actionAtoms/RadioButton/RadioButton.tsx";
import Icon from "@atoms/basicAtoms/Icon/Icon.tsx";
import Modal from "@molecules/feedbackMolecules/Modal/Modal";
import Toast, { useToast } from "@molecules/feedbackMolecules/Toast/Toast";

declare global {
    interface Window {
        handleShareAsGift?: (platform: string) => void;
        handleShareAsStandard?: (platform: string) => void;
        openArtikelCadeau?: (mode: 'gift' | 'standard') => void;
    }
}

export interface ArtikelCadeauModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    remainingGifts?: number;
    /** Pre-select a sharing mode when opening: 'gift' or 'standard' */
    defaultMode?: 'gift' | 'standard';
    onShareAsGift?: (platform: string) => void;
    onShareAsStandard?: (platform: string) => void;
}

export const ArtikelCadeauModal: React.FC<ArtikelCadeauModalProps> = ({
                                                                          isOpen: controlledIsOpen,
                                                                          onClose: controlledOnClose,
                                                                          remainingGifts = 5,
                                                                          defaultMode = 'gift',
                                                                          onShareAsGift,
                                                                          onShareAsStandard,
                                                                      }) => {
    const [internalIsOpen, setInternalIsOpen] = useState(controlledIsOpen ?? false);
    const [selectedOption, setSelectedOption] = useState<'gift' | 'standard'>(defaultMode);
    const [currentRemainingGifts, setCurrentRemainingGifts] = useState(Math.max(0, remainingGifts));
    const { toast, showToast, hideToast } = useToast();

    // Sync with controlled prop when provided
    useEffect(() => {
        if (controlledIsOpen !== undefined) {
            setInternalIsOpen(controlledIsOpen);
        }
    }, [controlledIsOpen]);

    // Expose a global function for Razor/cshtml to open the modal with a specific mode
    useEffect(() => {
        window.openArtikelCadeau = (mode: 'gift' | 'standard') => {
            setSelectedOption(mode);
            requestAnimationFrame(() => {
                setInternalIsOpen(true);
            });
        };
        return () => {
            window.openArtikelCadeau = undefined;
        };
    }, []);

    // Keep legacy event listener as fallback (opens in 'gift' mode by default)
    useEffect(() => {
        const handleOpen = () => {
            setSelectedOption('gift');
            setInternalIsOpen(true);
        };
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
    }, [showToast]);

    const handleClose = useCallback(() => {
        setInternalIsOpen(false);
        controlledOnClose?.();
    }, [controlledOnClose]);

    if (!internalIsOpen) return (
        <>
            <Toast message={toast.message} visible={toast.visible} onClose={hideToast} />
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

    const isGiftDisabled = selectedOption === 'gift' && currentRemainingGifts <= 0;

    const handleShareClick = (platform: string) => {
        if (isGiftDisabled) return;

        if (selectedOption === 'gift') {
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
            {/* Gray badge override when no gifts remaining */}
            <style>{`
                .artikel-cadeau-badge-gray [class*="bg-background-brand"] {
                    background-color: #9ca3af !important;
                }
            `}</style>

            <Modal isOpen={internalIsOpen} onClose={handleClose} heading={'Artikel delen'} children={
                <>
                    <div className="flex flex-col gap-m bg-background-default text-text-default">
                        {/* Radio Options */}
                        <div className="grid grid-cols-2 gap-s">
                            <div className={currentRemainingGifts <= 0 ? 'artikel-cadeau-badge-gray' : ''}>
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
                            </div>
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
                                currentRemainingGifts <= 0 ? (
                                    <p>
                                        Je hebt deze maand al je artikelen cadeau gegeven.
                                    </p>
                                ) : (
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
                                )
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
                                    disabled={isGiftDisabled}
                                    className={`flex items-center gap-s p-xs border transition-colors ${
                                        isGiftDisabled
                                            ? 'border-border-gray-subtle bg-background-default cursor-not-allowed opacity-50'
                                            : 'border-border-gray-subtle hover:border-border-brand bg-background-default'
                                    }`}
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
            <Toast message={toast.message} visible={toast.visible} onClose={hideToast} />
        </>
    );
};

export default ArtikelCadeauModal;