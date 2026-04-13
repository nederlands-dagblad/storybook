import React, { useState, useEffect } from 'react';
import { AccordionItem } from '@molecules/contentOrganizationMolecules/Accordion/Accordion';
import Input from '@molecules/formMolecules/Input/Input';
import Button from '@atoms/actionAtoms/Button/Button';
import Alert from '@molecules/feedbackMolecules/Alert/Alert';
import CardContainer from '@atoms/displayAtoms/CardContainer/CardContainer';
import IconText from '@atoms/basicAtoms/IconText/IconText';

export interface AfwijkendBezorgAdresFormData {
    naamVerblijf: string;
    kamernummer: string;
    postcode: string;
    huisnummer: string;
    toevoeging: string;
    straat: string;
    plaats: string;
    ingangsDatum: string;
    eindDatum: string;
}

export interface AfwijkendBezorgAdresProps {
    onSubmit?: (data: AfwijkendBezorgAdresFormData) => void;
    onLookupAdres?: (postcode: string, huisnummer: string) => Promise<{ straat: string; plaats: string }>;
    initialData?: AfwijkendBezorgAdresFormData;
}

const voorwaarden = [
    'Minimaal 5 aaneengesloten bezorgdagen',
    'Digitale krant blijft altijd beschikbaar',
    'Verzending naar het buitenland niet mogelijk',
    'Bezorging op Terschelling niet mogelijk',
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

const AfwijkendBezorgAdresKaart: React.FC<{ data: AfwijkendBezorgAdresFormData }> = ({ data }) => {
    const verblijf = [data.naamVerblijf, data.kamernummer].filter(Boolean).join(' ');
    const adres = [data.straat, data.huisnummer, data.toevoeging].filter(Boolean).join(' ');

    return (
        <CardContainer padding="s">
            <div className="flex flex-col gap-s">
                <span className="text-heading-s text-text-default">Tijdelijk bezorgadres</span>
                {verblijf && <OverzichtRow label="Verblijf" value={verblijf} />}
                {adres && <OverzichtRow label="Adres" value={adres} />}
                <OverzichtRow label="Postcode" value={data.postcode} />
                <OverzichtRow label="Plaats" value={data.plaats} />
                <OverzichtRow label="Ingangsdatum" value={data.ingangsDatum} />
                <OverzichtRow label="Einddatum" value={data.eindDatum} />
            </div>
        </CardContainer>
    );
};

interface FormProps {
    onSubmit?: AfwijkendBezorgAdresProps['onSubmit'];
    onLookupAdres?: AfwijkendBezorgAdresProps['onLookupAdres'];
    onSuccess: (data: AfwijkendBezorgAdresFormData) => void;
}

const AfwijkendBezorgAdresForm: React.FC<FormProps> = ({ onSubmit, onLookupAdres, onSuccess }) => {
    const [naamVerblijf, setNaamVerblijf] = useState('');
    const [kamernummer, setKamernummer] = useState('');
    const [postcode, setPostcode] = useState('');
    const [huisnummer, setHuisnummer] = useState('');
    const [toevoeging, setToevoeging] = useState('');
    const [straat, setStraat] = useState('');
    const [plaats, setPlaats] = useState('');
    const [ingangsDatum, setIngangsDatum] = useState('');
    const [eindDatum, setEindDatum] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [apiError, setApiError] = useState('');
    const [errors, setErrors] = useState<Partial<Record<keyof AfwijkendBezorgAdresFormData, string>>>({});
    const [pendingData, setPendingData] = useState<AfwijkendBezorgAdresFormData | null>(null);

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
        window.addEventListener('afwijkend-bezorgadres-result', handleResult as EventListener);
        return () => window.removeEventListener('afwijkend-bezorgadres-result', handleResult as EventListener);
    }, [pendingData, onSuccess]);

    useEffect(() => {
        if (!postcode || !huisnummer) {
            setStraat('');
            setPlaats('');
            return;
        }
        onLookupAdres?.(postcode, huisnummer)?.then(({ straat, plaats }) => {
            setStraat(straat);
            setPlaats(plaats);
        });
    }, [postcode, huisnummer]);

    const minEindDatum = ingangsDatum ? addDays(parseDate(ingangsDatum) ?? new Date(), 5) : addDays(new Date(), 5);

    function handleVerzenden() {
        const newErrors: typeof errors = {};
        if (!postcode) newErrors.postcode = 'Vul een postcode in.';
        if (!huisnummer) newErrors.huisnummer = 'Vul een huisnummer in.';
        if (!ingangsDatum) newErrors.ingangsDatum = 'Vul een ingangsdatum in.';
        if (!eindDatum) {
            newErrors.eindDatum = 'Vul een einddatum in.';
        } else if (ingangsDatum && (parseDate(eindDatum) ?? new Date()) < minEindDatum) {
            newErrors.eindDatum = 'De einddatum moet minimaal 5 dagen na de ingangsdatum liggen.';
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        const data: AfwijkendBezorgAdresFormData = { naamVerblijf, kamernummer, postcode, huisnummer, toevoeging, straat, plaats, ingangsDatum, eindDatum };
        setPendingData(data);
        setSubmitting(true);
        setApiError('');
        window.dispatchEvent(new CustomEvent('afwijkend-bezorgadres-submit', { detail: data }));
        onSubmit?.(data);
    }

    return (
        <div className="flex flex-col gap-m lg:gap-l">
            <p className="text-body-light text-text-default">
                Ga je op vakantie of wil je de krant tijdelijk op een ander adres ontvangen? Vul hieronder het
                afwijkende bezorgadres en de gewenste periode in.
            </p>

            <CardContainer background="gray" padding="m">
                <div className="flex flex-col gap-xs">
                    {voorwaarden.map((v, i) => (
                        <IconText key={i} icon="square" text={v} />
                    ))}
                </div>
            </CardContainer>

            <div className="flex flex-col gap-s">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-s">
                    <Input label="Naam verblijf" value={naamVerblijf} setValue={setNaamVerblijf} />
                    <Input label="Kamernummer" value={kamernummer} setValue={setKamernummer} />
                </div>
                <Input
                    label="Postcode *"
                    value={postcode}
                    setValue={(v) => { setPostcode(v); setErrors((e) => ({ ...e, postcode: undefined })); }}
                    errors={errors.postcode ? [errors.postcode] : null}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-s">
                    <Input
                        label="Huisnummer *"
                        value={huisnummer}
                        setValue={(v) => { setHuisnummer(v); setErrors((e) => ({ ...e, huisnummer: undefined })); }}
                        errors={errors.huisnummer ? [errors.huisnummer] : null}
                    />
                    <Input label="Toevoeging" value={toevoeging} setValue={setToevoeging} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-s">
                    <Input label="Straat" value={straat} setValue={() => {}} disabled />
                    <Input label="Plaats" value={plaats} setValue={() => {}} disabled />
                </div>
                <div className="flex flex-col gap-s">
                    <Input
                        label="Ingangsdatum *"
                        value={ingangsDatum}
                        setValue={(v) => { setIngangsDatum(v); setEindDatum(''); setErrors((e) => ({ ...e, ingangsDatum: undefined, eindDatum: undefined })); }}
                        datePicker
                        minDate={addDays(new Date(), 4)}
                        errors={errors.ingangsDatum ? [errors.ingangsDatum] : null}
                    />
                    <Input
                        label="Einddatum *"
                        value={eindDatum}
                        setValue={(v) => { setEindDatum(v); setErrors((e) => ({ ...e, eindDatum: undefined })); }}
                        datePicker
                        minDate={minEindDatum}
                        errors={errors.eindDatum ? [errors.eindDatum] : null}
                    />
                </div>
            </div>

            {apiError && <Alert variant="warning">{apiError}</Alert>}

            <div>
                <Button variant="primary" label="Verzenden" onClick={handleVerzenden} disabled={submitting} />
            </div>
        </div>
    );
};

export const AfwijkendBezorgAdres: React.FC<AfwijkendBezorgAdresProps> = ({ onSubmit, onLookupAdres, initialData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentData, setCurrentData] = useState<AfwijkendBezorgAdresFormData | null>(initialData ?? null);
    const [justSubmitted, setJustSubmitted] = useState(false);

    function handleSuccess(data: AfwijkendBezorgAdresFormData) {
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
            <AfwijkendBezorgAdresKaart data={currentData} />
        </div>
    ) : (
        <AfwijkendBezorgAdresForm
            onSubmit={onSubmit}
            onLookupAdres={onLookupAdres}
            onSuccess={handleSuccess}
        />
    );

    return (
        <AccordionItem
            variant="large"
            label="Bezorgen op een ander (vakantie) adres"
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
            content={accordionContent}
        />
    );
};

export default AfwijkendBezorgAdres;
