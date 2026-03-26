import React, { useState } from 'react';
import Alert from '../../../molecules/feedbackMolecules/Alert/Alert';
import Input from '../../../molecules/formMolecules/Input/Input';
import Button from '../../../atoms/actionAtoms/Button/Button';

export interface PersonalFormData {
    firstName: string;
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

    // Personal details
    firstNameLabel?: string;
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

const SubscriptionPersonalForm: React.FC<SubscriptionPersonalFormProps> = ({
    alertText,
    firstNameLabel = 'Voornaam*',
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
    const [firstName, setFirstName] = useState('');
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

    const errors = {
        firstName: !firstName.trim() ? ['Dit veld is verplicht'] : null,
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
        onSubmit?.({ firstName, middleName, lastName, email, phone, postcode, houseNumber, addition, street, city });
    };

    return (
        <div className="bg-background-default shadow-m p-m lg:p-l flex flex-col gap-l">
            <h2 className="text-heading-2 text-text-default">Persoonlijke gegevens</h2>

            {alertText && (
                <Alert variant="info">{alertText}</Alert>
            )}

            {/* Personal details */}
            <div className="flex flex-col gap-m">
                {/* Voornaam + Tussenvoegsel */}
                <div className="grid grid-cols-2 gap-s items-start">
                    <Input label={firstNameLabel} value={firstName} setValue={setFirstName} errors={submitted ? errors.firstName : null} />
                    <Input label={middleNameLabel} value={middleName} setValue={setMiddleName} />
                </div>

                <Input label={lastNameLabel} value={lastName} setValue={setLastName} errors={submitted ? errors.lastName : null} />
                <Input label={emailLabel} value={email} setValue={setEmail} type="email" errors={submitted ? errors.email : null} />
                <Input label={phoneLabel} value={phone} setValue={setPhone} type="tel" errors={submitted ? errors.phone : null} />
            </div>

            {/* Address */}
            <div className="flex flex-col gap-m">
                <h2 className="text-heading-2 text-text-default">{addressHeading}</h2>
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
