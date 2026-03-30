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
    termsLabel?: React.ReactNode;
    submitLabel?: string;
    onSubmit?: (paymentMethod: string, iban?: string) => void;
    footerText?: React.ReactNode;
}

const SubscriptionPaymentForm: React.FC<SubscriptionPaymentFormProps> = ({
    summaryContent,
    paymentHeading = 'Betaalmethode',
    paymentMethods = [],
    initialPaymentMethod,
    ibanLabel = 'IBAN',
    termsLabel,
    submitLabel = 'Bevestigen',
    onSubmit,
    footerText,
}) => {
    const [selectedMethod, setSelectedMethod] = useState(initialPaymentMethod ?? paymentMethods[0]?.value ?? '');
    const [iban, setIban] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const selectedMethodDef = paymentMethods.find(m => m.value === selectedMethod);
    const showIban = !!selectedMethodDef?.requiresIban;
    const ibanError = showIban && !iban.trim() ? ['Dit veld is verplicht'] : null;

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
                        setValue={setIban}
                        errors={submitted ? ibanError : null}
                    />
                )}

                {termsLabel && (
                    <CheckBox
                        label={termsLabel}
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted((e.target as HTMLInputElement).checked)}
                    />
                )}

                <Button
                    variant="primary"
                    label={submitLabel}
                    onClick={() => {
                        setSubmitted(true);
                        if (!ibanError) onSubmit?.(selectedMethod, showIban ? iban : undefined);
                    }}
                    className="justify-center"
                    disabled={!!termsLabel && !termsAccepted}
                />
            </div>

            {footerText && (
                <p className="text-meta-light text-text-default text-center px-m pb-m">{footerText}</p>
            )}
        </div>
    );
};

export default SubscriptionPaymentForm;
