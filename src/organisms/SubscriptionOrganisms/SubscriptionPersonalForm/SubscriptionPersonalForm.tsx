import React, { useState, useEffect, useRef } from 'react';
import Alert from '../../../molecules/feedbackMolecules/Alert/Alert';
import Input from '../../../molecules/formMolecules/Input/Input';
import Button from '../../../atoms/actionAtoms/Button/Button';

export interface PersonalFormData {
    initials: string;
    middleName: string;
    lastName: string;
    email: string;
    phone: string;
    postcode: string;
    houseNumber: string;
    addition: string;
    street: string;
    city: string;
}

export interface SubscriptionPersonalFormProps {
    // Alert
    alertText?: React.ReactNode;
    alertEmail?: string;

    // Personal details
    initialsLabel?: string;
    middleNameLabel?: string;
    lastNameLabel?: string;
    emailLabel?: string;
    phoneLabel?: string;

    // Address
    addressHeading?: string;
    postcodeLabel?: string;
    houseNumberLabel?: string;
    additionLabel?: string;
    streetLabel?: string;
    cityLabel?: string;

    // Submit
    submitLabel?: string;
    onSubmit?: (data: PersonalFormData) => void;
}

const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const formatInitials = (value: string): string => {
    const letters = value.replace(/[^a-zA-Z]/g, '').toUpperCase();
    if (letters.length === 0) return '';
    if (letters.length === 1) return letters;
    return letters.split('').join('.') + '.';
};

export const SubscriptionPersonalForm: React.FC<SubscriptionPersonalFormProps> = ({
          alertText,
          alertEmail,
          initialsLabel = 'Voorletters*',
          middleNameLabel = 'Tussenvoegsel',
          lastNameLabel = 'Achternaam*',
          emailLabel = 'E-mailadres*',
          phoneLabel = 'Telefoonnummer*',
          addressHeading = 'Adresgegevens',
          postcodeLabel = 'Postcode*',
          houseNumberLabel = 'Huisnummer*',
          additionLabel = 'Toevoeging',
          streetLabel = 'Straat',
          cityLabel = 'Woonplaats',
          submitLabel = 'Naar betaaloverzicht',
          onSubmit,
      }) => {
    const [initialsRaw, setInitialsRaw] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [postcode, setPostcode] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [addition, setAddition] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [addressLoading, setAddressLoading] = useState(false);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const initials = formatInitials(initialsRaw);

    const handleInitialsChange = (value: string) => {
        // Detect backspace: new value is shorter than current
        if (value.length < initialsRaw.length) {
            // Strip dots and remove last letter
            const letters = initialsRaw.replace(/[^a-zA-Z]/g, '');
            const reduced = letters.slice(0, -1);
            if (reduced.length === 0) {
                setInitialsRaw('');
            } else if (reduced.length === 1) {
                setInitialsRaw(reduced);
            } else {
                setInitialsRaw(reduced.split('').join('.') + '.');
            }
            return;
        }

        // Normal typing: format as usual
        const letters = value.replace(/[^a-zA-Z]/g, '').toUpperCase();
        if (letters.length === 0) {
            setInitialsRaw('');
        } else if (letters.length === 1) {
            setInitialsRaw(letters);
        } else {
            setInitialsRaw(letters.split('').join('.') + '.');
        }
    };

    // Address auto-fill when postcode + huisnummer are filled
    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        const cleanPostcode = postcode.replace(/\s/g, '');
        if (cleanPostcode.length < 6 || houseNumber.length < 1) {
            setStreet('');
            setCity('');
            return;
        }

        debounceRef.current = setTimeout(() => {
            setAddressLoading(true);
            fetch('/api/adresvalideren', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ postcode, huisnummer: houseNumber }),
            })
                .then(res => {
                    if (!res.ok) throw new Error('Address not found');
                    return res.json();
                })
                .then(data => {
                    setStreet(data.straat || '');
                    setCity(data.plaats || '');
                })
                .catch(() => {
                    setStreet('');
                    setCity('');
                })
                .finally(() => setAddressLoading(false));
        }, 500);

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [postcode, houseNumber]);

    const errors = {
        initials: !initialsRaw.replace(/[^a-zA-Z]/g, '').trim() ? ['Dit veld is verplicht'] : null,
        lastName: !lastName.trim() ? ['Dit veld is verplicht'] : null,
        email: !email.trim()
            ? ['Dit veld is verplicht']
            : !isValidEmail(email)
                ? ['Voer een geldig e-mailadres in']
                : null,
        phone: !phone.trim() ? ['Dit veld is verplicht'] : null,
        postcode: !postcode.trim() ? ['Dit veld is verplicht'] : null,
        houseNumber: !houseNumber.trim() ? ['Dit veld is verplicht'] : null,
    };

    const isValid = Object.values(errors).every(e => e === null);

    const handleSubmit = () => {
        setSubmitted(true);
        if (!isValid) return;
        onSubmit?.({ initials, middleName, lastName, email, phone, postcode, houseNumber, addition, street, city });
    };

    return (
        <div className="bg-background-default shadow-m p-m lg:p-l flex flex-col gap-l">
            <h2 className="text-heading-m text-text-default">Persoonlijke gegevens</h2>

            {alertText && (
                <Alert variant="info">
                    <p>{alertText} {alertEmail && <a href={`mailto:${alertEmail}`} className="!underline">{alertEmail}</a>}.</p>
                </Alert>
            )}

            {/* Personal details */}
            <div className="flex flex-col gap-m">
                <Input
                    label={initialsLabel}
                    value={initialsRaw}
                    setValue={handleInitialsChange}
                    errors={submitted ? errors.initials : null}
                />
                <Input label={middleNameLabel} value={middleName} setValue={setMiddleName} />
                <Input label={lastNameLabel} value={lastName} setValue={setLastName} errors={submitted ? errors.lastName : null} />
                <Input label={emailLabel} value={email} setValue={setEmail} type="email" errors={submitted ? errors.email : null} />
                <Input label={phoneLabel} value={phone} setValue={setPhone} type="tel" errors={submitted ? errors.phone : null} />
            </div>

            {/* Address */}
            <div className="flex flex-col gap-m">
                <h2 className="text-heading-m text-text-default">{addressHeading}</h2>
                <Input label={postcodeLabel} value={postcode} setValue={setPostcode} errors={submitted ? errors.postcode : null} />
                <Input label={houseNumberLabel} value={houseNumber} setValue={setHouseNumber} errors={submitted ? errors.houseNumber : null} />
                <Input label={additionLabel} value={addition} setValue={setAddition} />
                <Input label={streetLabel} value={street} setValue={setStreet} disabled />
                <Input label={cityLabel} value={city} setValue={setCity} disabled />
            </div>

            <Button
                variant="secondary"
                label={submitLabel}
                iconRight="caret-right"
                iconRightVariant="outline"
                onClick={handleSubmit}
                className="justify-center"
            />
        </div>
    );
};

export default SubscriptionPersonalForm;