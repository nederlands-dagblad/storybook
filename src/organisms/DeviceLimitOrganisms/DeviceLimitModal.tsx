import React, { useState, useEffect, useCallback } from "react";
import Modal from "@molecules/feedbackMolecules/Modal/Modal";
import Icon from "@atoms/basicAtoms/Icon/Icon.tsx";

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

const FormFactorIcon: React.FC<{ formFactor: string }> = ({
                                                              formFactor,
                                                          }) => {
    const lower = formFactor.toLowerCase();
    if (lower === "mobile") {
        return (
            <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect
                    x="4" y="1" width="10" height="16" rx="2"
                    stroke="currentColor" strokeWidth="1.3"
                />
                <line
                    x1="7.5" y1="14" x2="10.5" y2="14"
                    stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"
                />
            </svg>
        );
    }
    if (lower === "tablet") {
        return (
            <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect
                    x="2" y="1" width="14" height="16" rx="2"
                    stroke="currentColor" strokeWidth="1.3"
                />
                <line
                    x1="7.5" y1="14" x2="10.5" y2="14"
                    stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"
                />
            </svg>
        );
    }
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="1" y="2" width="16" height="11" rx="1.5"
                stroke="currentColor" strokeWidth="1.3"
            />
            <line
                x1="6" y1="16" x2="12" y2="16"
                stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"
            />
            <line
                x1="9" y1="13" x2="9" y2="16"
                stroke="currentColor" strokeWidth="1.3"
            />
        </svg>
    );
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
                <div className="flex flex-col gap-m bg-background-default text-text-default">
                    {/* Description */}
                    <p className="text-body-light text-text-default">
                        Je bent al ingelogd op het maximale aantal apparaten. Log
                        één van onderstaande apparaten uit om op dit apparaat
                        verder te gaan.
                    </p>

                    {/* Error message */}
                    {error && (
                        <div className="p-xs text-body-light text-text-danger bg-background-danger-subtle border border-border-danger-subtle">
                            {error}
                        </div>
                    )}

                    {/* Device list */}
                    <div className="flex flex-col">
                        {/* Current device — highlighted row */}
                        <div className="flex items-center gap-s p-s border-2 border-border-brand rounded">
              <span className="text-text-brand">
                <FormFactorIcon formFactor={currentDeviceFormFactor} />
              </span>
                            <span className="flex-1 text-body-bold text-text-default">
                {currentDeviceName}
              </span>
                            <span className="text-body-light text-text-brand border border-border-brand px-s py-xs rounded">
                Dit apparaat
              </span>
                        </div>

                        {/* Other device(s) */}
                        {rows.map(({ device, state }) => (
                            <div
                                key={device.fingerprint}
                                className={`flex items-center gap-s p-s border border-border-gray-subtle transition-opacity ${
                                    state === "kicked" ? "opacity-50" : ""
                                }`}
                            >
                <span className="text-text-subtle">
                  <FormFactorIcon formFactor={device.formFactor} />
                </span>
                                <div className="flex-1">
                  <span className="block text-body-bold text-text-default">
                    {device.completeDeviceName}
                  </span>
                                    {device.lastActivity && (
                                        <span className="block text-body-light text-text-subtle text-sm">
                      Actief op {device.lastActivity}
                    </span>
                                    )}
                                </div>

                                {state === "active" && (
                                    <button
                                        onClick={() => handleKick(device.fingerprint)}
                                        disabled={isKicking}
                                        className={`flex items-center gap-xs px-s py-xs border border-border-gray-subtle rounded text-body-light transition-colors ${
                                            isKicking
                                                ? "opacity-50 cursor-not-allowed"
                                                : "hover:border-border-brand text-text-subtle hover:text-text-brand"
                                        }`}
                                    >
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 14 14"
                                            fill="none"
                                        >
                                            <path
                                                d="M5 1H3C1.895 1 1 1.895 1 3v8c0 1.105.895 2 2 2h2"
                                                stroke="currentColor"
                                                strokeWidth="1.2"
                                                strokeLinecap="round"
                                            />
                                            <path
                                                d="M9.5 4L13 7l-3.5 3M5.5 7h7"
                                                stroke="currentColor"
                                                strokeWidth="1.2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        Uitloggen
                                    </button>
                                )}
                                {state === "kicking" && (
                                    <span className="px-s py-xs text-body-light text-text-subtle">
                    Bezig...
                  </span>
                                )}
                                {state === "kicked" && (
                                    <span className="px-s py-xs border border-border-gray-subtle rounded text-body-light text-text-subtle">
                    Uitgelogd
                  </span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Continue button */}
                    <button
                        onClick={handleRetry}
                        disabled={!hasKickedAny || retrying || isKicking}
                        className={`w-full p-s text-body-bold text-text-inverse rounded transition-colors ${
                            !hasKickedAny || retrying || isKicking
                                ? "bg-background-brand opacity-50 cursor-not-allowed"
                                : "bg-background-brand hover:opacity-90"
                        }`}
                    >
                        {retrying ? "Inloggen..." : "Doorgaan"}
                    </button>
                </div>
            }
        />
    );
};

export default DeviceLimitModal;