import React from 'react';
import AlternativeNav from '@molecules/navigationMolecules/AlternativeNav/AlternativeNav';
import Hero from '@molecules/PageSectionMolecules/Hero/Hero';
import Accordion from '@molecules/contentOrganizationMolecules/Accordion/accordion';
import PageSection from '@molecules/PageSectionMolecules/PageSection/PageSection';
import CardContainer from "@atoms/displayAtoms/CardContainer/CardContainer.tsx";
import IconText from "@atoms/basicAtoms/IconText/IconText.tsx";
import Table from "@molecules/contentOrganizationMolecules/Table/Table.tsx";
import Icon from "@atoms/basicAtoms/Icon/Icon.tsx";
import { Button } from "@atoms/actionAtoms/Button/Button.tsx";
import SectionHeading from "@atoms/displayAtoms/SectionHeading/SectionHeading.tsx";
import { AccordionItemProps } from "@molecules/contentOrganizationMolecules/Accordion/accordion.tsx";

export interface FeatureCard {
    title: string;
    features: string[];
}

export interface ComparisonRow {
    label: string;
    included: boolean[];
}


export interface ZakelijkAbonnementPageProps {
    // Hero
    heroImage?: string;
    heroHeading?: string;
    heroIntro?: string;
    heroCtaLabel?: string;

    // Why section
    whyHeading?: string;
    whyIntro?: string;
    whyCards?: FeatureCard[];

    // Comparison table
    comparisonHeading?: string;
    comparisonPlans?: string[];
    comparisonRows?: ComparisonRow[];

    // Feature section
    featureHeading?: string;
    featureIntro?: string;
    featureImage?: string;
    featureImageAlt?: string;
    featureItems?: string[];

    // FAQ
    faqItems?: AccordionItemProps[];

    // Shared CTA
    ctaHref?: string;
    ctaLabel?: string;

    // Closing CTA
    ctaHeading?: string;
    ctaIntro?: string;
}

const defaultWhyCards: FeatureCard[] = [
    {
        title: 'Persoonlijke accounts',
        features: [
            'Elke medewerker krijgt een eigen account',
            'Inloggen met persoonlijk e-mailadres',
            'Individuele voorkeuren en leesgeschiedenis',
        ],
    },
    {
        title: 'Veiligheid & Privacy',
        features: [
            'Veilige, gescheiden accounts',
            'Geen gedeelde wachtwoorden',
            'Volledige controle over zakelijk abonnement',
        ],
    },
];

const defaultComparisonPlans = ['Digitaal basis', 'Digitaal plus'];

const defaultComparisonRows: ComparisonRow[] = [
    { label: 'Alle ND-artikelen', included: [true, true] },
    { label: 'Premium artikelen', included: [true, true] },
    { label: 'Artikelen van opiniemagazine De Nieuwe Koers', included: [false, true] },
    { label: 'Volledige digitale krant', included: [false, true] },
    { label: 'Archief met eerdere edities', included: [false, true] },
];

const defaultFeatureItems = [
    'Medewerkers individueel beheren vanaf 3 licenties',
    'Eenvoudig accounts toevoegen of verwijderen',
    'Toegangsrechten nauwkeurig regelen',
];

const defaultFaqItems: AccordionItemProps[] = [
    {
        label: 'Hoeveel medewerkers kunnen gebruik maken van een zakelijk abonnement?',
        content: 'Met een zakelijk abonnement kun je meerdere medewerkers toegang geven. Vanaf 3 licenties kun je individuele accounts beheren via ons beheerpaneel.',
    },
    {
        label: 'Kan ik het abonnement op elk moment opzeggen?',
        content: 'Ja, je kunt het zakelijk abonnement per maand opzeggen na de minimale contractperiode.',
    },
    {
        label: 'Wat is het verschil tussen Digitaal basis en Digitaal plus?',
        content: 'Digitaal basis geeft toegang tot alle ND-artikelen en premium artikelen. Digitaal plus voegt daar de opinieartikelen van De Nieuwe Koers, de volledige digitale krant en het archief met eerdere edities aan toe.',
    },
    {
        label: 'Hoe werkt het beheerpaneel?',
        content: 'Via het beheerpaneel kun je medewerkers toevoegen en verwijderen, toegangsrechten instellen en het gebruik van licenties inzien.',
    },
];

