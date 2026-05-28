import React, { useState, useEffect, useCallback } from "react";
import Modal from "@molecules/feedbackMolecules/Modal/Modal";
import CardContainer from "@atoms/displayAtoms/CardContainer/CardContainer";
import Badge from "@atoms/displayAtoms/Badge/Badge";
import Icon from "@atoms/basicAtoms/Icon/Icon.tsx";
import Button from "@atoms/actionAtoms/Button/Button";
import Alert from "@molecules/feedbackMolecules/Alert/Alert";

declare global {
    interface Window {
        openDeviceLimitModal?: (data: DeviceLimitData) => void;
    }
}

export interface DeviceInfo {
    fingerprint: string;
    completeDeviceName: string;
    formFactor: "Mobile" | "Tablet" | "Desktop" | string;
    lastActivity: string | null;
}

export interface DeviceLimitData {
    currentDeviceName: string;
    currentDeviceFormFactor: string;
    signInTicket: string;
    activeDevices: DeviceInfo[];
}

export interface DeviceLimitModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    currentDeviceName?: string;
    currentDeviceFormFactor?: string;
    signInTicket?: string;
    activeDevices?: DeviceInfo[];
    onSignInSuccess?: (redirectUrl: string) => void;
}

type DeviceState = "active" | "kicking" | "kicked";

interface DeviceRow {
    device: DeviceInfo;
    state: DeviceState;
}

const formFactorIconName = (formFactor: string): "mobile" | "tablet" | "desktop" => {
    const lower = formFactor.toLowerCase();
    if (lower === "mobile") return "mobile";
    if (lower === "tablet") return "tablet";
    return "desktop";
};

