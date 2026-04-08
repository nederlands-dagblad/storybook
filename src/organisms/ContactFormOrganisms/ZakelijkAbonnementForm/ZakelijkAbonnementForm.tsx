import React, { useState } from 'react';
import Input from '@molecules/formMolecules/Input/Input';
import Textarea from '@molecules/formMolecules/Textarea/Textarea';
import { RadioButton } from '@molecules/formMolecules/RadioButton/RadioButton';
import { Button } from '@atoms/actionAtoms/Button/Button';
import CardContainer from '@atoms/displayAtoms/CardContainer/CardContainer';

export interface ZakelijkAbonnementFormData {
    bedrijfsnaam: string;
    contactpersoon: string;
    email: string;
    telefoon: string;
    abonnementvoorkeur: 'basis' | 'plus' | '';
    aantalLicenties: string;
    opmerkingen: string;
}

export interface ZakelijkAbonnementFormProps {
    introText?: React.ReactNode;
    bedrijfsnaamLabel?: string;
    contactpersoonLabel?: string;
    emailLabel?: string;
    telefoonLabel?: string;
    abonnementvoorkeurLabel?: string;
    aantalLicentiesLabel?: string;
    opmerkingenLabel?: string;
    submitLabel?: string;
    onSubmit?: (data: ZakelijkAbonnementFormData) => void | Promise<void>;
}

const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const ZakelijkAbonnementForm: React.FC<ZakelijkAbonnementFormProps> = ({
    introText = (
        <>
            Neem contact op met onze klantenservice om te informeren naar de mogelijkheden en de prijzen. Dat kan via onderstaand formulier of via{' '}
            <a href="mailto:service@nd.nl" className="underline">service@nd.nl</a>
            {' '}of telefonisch 088-1999999 (optie 1) bereikbaar op werkdagen tussen 8.30 - 12.00 uur.
        </>
    ),
    bedrijfsnaamLabel = 'Bedrijfsnaam*',
    contactpersoonLabel = 'Contactpersoon*',
    emailLabel = 'Emailadres*',
    telefoonLabel = 'Telefoonnummer*',
    abonnementvoorkeurLabel = 'Abonnementvoorkeur',
    aantalLicentiesLabel = 'Voorkeur aantal licenties',
    opmerkingenLabel = 'Opmerkingen',
    submitLabel = 'Verzenden',
    onSubmit,
}) => {
    const [bedrijfsnaam, setBedrijfsnaam] = useState('');
    const [contactpersoon, setContactpersoon] = useState('');
    const [email, setEmail] = useState('');
    const [telefoon, setTelefoon] = useState('');
    const [abonnementvoorkeur, setAbonnementvoorkeur] = useState<'basis' | 'plus' | ''>('');
    const [aantalLicenties, setAantalLicenties] = useState('');
    const [opmerkingen, setOpmerkingen] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const errors = {
        bedrijfsnaam: !bedrijfsnaam.trim() ? ['Dit veld is verplicht'] : null,
        contactpersoon: !contactpersoon.trim() ? ['Dit veld is verplicht'] : null,
        email: !email.trim()
            ? ['Dit veld is verplicht']
            : !isValidEmail(email)
            ? ['Voer een geldig e-mailadres in']
            : null,
        telefoon: !telefoon.trim() ? ['Dit veld is verplicht'] : null,
        aantalLicenties: aantalLicenties !== '' && Number(aantalLicenties) < 3 ? ['Minimaal 3 licenties vereist'] : null,
    };

    const isValid = Object.values(errors).every(e => e === null);

    const resetForm = () => {
        setBedrijfsnaam('');
        setContactpersoon('');
        setEmail('');
        setTelefoon('');
        setAbonnementvoorkeur('');
        setAantalLicenties('');
        setOpmerkingen('');
        setSubmitted(false);
    };

    const handleSubmit = async () => {
        setSubmitted(true);
        if (!isValid) return;
        try {
            await onSubmit?.({ bedrijfsnaam, contactpersoon, email, telefoon, abonnementvoorkeur, aantalLicenties, opmerkingen });
            resetForm();
        } catch {
            // keep form state on failure so user can retry
        }
    };

    return (
        <CardContainer borderColor="gray-subtle" className="flex flex-col gap-m">
            {introText && (
                <p className="text-body-light text-text-default">{introText}</p>
            )}

            <div className={"max-w-xl"}>
                <Input label={bedrijfsnaamLabel} value={bedrijfsnaam} setValue={setBedrijfsnaam} errors={submitted ? errors.bedrijfsnaam : null} />
                <Input label={contactpersoonLabel} value={contactpersoon} setValue={setContactpersoon} errors={submitted ? errors.contactpersoon : null} />
                <Input label={emailLabel} value={email} setValue={setEmail} type="email" errors={submitted ? errors.email : null} />
                <Input label={telefoonLabel} value={telefoon} setValue={setTelefoon} type="tel" errors={submitted ? errors.telefoon : null} />

                <div className="flex flex-col gap-xs">
                    <span className="text-body-light text-text-default">{abonnementvoorkeurLabel}</span>
                    <RadioButton
                        label="Basis"
                        name="abonnementvoorkeur"
                        checked={abonnementvoorkeur === 'basis'}
                        onChange={() => setAbonnementvoorkeur('basis')}
                    />
                    <RadioButton
                        label="Plus"
                        name="abonnementvoorkeur"
                        checked={abonnementvoorkeur === 'plus'}
                        onChange={() => setAbonnementvoorkeur('plus')}
                    />
                </div>

                <Input label={aantalLicentiesLabel} value={aantalLicenties} setValue={setAantalLicenties} type="number" help="minimaal 3 licenties" errors={submitted ? errors.aantalLicenties : null} />

                <Textarea label={opmerkingenLabel} value={opmerkingen} setValue={setOpmerkingen} />
            </div>

            <Button
                variant="primary"
                label={submitLabel}
                onClick={handleSubmit}
                className="w-fit"
            />
        </CardContainer>
    );
};

export default ZakelijkAbonnementForm;
