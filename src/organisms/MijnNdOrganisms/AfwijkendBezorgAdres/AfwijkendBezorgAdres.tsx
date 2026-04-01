import React, { useState, useEffect } from 'react';
import { AccordionItem } from '@molecules/contentOrganizationMolecules/Accordion/accordion';
import Input from '@molecules/formMolecules/Input/Input';
import Button from '@atoms/actionAtoms/Button/Button';
import Alert from '@molecules/feedbackMolecules/Alert/Alert';
import CardContainer from '@atoms/displayAtoms/CardContainer/CardContainer';
import IconText from '@atoms/basicAtoms/IconText/IconText';
import { Modal } from '@molecules/feedbackMolecules/Modal/Modal';

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
    onDelete?: (data: AfwijkendBezorgAdresFormData) => void;
    onLookupAdres?: (postcode: string, huisnummer: string) => Promise<{ straat: string; plaats: string }>;
    initialData?: AfwijkendBezorgAdresFormData;
    initialPreviousSubmissions?: AfwijkendBezorgAdresFormData[];
}

const voorwaarden = [
    'Minimaal 5 aaneengesloten bezorgdagen',
    'Digitale krant blijft altijd beschikbaar',
    'Verzending naar het buitenland niet mogelijk',
    'Bezorging op Terschelling niet mogelijk',
    'De betaling van het abonnementstarief loopt ongewijzigd door',
];

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

