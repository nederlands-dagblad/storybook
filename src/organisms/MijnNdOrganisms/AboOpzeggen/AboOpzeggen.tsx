import React, { useState } from 'react';
import { AccordionItem } from '@molecules/contentOrganizationMolecules/Accordion/Accordion';
import Dropdown from '@molecules/formMolecules/Dropdown/Dropdown';
import Button from '@atoms/actionAtoms/Button/Button';
import { Modal } from '@molecules/feedbackMolecules/Modal/Modal';

export interface AboOpzeggenProps {
    eersteVeertienDagen?: boolean;
    onOpzeggen?: (reden: string) => void;
}

const redenOptions = [
    { label: 'Financieel', value: 'financieel' },
    { label: 'Tijdgebrek', value: 'tijdgebrek' },
    { label: 'Inhoudelijke reden', value: 'inhoudelijke-reden' },
    { label: 'Overlijden', value: 'overlijden' },
    { label: 'Persoonlijke omstandigheden', value: 'persoonlijke-omstandigheden' },
    { label: 'Overig', value: 'overig' },
];

const EersteVeertienDagenContent: React.FC<{ onOpzeggen?: (reden: string) => void }> = ({ onOpzeggen }) => {
    const [reden, setReden] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [bevestigd, setBevestigd] = useState(false);

    function handleBevestigen() {
        setModalOpen(false);
        setBevestigd(true);
        onOpzeggen?.(reden);
    }

    if (bevestigd) {
        return (
            <div className="flex flex-col gap-m">
                <p className="text-body-light text-text-default">
                    U ontvangt een bevestiging per e-mail. Mocht u ooit van gedachten veranderen, u bent altijd welkom terug.
                </p>
                <div>
                    <Button variant="primary" label="Terug naar de homepage" href="https://nd.nl" />
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col gap-m">
                <p className="text-body-light text-text-default">
                    Jammer dat je je abonnement wilt opzeggen. Wij horen graag wat de reden hiervoor is.
                </p>
                <Dropdown
                    label="Waarom wil je je abonnement opzeggen?"
                    placeholder="Kies je reden"
                    options={redenOptions}
                    value={reden}
                    onChange={setReden}
                />
                <div>
                    <Button
                        variant="secondary"
                        label="Abonnement stopzetten"
                        iconLeft="x-mark"
                        onClick={() => setModalOpen(true)}
                    />
                </div>
            </div>
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                heading="Abonnement opzeggen"
            >
                <div className="flex flex-col gap-m">
                    <p className="text-body-light text-text-default">
                        U staat op het punt uw abonnement op te zeggen. Dat vinden we jammer. Weet u zeker dat u wilt stoppen?
                    </p>
                    <div className="flex flex-row gap-s">
                        <Button variant="secondary" label="Ja, ik bevestig mijn opzegging" onClick={handleBevestigen} />
                        <Button variant="ghost" label="Nee, ik blijf toch abonnee" onClick={() => setModalOpen(false)} />
                    </div>
                </div>
            </Modal>
        </>
    );
};

const NaVeertienDagenContent: React.FC = () => (
    <div className="flex flex-col gap-m">
        <p className="text-body-light text-text-default">
            Jammer dat u uw abonnement wilt opzeggen. Wij horen graag van u wat de reden hiervoor is. Wilt u bij voorkeur telefonisch contact met ons opnemen via 088 1 999 999 (optie 1)? Wij zijn bereikbaar op werkdagen van 08:30 tot 12:00 uur.
        </p>
        <p className="text-body-light text-text-default">
            Er geldt een opzegtermijn van één maand voor de nieuwe betalingstermijn. Een jaarabonnement kan na het eerste jaar maandelijks worden opgezegd. Het moment van opzeggen is de dag waarop de opzegging bij abonneeservice binnen is.
        </p>
    </div>
);

export const AboOpzeggen: React.FC<AboOpzeggenProps> = ({ eersteVeertienDagen = false, onOpzeggen }) => {
    const [isOpen, setIsOpen] = useState(false);

    const content = eersteVeertienDagen
        ? <EersteVeertienDagenContent onOpzeggen={onOpzeggen} />
        : <NaVeertienDagenContent />;

    return (
        <AccordionItem
            variant="default"
            label="Hoe kan ik mijn abonnement opzeggen?"
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
            content={content}
        />
    );
};

export default AboOpzeggen;
