import React, { useState } from 'react';
import Logo from '../../../atoms/basicAtoms/Logo/Logo';
import ProgressStepper, { Step } from '../../../molecules/navigationMolecules/ProgressStepper/ProgressStepper';
import SubscriptionDurationForm, {
    SubscriptionDuration,
    OrderSummaryRow,
    DeliveryDay,
} from '../SubscriptionDurationForm/SubscriptionDurationForm';
import SubscriptionPersonalForm, { PersonalFormData } from '../SubscriptionPersonalForm/SubscriptionPersonalForm';
import SubscriptionPaymentForm, { PaymentMethod } from '../SubscriptionPaymentForm/SubscriptionPaymentForm';
import SubscriptionSummaryPanel from '../SubscriptionSummaryPanel/SubscriptionSummaryPanel';
import { SubscriptionFeature } from '@molecules/subscriptionMolecules/SubscriptionCard/SubscriptionCard.tsx';

export type { SubscriptionDuration, OrderSummaryRow, DeliveryDay, PersonalFormData, PaymentMethod };

export type SubscriptionStep = 'duration' | 'personal' | 'payment';

const formatDateLabel = (dateStr: string): string => {
    const parts = dateStr.split('/');
    if (parts.length !== 3) return dateStr;
    const [dd, mm, yyyy] = parts.map(Number);
    const selected = new Date(yyyy, mm - 1, dd);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    if (selected.getTime() === today.getTime()) return 'Vandaag';
    if (selected.getTime() === tomorrow.getTime()) return 'Morgen';
    return dateStr;
};

/**
 * Reads the anti-forgery token from the DOM at submission time.
 * Checks for a <meta name="csrf-token"> tag first (preferred),
 * then falls back to a standard ASP.NET hidden input.
 */
function getAntiForgeryToken(): string {
    const meta = document.querySelector('meta[name="csrf-token"]');
    if (meta) return meta.getAttribute('content') ?? '';

    const input = document.querySelector<HTMLInputElement>(
        'input[name="__RequestVerificationToken"]'
    );
    return input?.value ?? '';
}

export interface SubscriptionFormSubmitData {
    duration: string;
    startDate: string;
    deliveryDay?: string;
    personalData: PersonalFormData;
    paymentMethod: string;
    iban?: string;
}

export interface SubscriptionFormProps {
    // Header
    phoneNumber?: string;
    steps?: Step[];

    // Subscription info
    sectionHeading?: string;
    subscriptionTitle: string;
    subscriptionSubtitle?: string;
    subscriptionPricePerWeek: number;
    subscriptionOriginalPricePerWeek?: number;
    features?: SubscriptionFeature[];
    onChangeSubscription?: () => void;
    changeSubscriptionHref?: string;
    changeSubscriptionLabel?: string;

    // Duration step
    deliveryDayHeading?: string;
    deliveryDays?: DeliveryDay[];
    initialDeliveryDay?: string;
    durationHeading?: string;
    durations?: SubscriptionDuration[];
    initialDuration?: string;
    alertText?: string;
    startDate?: string;
    startDateLabel?: string;

    // Personal step
    personalAlertText?: React.ReactNode;
    personalAlertEmail?: string;

    // Payment step
    paymentHeading?: string;
    paymentMethods?: PaymentMethod[];
    initialPaymentMethod?: string;
    termsLabel?: React.ReactNode;
    paymentFooterText?: React.ReactNode;

    // Summary panel
    summaryHeading?: string;
    summaryFooterText?: string;

    // Payment step - terms links
    termsText?: string;
    privacyUrl?: string;
    actievoorwaardenUrl?: string;
    algemeneVoorwaardenUrl?: string;

    // Form submission props (from Razor)
    subscriptionTypeId?: string;
    signingKey?: string;
    formAction?: string;

    // Submit
    onComplete?: (data: SubscriptionFormSubmitData) => void;
}

const defaultSteps: Step[] = [
    { label: 'Kies je abonnement' },
    { label: 'Looptijd' },
    { label: 'Gegevens' },
    { label: 'Bestelling afronden' },
];

/**
 * Submits the subscription form as a standard POST to /signup/subscription/register.
 * Creates a hidden form with all required fields and submits it.
 */
