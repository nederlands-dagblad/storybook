import React, { useState } from 'react';
import Accordion from '@molecules/contentOrganizationMolecules/Accordion/accordion';
import RadioButton from '@molecules/formMolecules/RadioButton/RadioButton';
import CheckBox from '@molecules/formMolecules/CheckBox/CheckBox';
import Input from '@molecules/formMolecules/Input/Input';
import Dropdown from '@molecules/formMolecules/Dropdown/Dropdown';
import Button from '@atoms/actionAtoms/Button/Button';
import Alert from '@molecules/feedbackMolecules/Alert/Alert';

export interface BezorgklachtKrantData {
    melding: 'krant';
    datum: string;
    klacht: string;
    verlengen: boolean;
    perPost: boolean;
}

export interface BezorgklachtNieuwkoersData {
    melding: 'nieuwkoers';
    nieuwkoersDatum: string;
    nieuwkoersPerPost: boolean;
}

export type BezorgklachtFormData = BezorgklachtKrantData | BezorgklachtNieuwkoersData;

export interface BezorgklachtProps {
    onSubmit?: (data: BezorgklachtFormData) => void;
}

const klachtOptions = [
    { label: 'Geen krant ontvangen', value: 'geen-krant' },
    { label: 'Krant te laat bezorgd', value: 'te-laat' },
    { label: 'Verkeerde krant bezorgd', value: 'verkeerde-krant' },
    { label: 'Krant nat bezorgd', value: 'nat' },
    { label: 'Beschadigde krant', value: 'beschadigd' },
    { label: 'Krant steekt uit brievenbus', value: 'brievenbus' },
    { label: 'Krant voortaan in brievenbus voordeur bezorgen', value: 'brievenbus-voordeur' },
    { label: 'Bezorger maakt lawaai', value: 'lawaai' },
];

const EXCLUDED_MONTHS = [0, 7]; // January, August

function isFirstSaturdayOfMonth(dateStr: string): boolean {
    const parts = dateStr.split('/');
    if (parts.length !== 3) return false;
    const [dd, mm, yyyy] = parts.map(Number);
    const date = new Date(yyyy, mm - 1, dd);
    if (isNaN(date.getTime())) return false;
    if (EXCLUDED_MONTHS.includes(date.getMonth())) return false;
    if (date.getDay() !== 6) return false;
    return date.getDate() <= 7;
}

function getFirstSaturdayOfMonth(year: number, month: number): Date {
    const date = new Date(year, month, 1);
    while (date.getDay() !== 6) {
        date.setDate(date.getDate() + 1);
    }
    return date;
}

function getLastNEditionDates(n: number): { label: string; value: string }[] {
    const results: Date[] = [];
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();

    while (results.length < n) {
        if (!EXCLUDED_MONTHS.includes(month)) {
            const firstSat = getFirstSaturdayOfMonth(year, month);
            if (firstSat <= today) {
                results.push(firstSat);
            }
        }
        month--;
        if (month < 0) {
            month = 11;
            year--;
        }
    }

    return results.map((date) => ({
        label: date.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }),
        value: date.toISOString(),
    }));
}

const nieuwkoersEditions = getLastNEditionDates(3);

