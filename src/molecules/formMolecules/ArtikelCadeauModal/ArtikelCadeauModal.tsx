import React, { useState, useEffect } from 'react';
import CardContainer from "@atoms/displayAtoms/CardContainer/CardContainer.tsx";
import RadioButton from "@atoms/actionAtoms/RadioButton/RadioButton.tsx";

export interface ArtikelCadeauModalProps {
    remainingGifts?: number;
}

export const ArtikelCadeauModal: React.FC<ArtikelCadeauModalProps> = ({
                                                                          remainingGifts = 5,
                                                                      }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<'gift' | 'standard'>('gift');

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener('open-artikel-cadeau', handleOpen);
        return () => window.removeEventListener('open-artikel-cadeau', handleOpen);
    }, []);

    const handleClose = () => setIsOpen(false);

    if (!isOpen) return null;

    const shareOptions = [
        { icon: '🔗', label: 'Kopieer link' },
        { icon: '✉️', label: 'E-mail' },
        { icon: '💬', label: 'WhatsApp' },
        { icon: '📘', label: 'Facebook' },
        { icon: '𝕏', label: 'X' },
        { icon: '💼', label: 'LinkedIn' },
        { icon: '🦋', label: 'Bluesky' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="relative w-full md:w-auto md:max-w-4xl md:mx-4 bg-white">
                <CardContainer
                    padding="xl"
                    borderColor="brand"
                    className="h-[60vh] md:h-auto md:max-h-[90vh] overflow-y-auto bg-background-default"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-heading-2xl font-bold">Artikel delen</h2>
                        <button
                            onClick={handleClose}
                            className="p-2 hover:bg-background-gray rounded transition-colors text-2xl"
                            aria-label="Sluiten"
                        >
                            ×
                        </button>
                    </div>

                    {/* Radio Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <RadioButton
                            label="Door iedereen te lezen"
                            heading="Als cadeau"
                            badgeText={remainingGifts.toString()}
                            name="shareType"
                            value="gift"
                            checked={selectedOption === 'gift'}
                            onChange={() => setSelectedOption('gift')}
                        />
                        <RadioButton
                            label="Door abonnees te lezen"
                            heading="Standaard delen"
                            name="shareType"
                            value="standard"
                            checked={selectedOption === 'standard'}
                            onChange={() => setSelectedOption('standard')}
                        />
                    </div>

                    {/* Info Text */}
                    <div className="mb-6 space-y-2">
                        <p className="font-fira-sans text-body-light">
                            Geef <span className="text-body-bold">7 dagen</span> gratis toegang tot dit artikel.
                        </p>
                        <p className="font-fira-sans text-body-light">
                            Je kunt deze maand nog <span className="text-body-bold">{remainingGifts} artikelen</span> cadeau geven.
                        </p>
                    </div>

                    {/* Share Buttons */}
                    <div className="grid grid-cols-2 gap-4">
                        {shareOptions.map((option, index) => (
                            <button
                                key={index}
                                className="flex items-center gap-3 p-4 border border-border-gray-subtle hover:border-border-brand bg-background-default transition-colors"
                            >
                                <span className="text-2xl">{option.icon}</span>
                                <span className="text-body-regular">{option.label}</span>
                            </button>
                        ))}
                    </div>
                </CardContainer>
            </div>
        </div>
    );
};

export default ArtikelCadeauModal;