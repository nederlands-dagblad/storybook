import React, { useEffect, useState } from 'react';
import Button from '@atoms/actionAtoms/Button/Button.tsx';
import Icon from '@atoms/basicAtoms/Icon/Icon.tsx';
import Logo from "@atoms/basicAtoms/Logo/Logo.tsx";

export interface AlternativeNavProps {
    contactLabel?: string;
    contactHref?: string;
    ctaLabel?: string;
    ctaHref?: string;
    onCtaClick?: () => void;
    /** Force scrolled appearance without needing to scroll — useful for Storybook */
    forceScrolled?: boolean;
}

export const AlternativeNav: React.FC<AlternativeNavProps> = ({
    contactLabel = 'Contact',
    contactHref,
    ctaLabel = 'Abonnementen',
    ctaHref,
    onCtaClick,
    forceScrolled = false,
}) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-m py-s transition-colors duration-300 ${isScrolled || forceScrolled ? 'bg-background-default' : 'bg-transparent'}`}>
            <Logo
                variant="default"
                size="small"
                className={isScrolled || forceScrolled ? 'text-text-default' : 'text-white'}
            />

            <div className="flex items-center gap-xs">
                <Button
                    variant="ghost"
                    iconLeft={null}
                    label={contactLabel}
                    href={contactHref}
                    className={!isScrolled && !forceScrolled ? '!text-text-inverse hover:!text-text-inverse' : ''}
                />
                <Button
                    variant="secondary"
                    iconLeft={null}
                    label={ctaLabel}
                    href={ctaHref}
                    onClick={onCtaClick}
                    className={!isScrolled && !forceScrolled ? '!text-text-inverse !border-white !bg-transparent hover:!bg-white/10' : ''}
                />
            </div>
        </nav>
    );
};

export default AlternativeNav;
