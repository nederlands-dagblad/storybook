import type { Meta, StoryObj } from '@storybook/react-vite';
import ProgressStepper, { type Step } from './ProgressStepper';

const MAX_STEPS = 6;

interface DynamicArgs {
    numberOfSteps: number;
    currentStep: number;
    step1Label: string; step1Href: string;
    step2Label: string; step2Href: string;
    step3Label: string; step3Href: string;
    step4Label: string; step4Href: string;
    step5Label: string; step5Href: string;
    step6Label: string; step6Href: string;
}

const meta = {
    title: 'Molecules/Navigation Molecules/ProgressStepper',
    component: ProgressStepper,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ProgressStepper>;

export default meta;

export const Playground: StoryObj<DynamicArgs> = {
    argTypes: {
        numberOfSteps: {
            control: { type: 'number', min: 2, max: MAX_STEPS },
            description: 'Number of steps',
        },
        currentStep: {
            control: { type: 'number', min: 1, max: MAX_STEPS },
            description: 'The current active step (1-based)',
        },
        ...Object.fromEntries(
            Array.from({ length: MAX_STEPS }, (_, i) => [
                [`step${i + 1}Label`, { control: 'text', description: `Step ${i + 1} label` }],
                [`step${i + 1}Href`,  { control: 'text', description: `Step ${i + 1} link` }],
            ]).flat()
        ),
    },
    args: {
        numberOfSteps: 4,
        currentStep: 2,
        step1Label: 'Kies je abonnement', step1Href: '/stap-1',
        step2Label: 'Looptijd',           step2Href: '/stap-2',
        step3Label: 'Gegevens',           step3Href: '/stap-3',
        step4Label: 'Bestelling afronden',step4Href: '/stap-4',
        step5Label: 'Stap 5',             step5Href: '/stap-5',
        step6Label: 'Stap 6',             step6Href: '/stap-6',
    },
    render: ({ numberOfSteps, currentStep, ...rest }) => {
        const steps: Step[] = Array.from({ length: numberOfSteps }, (_, i) => ({
            label: (rest as any)[`step${i + 1}Label`],
            href:  (rest as any)[`step${i + 1}Href`],
        }));
        return <ProgressStepper steps={steps} currentStep={currentStep} />;
    },
};
