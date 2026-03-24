import React from 'react';
import AlternativeNav from '@molecules/navigationMolecules/AlternativeNav/AlternativeNav';
import Hero from '@molecules/PageSectionMolecules/Hero/Hero';
import { AccordionItem } from '@molecules/contentOrganizationMolecules/Accordion/accordion';

export interface ZakelijkAbonnementPageProps {
    heroImage?: string;
}

const ZakelijkAbonnementPage: React.FC<ZakelijkAbonnementPageProps> = ({
    heroImage = 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600',
}) => {
    return (
        <div className="w-full">
            <AlternativeNav
                contactLabel="Contact"
                ctaLabel="Abonnementen"
            />

            <Hero
                backgroundImage={heroImage}
                heading="Zakelijk abonnement bij het ND"
                intro="Geef je organisatie meer dan alleen nieuws – geef ze inzicht, inspiratie en een herkenbaar perspectief. Met ons zakelijk abonnement krijgt je organisatie toegang tot journalistiek die dieper graaft, raakt en verbindt."
                ctaLabel="Direct aanvragen"
                ctaHref="#aanvragen"
            />

            {/* TODO: "Waarom een zakelijk abonnement?" section */}

            {/* TODO: Subscription comparison table */}

            {/* TODO: "Eenvoudig beheer in één overzicht" feature section */}

            {/* FAQ */}
            <div className="w-full flex justify-center px-l py-xl">
                <div className="w-full max-w-5xl flex flex-col gap-s">
                    <h2 className="text-heading-l text-text-default">Veelgestelde vragen</h2>
                    <AccordionItem label="Hoeveel medewerkers kunnen gebruik maken van een zakelijk abonnement?" content="Met een zakelijk abonnement kun je meerdere medewerkers toegang geven. Vanaf 3 licenties kun je individuele accounts beheren via ons beheerpaneel." />
                    <AccordionItem label="Kan ik het abonnement op elk moment opzeggen?" content="Ja, je kunt het zakelijk abonnement per maand opzeggen na de minimale contractperiode." />
                    <AccordionItem label="Wat is het verschil tussen Digitaal basis en Digitaal plus?" content="Digitaal basis geeft toegang tot alle ND-artikelen en premium artikelen. Digitaal plus voegt daar de opinieartikelen van De Nieuwe Koers, de volledige digitale krant en het archief met eerdere edities aan toe." />
                    <AccordionItem label="Hoe werkt het beheerpaneel?" content="Via het beheerpaneel kun je medewerkers toevoegen en verwijderen, toegangsrechten instellen en het gebruik van licenties inzien." />
                </div>
            </div>
        </div>
    );
};

export default ZakelijkAbonnementPage;
