import type {Meta, StoryObj} from '@storybook/react-vite';

const meta: Meta = {
    title: 'Tokens/Typography',
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
Text styles are predefined combinations of typography properties from our design tokens:

- **Font family** — Gulliver, Fira Sans, Abril Fatface, or Montserrat
- **Font weight** — Light (300), Regular (400), Semibold (600), or Bold (700)
- **Font size** — Automatically scales depending on screen size (mobile, tablet, desktop)
- **Letter spacing** — Fine-tuned per style for optimal readability

Apply a text style by adding the class to any element, e.g. \`<h1 class="text-heading-xl">\`.

For example, \`text-heading-xl\` resolves to:

| Property | Token | Value |
|---|---|---|
| font-family | \`--font-family-gulliver\` | Gulliver Web, Georgia, serif |
| font-weight | \`--font-weight-bold\` | 700 |
| font-size | \`--font-size-heading-xl\` | 26px (mobile) → 36px (tablet) → 40px (desktop) |
| letter-spacing | \`--letter-spacing-0\` | 0px |

Text color is not included in text styles and should be applied separately. See [Colors](?path=/docs/tokens-colors--docs) for available text color tokens.
                `,
            },
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const StyleExample: React.FC<{ tag: string, name: string, content: string }> = ({tag: Tag = 'h1', name, content}) => (
    <div className="space-y-6">
        <div className="space-y-4">
            <Tag className={[name, "mb-2"].join(' ')}>
                {content}
            </Tag>
            <code className="mt-4 bg-gray-100 p-1 rounded-md text-sm">{name}</code>
        </div>
    </div>
);

const FontFamilyExample: React.FC<{ name: string, fontFamily: string, description: string, sample?: string }> = ({ name, fontFamily, description, sample }) => (
    <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
        <p style={{ fontFamily, fontSize: '24px', fontWeight: 700, marginBottom: '0.5rem' }}>{name}</p>
        <p style={{ fontFamily, fontSize: '16px', fontWeight: 300, marginBottom: '0.5rem' }}>Light — {description}</p>
        <p style={{ fontFamily, fontSize: '16px', fontWeight: 400, marginBottom: '0.5rem' }}>Regular — {description}</p>
        <p style={{ fontFamily, fontSize: '16px', fontWeight: 700 }}>Bold — {description}</p>
        {sample && (
            <div style={{ marginTop: '0.5rem' }}>
                {sample.split('').map((char, i) => (
                    <span key={i} style={{ fontFamily, fontSize: '90px', fontWeight: 300, marginRight: '0.5rem' }}>{char}</span>
                ))}
            </div>
        )}
    </div>
);

export const Headings: Story = {
    parameters: { docs: { source: { code: null } } },
    render: () => (
        <div className="space-y-8">
            <StyleExample tag="h1" name="text-heading-xxl" content="The quick brown fox jumps over the lazy dog" />
            <StyleExample tag="h1" name="text-heading-xl" content="The quick brown fox jumps over the lazy dog" />
            <StyleExample tag="h2" name="text-heading-l" content="The quick brown fox jumps over the lazy dog" />
            <StyleExample tag="h2" name="text-heading-m" content="The quick brown fox jumps over the lazy dog" />
            <StyleExample tag="h2" name="text-heading-s" content="The quick brown fox jumps over the lazy dog" />
            <StyleExample tag="h2" name="text-heading-light" content="The quick brown fox jumps over the lazy dog" />
            <StyleExample tag="h2" name="text-heading-uppercase" content="The quick brown fox jumps over the lazy dog" />
        </div>
    ),
};

export const BodyText: Story = {
    parameters: { docs: { source: { code: null } } },
    render: () => (
        <div className="space-y-8">
            <StyleExample tag="p" name="text-body-light" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin scelerisque purus ut orci tincidunt lobortis. Fusce semper purus elit, ullamcorper imperdiet est semper ut." />
            <StyleExample tag="p" name="text-body-regular" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin scelerisque purus ut orci tincidunt lobortis. Fusce semper purus elit, ullamcorper imperdiet est semper ut." />
            <StyleExample tag="p" name="text-body-bold" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin scelerisque purus ut orci tincidunt lobortis. Fusce semper purus elit, ullamcorper imperdiet est semper ut." />
            <StyleExample tag="p" name="text-body-uppercase" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin scelerisque purus ut orci tincidunt lobortis. Fusce semper purus elit, ullamcorper imperdiet est semper ut." />
            <StyleExample tag="p" name="text-body-uppercase-bold" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin scelerisque purus ut orci tincidunt lobortis. Fusce semper purus elit, ullamcorper imperdiet est semper ut." />
            <StyleExample tag="p" name="text-body-uppercase-bold-small" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin scelerisque purus ut orci tincidunt lobortis. Fusce semper purus elit, ullamcorper imperdiet est semper ut." />
            <StyleExample tag="p" name="text-body-gulliver-semibold" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin scelerisque purus ut orci tincidunt lobortis. Fusce semper purus elit, ullamcorper imperdiet est semper ut." />
        </div>
    ),
};

export const MetaText: Story = {
    parameters: { docs: { source: { code: null } } },
    render: () => (
        <div className="space-y-8">
            <StyleExample tag="p" name="text-meta-regular" content="This is a meta text" />
            <StyleExample tag="p" name="text-meta-light" content="This is a meta light text" />
            <StyleExample tag="p" name="text-meta-bold" content="This is a meta bold text" />
        </div>
    ),
};

export const FontFamilies: Story = {
    parameters: { docs: { source: { code: null } } },
    render: () => (
        <div style={{ maxWidth: '600px' }}>
            <FontFamilyExample
                name="Gulliver"
                fontFamily="'Gulliver Web', Georgia, serif"
                description="Used for headings and quotes"
            />
            <FontFamilyExample
                name="Fira Sans"
                fontFamily="'Fira Sans', sans-serif"
                description="Used for body text and UI elements"
            />
            <FontFamilyExample
                name="Abril Fatface"
                fontFamily="'Abril Fatface', cursive"
                description="Used for drop caps in articles"
                sample="ABC"
            />
            <FontFamilyExample
                name="Montserrat"
                fontFamily="'Montserrat', sans-serif"
                description="Used for alternative headings (Opinie)"
                sample="ABC"
            />
        </div>
    ),
};

export const FontWeights: Story = {
    parameters: { docs: { source: { code: null } } },
    render: () => (
        <div style={{ maxWidth: '600px' }}>
            {[
                { weight: 300, label: 'Light' },
                { weight: 400, label: 'Regular' },
                { weight: 600, label: 'Semibold' },
                { weight: 700, label: 'Bold' },
            ].map(({ weight, label }) => (
                <div key={weight} style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
                    <p style={{ fontFamily: "'Fira Sans', sans-serif", fontWeight: weight, fontSize: '24px', marginBottom: '0.25rem' }}>
                        {label} ({weight})
                    </p>
                    <p style={{ fontFamily: "'Fira Sans', sans-serif", fontWeight: weight, fontSize: '16px' }}>
                        The quick brown fox jumps over the lazy dog
                    </p>
                    <code style={{ fontSize: '12px', backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>font-weight: {weight}</code>
                </div>
            ))}
        </div>
    ),
};
