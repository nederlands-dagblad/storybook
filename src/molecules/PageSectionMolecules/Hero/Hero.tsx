import React from 'react';
import Button from '@atoms/actionAtoms/Button/Button.tsx';

export interface HeroProps {
    backgroundImage: string;
    heading: string;
    intro?: string;
    ctaLabel?: string;
    ctaHref?: string;
    onCtaClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({
    backgroundImage,
    heading,
    intro,
    ctaLabel,
    ctaHref,
    onCtaClick,
}) => {
    return (
        <div className="w-full">
            {/* Image */}
            <div
                className="relative w-full h-screen md:flex md:items-end bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                {/* Mobile: fade to background-default */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background-default md:hidden" />

                {/* Tablet/Desktop: dark overlay + content */}
                <div className="hidden md:block absolute inset-0 bg-background-dark opacity-40" />

                <div className="hidden md:flex relative z-10 w-full justify-center p-l">
                    <div className="w-full max-w-5xl flex items-end justify-between gap-l">
                        <div className="max-w-md lg:max-w-2xl">
                            <h1 className="text-heading-xxl text-text-inverse mb-m">{heading}</h1>
                            {intro && (
                                <p className="text-body-regular text-text-inverse">{intro}</p>
                            )}
                        </div>

                        {ctaLabel && (
                            <div className="shrink-0">
                                <Button
                                    variant="primary"
                                    size="large"
                                    iconLeft={null}
                                    iconRight="caret-right"
                                    label={ctaLabel}
                                    href={ctaHref}
                                    onClick={onCtaClick}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile: content below image */}
            <div className="md:hidden bg-background-default flex flex-col items-center text-center gap-s p-l">
                <h1 className="text-heading-xxl text-text-default">{heading}</h1>
                {intro && (
                    <p className="text-body-regular text-text-default">{intro}</p>
                )}
                {ctaLabel && (
                    <div className="mt-m">
                        <Button
                            variant="primary"
                            size="large"
                            iconLeft={null}
                            iconRight="caret-right"
                            label={ctaLabel}
                            href={ctaHref}
                            onClick={onCtaClick}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Hero;
