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
            {/* Mobile layout */}
            <div className="md:hidden">
                <div
                    className="relative w-full aspect-[3/4] bg-cover bg-center"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                >
                    <div
                        className="absolute inset-x-0 h-2/5 pointer-events-none"
                        style={{ bottom: '-1px', background: 'linear-gradient(to bottom, color-mix(in srgb, var(--color-background-default) 0%, transparent) 0%, color-mix(in srgb, var(--color-background-default) 10%, transparent) 15%, color-mix(in srgb, var(--color-background-default) 50%, transparent) 50%, color-mix(in srgb, var(--color-background-default) 80%, transparent) 75%, var(--color-background-default) 100%)' }}
                    />
                </div>
                <div className="flex flex-col items-center text-center gap-s px-m pb-l -mt-16 relative z-10">
                    <h1 className="text-heading-xxl text-text-default">{heading}</h1>
                    {intro && <p className="text-body-regular text-text-default">{intro}</p>}
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

            {/* Desktop layout */}
            <div
                className="hidden md:flex relative w-full h-screen items-end bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="absolute inset-0 bg-background-dark opacity-40" />
                <div className="relative z-10 w-full flex justify-center px-l pb-[5vw]">
                    <div className="w-full max-w-5xl flex items-end justify-between gap-l">
                        <div className="max-w-md lg:max-w-2xl">
                            <h1 className="text-heading-xxl text-text-inverse mb-m">{heading}</h1>
                            {intro && <p className="text-body-regular text-text-inverse">{intro}</p>}
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
        </div>
    );
};

export default Hero;
