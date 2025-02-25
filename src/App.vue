<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">Design System</h1>
    <p class="mb-4">Welcome to your company's design system.</p>
    <div class="flex space-x-4 mb-8">
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <template #title>Simple Card</template>
        <p>This is a basic card component from the design system.</p>
      </Card>
      <Card>
        <template #image>
          <img src="https://via.placeholder.com/400x200" alt="Placeholder" />
        </template>
        <template #title>Card with Image</template>
        <p>This card includes an image at the top.</p>
        <template #footer>
          <Button variant="secondary">Learn More</Button>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import { Button, Card } from './components';

export default {
  name: 'App',
  components: {
    Button,
    Card
  }
}
</script>