const BezorgklachtForm: React.FC<BezorgklachtProps> = ({ onSubmit }) => {
    const [melding, setMelding] = useState<'krant' | 'nieuwkoers'>('krant');
    const [datum, setDatum] = useState('');
    const [klacht, setKlacht] = useState('');
    const [verlengen, setVerlengen] = useState(false);
    const [perPost, setPerPost] = useState(false);
    const [nieuwkoersDatum, setNieuwkoersDatum] = useState('');
    const [nieuwkoersPerPost, setNieuwkoersPerPost] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<{ datum?: string; klacht?: string; nieuwkoersDatum?: string }>({});

    const showPostCheckbox = isFirstSaturdayOfMonth(datum);

    function handleVerzenden() {
        const newErrors: typeof errors = {};
        if (melding === 'krant') {
            if (!datum) newErrors.datum = 'Vul een editiedatum in.';
            if (!klacht) newErrors.klacht = 'Selecteer een klacht.';
        }
        if (melding === 'nieuwkoers') {
            if (!nieuwkoersDatum) newErrors.nieuwkoersDatum = 'Selecteer een editie.';
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        const data: BezorgklachtFormData = melding === 'krant'
            ? { melding, datum, klacht, verlengen, perPost }
            : { melding, nieuwkoersDatum, nieuwkoersPerPost };
        onSubmit?.(data);
        setSubmitted(true);
    }

    function handleNieuweMelding() {
        setMelding('krant');
        setDatum('');
        setKlacht('');
        setVerlengen(false);
        setPerPost(false);
        setNieuwkoersDatum('');
        setNieuwkoersPerPost(false);
        setErrors({});
        setSubmitted(false);
    }

    if (submitted) {
        return (
            <div className="flex flex-col gap-m">
                <Alert>{melding === 'nieuwkoers'
                    ? 'Je melding is verzonden. Je ontvangt hierover een e-mail ter bevestiging. <a href="https://www.nd.nl/reader?tab=dnk">Lees hier De Nieuwe Koers digitaal.</a>'
                    : 'Je melding is verzonden. Je ontvangt hierover een e-mail ter bevestiging. <a href="https://www.nd.nl/reader">Lees hier de krant digitaal.</a>'
                }</Alert>
                <div>
                    <Button variant="secondary" label="Nieuwe melding" iconLeft="plus" onClick={handleNieuweMelding} />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-l">
            <p className="text-body-light text-text-default">
                Is je krant of De Nieuwe Koers niet (goed) bezorgd? Dat is vervelend en niet de bedoeling. Onze excuses
                daarvoor. Geef via onderstaand formulier een bezorgmelding door. Wij sturen je bezorgmelding direct door
                naar onze bezorgdienst om de bezorging te verbeteren.
            </p>

            <div className="flex flex-col gap-s">
                <span className="text-body-bold text-text-default">Mijn melding gaat over</span>
                <div className="grid grid-cols-2 gap-s">
                    <RadioButton
                        variant="card"
                        heading="De krant"
                        label="Eventueel in combinatie met De Nieuwe Koers"
                        checked={melding === 'krant'}
                        onChange={() => setMelding('krant')}
                    />
                    <RadioButton
                        variant="card"
                        heading="De Nieuwe Koers"
                        label="De krant is wel goed bezorgd"
                        checked={melding === 'nieuwkoers'}
                        onChange={() => setMelding('nieuwkoers')}
                    />
                </div>
            </div>

            {melding === 'krant' && (
                <div className="flex flex-col gap-s">
                    <Input
                        label="Editiedatum"
                        value={datum}
                        setValue={(v) => { setDatum(v); setErrors((e) => ({ ...e, datum: undefined })); }}
                        datePicker
                        maxDate={new Date()}
                        errors={errors.datum ? [errors.datum] : null}
                    />
                    <Dropdown
                        label="Selecteer je klacht"
                        options={klachtOptions}
                        value={klacht}
                        onChange={(v) => { setKlacht(v); setErrors((e) => ({ ...e, klacht: undefined })); }}
                        errors={errors.klacht ? [errors.klacht] : null}
                    />
                    {(klacht === 'geen-krant' || klacht === 'verkeerde-krant') && (
                        <CheckBox
                            label="Ik wil mijn abonnement met een dag verlengen"
                            checked={verlengen}
                            onChange={(e) => setVerlengen(e.target.checked)}
                        />
                    )}
                    {showPostCheckbox && (
                        <div className="flex flex-col gap-m">
                            <CheckBox
                                label="Ik wil de krant en De Nieuwe Koers per post ontvangen"
                                checked={perPost}
                                onChange={(e) => setPerPost(e.target.checked)}
                            />
                            <Alert>{'Je kunt de <a href="https://www.nd.nl/reader">krant</a> en <a href="https://www.nd.nl/reader?tab=dnk">De Nieuwe Koers</a> ook digitaal lezen.'}</Alert>
                        </div>
                    )}
                </div>
            )}

            {melding === 'nieuwkoers' && (
                <div className="flex flex-col gap-s">
                    <Dropdown
                        label="Gemiste editie"
                        options={nieuwkoersEditions}
                        value={nieuwkoersDatum}
                        onChange={(v) => { setNieuwkoersDatum(v); setErrors((e) => ({ ...e, nieuwkoersDatum: undefined })); }}
                        errors={errors.nieuwkoersDatum ? [errors.nieuwkoersDatum] : null}
                    />
                    <div className="flex flex-col gap-m">
                        <CheckBox
                            label="Ik wil deze editie per post ontvangen."
                            checked={nieuwkoersPerPost}
                            onChange={(e) => setNieuwkoersPerPost(e.target.checked)}
                        />
                        <Alert>{'Je kunt <a href="https://www.nd.nl/reader?tab=dnk">De Nieuwe Koers</a> ook digitaal lezen.'}</Alert>
                    </div>
                </div>
            )}

            <div>
                <Button variant="primary" label="Verzenden" onClick={handleVerzenden}/>
            </div>
        </div>
    );
};

export const Bezorgklacht: React.FC<BezorgklachtProps> = ({ onSubmit }) => {
    return (
        <Accordion
            variant="large"
            items={[
                {
                    label: 'Bezorgklacht doorgeven',
                    content: <BezorgklachtForm onSubmit={onSubmit} />,
                },
            ]}
        />
    );
};

export default Bezorgklacht;
