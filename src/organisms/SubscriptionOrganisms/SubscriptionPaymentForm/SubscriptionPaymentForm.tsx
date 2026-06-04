import React, { useState } from 'react';
import RadioButton from '../../../molecules/formMolecules/RadioButton/RadioButton';
import { CheckBox } from '../../../molecules/formMolecules/CheckBox/CheckBox';
import Input from '../../../molecules/formMolecules/Input/Input';
import Button from '../../../atoms/actionAtoms/Button/Button';

export interface PaymentMethod {
    label: string;
    value: string;
    description?: string;
    logoUrl?: string;
    requiresIban?: boolean;
}

export interface SubscriptionPaymentFormProps {
    summaryContent?: React.ReactNode;
    paymentHeading?: string;
    paymentMethods?: PaymentMethod[];
    initialPaymentMethod?: string;
    ibanLabel?: string;
    ibanPlaceholder?: string;
    termsLabel?: React.ReactNode;
    submitLabel?: string;
    onSubmit?: (paymentMethod: string, iban?: string) => void;
    footerText?: React.ReactNode;

    // Terms links (alternative to termsLabel for server-side rendering)
    termsText?: string;
    privacyUrl?: string;
    privacyLabel?: string;
    actievoorwaardenUrl?: string;
    actievoorwaardenLabel?: string;
    algemeneVoorwaardenUrl?: string;
    algemeneVoorwaardenLabel?: string;
}

// --- IBAN Validation ---

/** Country-specific IBAN lengths (ISO 13616) */
const IBAN_LENGTHS: Record<string, number> = {
    AL: 28, AD: 24, AT: 20, AZ: 28, BH: 22, BY: 28, BE: 16, BA: 20,
    BR: 29, BG: 22, CR: 22, HR: 21, CY: 28, CZ: 24, DK: 18, DO: 28,
    TL: 23, EE: 20, FO: 18, FI: 18, FR: 27, GE: 22, DE: 22, GI: 23,
    GR: 27, GL: 18, GT: 28, HU: 28, IS: 26, IQ: 23, IE: 22, IL: 23,
    IT: 27, JO: 30, KZ: 20, XK: 20, KW: 30, LV: 21, LB: 28, LI: 21,
    LT: 20, LU: 20, MK: 19, MT: 31, MR: 27, MU: 30, MC: 27, MD: 24,
    ME: 22, NL: 18, NO: 15, PK: 24, PS: 29, PL: 28, PT: 25, QA: 29,
    RO: 24, SM: 27, SA: 24, RS: 22, SC: 31, SK: 24, SI: 19, ES: 24,
    SE: 24, CH: 21, TN: 24, TR: 26, UA: 29, AE: 23, GB: 22, VG: 24,
};

/**
 * Strips spaces and converts to uppercase.
 */
function cleanIban(value: string): string {
    return value.replace(/\s+/g, '').toUpperCase();
}

/**
 * MOD-97 checksum validation (ISO 7064).
 * Rearranges the IBAN (moves first 4 chars to end),
 * converts letters to numbers (A=10, B=11, ..., Z=35),
 * then checks remainder mod 97 === 1.
 */
function mod97(iban: string): number {
    // Move first 4 characters to the end
    const rearranged = iban.slice(4) + iban.slice(0, 4);

    // Convert letters to numbers
    const numericString = rearranged
        .split('')
        .map((char) => {
            const code = char.charCodeAt(0);
            // A-Z → 10-35
            if (code >= 65 && code <= 90) return (code - 55).toString();
            return char;
        })
        .join('');

    // Calculate mod 97 on the large number (process in chunks to avoid overflow)
    let remainder = 0;
    for (let i = 0; i < numericString.length; i++) {
        remainder = (remainder * 10 + parseInt(numericString[i], 10)) % 97;
    }

    return remainder;
}

/**
 * Validates an IBAN and returns an error message or null if valid.
 */
function validateIban(value: string): string | null {
    const cleaned = cleanIban(value);

    // Required
    if (!cleaned) {
        return 'Dit veld is verplicht';
    }

    // Must start with 2-letter country code + 2 digits
    if (!/^[A-Z]{2}\d{2}/.test(cleaned)) {
        return 'Voer een geldig IBAN in (bijv. NL12 BANK 3456 7890 12)';
    }

    // Rest must be alphanumeric
    if (!/^[A-Z]{2}\d{2}[A-Z0-9]+$/.test(cleaned)) {
        return 'IBAN mag alleen letters en cijfers bevatten';
    }

    // Check country-specific length
    const countryCode = cleaned.slice(0, 2);
    const expectedLength = IBAN_LENGTHS[countryCode];

    if (expectedLength && cleaned.length !== expectedLength) {
        return `Een ${countryCode} IBAN moet ${expectedLength} tekens lang zijn`;
    }

    // General length bounds for unknown countries
    if (!expectedLength && (cleaned.length < 15 || cleaned.length > 34)) {
        return 'Voer een geldig IBAN in';
    }

    // MOD-97 checksum
    if (mod97(cleaned) !== 1) {
        return 'Dit IBAN-nummer is niet geldig. Controleer de ingevoerde gegevens.';
    }

    return null;
}

