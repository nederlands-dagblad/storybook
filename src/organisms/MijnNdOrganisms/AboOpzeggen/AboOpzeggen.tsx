import React, { useState, useEffect } from 'react';
import Accordion from '@molecules/contentOrganizationMolecules/Accordion/Accordion';
import Dropdown from '@molecules/formMolecules/Dropdown/Dropdown';
import Button from '@atoms/actionAtoms/Button/Button';
import Alert from '@molecules/feedbackMolecules/Alert/Alert';

export interface AboOpzeggenData {
    value: string;
    stopcode: number;
}

export interface AboOpzeggenProps {
    onSubmit?: (data: AboOpzeggenData) => void;
}

const redenOptions = [
    { label: 'Financieel', value: 'financieel', stopcode: 20 }, 
    { label: 'Tijdgebrek', value: 'tijdgebrek', stopcode: 7 },
    { label: 'Inhoudelijke reden', value: 'inhoudelijke-reden', stopcode: 37 },
    { label: 'Wilde een artikel lezen', value: 'wilde-lezen', stopcode: 14 },
    { label: 'Persoonlijke omstandigheden', value: 'persoonlijke-omstandigheden', stopcode: 71 },
    { label: 'Overig', value: 'overig', stopcode: 70 },
];

const AboOpzeggenForm: React.FC<AboOpzeggenProps> = ({ onSubmit }) => {
    const [reden, setReden] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [apiError, setApiError] = useState('');
    const [errors, setErrors] = useState<{ reden?: string }>({});

    useEffect(() => {
        function handleResult(e: CustomEvent<{ success: boolean; message?: string }>) {
            setSubmitting(false);
            if (e.detail.success) {
                setSubmitted(true);
                setApiError('');
            } else {
                setApiError(e.detail.message || 'Er is iets misgegaan. Probeer het later opnieuw.');
            }
        }
        window.addEventListener('abo-opzeggen-result', handleResult as EventListener);
        return () => window.removeEventListener('abo-opzeggen-result', handleResult as EventListener);
    }, []);

    function handleVerzenden() {
        const newErrors: typeof errors = {};
        if (!reden) {
            newErrors.reden = 'Selecteer een reden.';
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const selectedOption = redenOptions.find(option => option.value === reden);
        if (!selectedOption) return;

        const data: AboOpzeggenData = {
            value: selectedOption.value,
            stopcode: selectedOption.stopcode,
        };

        setSubmitting(true);
        setApiError('');
        window.dispatchEvent(new CustomEvent('abo-opzeggen-submit', { detail: data }));
        onSubmit?.(data);
    }

    if (submitted) {
        return (
            <Alert>Bedankt voor uw reactie. Wij hebben uw opzegverzoek ontvangen en zullen deze in behandeling nemen.</Alert>
        );
    }

    return (
        <div className="flex flex-col gap-l">
            <p className="text-body-light text-text-default">
                Jammer dat u uw abonnement wilt opzeggen. Wij horen graag van u wat de reden hiervoor is.
            </p>

            <div className="flex flex-col gap-s">
                <Dropdown
                    label="Waarom wilt u uw abonnement opzeggen?"
                    options={redenOptions}
                    value={reden}
                    onChange={(v) => { setReden(v); setErrors((e) => ({ ...e, reden: undefined })); }}
                    errors={errors.reden ? [errors.reden] : null}
                />
            </div>

            {apiError && <Alert variant="warning">{apiError}</Alert>}

            <div>
                <Button variant="primary" label="Abonnement stopzetten" onClick={handleVerzenden} disabled={submitting}/>
            </div>
        </div>
    );
};

export const AboOpzeggen: React.FC<AboOpzeggenProps> = ({ onSubmit }) => {
    return (
        <Accordion
            variant="large"
            items={[
                {
                    label: 'Hoe kan ik mijn abonnement opzeggen?',
                    content: <AboOpzeggenForm onSubmit={onSubmit} />,
                },
            ]}
        />
    );
};

export default AboOpzeggen;
