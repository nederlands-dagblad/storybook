import React, { useState } from 'react';
import Accordion from '@molecules/contentOrganizationMolecules/Accordion/Accordion';
import Button from '@atoms/actionAtoms/Button/Button';
import Dropdown from '@molecules/formMolecules/Dropdown/Dropdown';

export interface AbonnementOpzeggenFormData {
    reden: string;
}

export interface AbonnementOpzeggenProps {
    isWithin2WeekWindow: boolean;
    onSubmit?: (data: AbonnementOpzeggenFormData) => void;
    className?: string;
}

interface Errors {
    reden?: string;
}

const AbonnementOpzeggenForm: React.FC<{
    onSubmit: (data: AbonnementOpzeggenFormData) => void;
}> = ({ onSubmit }) => {
    const [reden, setReden] = useState<string>('');
    const [errors, setErrors] = useState<Errors>({});
    const [submitting, setSubmitting] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const redenOptions = [
        { label: 'Financieel', value: 'financieel' },
        { label: 'Tijdgebrek', value: 'tijdgebrek' },
        { label: 'Inhoudelijke reden', value: 'inhoudelijk' },
        { label: 'Overlijden', value: 'overlijden' },
        { label: 'Persoonlijke omstandigheden', value: 'persoonlijk' },
        { label: 'Overig', value: 'overig' },
    ];

    const handleSubmit = () => {
        const newErrors: Errors = {};

        if (!reden) {
            newErrors.reden = 'Selecteer een reden';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setSubmitting(true);
        onSubmit({ reden });
    };

    return (
        <div className="flex flex-col gap-4">
            <style>{`
                .abonnement-opzeggen-dropdown ul {
                    max-height: none !important;
                }
            `}</style>
            <p className="text-body-light font-fira-sans">
                Jammer dat u uw abonnement wilt opzeggen. Wij horen graag van u wat de reden hiervoor is.
            </p>

            <div className="abonnement-opzeggen-dropdown">
                <Dropdown
                    label="Waarom wilt u uw abonnement opzeggen?"
                    options={redenOptions}
                    value={reden}
                    placeholder={"Kies uw reden"}
                    className={"text-body-light font-fira-sans"}
                    isOpen={dropdownOpen}
                    onOpenChange={setDropdownOpen}
                    onChange={(v) => {
                        setReden(v);
                        setErrors((e) => ({ ...e, reden: undefined }));
                    }}
                    errors={errors.reden ? [errors.reden] : null}
                />
                {dropdownOpen && <div className="h-[240px]" />}
            </div>
            <div className="self-start pt-10">
                <Button
                    variant="secondary"
                    label="Abonnement stopzetten"
                    iconLeft="x-mark"
                    onClick={handleSubmit}
                    disabled={submitting}
                />
            </div>
        </div>
    );
};

export const AbonnementOpzeggen: React.FC<AbonnementOpzeggenProps> = ({
    isWithin2WeekWindow,
    onSubmit = () => {},
    className = '',
}) => {
    const accordionContent = isWithin2WeekWindow ? (
        <AbonnementOpzeggenForm onSubmit={onSubmit} />
    ) : (
        <>
            <p className="text-body-light font-fira-sans">
                Jammer dat u uw abonnement wilt opzeggen. Wij horen graag van u wat de reden hiervoor is. Wilt u bij
                voorkeur telefonisch contact met ons opnemen via 088 1 999 999 (optie 1)? Wij zijn bereikbaar op
                werkdagen van 08:30 tot 12:00 uur.
            </p>
            <br/>
            <p className="text-body-light font-fira-sans">
                Er geldt een opzegtermijn van één maand voor de nieuwe betalingstermijn. Een jaarabonnement kan na het
                eerste jaar maandelijks worden opgezegd. Het moment van opzeggen is de dag waarop de opzegging bij
                <a href={"https://localhost:5002/service/contact"}>abonneeservice </a> binnen is.
            </p>
        </>
    );

    return (
        <div className={`w-full ${className}`}>
            <Accordion
                variant="default"
                items={[
                    {
                        className: '!bg-background-default',
                        label: 'Hoe kan ik mijn abonnement opzeggen?',
                        content: accordionContent,
                    },
                ]}
            />
        </div>
    );
};

export default AbonnementOpzeggen;