function submitSubscriptionForm(
    data: SubscriptionFormSubmitData,
    subscriptionTypeId: string,
    signingKey: string,
    formAction: string,
) {
    const antiForgeryToken = getAntiForgeryToken();
    if (!antiForgeryToken) {
        console.error('Anti-forgery token not found in DOM');
        return;
    }

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = formAction;
    form.style.display = 'none';

    const addField = (name: string, value: string) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        form.appendChild(input);
    };

    // CSRF token
    addField('__RequestVerificationToken', antiForgeryToken);

    // Personal details
    addField('Custom.gender', '3'); // Default: Man / Vrouw
    addField('firstname', data.personalData.initials ?? '');
    addField('lastnameprefix', data.personalData.middleName ?? '');
    addField('lastname', data.personalData.lastName ?? '');
    addField('PostalCode', data.personalData.postcode ?? '');
    addField('HouseNumber', data.personalData.houseNumber ?? '');
    addField('HouseNumberSuffix', data.personalData.addition ?? '');
    addField('EmailAddress', data.personalData.email ?? '');
    addField('Phonenumber', data.personalData.phone ?? '');

    // Start date (split dd/MM/yyyy into separate fields)
    const dateParts = data.startDate.split('/');
    if (dateParts.length === 3) {
        addField('startDateDay', dateParts[0]);
        addField('startDateMonth', dateParts[1]);
        addField('startDateYear', dateParts[2]);
    }

    // Payment
    if (data.iban) {
        addField('Iban', data.iban);
    }
    addField('terms', 'true');

    // Sub-offer selection (the selected duration is the SubscriptionTypeId of the sub-offer)
    addField('suboffer_subscription_type_id', data.duration);

    // Hidden fields from Pubble
    addField('SubscriptionTypeId', subscriptionTypeId);
    addField('SigningKey', signingKey);

    // Honeypot fields (must be empty)
    addField('website', '');
    addField('description', '');

    document.body.appendChild(form);
    form.submit();
}

