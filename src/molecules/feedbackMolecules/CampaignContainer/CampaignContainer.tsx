import React from "react";
import { Button } from "@atoms/actionAtoms/Button/Button";

export interface CampaignContainerProps {
    title: string;
    text: string;
    buttonLabel: string;
    href: string;
    className?: string;
}

export const CampaignContainer: React.FC<CampaignContainerProps> = ({
    title,
    text,
    buttonLabel,
    href,
    className = "",
}) => {
    return (
        <div className={`w-full bg-background-yellow border-l-[3px] border-border-yellow p-s md:p-m flex flex-col gap-s ${className}`.trim()}>
            <div className="flex flex-col gap-xxs">
                <h2 className="text-heading-m">{title}</h2>
                <p className="text-body-light">{text}</p>
            </div>
            <Button variant="pill" iconRight="caret-right" label={buttonLabel} href={href} className="w-fit" />
        </div>
    );
};

export default CampaignContainer;
