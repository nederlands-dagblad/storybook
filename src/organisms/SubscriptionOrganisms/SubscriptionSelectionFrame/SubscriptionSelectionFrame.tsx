import React, { useState } from 'react';
import PageHeading from '../../../atoms/displayAtoms/PageHeading/PageHeading';
import ProgressStepper, { Step } from '../../../molecules/navigationMolecules/ProgressStepper/ProgressStepper';
import SubscriptionCard, { SubscriptionCardProps } from '../../../molecules/subscriptionMolecules/SubscriptionCard/SubscriptionCard';
import Icon from '../../../atoms/basicAtoms/Icon/Icon';
import IconText from '../../../atoms/basicAtoms/IconText/IconText';
import Logo from '../../../atoms/basicAtoms/Logo/Logo';

export interface SubscriptionBenefit {
    label: string;
    hasInfo?: boolean;
    onInfoClick?: () => void;
}

export interface SubscriptionSelectionFrameProps {
    heading?: string;
    benefits?: SubscriptionBenefit[];
    steps?: Step[];
    currentStep?: number;
    cards: SubscriptionCardProps[];
    footerText?: string;
    footerLinkLabel?: string;
    footerLinkHref?: string;
}

const SubscriptionSelectionFrame: React.FC<SubscriptionSelectionFrameProps> = ({
    heading = 'Word lid van het Nederlands Dagblad',
    benefits = [],
    steps = [],
    currentStep = 1,
    cards,
    footerText,
    footerLinkLabel,
    footerLinkHref,
}) => {
    const defaultActive = cards.findIndex(c => c.isFeatured) ?? 0;
    const [activeIndex, setActiveIndex] = useState(defaultActive >= 0 ? defaultActive : 0);

    const formatPrice = (price: number) => `€${price.toFixed(2).replace('.', ',')}`;

    return (
        <div className="relative flex flex-col min-h-screen bg-background-default">
            <div className="absolute inset-x-0 top-0 h-[75%] bg-background-gray z-0" />
            {/* Vertical bracket lines — hidden on mobile */}
            <div className="hidden lg:block absolute left-[7.5%] top-xl h-[69.2%] w-[1px] bg-border-gray z-10" />
            <div className="hidden lg:block absolute right-[7.5%] top-xl h-[69.2%] w-[1px] bg-border-gray z-10" />

            {/* Header + Cards */}
            <div className="relative z-10 w-[85%] mx-auto mt-xl border-t border-border-gray flex flex-col items-center">
                {/* Header section */}
                <div className="relative w-full flex flex-col items-center pb-l">
                    {/* nd logo centered on the top border line */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-s bg-background-gray">
                        <a href="https://www.nd.nl/">
                            <Logo size="small" />
                        </a>
                    </div>

                    {/* Heading */}
                    <div className="mt-xl text-center">
                        <PageHeading title={heading} />
                    </div>

                    {/* Benefits */}
                    {benefits.length > 0 && (
                        <ul className="flex flex-col items-center lg:flex-row lg:flex-wrap lg:justify-center gap-s lg:gap-l mt-m">
                            {benefits.map((benefit, index) => (
                                <li key={index} className="flex items-center gap-xs w-max">
                                    <IconText
                                        icon="check"
                                        text={benefit.label}
                                        iconColor="brand"
                                        textWeight="light"
                                    />
                                    {benefit.hasInfo && (
                                        <button
                                            type="button"
                                            onClick={benefit.onInfoClick}
                                            className="flex-shrink-0"
                                        >
                                            <Icon name="info" variant="outline" size="s" color="default" />
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Progress stepper */}
                    {steps.length > 0 && (
                        <div className="w-full max-w-xl mt-xl">
                            <ProgressStepper steps={steps} currentStep={currentStep} />
                        </div>
                    )}
                </div>

                {/* Mobile: tabs + active card */}
                <div className="lg:hidden w-full">
                    {/* Tabs */}
                    <div className="flex items-start w-full gap-xs">
                        {cards.map((card, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setActiveIndex(index)}
                                className={`bg-background-default flex-1 flex flex-col items-center justify-start overflow-hidden border text-center transition-colors ${
                                    activeIndex === index
                                        ? 'border-border-brand border-b-0 z-10 h-[109px]'
                                        : 'border-border-gray-subtle h-[100px] mb-xs'
                                }`}
                            >
                                {card.isFeatured && (
                                    <span className="w-full text-center bg-background-brand-subtle text-text-brand py-[2px] font-fira-sans font-bold text-[10px] tracking-[1px] uppercase">
                                        MEEST GEKOZEN
                                    </span>
                                )}
                                <div className={`flex flex-col items-center justify-start pb-xs px-xs ${card.isFeatured ? 'pt-xs' : 'pt-s'}`}>
                                    <span className="text-body-bold text-text-default">{card.title}</span>
                                    <span className="text-meta-light text-text-default">{formatPrice(card.pricePerWeek)}/week</span>
                                </div>
                            </button>
                        ))}
                    </div>
                    {/* Active card content */}
                    <div className="border border-border-brand -mt-px">
                        <SubscriptionCard {...cards[activeIndex]} showTitle={false} ctaLabel={`Kies ${cards[activeIndex].title}`} borderColor="none" />
                    </div>
                </div>

                {/* Desktop: all cards side by side */}
                <div className="hidden lg:flex -mx-l w-max flex-row items-end justify-center gap-l">
                    {cards.map((card, index) => (
                        <div key={index} className={`w-full lg:max-w-xs ${index !== 1 ? 'lg:pt-l' : ''}`}>
                            <SubscriptionCard {...card} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            {(footerText || footerLinkLabel) && (
                <div className="relative z-10 flex flex-col items-center gap-xs text-center mt-xl pb-xl">
                    {footerText && (
                        <p className="text-meta-light text-text-default">{footerText}</p>
                    )}
                    {footerLinkLabel && footerLinkHref && (
                        <a
                            href={footerLinkHref}
                            className="text-meta-light text-text-default !underline"
                        >
                            {footerLinkLabel}
                        </a>
                    )}
                </div>
            )}
        </div>
    );
};

export default SubscriptionSelectionFrame;
