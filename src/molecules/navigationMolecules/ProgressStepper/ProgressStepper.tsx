import React from 'react';
import { Icon } from '../../../atoms/basicAtoms/Icon/Icon';

export type StepState = 'completed' | 'active' | 'upcoming';

export interface Step {
    label: string;
    href?: string;
    state?: StepState;
}

export interface ProgressStepperProps {
    steps: Step[];
    currentStep: number; // 1-based index
}

const ProgressStepper: React.FC<ProgressStepperProps> = ({ steps, currentStep }) => {
    const getStepState = (index: number): StepState => {
        const stepNumber = index + 1;
        if (stepNumber < currentStep) return 'completed';
        if (stepNumber === currentStep) return 'active';
        return 'upcoming';
    };

    return (
        <div className="w-full">
            <div className="flex items-center">
                {steps.map((step, index) => {
                    const state = step.state ?? getStepState(index);
                    const isLast = index === steps.length - 1;
                    const isClickable = state === 'completed' && !!step.href;

                    const square = (
                        <div
                            className={`
                                w-m h-m flex-shrink-0 flex items-center justify-center text-meta-regular
                                ${state === 'active' ? 'bg-background-brand text-text-inverse' : ''}
                                ${state === 'completed' ? 'bg-background-brand text-text-inverse' : ''}
                                ${state === 'upcoming' ? 'bg-background-disabled text-text-inverse' : ''}
                                ${isClickable ? 'cursor-pointer' : ''}
                            `.trim()}
                        >
                            {state === 'completed'
                                ? <Icon name="check" variant="outline" size="s" color="inverse" />
                                : index + 1}
                        </div>
                    );

                    return (
                        <React.Fragment key={index}>
                            <div className="flex-1 flex justify-center">
                                {isClickable
                                    ? <a href={step.href}>{square}</a>
                                    : square}
                            </div>
                            {!isLast && (
                                <div className="w-xxs md:w-l h-[1px] bg-border-gray flex-shrink-0" />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            {/* All screen sizes: show all labels under their square */}
            <div className="flex mt-xs">
                {steps.map((step, index) => {
                    const state = step.state ?? getStepState(index);
                    const isLast = index === steps.length - 1;
                    const isClickable = state === 'completed' && !!step.href;

                    const label = (
                        <span className={`text-meta-light text-center leading-tight ${state === 'upcoming' ? 'text-text-disabled' : 'text-text-default'}`}>
                            {step.label}
                        </span>
                    );

                    return (
                        <React.Fragment key={index}>
                            <div className="flex-1 min-w-0 flex justify-center">
                                {isClickable
                                    ? <a href={step.href}>{label}</a>
                                    : label}
                            </div>
                            {!isLast && <div className="w-xxs md:w-l flex-shrink-0" />}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default ProgressStepper;
