import React, { useEffect, useState } from 'react';
import Button from '@atoms/actionAtoms/Button/Button.tsx';
import Logo from "@atoms/basicAtoms/Logo/Logo.tsx";

export interface AlternativeNavProps {
    /** Show transparent background over a hero image — becomes white on scroll */
    transparent?: boolean;
    /** Force scrolled appearance without needing to scroll — useful for Storybook */
    forceScrolled?: boolean;
}

export const AlternativeNav: React.FC<AlternativeNavProps> = ({
    transparent = false,
    forceScrolled = false,
}) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isWhite = !transparent || isScrolled || forceScrolled;

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-m py-xs transition-all duration-300 ${isWhite ? 'bg-background-default shadow-s' : 'bg-transparent'}`}>
            <div className="w-full max-w-7xl flex items-center justify-between">
                <a href="https://www.nd.nl" className="flex items-center">
                    <Logo
                        variant="default"
                        size="small"
                        className={`md:hidden ${isWhite ? 'text-text-default' : 'text-white'}`}
                    />
                    <Logo
                        variant="default"
                        size="full"
                        className={`hidden md:block w-60 ${isWhite ? 'text-text-default' : 'text-white'}`}
                    />
                </a>

                <div className="flex items-center gap-xs">
                    <Button
                        variant="ghost"
                        iconLeft={null}
                        label="Contact"
                        href="https://www.nd.nl/service/contact"
                        className={!isWhite ? '!text-text-inverse hover:!text-text-inverse' : ''}
                    />
                    <Button
                        variant="secondary"
                        iconLeft={null}
                        label="Abonnementen"
                        href="https://www.nd.nl/abonnement"
                        className={!isWhite ? '!text-text-inverse !border-white !bg-transparent hover:!bg-white/10' : ''}
                    />
                </div>
            </div>
        </nav>
    );
};

export default AlternativeNav;