const ZakelijkAbonnementPage: React.FC<ZakelijkAbonnementPageProps> = ({
    heroImage = 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600',
    heroHeading = 'Zakelijk abonnement bij het ND',
    heroIntro = 'Geef je organisatie meer dan alleen nieuws – geef ze inzicht, inspiratie en een herkenbaar perspectief. Met ons zakelijk abonnement krijgt je organisatie toegang tot journalistiek die dieper graaft, raakt en verbindt.',
    heroCtaLabel = 'Direct aanvragen',
    whyHeading = 'Waarom een zakelijk abonnement',
    whyIntro = 'Ons zakelijk abonnement is speciaal ontworpen om tegemoet te komen aan de informatiebehoeften van jouw organisatie. Of je nu een klein team of een grote onderneming hebt, wij bieden de perfecte oplossing.',
    whyCards = defaultWhyCards,
    comparisonHeading = 'Kies het abonnement voor jouw werknemers',
    comparisonPlans = defaultComparisonPlans,
    comparisonRows = defaultComparisonRows,
    featureHeading = 'Eenvoudig beheer in één overzicht',
    featureIntro = 'Naast het abonnement krijgt je organisatie toegang tot een gebruikersvriendelijke online omgeving speciaal ontwikkeld voor bedrijven met een zakelijk abonnement.',
    featureImage = 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800',
    featureImageAlt = 'Beheerpaneel overzicht',
    featureItems = defaultFeatureItems,
    faqItems = defaultFaqItems,
    ctaHref = '#aanvragen',
    ctaLabel = 'Vraag een offerte aan',
    ctaHeading = 'Klaar om te starten?',
    ctaIntro = 'Vraag vandaag nog een offerte aan en geef jouw organisatie toegang tot betrouwbare journalistiek.',
}) => {
    return (
        <div className="w-full">
            <AlternativeNav transparent />

            <Hero
                backgroundImage={heroImage}
                heading={heroHeading}
                intro={heroIntro}
                ctaLabel={heroCtaLabel}
                ctaHref={ctaHref}
            />

            {/* "Waarom een zakelijk abonnement?" section */}
            <PageSection>
                <SectionHeading intro={whyIntro}>{whyHeading}</SectionHeading>
                <div className="flex flex-col lg:flex-row gap-s lg:gap-m">
                    {whyCards.map((card, i) => (
                        <CardContainer key={i} borderColor="gray-subtle" className="flex flex-col gap-xs">
                            <h3 className="text-heading-s text-text-default">{card.title}</h3>
                            {card.features.map((feature, j) => (
                                <IconText key={j} icon="check" text={feature} />
                            ))}
                        </CardContainer>
                    ))}
                </div>
            </PageSection>

            {/* Subscription comparison table */}
            <PageSection>
                <SectionHeading>{comparisonHeading}</SectionHeading>
                <Table
                    headers={['', ...comparisonPlans]}
                    rows={comparisonRows.map(row => [
                        row.label,
                        ...row.included.map(included =>
                            <Icon name={included ? 'check' : 'x-mark'} variant="fill" size="m" color={included ? 'brand' : 'default'} />
                        ),
                    ])}
                />
                <Button
                    variant="primary"
                    label={ctaLabel}
                    iconRight="caret-right"
                    href={ctaHref}
                    className="w-fit mt-m"
                />
            </PageSection>

            {/* "Eenvoudig beheer in één overzicht" feature section */}
            <PageSection background="brand-subtle">
                <SectionHeading intro={featureIntro}>{featureHeading}</SectionHeading>
                <div className="flex flex-col lg:flex-row items-center gap-xl">
                    <div className="flex flex-col gap-l w-full lg:w-1/2">
                        <img src={featureImage} alt={featureImageAlt} className="w-full" />
                    </div>
                    <div className="flex flex-col gap-s">
                        {featureItems.map((item, i) => (
                            <IconText key={i} icon="check" text={item} />
                        ))}
                    </div>
                </div>
            </PageSection>

            {/* FAQ */}
            <PageSection>
                <Accordion
                    title="Veelgestelde vragen"
                    titleClassName="text-heading-l"
                    items={faqItems}
                />
            </PageSection>

            {/* Closing CTA */}
            <PageSection background="gray-subtle">
                <div className="flex flex-col items-center gap-m text-center">
                    <SectionHeading intro={ctaIntro} className="items-center">
                        {ctaHeading}
                    </SectionHeading>
                    <Button
                        variant="primary"
                        label={ctaLabel}
                        iconRight="caret-right"
                        href={ctaHref}
                    />
                </div>
            </PageSection>
        </div>
    );
};

export default ZakelijkAbonnementPage;
