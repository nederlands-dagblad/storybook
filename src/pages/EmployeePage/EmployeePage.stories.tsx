import type { Meta, StoryObj } from '@storybook/react';
import EmployeePage from './EmployeePage';

const meta: Meta<typeof EmployeePage> = {
    title: 'Pages/Employee',
    component: EmployeePage,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        heading: { control: 'text', description: 'Page heading' },
        intro: { control: 'text', description: 'Intro text below the heading' },
        employees: { control: 'object', description: 'List of employees with name, role, department and optional image' },
        largeDepartments: { control: 'object', description: 'Departments shown with larger cards (4 per row instead of 5 on desktop)' },
        bioButtonLabel: { control: 'text', description: 'Label for the bio button shown when an employee has an authorPageUrl' },
    },
};

export default meta;
type Story = StoryObj<typeof EmployeePage>;

export const Default: Story = {
    args: {
        largeDepartments: ['Directie', 'Hoofdredactie'],
        employees: [
            { name: 'Anna de Vries', role: 'Directeur', department: 'Directie', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', authorPageUrl: '/auteurs/anna-de-vries' },
            { name: 'Pieter Bakker', role: 'Adjunct-directeur', department: 'Directie', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400' },
            { name: 'Sara Janssen', role: 'Hoofdredacteur', department: 'Hoofdredactie', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', authorPageUrl: '/auteurs/sara-janssen' },
            { name: 'Tom Visser', role: 'Adjunct-hoofdredacteur', department: 'Hoofdredactie', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
            { name: 'Lisa Mulder', role: 'Journalist', department: 'Redactie', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400' },
            { name: 'Mark Smit', role: 'Journalist', department: 'Redactie', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400' },
            { name: 'Eva de Jong', role: 'Webredacteur', department: 'Redactie', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400' },
            { name: 'Bas Hendriks', role: 'Fotograaf', department: 'Redactie', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400' },
            { name: 'Noor van Dam', role: 'Journalist', department: 'Redactie', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400' },
            { name: 'Joost Brouwer', role: 'Social Media', department: 'Marketing', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400' },
            { name: 'Femke Laan', role: 'Accountmanager', department: 'Marketing', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400' },
            { name: 'Rick Groot', role: 'Advertenties', department: 'Marketing', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400' },
            { name: 'Anke Kuiper', role: 'Klantenservice', department: 'Abonnementen', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400' },
            { name: 'Daan Vos', role: 'Abonnementenadviseur', department: 'Abonnementen', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400' },
        ],
    },
};