export const DeviceLimitModal: React.FC<DeviceLimitModalProps> = ({
                                                                      isOpen: controlledIsOpen,
                                                                      onClose: controlledOnClose,
                                                                      currentDeviceName = "Dit apparaat",
                                                                      currentDeviceFormFactor = "Desktop",
                                                                      signInTicket: initialTicket = "",
                                                                      activeDevices: initialDevices = [],
                                                                      onSignInSuccess,
                                                                  }) => {
    const [internalIsOpen, setInternalIsOpen] = useState(
        controlledIsOpen ?? false
    );
    const [signInTicket, setSignInTicket] = useState(initialTicket);
    const [rows, setRows] = useState<DeviceRow[]>(
        initialDevices.map((d) => ({ device: d, state: "active" }))
    );
    const [error, setError] = useState<string | null>(null);
    const [retrying, setRetrying] = useState(false);

    const hasKickedAny = rows.some((r) => r.state === "kicked");
    const isKicking = rows.some((r) => r.state === "kicking");

    // Sync with controlled prop
    useEffect(() => {
        if (controlledIsOpen !== undefined) {
            setInternalIsOpen(controlledIsOpen);
        }
    }, [controlledIsOpen]);

    // Expose global function for Razor/cshtml to open the modal
    useEffect(() => {
        window.openDeviceLimitModal = (data: DeviceLimitData) => {
            setSignInTicket(data.signInTicket);
            setRows(
                data.activeDevices.map((d) => ({ device: d, state: "active" }))
            );
            setError(null);
            setRetrying(false);
            requestAnimationFrame(() => {
                setInternalIsOpen(true);
            });
        };
        return () => {
            window.openDeviceLimitModal = undefined;
        };
    }, []);

    // Also listen for a custom DOM event (alternative to global fn)
    useEffect(() => {
        const handleOpen = (e: CustomEvent<DeviceLimitData>) => {
            if (e.detail) {
                setSignInTicket(e.detail.signInTicket);
                setRows(
                    e.detail.activeDevices.map((d) => ({
                        device: d,
                        state: "active",
                    }))
                );
            }
            setError(null);
            setRetrying(false);
            setInternalIsOpen(true);
        };
        window.addEventListener(
            "open-device-limit",
            handleOpen as EventListener
        );
        return () =>
            window.removeEventListener(
                "open-device-limit",
                handleOpen as EventListener
            );
    }, []);

    const handleClose = useCallback(() => {
        setInternalIsOpen(false);
        controlledOnClose?.();
    }, [controlledOnClose]);

    // ── Task 3: POST /api/device/invalidate ──
    const handleKick = async (fingerprint: string) => {
        setError(null);

        setRows((prev) =>
            prev.map((r) =>
                r.device.fingerprint === fingerprint
                    ? { ...r, state: "kicking" }
                    : r
            )
        );

        try {
            const res = await fetch("/api/device/invalidate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    signInTicket,
                    deviceId: fingerprint,
                }),
            });

            if (res.status === 401) {
                window.location.href = "/login?expired=1";
                return;
            }

            if (!res.ok) {
                setError("Er ging iets mis. Probeer het opnieuw.");
                setRows((prev) =>
                    prev.map((r) =>
                        r.device.fingerprint === fingerprint
                            ? { ...r, state: "active" }
                            : r
                    )
                );
                return;
            }

            setRows((prev) =>
                prev.map((r) =>
                    r.device.fingerprint === fingerprint
                        ? { ...r, state: "kicked" }
                        : r
                )
            );
        } catch {
            setError("Verbinding mislukt. Controleer je internetverbinding.");
            setRows((prev) =>
                prev.map((r) =>
                    r.device.fingerprint === fingerprint
                        ? { ...r, state: "active" }
                        : r
                )
            );
        }
    };

    // ── Tasks 4 + 5: POST /api/device/retry-signin ──
    const handleRetry = async () => {
        setError(null);
        setRetrying(true);

        try {
            const res = await fetch("/api/device/retry-signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ signInTicket }),
            });

            if (res.status === 401) {
                window.location.href = "/login?expired=1";
                return;
            }

            const body = await res.json();

            // Outcome 1: Success
            if (body.success) {
                const redirectUrl = body.commonDomainRedirect || "/";
                if (onSignInSuccess) {
                    onSignInSuccess(redirectUrl);
                } else {
                    window.location.href = redirectUrl;
                }
                return;
            }

            // Outcome 2: Still over the limit
            if (body.reason === "TooManyDevices") {
                setRows(
                    (body.activeDevices || []).map((d: DeviceInfo) => ({
                        device: d,
                        state: "active" as DeviceState,
                    }))
                );
                setError(
                    "Er zijn nog te veel apparaten actief. Log er nog een uit."
                );
                return;
            }

            setError("Er ging iets mis. Probeer opnieuw in te loggen.");
        } catch {
            setError("Verbinding mislukt. Controleer je internetverbinding.");
        } finally {
            setRetrying(false);
        }
    };

    if (!internalIsOpen) return null;

    return (
        <Modal
            isOpen={internalIsOpen}
            onClose={handleClose}
            heading="Je bent op teveel apparaten ingelogd"
            children={
                <div className="flex flex-col gap-m text-text-default">
                    {/* Description */}
                    <p className="text-body-light">
                        Je bent al ingelogd op het maximale aantal apparaten. Log
                        één van onderstaande apparaten uit om op dit apparaat
                        verder te gaan.
                    </p>

                    {error && (
                        <Alert variant="warning">{error}</Alert>
                    )}

                    {/* Device list */}
                    <div className="flex flex-col gap-xs">
                        {/* Current device — highlighted row */}
                        <CardContainer borderColor="brand" padding="s" background="brand-subtle">
                            <div className="flex items-center gap-s">
                                <Icon name={formFactorIconName(currentDeviceFormFactor)} color="brand" />
                                <span className="flex-1 text-body-bold text-text-default">{currentDeviceName}</span>
                                <Badge variant="default" label="Dit apparaat" />
                            </div>
                        </CardContainer>

                        {/* Other device(s) */}
                        {rows.map(({ device, state }) => (
                            <CardContainer
                                key={device.fingerprint}
                                borderColor="gray-subtle"
                                padding="s"
                            >
                                <div className="flex items-center gap-s">
                                    <Icon name={formFactorIconName(device.formFactor)} color="gray" />
                                    <div className="flex-1">
                                        <span className={`block text-body-bold ${state === "kicked" ? "text-text-disabled" : "text-text-default"}`}>{device.completeDeviceName}</span>
                                        {device.lastActivity && (
                                            <span className={`block text-body-light ${state === "kicked" ? "text-text-disabled" : "text-text-subtle"}`}>{`Actief op ${device.lastActivity}`}</span>
                                        )}
                                    </div>
                                    {state === "active" && (
                                        <Button
                                            variant="pill"
                                            label="Uitloggen"
                                            iconLeft="sign-out"
                                            onClick={() => handleKick(device.fingerprint)}
                                            disabled={isKicking}
                                        />
                                    )}
                                    {state === "kicking" && (
                                        <Button variant="pill" label="Bezig..." disabled />
                                    )}
                                    {state === "kicked" && (
                                        <Button variant="pill" label="Uitgelogd" disabled />
                                    )}
                                </div>
                            </CardContainer>
                        ))}
                    </div>

                    {/* Continue button */}
                    <Button
                        variant="primary"
                        label={retrying ? "Inloggen..." : "Doorgaan"}
                        onClick={handleRetry}
                        disabled={!hasKickedAny || retrying || isKicking}
                        className="justify-center"
                    />
                </div>
            }
        />
    );
};

export default DeviceLimitModal;