const AfwijkendBezorgAdresKaart: React.FC<{ data: AfwijkendBezorgAdresFormData; onBewerken: () => void; onVerwijderen: () => void }> = ({ data, onBewerken, onVerwijderen }) => {
    const verblijf = [data.naamVerblijf, data.kamernummer].filter(Boolean).join(' ');
    const adres = [data.straat, data.huisnummer, data.toevoeging].filter(Boolean).join(' ');

    return (
        <CardContainer padding="s">
            <div className="flex flex-col gap-s">
                <div className="flex items-center justify-between gap-s">
                    <span className="text-heading-s text-text-default">Tijdelijk bezorgadres</span>
                    <div className="flex items-center gap-xs">
                        <Button variant="pill" label="Bewerken" iconLeft="pencil" iconOnly onClick={onBewerken} className="sm:hidden" />
                        <Button variant="pill" label="Bewerken" iconLeft="pencil" onClick={onBewerken} className="hidden sm:inline-flex" />
                        <Button variant="pill" label="Verwijderen" iconLeft="trash" iconOnly onClick={onVerwijderen} />
                    </div>
                </div>
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
    prefillData?: AfwijkendBezorgAdresFormData | null;
}

const AfwijkendBezorgAdresForm: React.FC<FormProps> = ({ onSubmit, onLookupAdres, onSuccess, prefillData }) => {
    const [naamVerblijf, setNaamVerblijf] = useState(prefillData?.naamVerblijf ?? '');
    const [kamernummer, setKamernummer] = useState(prefillData?.kamernummer ?? '');
    const [postcode, setPostcode] = useState(prefillData?.postcode ?? '');
    const [huisnummer, setHuisnummer] = useState(prefillData?.huisnummer ?? '');
    const [toevoeging, setToevoeging] = useState(prefillData?.toevoeging ?? '');
    const [straat, setStraat] = useState(prefillData?.straat ?? '');
    const [plaats, setPlaats] = useState(prefillData?.plaats ?? '');
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

    const minEindDatum = ingangsDatum ? addDays(new Date(ingangsDatum), 5) : addDays(new Date(), 5);

    function handleVerzenden() {
        const newErrors: typeof errors = {};
        if (!postcode) newErrors.postcode = 'Vul een postcode in.';
        if (!huisnummer) newErrors.huisnummer = 'Vul een huisnummer in.';
        if (!ingangsDatum) newErrors.ingangsDatum = 'Vul een ingangsdatum in.';
        if (!eindDatum) {
            newErrors.eindDatum = 'Vul een einddatum in.';
        } else if (ingangsDatum && new Date(eindDatum) < minEindDatum) {
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

export const AfwijkendBezorgAdres: React.FC<AfwijkendBezorgAdresProps> = ({ onSubmit, onDelete, onLookupAdres, initialData, initialPreviousSubmissions }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showForm, setShowForm] = useState(!initialData);
    const [isEditing, setIsEditing] = useState(false);
    const [currentData, setCurrentData] = useState<AfwijkendBezorgAdresFormData | null>(initialData ?? null);
    const [previousSubmissions, setPreviousSubmissions] = useState<AfwijkendBezorgAdresFormData[]>(initialPreviousSubmissions ?? []);
    const [justSubmitted, setJustSubmitted] = useState(false);
    const [formKey, setFormKey] = useState(0);
    const [prefillData, setPrefillData] = useState<AfwijkendBezorgAdresFormData | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<{ data: AfwijkendBezorgAdresFormData; slot: 'current' | number } | null>(null);
    const [deleteSubmitting, setDeleteSubmitting] = useState(false);
    const [deleteError, setDeleteError] = useState('');

    useEffect(() => {
        function handleDeleteResult(e: CustomEvent<{ success: boolean; message?: string }>) {
            setDeleteSubmitting(false);
            if (e.detail.success && deleteTarget) {
                const { slot } = deleteTarget;
                if (slot === 'current') {
                    if (previousSubmissions.length > 0) {
                        const [first, ...rest] = previousSubmissions;
                        setCurrentData(first);
                        setPreviousSubmissions(rest);
                    } else {
                        setCurrentData(null);
                        setShowForm(true);
                    }
                    setJustSubmitted(false);
                } else if (typeof slot === 'number') {
                    setPreviousSubmissions((prev) => prev.filter((_, i) => i !== slot));
                }
                setDeleteTarget(null);
            } else {
                setDeleteError(e.detail.message || 'Er is iets misgegaan. Probeer het later opnieuw.');
            }
        }
        window.addEventListener('afwijkend-bezorgadres-delete-result', handleDeleteResult as EventListener);
        return () => window.removeEventListener('afwijkend-bezorgadres-delete-result', handleDeleteResult as EventListener);
    }, [deleteTarget, previousSubmissions]);

    function handleNieuweMelding() {
        setPrefillData(null);
        setIsEditing(false);
        setFormKey((k) => k + 1);
        setShowForm(true);
        setJustSubmitted(false);
    }

    function handleBewerken(data: AfwijkendBezorgAdresFormData) {
        setPrefillData(data);
        setIsEditing(true);
        setFormKey((k) => k + 1);
        setShowForm(true);
        setJustSubmitted(false);
    }

    function handleVerwijderenBevestigd() {
        if (!deleteTarget) return;
        setDeleteSubmitting(true);
        setDeleteError('');
        window.dispatchEvent(new CustomEvent('afwijkend-bezorgadres-delete', { detail: deleteTarget.data }));
        onDelete?.(deleteTarget.data);
    }

    function handleSuccess(data: AfwijkendBezorgAdresFormData) {
        if (!isEditing && currentData) {
            setPreviousSubmissions((prev) => [currentData, ...prev]);
        }
        setCurrentData(data);
        setShowForm(false);
        setJustSubmitted(true);
        setIsEditing(false);
        setIsOpen(true);
    }

    const successAlert = justSubmitted ? (
        <Alert>{'Dank je wel voor het doorgeven van je wijziging. Wij verwerken deze in ons systeem en sturen je vervolgens een bevestiging per e-mail. Heb je nog vragen of opmerkingen? Dan kun je <a href="https://nd.nl/service/contact" class="underline">hier contact met ons opnemen</a>.'}</Alert>
    ) : null;

    const accordionContent = showForm ? (
        <AfwijkendBezorgAdresForm
            key={formKey}
            onSubmit={onSubmit}
            onLookupAdres={onLookupAdres}
            onSuccess={handleSuccess}
            prefillData={prefillData}
        />
    ) : currentData ? (
        <div className="flex flex-col gap-m lg:gap-l">
            {successAlert}
            {previousSubmissions.map((sub, i) => (
                <AfwijkendBezorgAdresKaart key={i} data={sub} onBewerken={() => handleBewerken(sub)} onVerwijderen={() => { setDeleteTarget({ data: sub, slot: i }); setDeleteError(''); }} />
            ))}
            <AfwijkendBezorgAdresKaart data={currentData} onBewerken={() => handleBewerken(currentData)} onVerwijderen={() => { setDeleteTarget({ data: currentData, slot: 'current' }); setDeleteError(''); }} />
            <div>
                <Button variant="secondary" label="Nieuwe melding" iconLeft="plus" onClick={handleNieuweMelding} />
            </div>
        </div>
    ) : null;

    return (
        <div className="flex flex-col gap-m">
            <AccordionItem
                variant="large"
                label="Bezorgen op een ander (vakantie) adres"
                isOpen={isOpen}
                onToggle={() => setIsOpen(!isOpen)}
                content={accordionContent}
            />
            <Modal
                isOpen={deleteTarget !== null}
                onClose={() => { if (!deleteSubmitting) setDeleteTarget(null); }}
                heading="Melding verwijderen"
            >
                <div className="flex flex-col gap-l">
                    <p className="text-body-light text-text-default">Weet je zeker dat je deze melding wilt verwijderen?</p>
                    {deleteError && <Alert variant="warning">{deleteError}</Alert>}
                    <div className="flex gap-s">
                        <Button variant="primary" label="Verwijderen" onClick={handleVerwijderenBevestigd} disabled={deleteSubmitting} />
                        <Button variant="ghost" label="Annuleren" onClick={() => setDeleteTarget(null)} disabled={deleteSubmitting} />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AfwijkendBezorgAdres;
