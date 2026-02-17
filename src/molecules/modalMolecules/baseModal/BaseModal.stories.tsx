import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import BaseModal from './BaseModal';

const meta: Meta<typeof BaseModal> = {
    title: 'Molecules/Modal Molecules/BaseModal',
    component: BaseModal,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BaseModal>;

// Wrapper component to handle state
const ModalWrapper = ({ children, heading }: { children: React.ReactNode; heading: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={'min-h-screen bg-background-gray p-4'}>
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Open Modal
            </button>
            <BaseModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                heading={heading}
            >
                {children}
            </BaseModal>
        </div>
    );
};

// Basic modal with simple content
export const Default: Story = {
    render: () => (
        <ModalWrapper heading="Default Modal">
            <div>
                <p className="mb-4">This is a basic modal with some simple content.</p>
                <p>You can put any content here that you'd like to display in the modal.</p>
            </div>
        </ModalWrapper>
    ),
};

// Modal with form content
export const WithForm: Story = {
    render: () => (
        <ModalWrapper heading="Contact Form">
            <form className="space-y-4">
                <div>
                    <label className="block mb-2 font-medium">Name</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter your name"
                    />
                </div>
                <div>
                    <label className="block mb-2 font-medium">Email</label>
                    <input
                        type="email"
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <label className="block mb-2 font-medium">Message</label>
                    <textarea
                        className="w-full px-3 py-2 border rounded"
                        rows={4}
                        placeholder="Enter your message"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
        </ModalWrapper>
    ),
};

// Modal with long scrollable content
export const LongContent: Story = {
    render: () => (
        <ModalWrapper heading="Terms and Conditions">
            <div className="space-y-4">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    I Agree
                </button>
            </div>
        </ModalWrapper>
    ),
};

// Modal with list content
export const WithList: Story = {
    render: () => (
        <ModalWrapper heading="Available Options">
            <div>
                <p className="mb-4">Please select your preferred option:</p>
                <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                        <input type="radio" name="option" id="opt1" />
                        <label htmlFor="opt1">Option 1 - Basic Plan</label>
                    </li>
                    <li className="flex items-center gap-2">
                        <input type="radio" name="option" id="opt2" />
                        <label htmlFor="opt2">Option 2 - Standard Plan</label>
                    </li>
                    <li className="flex items-center gap-2">
                        <input type="radio" name="option" id="opt3" />
                        <label htmlFor="opt3">Option 3 - Premium Plan</label>
                    </li>
                </ul>
                <div className="mt-6 flex gap-2 justify-end">
                    <button className="px-4 py-2 border rounded hover:bg-gray-100">
                        Cancel
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Confirm
                    </button>
                </div>
            </div>
        </ModalWrapper>
    ),
};

// Modal with image content
export const WithImage: Story = {
    render: () => (
        <ModalWrapper heading="Image Gallery">
            <div>
                <img
                    src="https://via.placeholder.com/600x400"
                    alt="Placeholder"
                    className="w-full rounded mb-4"
                />
                <p className="text-center text-gray-600">
                    This is an example of a modal displaying an image with a caption.
                </p>
            </div>
        </ModalWrapper>
    ),
};

// Modal with warning/alert content
export const WarningModal: Story = {
    render: () => (
        <ModalWrapper heading="⚠️ Warning">
            <div>
                <p className="mb-4 text-red-600 font-medium">
                    This action cannot be undone. Are you sure you want to continue?
                </p>
                <p className="mb-6 text-gray-600">
                    All data associated with this item will be permanently deleted.
                </p>
                <div className="flex gap-2 justify-end">
                    <button className="px-4 py-2 border rounded hover:bg-gray-100">
                        Cancel
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                        Delete
                    </button>
                </div>
            </div>
        </ModalWrapper>
    ),
};