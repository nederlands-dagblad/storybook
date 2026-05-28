import type { Meta, StoryObj } from "@storybook/react";
import { DeviceLimitModal } from "./DeviceLimitModal";

const mockFetch = (invalidateSuccess = true, retrySuccess = true) => {
    window.fetch = async (url) => {
        await new Promise((r) => setTimeout(r, 600));
        if (String(url).includes("invalidate")) {
            return new Response(JSON.stringify({}), {
                status: invalidateSuccess ? 200 : 500,
            });
        }
        if (String(url).includes("retry-signin")) {
            return new Response(
                JSON.stringify(
                    retrySuccess
                        ? { success: true, commonDomainRedirect: "/" }
                        : { success: false, reason: "TooManyDevices", activeDevices: [] }
                ),
                { status: 200 }
            );
        }
        return new Response("Not found", { status: 404 });
    };
};

const meta: Meta<typeof DeviceLimitModal> = {
    title: "Organisms/DeviceLimitModal",
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

export const BedrijfsSingleDevice: Story = {
    beforeEach: () => mockFetch(),
    args: {
        isOpen: true,
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

export const RegulierMultipleDevices: Story = {
    beforeEach: () => mockFetch(),
    args: {
        isOpen: true,
        currentDeviceName: "Samsung Galaxy S23",
        currentDeviceFormFactor: "Mobile",
        signInTicket: "demo-ticket-def456",
        activeDevices: [
            {
                fingerprint: "dev-001",
                completeDeviceName: "Macbook Pro",
                formFactor: "Desktop",
                lastActivity: "23 april om 09:14",
            },
            {
                fingerprint: "dev-002",
                completeDeviceName: "iPad Pro",
                formFactor: "Tablet",
                lastActivity: "22 april om 18:30",
            },
        ],
        onClose: () => console.log("Modal closed"),
    },
};

export const WithApiError: Story = {
    beforeEach: () => mockFetch(false),
    args: {
        ...BedrijfsSingleDevice.args,
        signInTicket: "demo-ticket-error",
    },
};
