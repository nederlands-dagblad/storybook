import React from 'react';
import PageSection from '@molecules/PageSectionMolecules/PageSection/PageSection';
import SectionHeading from '@atoms/displayAtoms/SectionHeading/SectionHeading';
import Accordion from '@molecules/contentOrganizationMolecules/Accordion/Accordion';
import { AccordionItemProps } from '@molecules/contentOrganizationMolecules/Accordion/Accordion';
import SubscriptionSelectionFrame, { SubscriptionSelectionFrameProps } from '../../organisms/SubscriptionOrganisms/SubscriptionSelectionFrame/SubscriptionSelectionFrame';
import { ImageSlider } from '@molecules/newsfeedMolecules/ImageSlider/ImageSlider';
import { ImageCardProps } from '@molecules/newsfeedMolecules/ImageCard/ImageCard';
import CardContainer from '@atoms/displayAtoms/CardContainer/CardContainer';
import Icon from '@atoms/basicAtoms/Icon/Icon';
import Button from "@atoms/actionAtoms/Button/Button.tsx";

export interface SubscriptionLandingPageProps {
    // Subscription selection
    selectionFrame?: SubscriptionSelectionFrameProps;

    // Image slider
    sliderTitle?: string;
    sliderImages?: ImageCardProps[];
    sliderButtonLabel?: string;
    sliderButtonUrl?: string;

    // FAQ
    faqHeading?: string;
    faqItems?: AccordionItemProps[];

    // Help section
    helpImage?: string;
    helpImageAlt?: string;
    helpHeading?: string;
    helpIntro?: string;
    helpCtaLabel?: string;
    helpCtaHref?: string;
}

const defaultSelectionFrame: SubscriptionSelectionFrameProps = {
    heading: 'Word lid van het Nederlands Dagblad',
    benefits: [
        { label: 'Steun christelijke kwaliteitsjournalistiek' },
        { label: 'Korting voor nieuwe abonnees', hasInfo: true },
        { label: '14 dagen bedenktijd' },
    ],
    steps: [
        { label: 'Kies je abonnement' },
        { label: 'Looptijd' },
        { label: 'Gegevens' },
        { label: 'Bestelling afronden' },
    ],
    currentStep: 1,
    cards: [
        {
            title: 'Digitaal Basis',
            pricePerWeek: 2.75,
            originalPricePerWeek: 3.17,
            ctaHref: '#',
            features: [
                { label: 'Onbeperkt ND artikelen', included: true },
                { label: 'Elke dag nieuwe puzzels', included: true },
                { label: 'Persoonlijke leeslijst', included: true },
                { label: 'Geef 2 artikelen per maand cadeau', included: true },
                { label: 'Toegang tot digitale krant', included: false },
                { label: 'Toegang tot De Nieuwe Koers', included: false },
                { label: 'Papieren krant', included: false },
                { label: '10 keer per jaar De Nieuwe Koers op papier', included: false },
            ],
        },
        {
            title: 'Digitaal Plus',
            pricePerWeek: 4.95,
            originalPricePerWeek: 6.99,
            isFeatured: true,
            ctaHref: '#',
            features: [
                { label: 'Onbeperkt ND artikelen', included: true },
                { label: 'Elke dag nieuwe puzzels', included: true },
                { label: 'Persoonlijke leeslijst', included: true },
                { label: 'Geef 10 artikelen per maand cadeau', included: true },
                { label: 'Toegang tot digitale krant', included: true },
                { label: 'Toegang tot De Nieuwe Koers', included: true },
                { label: 'Papieren krant', included: false },
                { label: '10 keer per jaar De Nieuwe Koers op papier', included: false },
            ],
        },
        {
            title: 'Digitaal + Papier',
            pricePerWeek: 5.95,
            originalPricePerWeek: 8.47,
            ctaHref: '#',
            features: [
                { label: 'Onbeperkt ND artikelen', included: true },
                { label: 'Elke dag nieuwe puzzels', included: true },
                { label: 'Persoonlijke leeslijst', included: true },
                { label: 'Geef 10 artikelen per maand cadeau', included: true },
                { label: 'Toegang tot digitale krant', included: true },
                { label: 'Toegang tot De Nieuwe Koers', included: true },
                { label: 'Papieren krant', included: true, modalBody: 'in het weekend of 6 dagen per week' },
                { label: '10 keer per jaar De Nieuwe Koers op papier', included: true },
            ],
        },
    ],
    footerText: 'De introductietarieven op deze pagina zijn alleen geldig voor nieuwe abonnees die de afgelopen 12 maanden geen abonnement hebben gehad.',
    footerLinkLabel: 'Vraag hier een regulier abonnement aan.',
    footerLinkHref: '#',
};