export const SubscriptionForm: React.FC<SubscriptionFormProps> = ({
                                                                      phoneNumber,
                                                                      steps = defaultSteps,
                                                                      sectionHeading,
                                                                      subscriptionTitle,
                                                                      subscriptionSubtitle,
                                                                      subscriptionPricePerWeek,
                                                                      subscriptionOriginalPricePerWeek,
                                                                      features,
                                                                      onChangeSubscription,
                                                                      changeSubscriptionHref,
                                                                      changeSubscriptionLabel,
                                                                      deliveryDayHeading,
                                                                      deliveryDays = [],
                                                                      initialDeliveryDay,
                                                                      durationHeading,
                                                                      durations = [],
                                                                      initialDuration,
                                                                      alertText,
                                                                      startDate,
                                                                      startDateLabel,
                                                                      personalAlertText,
                                                                      personalAlertEmail,
                                                                      paymentHeading,
                                                                      paymentMethods = [],
                                                                      initialPaymentMethod,
                                                                      termsLabel,
                                                                      paymentFooterText = 'U ontvangt een bevestiging per e-mail. U hebt een bedenktijd van 14 dagen.',
                                                                      summaryHeading,
                                                                      summaryFooterText,
                                                                      onComplete,
                                                                      termsText,
                                                                      privacyUrl,
                                                                      actievoorwaardenUrl,
                                                                      algemeneVoorwaardenUrl,
                                                                      subscriptionTypeId,
                                                                      signingKey,
                                                                      formAction = '/signup/subscription/register',
                                                                  }) => {
    const handleChangeSubscription = onChangeSubscription
        ?? (changeSubscriptionHref
            ? () => { window.location.href = changeSubscriptionHref; }
            : () => { window.history.back(); });
    const [step, setStep] = useState<SubscriptionStep>('duration');
    const [selectedDeliveryDay, setSelectedDeliveryDay] = useState(initialDeliveryDay ?? deliveryDays[0]?.value);
    const [selectedDuration, setSelectedDuration] = useState(initialDuration ?? durations[0]?.value);
    const [selectedStartDate, setSelectedStartDate] = useState(startDate ?? '');
    const [personalData, setPersonalData] = useState<PersonalFormData | null>(null);

    // Filter durations by selected delivery day (for paper subscriptions)
    const filteredDurations = deliveryDays.length > 0 && selectedDeliveryDay
        ? durations.filter(d => d.group === selectedDeliveryDay || d.group === '')
        : durations;

    // Auto-select first duration when delivery day changes
    const handleDeliveryDayChange = (value: string) => {
        setSelectedDeliveryDay(value);
        const newFiltered = durations.filter(d => d.group === value || d.group === '');
        if (newFiltered.length > 0 && !newFiltered.find(d => d.value === selectedDuration)) {
            setSelectedDuration(newFiltered[0].value);
        }
    };

    const currentStep = step === 'duration' ? 2 : step === 'personal' ? 3 : 4;

    const resolvedSteps = steps.map((s, i) => {
        if (i === 1 && (step === 'personal' || step === 'payment')) {
            return { ...s, onClick: () => setStep('duration') };
        }
        if (i === 2 && step === 'payment') {
            return { ...s, onClick: () => setStep('personal') };
        }
        return s;
    });

    const activeDeliveryDay = deliveryDays.find(d => d.value === selectedDeliveryDay);
    const activeDurationObj = filteredDurations.find(d => d.value === selectedDuration);

    // Use selected duration's price if available, otherwise fall back to main subscription price
    const activePrice = activeDurationObj?.price ?? subscriptionPricePerWeek;
    const activeOriginalPrice = activeDurationObj?.originalPrice ?? subscriptionOriginalPricePerWeek;

    const totalPrice = activeDeliveryDay?.price
        ?? `€${activePrice.toFixed(2).replace('.', ',')} per week`;

    const summaryRows: OrderSummaryRow[] = [
        { label: 'Actieperiode', value: activeDurationObj?.period ?? '' },
        { label: 'Ingangsdatum', value: formatDateLabel(selectedStartDate) },
        {
            label: 'Totaal',
            value: totalPrice,
            originalValue: activeOriginalPrice
                ? `€${activeOriginalPrice.toFixed(2).replace('.', ',')} per week`
                : undefined,
            isDivider: true,
        },
    ];

    const handlePersonalSubmit = (data: PersonalFormData) => {
        setPersonalData(data);
        setStep('payment');
    };

    const handlePaymentSubmit = (paymentMethod: string, iban?: string) => {
        const submitData: SubscriptionFormSubmitData = {
            duration: selectedDuration,
            startDate: selectedStartDate,
            deliveryDay: selectedDeliveryDay,
            personalData: personalData!,
            paymentMethod,
            iban,
        };

        // Call onComplete callback if provided
        onComplete?.(submitData);

        // Submit the form to the server if submission props are available
        if (subscriptionTypeId && signingKey) {
            submitSubscriptionForm(
                submitData,
                subscriptionTypeId,
                signingKey,
                formAction,
            );
        }
    };

    const summaryPanelProps = {
        heading: summaryHeading,
        subscriptionTitle,
        subscriptionSubtitle,
        features,
        onChangeSubscription: handleChangeSubscription,
        changeSubscriptionLabel,
        rows: summaryRows,
        footerText: summaryFooterText,
        onChangePersonal: () => setStep('personal'),
        deliveryDayLabel: activeDeliveryDay?.label,
    };

    return (
        <div className="min-h-screen bg-background-gray">
            {/* Header */}
            <div className="flex flex-col items-center pt-l pb-xl gap-s px-l">
                {phoneNumber && (
                    <p className="text-meta-light text-text-default">
                        Vragen? Bel {phoneNumber}
                    </p>
                )}
                <a href="https://www.nd.nl/" className="block w-full max-w-[503px] self-center">
                    <Logo size="full" className="w-full" />
                </a>
                {resolvedSteps.length > 0 && (
                    <div className="w-full max-w-2xl mt-m">
                        <ProgressStepper steps={resolvedSteps} currentStep={currentStep} />
                    </div>
                )}
            </div>

            {/* Two-column layout */}
            <div className="w-full max-w-5xl mx-auto pb-xl lg:grid lg:grid-cols-[3fr_2fr] lg:gap-l lg:items-start">
                <SubscriptionSummaryPanel
                    {...summaryPanelProps}
                    className="lg:order-2 mb-l lg:mb-0"
                    personalData={step === 'payment' ? (personalData ?? undefined) : undefined}
                />

                <div className="lg:order-1">
                    {step === 'duration' && (
                        <SubscriptionDurationForm
                            sectionHeading={sectionHeading}
                            subscriptionTitle={subscriptionTitle}
                            subscriptionSubtitle={subscriptionSubtitle}
                            subscriptionPricePerWeek={subscriptionPricePerWeek}
                            subscriptionOriginalPricePerWeek={subscriptionOriginalPricePerWeek}
                            features={features}
                            onChangeSubscription={handleChangeSubscription}
                            changeSubscriptionLabel={changeSubscriptionLabel}
                            deliveryDayHeading={deliveryDayHeading}
                            deliveryDays={deliveryDays}
                            selectedDeliveryDay={selectedDeliveryDay}
                            onDeliveryDayChange={handleDeliveryDayChange}
                            durationHeading={durationHeading}
                            durations={filteredDurations}
                            selectedDuration={selectedDuration}
                            onDurationChange={setSelectedDuration}
                            alertText={alertText}
                            startDateLabel={startDateLabel}
                            startDate={selectedStartDate}
                            onStartDateChange={setSelectedStartDate}
                            submitLabel="Vul je gegevens in"
                            onSubmit={() => setStep('personal')}
                        />
                    )}

                    {step === 'personal' && (
                        <SubscriptionPersonalForm
                            alertText={personalAlertText}
                            alertEmail={personalAlertEmail}
                            submitLabel="Naar betaaloverzicht"
                            onSubmit={handlePersonalSubmit}
                            initialData={personalData ?? undefined}
                        />
                    )}

                    {step === 'payment' && (
                        <SubscriptionPaymentForm
                            summaryContent={
                                <div className="lg:hidden">
                                    <SubscriptionSummaryPanel
                                        {...summaryPanelProps}
                                        inline
                                        personalData={personalData ?? undefined}
                                    />
                                </div>
                            }
                            paymentHeading={paymentHeading}
                            paymentMethods={paymentMethods}
                            initialPaymentMethod={initialPaymentMethod}
                            termsLabel={termsLabel}
                            submitLabel="Bevestigen"
                            footerText={paymentFooterText}
                            onSubmit={handlePaymentSubmit}
                            termsText={termsText}
                            privacyUrl={privacyUrl}
                            actievoorwaardenUrl={actievoorwaardenUrl}
                            algemeneVoorwaardenUrl={algemeneVoorwaardenUrl}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubscriptionForm;