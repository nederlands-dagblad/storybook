import React from 'react';
import { Button, Card, CollapsedCard } from './components';

const App: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Design System</h1>
      <p className="mb-4">Welcome to your company's design system.</p>
      <div className="flex space-x-4 mb-8">
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          title="Simple Card"
        >
          <p>This is a basic card component from the design system.</p>
        </Card>
        <Card
          title="Card with Image"
          image={<img src="https://via.placeholder.com/400x200" alt="Placeholder" />}
          footer={<Button variant="secondary">Learn More</Button>}
        >
          <p>This card includes an image at the top.</p>
        </Card>
      </div>
    </div>
  );
};

export default App;
