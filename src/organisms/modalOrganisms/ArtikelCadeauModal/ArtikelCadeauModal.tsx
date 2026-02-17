import React, {useState} from 'react';
import RadioButton from "@atoms/actionAtoms/RadioButton/RadioButton.tsx";
import Icon from "@atoms/basicAtoms/Icon/Icon.tsx";
import Modal from "@molecules/feedbackMolecules/Modal/Modal";

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
        {iconName: 'link', label: 'Kopieer link', platform: 'copy'},
        {iconName: 'mail', label: 'E-mail', platform: 'email'},
        {iconName: 'whatsapp', label: 'WhatsApp', platform: 'whatsapp'},
        {iconName: 'facebook', label: 'Facebook', platform: 'facebook'},
        {iconName: 'x', label: 'X', platform: 'x'},
        {iconName: 'linkedin', label: 'LinkedIn', platform: 'linkedin'},
        {iconName: 'bluesky', label: 'Bluesky', platform: 'bluesky'},
    ];

    const handleShareClick = (platform: string) => {
        if (selectedOption === 'gift' && onShareAsGift) {
            onShareAsGift(platform);
        } else if (selectedOption === 'standard' && onShareAsStandard) {
            onShareAsStandard(platform);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} heading={'Artikel delen'} children={
            <>
                <div className="flex flex-col gap-m">
                    {/* Radio Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-s">
                        <RadioButton
                            variant="card"
                            label="Door iedereen te lezen"
                            heading="Als cadeau"
                            badgeText={remainingGifts.toString()}
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
                        {
                            selectedOption === 'gift' ?
                                <>
                                    <p>
                                        Geef <span className="text-body-bold">7 dagen</span> gratis toegang tot dit
                                        artikel.
                                    </p>
                                    <p>
                                        Je kunt deze maand nog <span
                                        className="text-body-bold">{remainingGifts} artikelen</span> cadeau geven.
                                    </p>
                                </>
                                :
                                <>
                                    <p>
                                        Deel dit artikel met een ND-abonnee. Niet-abonnees krijgen een betaalmuur te
                                        zien.
                                    </p>
                                </>
                        }

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
    );
};

export default ArtikelCadeauModal;