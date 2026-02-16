import React, { useState } from 'react';
import CardContainer from "@atoms/displayAtoms/CardContainer/CardContainer.tsx";
import RadioButton from "@atoms/actionAtoms/RadioButton/RadioButton.tsx";
import Icon from "@atoms/basicAtoms/Icon/Icon.tsx";

export interface ArtikelCadeauModalProps {
    isOpen: boolean;
    onClose: () => void;
    remainingGifts?: number;
    onShareAsGift?: (platform: string) => void;
    onShareAsStandard?: (platform: string) => void;
}

export const ArtikelCadeauModal: React.FC<ArtikelCadeauModalProps> = ({
                                                                          isOpen,
                                                                          onClose,
                                                                          remainingGifts = 5,
                                                                          onShareAsGift,
                                                                          onShareAsStandard,
                                                                      }) => {
    const [selectedOption, setSelectedOption] = useState<'gift' | 'standard'>('gift');

    if (!isOpen) return null;
    
    type ShareOption = {
        iconName: string;
        label: string;
        platform: string; // Add platform identifier
    };

    const shareOptions: ShareOption[] = [
        { iconName: 'link', label: 'Kopieer link', platform: 'copy' },
        { iconName: 'mail', label: 'E-mail', platform: 'email' },
        { iconName: 'whatsapp', label: 'WhatsApp', platform: 'whatsapp' },
        { iconName: 'facebook', label: 'Facebook', platform: 'facebook' },
        { iconName: 'x', label: 'X', platform: 'x' },
        { iconName: 'linkedin', label: 'LinkedIn', platform: 'linkedin' },
        { iconName: 'bluesky', label: 'Bluesky', platform: 'bluesky' },
    ];

    const handleShareClick = (platform: string) => {
        if (selectedOption === 'gift' && onShareAsGift) {
            onShareAsGift(platform);
        } else if (selectedOption === 'standard' && onShareAsStandard) {
            onShareAsStandard(platform);
        }
    };
    
    return (
        <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full md:w-auto md:max-w-4xl md:mx-4 bg-white p-m h-[60vh] md:h-auto md:max-h-[90vh] overflow-y-auto bg-background-default">
                {/* Header */}
                <div className="flex items-center justify-between mb-6   ">
                    <h2 className="font-bold font-gulliver text-heading-2">Artikel delen</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-background-gray rounded transition-colors text-2xl"
                        aria-label="Sluiten"
                    >
                        <Icon name={'x-mark'} size="m" color="default" variant="outline"/>
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
                        Je kunt deze maand nog <span
                        className="text-body-bold">{remainingGifts} artikelen</span> cadeau geven.
                    </p>
                </div>

                {/* Share Buttons */}
                <div className="grid grid-cols-2 gap-4">
                    {shareOptions.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleShareClick(option.platform)}
                            className="flex items-center gap-3 p-4 border border-border-gray-subtle hover:border-border-brand bg-background-default transition-colors"
                        >
                            <Icon name={option.iconName} size="m" color="default" variant="outline"/>
                            <span className="text-body-regular">{option.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ArtikelCadeauModal;