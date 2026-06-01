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

    // Payment step
    paymentHeading?: string;
    paymentMethods?: PaymentMethod[];
    initialPaymentMethod?: string;
    termsLabel?: React.ReactNode;
    paymentFooterText?: React.ReactNode;

    // Summary panel
    summaryHeading?: string;
    summaryFooterText?: string;

    // Payment step
    termsText?: string;
    privacyUrl?: string;
    actievoorwaardenUrl?: string;
    algemeneVoorwaardenUrl?: string;

    // Submit
    onComplete?: (data: { duration: string; startDate: string; deliveryDay?: string; personalData: PersonalFormData; paymentMethod: string }) => void;
}

const defaultSteps: Step[] = [
    { label: 'Kies je abonnement' },
    { label: 'Looptijd' },
    { label: 'Gegevens' },
    { label: 'Bestelling afronden' },
];

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
                                                                      paymentHeading,
                                                                      paymentMethods = [],
                                                                      initialPaymentMethod,
                                                                      termsLabel,
                                                                      paymentFooterText,
                                                                      summaryHeading,
                                                                      summaryFooterText,
                                                                      onComplete,
                                                                      termsText,
                                                                      privacyUrl,
                                                                      actievoorwaardenUrl,
                                                                      algemeneVoorwaardenUrl,
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
                            submitLabel="Naar betaaloverzicht"
                            onSubmit={handlePersonalSubmit}
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
                            onSubmit={(paymentMethod) => onComplete?.({
                                duration: selectedDuration,
                                startDate: selectedStartDate,
                                deliveryDay: selectedDeliveryDay,
                                personalData: personalData!,
                                paymentMethod,
                            })}
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