import React, { useState, useEffect } from 'react';
import { AccordionItem } from '@molecules/contentOrganizationMolecules/Accordion/accordion';
import Input from '@molecules/formMolecules/Input/Input';
import Button from '@atoms/actionAtoms/Button/Button';
import Alert from '@molecules/feedbackMolecules/Alert/Alert';
import CardContainer from '@atoms/displayAtoms/CardContainer/CardContainer';
import IconText from '@atoms/basicAtoms/IconText/IconText';
import { Modal } from '@molecules/feedbackMolecules/Modal/Modal';

export interface BezorgingStopzettenFormData {
    ingangsDatum: string;
    eindDatum: string;
}

export interface BezorgingStopzettenProps {
    onSubmit?: (data: BezorgingStopzettenFormData) => void;
    onDelete?: (data: BezorgingStopzettenFormData) => void;
    initialData?: BezorgingStopzettenFormData;
    initialPreviousSubmissions?: BezorgingStopzettenFormData[];
}

const voorwaarden = [
    'Minimaal 5 aaneengesloten dagen',
    'Digitale krant blijft altijd beschikbaar',
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

const BezorgingStopzettenKaart: React.FC<{ data: BezorgingStopzettenFormData; onBewerken: () => void; onVerwijderen: () => void }> = ({ data, onBewerken, onVerwijderen }) => (
    <CardContainer padding="s">
        <div className="flex flex-col gap-s">
            <div className="flex items-center justify-between gap-s">
                <span className="text-heading-s text-text-default">Tijdelijke stopzetting</span>
                <div className="flex items-center gap-xs">
                    <Button variant="pill" label="Bewerken" iconLeft="pencil" iconOnly onClick={onBewerken} className="sm:hidden" />
                    <Button variant="pill" label="Bewerken" iconLeft="pencil" onClick={onBewerken} className="hidden sm:inline-flex" />
                    <Button variant="pill" label="Verwijderen" iconLeft="trash" iconOnly onClick={onVerwijderen} />
                </div>
            </div>
            <OverzichtRow label="Ingangsdatum" value={data.ingangsDatum} />
            <OverzichtRow label="Einddatum" value={data.eindDatum} />
        </div>
    </CardContainer>
);

interface FormProps {
    onSubmit?: BezorgingStopzettenProps['onSubmit'];
    onSuccess: (data: BezorgingStopzettenFormData) => void;
    prefillData?: BezorgingStopzettenFormData | null;
}

const BezorgingStopzettenForm: React.FC<FormProps> = ({ onSubmit, onSuccess, prefillData }) => {
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

    const minEindDatum = ingangsDatum ? addDays(new Date(ingangsDatum), 5) : addDays(new Date(), 5);

    function handleVerzenden() {
        const newErrors: typeof errors = {};
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

export const BezorgingStopzetten: React.FC<BezorgingStopzettenProps> = ({ onSubmit, onDelete, initialData, initialPreviousSubmissions }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showForm, setShowForm] = useState(!initialData);
    const [isEditing, setIsEditing] = useState(false);
    const [currentData, setCurrentData] = useState<BezorgingStopzettenFormData | null>(initialData ?? null);
    const [previousSubmissions, setPreviousSubmissions] = useState<BezorgingStopzettenFormData[]>(initialPreviousSubmissions ?? []);
    const [justSubmitted, setJustSubmitted] = useState(false);
    const [formKey, setFormKey] = useState(0);
    const [prefillData, setPrefillData] = useState<BezorgingStopzettenFormData | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<{ data: BezorgingStopzettenFormData; slot: 'current' | number } | null>(null);
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
        window.addEventListener('bezorging-stopzetten-delete-result', handleDeleteResult as EventListener);
        return () => window.removeEventListener('bezorging-stopzetten-delete-result', handleDeleteResult as EventListener);
    }, [deleteTarget, previousSubmissions]);

    function handleNieuweMelding() {
        setPrefillData(null);
        setIsEditing(false);
        setFormKey((k) => k + 1);
        setShowForm(true);
        setJustSubmitted(false);
    }

    function handleBewerken(data: BezorgingStopzettenFormData) {
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
        window.dispatchEvent(new CustomEvent('bezorging-stopzetten-delete', { detail: deleteTarget.data }));
        onDelete?.(deleteTarget.data);
    }

    function handleSuccess(data: BezorgingStopzettenFormData) {
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
        <BezorgingStopzettenForm
            key={formKey}
            onSubmit={onSubmit}
            onSuccess={handleSuccess}
            prefillData={prefillData}
        />
    ) : currentData ? (
        <div className="flex flex-col gap-m lg:gap-l">
            {successAlert}
            {previousSubmissions.map((sub, i) => (
                <BezorgingStopzettenKaart key={i} data={sub} onBewerken={() => handleBewerken(sub)} onVerwijderen={() => { setDeleteTarget({ data: sub, slot: i }); setDeleteError(''); }} />
            ))}
            <BezorgingStopzettenKaart data={currentData} onBewerken={() => handleBewerken(currentData)} onVerwijderen={() => { setDeleteTarget({ data: currentData, slot: 'current' }); setDeleteError(''); }} />
            <div>
                <Button variant="secondary" label="Nieuwe melding" iconLeft="plus" onClick={handleNieuweMelding} />
            </div>
        </div>
    ) : null;

    return (
        <div className="flex flex-col gap-m">
            <AccordionItem
                variant="large"
                label="Bezorging tijdelijk stopzetten"
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

export default BezorgingStopzetten;
