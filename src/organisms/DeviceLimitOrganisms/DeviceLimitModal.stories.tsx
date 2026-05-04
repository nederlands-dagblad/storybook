import type { Meta, StoryObj } from "@storybook/react";
import { DeviceLimitModal } from "./DeviceLimitModal";

const meta: Meta<typeof DeviceLimitModal> = {
    title: "organisms/DeviceLimitModal",
    component: DeviceLimitModal,
    parameters: {
        layout: "centered",
    },
    decorators: [
        (Story) => (
            <div style={{
                padding: "40px",
                background: "rgba(0,0,0,0.3)",
                minHeight: "400px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof DeviceLimitModal>;

// ── Bedrijfsabonnement: limit = 1, so exactly 1 other device ──
export const BedrijfsSingleDevice: Story = {
    args: {
        isOpen: true,  // ← add this
        currentDeviceName: "Samsung Galaxy S23",
        currentDeviceFormFactor: "Mobile",
        signInTicket: "demo-ticket-abc123",
        activeDevices: [
            {
                fingerprint: "dev-001",
                completeDeviceName: "Macbook Pro",
                formFactor: "Desktop",
                lastActivity: "23 april om 09:14",
            },
        ],
        onClose: () => console.log("Modal closed"),
        onSignInSuccess: (url) => console.log("Sign-in success, redirect:", url),
    },
};

// ── Regulier abonnement: limit = 2, so 2 other devices ──
export const RegulierMultipleDevices: Story = {
    args: {
        isOpen: true,  // ← add this
        currentDeviceName: "Samsung Galaxy S23",
        currentDeviceFormFactor: "Mobile",
        signInTicket: "demo-ticket-def456",
        activeDevices: [
            // ... same as before
        ],
        onClose: () => console.log("Modal closed"),
    },
};