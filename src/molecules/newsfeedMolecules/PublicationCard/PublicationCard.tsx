import React from "react";
import {Button, ButtonProps} from "@atoms/actionAtoms/Button/Button";

export interface PublicationCardProps {
    imageUrl?: string;
    heading?: string;
    publicationMonth?: string;
    placeholderText?: string;
    buttonProps?: ButtonProps;
    href?: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    className?: string;
}

export const PublicationCard = ({
                                    imageUrl,
                                    heading,
                                    publicationMonth,
                                    placeholderText,
                                    buttonProps,
                                    href,
                                    onClick,
                                    className = "",
                                }: PublicationCardProps): JSX.Element => {
    const DownloadButton = () => buttonProps ? (
        <div className="pt-s">
            <Button
                variant="pill"
                className="w-fit"
                {...buttonProps}
            />
        </div>
    ) : null;

    const dnkPublicationsContent = (
        <>
            <div className="w-[13.25rem] border border-default border-border-gray-subtle hover:border-border-dnk active:border-dnk-brand transition-colors overflow-hidden">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={heading}
                        className="w-full h-[19.125rem] object-cover"
                    />
                ) : (
                    <div className="w-full h-[19.125rem] bg-background-gray flex items-center justify-center">
                        {placeholderText && (
                            <span className="text-body-light text-text-default text-center px-s">{placeholderText}</span>
                        )}
                    </div>
                )}
            </div>
            {publicationMonth && (
                <div className="w-full text-center pt-xs">
                    <span className="text-meta-regular text-text-default">{publicationMonth}</span>
                </div>
            )}
            <DownloadButton/>
        </>
    );

    const dnkPublicationsBaseClasses = `inline-flex flex-col items-center ${className}`.trim();

    return href ? (
        <a href={href} onClick={onClick} draggable={false} className={dnkPublicationsBaseClasses}>
            {dnkPublicationsContent}
        </a>
    ) : (
        <div className={dnkPublicationsBaseClasses}>
            {dnkPublicationsContent}
        </div>
    );
};

export default PublicationCard;