/**
 * Formats an IBAN with spaces every 4 characters for display.
 */
function formatIbanDisplay(value: string): string {
    const cleaned = cleanIban(value);
    return cleaned.replace(/(.{4})/g, '$1 ').trim();
}

// --- Component ---

export const SubscriptionPaymentForm: React.FC<SubscriptionPaymentFormProps> = ({
                                                                                    summaryContent,
                                                                                    paymentHeading = 'Betaalmethode',
                                                                                    paymentMethods = [],
                                                                                    initialPaymentMethod,
                                                                                    ibanLabel = 'IBAN',
                                                                                    ibanPlaceholder = 'NL12 BANK 3456 7890 12',
                                                                                    termsLabel,
                                                                                    submitLabel = 'Bevestigen',
                                                                                    onSubmit,
                                                                                    footerText,
                                                                                    termsText,
                                                                                    privacyUrl,
                                                                                    privacyLabel,
                                                                                    actievoorwaardenUrl,
                                                                                    actievoorwaardenLabel,
                                                                                    algemeneVoorwaardenUrl,
                                                                                    algemeneVoorwaardenLabel,
                                                                                }) => {
    const [selectedMethod, setSelectedMethod] = useState(initialPaymentMethod ?? paymentMethods[0]?.value ?? '');
    const [iban, setIban] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const selectedMethodDef = paymentMethods.find(m => m.value === selectedMethod);
    const showIban = !!selectedMethodDef?.requiresIban;

    // Validate IBAN only when form has been submitted
    const ibanValidationError = showIban ? validateIban(iban) : null;
    const ibanErrors = submitted && ibanValidationError ? [ibanValidationError] : null;

    const handleIbanChange = (value: string) => {
        // Format with spaces as user types
        setIban(formatIbanDisplay(value));
    };

    const handleSubmit = () => {
        setSubmitted(true);

        if (showIban && ibanValidationError) {
            return;
        }

        // Pass the cleaned IBAN (no spaces) to the submit handler
        onSubmit?.(selectedMethod, showIban ? cleanIban(iban) : undefined);
    };

    return (
        <div className="flex flex-col gap-l">
            <div className="bg-background-default shadow-m p-m lg:p-l flex flex-col gap-m">
                {summaryContent && (
                    <>
                        {summaryContent}
                        <div className="border-t border-border-gray" />
                    </>
                )}

                <h2 className="text-heading-m text-text-default">{paymentHeading}</h2>

                {paymentMethods.length > 0 && (
                    <div className="flex flex-col gap-s">
                        {paymentMethods.map((method) => (
                            <RadioButton
                                key={method.value}
                                variant="card"
                                layout="horizontal"
                                heading={method.label}
                                label={method.description}
                                logoUrl={method.logoUrl}
                                name="paymentMethod"
                                value={method.value}
                                checked={selectedMethod === method.value}
                                onChange={() => setSelectedMethod(method.value)}
                            />
                        ))}
                    </div>
                )}

                {showIban && (
                    <Input
                        label={ibanLabel}
                        value={iban}
                        setValue={handleIbanChange}
                        placeholder={ibanPlaceholder}
                        errors={ibanErrors}
                    />
                )}

                {(termsLabel || termsText) && (
                    <CheckBox
                        label={termsLabel ?? (
                            <>
                                {termsText}{' '}
                                {privacyUrl && <a href={privacyUrl} target="_blank" className="!underline">{privacyLabel ?? 'privacyverklaring'}</a>},{' '}
                                {actievoorwaardenUrl && <a href={actievoorwaardenUrl} target="_blank" className="!underline">{actievoorwaardenLabel ?? 'de actievoorwaarden'}</a>}{' '}
                                en{' '}
                                {algemeneVoorwaardenUrl && <a href={algemeneVoorwaardenUrl} target="_blank" className="!underline">{algemeneVoorwaardenLabel ?? 'algemene voorwaarden'}</a>}.
                            </>
                        )}
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted((e.target as HTMLInputElement).checked)}
                    />
                )}

                <Button
                    variant="primary"
                    label={submitLabel}
                    onClick={handleSubmit}
                    className="justify-center"
                    disabled={(!!termsLabel || !!termsText) && !termsAccepted}
                />
            </div>

            {footerText && (
                <p className="text-meta-light text-text-default text-center px-m pb-m">{footerText}</p>
            )}
        </div>
    );
};

export default SubscriptionPaymentForm;