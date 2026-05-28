import type { Meta, StoryObj } from '@storybook/react';
import { PodcastSlider } from './PodcastSlider';

const episodes = [
    { title: 'Ben je beter als je een hoger niveau hebt?', seriesTitle: 'Widya zoekt God', duration: '42 min', publishedAt: '14 mei 2026', href: '#' },
    { title: '#247 Waarom christenen (niet) alles kunnen eten', seriesTitle: 'Dick en Daniël geloven het wel', duration: '55 min', publishedAt: '7 mei 2026', href: '#' },
    { title: 'Mijn partner verliest zich in zijn fiets hobby en is thuis uitgeblust. Wat moet ik doen?', seriesTitle: 'Relatie podcast', duration: '38 min', publishedAt: '30 apr 2026', href: '#' },
    { title: 'De hoofdzonde \'lust\'', seriesTitle: 'Gebroken gelofte', duration: '31 min', publishedAt: '23 apr 2026', href: '#' },
    { title: 'Ben je beter als je een hoger niveau hebt?', seriesTitle: 'Christine en Gerjanne weten het ook niet', duration: '27 min', publishedAt: '16 apr 2026', href: '#' },
    { title: '#247 Waarom christenen (niet) alles kunnen eten', seriesTitle: 'Boekenclub podcast', duration: '48 min', publishedAt: '9 apr 2026', href: '#' },
    { title: 'De hoofdzonde \'lust\'', seriesTitle: 'Veertig dagen poëzie', duration: '12 min', publishedAt: '2 apr 2026', href: '#' },
];

const meta: Meta<typeof PodcastSlider> = {
    title: 'Organisms/Podcast Organisms/PodcastSlider',
    component: PodcastSlider,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'Afleveringen',
        episodes,
    },
};

export const WithButton: Story = {
    args: {
        title: 'Afleveringen',
        episodes,
        showButton: true,
        buttonLabel: 'Alle afleveringen',
        buttonUrl: '#',
    },
};
