import React, { useState, useEffect } from 'react';
import Accordion from '@molecules/contentOrganizationMolecules/Accordion/Accordion';
import Dropdown from '@molecules/formMolecules/Dropdown/Dropdown';
import Button from '@atoms/actionAtoms/Button/Button';
import Alert from '@molecules/feedbackMolecules/Alert/Alert';

export interface AboOpzeggenProps {
    onSubmit?: (reason: string) => void;
}

const redenOptions = [
    { label: 'Financieel', value: 'financieel' },
    { label: 'Tijdgebrek', value: 'tijdgebrek' },
    { label: 'Inhoudelijke reden', value: 'inhoudelijke-reden' },
    { label: 'Overlijden', value: 'overlijden' },
    { label: 'Persoonlijke omstandigheden', value: 'persoonlijke-omstandigheden' },
    { label: 'Overig', value: 'overig' },
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
        setSubmitting(true);
        setApiError('');
        window.dispatchEvent(new CustomEvent('abo-opzeggen-submit', { detail: reden }));
        onSubmit?.(reden);
    }

    function handleNieuweAanvraag() {
        setReden('');
        setErrors({});
        setApiError('');
        setSubmitted(false);
    }

    if (submitted) {
        return (
            <div className="flex flex-col gap-m">
                <Alert>Bedankt voor uw reactie. Wij hebben uw opzegverzoek ontvangen en zullen deze in behandeling nemen.</Alert>
                <div>
                    <Button variant="secondary" label="Nieuwe aanvraag" iconLeft="plus" onClick={handleNieuweAanvraag} />
                </div>
            </div>
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