const defaultSliderImages: ImageCardProps[] = [
    { variant: 'card', imageUrl: 'https://picsum.photos/212/212?random=70', alt: 'Foto 1', description: 'Nieuws dat raakt', metaText: '14 januari 2024' },
    { variant: 'card', imageUrl: 'https://picsum.photos/212/212?random=71', alt: 'Foto 2', description: 'Diepgaande reportages', metaText: '21 februari 2024' },
    { variant: 'card', imageUrl: 'https://picsum.photos/212/212?random=72', alt: 'Foto 3', description: 'Opinie en achtergrond', metaText: '3 maart 2024' },
    { variant: 'card', imageUrl: 'https://picsum.photos/212/212?random=73', alt: 'Foto 4', description: 'Christelijk perspectief', metaText: '18 april 2024' },
    { variant: 'card', imageUrl: 'https://picsum.photos/212/212?random=74', alt: 'Foto 5', description: 'Cultuur en samenleving', metaText: '5 mei 2024' },
    { variant: 'card', imageUrl: 'https://picsum.photos/212/212?random=75', alt: 'Foto 6', description: 'Geloof in de praktijk', metaText: '29 mei 2024' },
];

const defaultFaqItems: AccordionItemProps[] = [
    {
        label: 'Kan ik mijn abonnement op elk moment opzeggen?',
        content: 'Ja, je kunt je abonnement op elk moment opzeggen. Na de minimale looptijd kun je per maand opzeggen.',
    },
    {
        label: 'Geldt de korting ook voor een bestaand abonnement?',
        content: 'Nee, de introductiekorting geldt alleen voor nieuwe abonnees die de afgelopen 12 maanden geen abonnement hebben gehad.',
    },
    {
        label: 'Hoe kan ik de digitale krant lezen?',
        content: 'De digitale krant is beschikbaar via de ND-app en de website. Je kunt hem lezen op je telefoon, tablet of computer.',
    },
    {
        label: 'Wat is De Nieuwe Koers?',
        content: 'De Nieuwe Koers is het opinieblad van het Nederlands Dagblad. Het verschijnt 10 keer per jaar en biedt diepgaande artikelen over geloof, cultuur en samenleving.',
    },
    {
        label: 'Hoe werkt de 14 dagen bedenktijd?',
        content: 'Als je binnen 14 dagen na het afsluiten van je abonnement besluit dat het toch niets voor je is, kun je het abonnement kosteloos annuleren.',
    },
];

const SubscriptionLandingPage: React.FC<SubscriptionLandingPageProps> = ({
    selectionFrame = defaultSelectionFrame,
    sliderTitle = 'Voordelen van een ND abonnement',
    sliderImages = defaultSliderImages,
    faqHeading = 'Veelgestelde vragen',
    faqItems = defaultFaqItems,
    helpImage,
    helpImageAlt = 'Hulp illustratie',
    helpHeading = 'Hulp nodig?',
    helpIntro = 'Heb je een vraag over het afsluiten van een abonnement of over je huidige abonnement? We helpen je graag.',
    helpCtaLabel = 'Neem contact op',
    helpCtaHref = '#',
}) => {
    return (
        <div className="w-full">
            <SubscriptionSelectionFrame {...selectionFrame} />

            <PageSection>
                <CardContainer borderColor="gray-subtle">
                    <div className="flex flex-col gap-s">
                        <h2 className="text-heading-m text-text-default">Andere ND abonnementen</h2>
                        <div className="flex flex-col gap-xs">
                            <a href="#studentenabonnement" className="inline-flex items-center gap-xxs !underline text-body-regular text-text-default">
                                Studentenabonnement
                                <Icon name="caret-right" size="s" color="default" />
                            </a>
                            <a href="#zakelijkabonnement" className="inline-flex items-center gap-xxs !underline text-body-regular text-text-default">
                                Zakelijk abonnement
                                <Icon name="caret-right" size="s" color="default" />
                            </a>
                        </div>
                    </div>
                </CardContainer>
            </PageSection>

            <PageSection background={"brand-subtle"}>
                <ImageSlider
                    title={sliderTitle}
                    titleVariant="default"
                    images={sliderImages}
                />
            </PageSection>

            <PageSection>
               <div className="flex flex-col gap-m">
                   <Accordion
                       title={faqHeading}
                       titleClassName="text-heading-l"
                       items={faqItems}
                   />
                   <Button variant={"pill"} label={"Bekijk alle veelgestelde vragen"} iconRight={"caret-right"} href={"nd.nl/service/veelgestelde_vragen"} className="w-fit"></Button>
               </div>
            </PageSection>

            {/* Help section */}
            <PageSection background="gray-subtle">
                <div className="max-w-2xl mx-auto flex flex-col lg:flex-row items-center gap-l">
                    {helpImage && (
                        <img src={helpImage} alt={helpImageAlt} className="w-48 flex-shrink-0" />
                    )}
                    <div className="flex flex-col gap-s">
                        <h2 className="text-heading-m text-text-default">{helpHeading}</h2>
                        <p className="text-body-light text-text-default">{helpIntro}</p>
                        <Button variant="pill" label={helpCtaLabel} iconRight="caret-right" href={helpCtaHref} className="w-fit" />
                    </div>
                </div>
            </PageSection>
        </div>
    );
};

export default SubscriptionLandingPage;
