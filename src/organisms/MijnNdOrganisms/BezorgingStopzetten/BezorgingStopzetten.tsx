import React, { useState, useEffect } from 'react';
import { AccordionItem } from '@molecules/contentOrganizationMolecules/Accordion/accordion';
import Input from '@molecules/formMolecules/Input/Input';
import Button from '@atoms/actionAtoms/Button/Button';
import Alert from '@molecules/feedbackMolecules/Alert/Alert';
import CardContainer from '@atoms/displayAtoms/CardContainer/CardContainer';
import IconText from '@atoms/basicAtoms/IconText/IconText';

export interface BezorgingStopzettenFormData {
    ingangsDatum: string;
    eindDatum: string;
}

export interface BezorgingStopzettenProps {
    onSubmit?: (data: BezorgingStopzettenFormData) => void;
    initialData?: BezorgingStopzettenFormData;
}

const voorwaarden = [
    'Minimaal 5 aaneengesloten dagen',
    'Digitale krant blijft altijd beschikbaar',
    'De betaling van het abonnementstarief loopt ongewijzigd door',
];

function parseDate(value: string): Date | null {
    const parts = value.split('/');
    if (parts.length !== 3) return null;
    const [dd, mm, yyyy] = parts.map(Number);
    const d = new Date(yyyy, mm - 1, dd);
    return isNaN(d.getTime()) ? null : d;
}

function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

const OverzichtRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex flex-col sm:flex-row sm:gap-m">
        <span className="text-body-light text-text-default sm:w-32 sm:flex-shrink-0">{label}</span>
        <span className="text-body-regular text-text-default">{value}</span>
    </div>
);

const BezorgingStopzettenKaart: React.FC<{ data: BezorgingStopzettenFormData }> = ({ data }) => (
    <CardContainer padding="s">
        <div className="flex flex-col gap-s">
            <span className="text-heading-s text-text-default">Tijdelijke stopzetting</span>
            <OverzichtRow label="Ingangsdatum" value={data.ingangsDatum} />
            <OverzichtRow label="Einddatum" value={data.eindDatum} />
        </div>
    </CardContainer>
);

interface FormProps {
    onSubmit?: BezorgingStopzettenProps['onSubmit'];
    onSuccess: (data: BezorgingStopzettenFormData) => void;
}

const BezorgingStopzettenForm: React.FC<FormProps> = ({ onSubmit, onSuccess }) => {
    const [ingangsDatum, setIngangsDatum] = useState('');
    const [eindDatum, setEindDatum] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [apiError, setApiError] = useState('');
    const [errors, setErrors] = useState<{ ingangsDatum?: string; eindDatum?: string }>({});
    const [pendingData, setPendingData] = useState<BezorgingStopzettenFormData | null>(null);

    useEffect(() => {
        function handleResult(e: CustomEvent<{ success: boolean; message?: string }>) {
            setSubmitting(false);
            if (e.detail.success && pendingData) {
                onSuccess(pendingData);
                setPendingData(null);
            } else {
                setApiError(e.detail.message || 'Er is iets misgegaan. Probeer het later opnieuw.');
            }
        }
        window.addEventListener('bezorging-stopzetten-result', handleResult as EventListener);
        return () => window.removeEventListener('bezorging-stopzetten-result', handleResult as EventListener);
    }, [pendingData, onSuccess]);

    const startDate = ingangsDatum ? (parseDate(ingangsDatum) ?? new Date()) : new Date();
    const minEindDatum = addDays(startDate, 5);
    const maxEindDatum = new Date(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate());

    function handleVerzenden() {
        const newErrors: typeof errors = {};
        if (!ingangsDatum) newErrors.ingangsDatum = 'Vul een ingangsdatum in.';
        if (!eindDatum) {
            newErrors.eindDatum = 'Vul een einddatum in.';
        } else if (ingangsDatum) {
            const parsed = parseDate(eindDatum) ?? new Date();
            if (parsed < minEindDatum) {
                newErrors.eindDatum = 'De einddatum moet minimaal 5 dagen na de ingangsdatum liggen.';
            } else if (parsed > maxEindDatum) {
                newErrors.eindDatum = 'De einddatum mag maximaal een maand na de ingangsdatum liggen.';
            }
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        const data: BezorgingStopzettenFormData = { ingangsDatum, eindDatum };
        setPendingData(data);
        setSubmitting(true);
        setApiError('');
        window.dispatchEvent(new CustomEvent('bezorging-stopzetten-submit', { detail: data }));
        onSubmit?.(data);
    }

    return (
        <div className="flex flex-col gap-m lg:gap-l">
            <div className="flex flex-col gap-s">
                <p className="text-body-light text-text-default">
                    Vul hieronder de periode in waarover je geen krant wilt ontvangen.
                </p>
                <p className="text-body-light text-text-default">
                    Wil je langer dan een maand je abonnement tijdelijk stopzetten? Neem dan <a href="https://nd.nl/service/contact" className="underline">contact</a> op met onze abonneeservice voor de mogelijkheden.
                </p>
            </div>

            <CardContainer background="gray" padding="m">
                <div className="flex flex-col gap-xs">
                    {voorwaarden.map((v, i) => (
                        <IconText key={i} icon="square" text={v} />
                    ))}
                </div>
            </CardContainer>

            <div className="flex flex-col gap-s">
                <Input
                    label="Ingangsdatum"
                    value={ingangsDatum}
                    setValue={(v) => { setIngangsDatum(v); setEindDatum(''); setErrors((e) => ({ ...e, ingangsDatum: undefined, eindDatum: undefined })); }}
                    datePicker
                    minDate={addDays(new Date(), 4)}
                    errors={errors.ingangsDatum ? [errors.ingangsDatum] : null}
                />
                <Input
                    label="Einddatum"
                    value={eindDatum}
                    setValue={(v) => { setEindDatum(v); setErrors((e) => ({ ...e, eindDatum: undefined })); }}
                    datePicker
                    minDate={minEindDatum}
                    maxDate={maxEindDatum}
                    errors={errors.eindDatum ? [errors.eindDatum] : null}
                />
            </div>

            {apiError && <Alert variant="warning">{apiError}</Alert>}

            <div>
                <Button variant="primary" label="Verzenden" onClick={handleVerzenden} disabled={submitting} />
            </div>
        </div>
    );
};

export const BezorgingStopzetten: React.FC<BezorgingStopzettenProps> = ({ onSubmit, initialData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentData, setCurrentData] = useState<BezorgingStopzettenFormData | null>(initialData ?? null);
    const [justSubmitted, setJustSubmitted] = useState(false);

    function handleSuccess(data: BezorgingStopzettenFormData) {
        setCurrentData(data);
        setJustSubmitted(true);
        setIsOpen(true);
    }

    const successAlert = justSubmitted ? (
        <Alert>{'Dank je wel voor het doorgeven van je wijziging. Wij verwerken deze in ons systeem en sturen je vervolgens een bevestiging per e-mail. Heb je nog vragen of opmerkingen? Dan kun je <a href="https://nd.nl/service/contact" class="underline">hier contact met ons opnemen</a>.'}</Alert>
    ) : null;

    const accordionContent = currentData ? (
        <div className="flex flex-col gap-m lg:gap-l">
            {successAlert}
            <BezorgingStopzettenKaart data={currentData} />
        </div>
    ) : (
        <BezorgingStopzettenForm
            onSubmit={onSubmit}
            onSuccess={handleSuccess}
        />
    );

    return (
        <AccordionItem
            variant="large"
            label="Bezorging tijdelijk stopzetten"
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
            content={accordionContent}
        />
    );
};

export default BezorgingStopzetten;
