import Card from './Card.vue';
import Button from '../Button/Button.vue';

export default {
  title: 'Components/Card',
  component: Card,
};

export const Default = () => ({
  components: { Card },
  template: `
    <Card>
      <template #title>Card Title</template>
      <p>This is the default card with just a title and content.</p>
    </Card>
  `,
});

export const WithImage = () => ({
  components: { Card },
  template: `
    <Card>
      <template #image>
        <img src="https://placehold.co/1000x600" alt="Placeholder" />
      </template>
      <template #title>Card with Image</template>
      <p>This card includes an image at the top.</p>
    </Card>
  `,
});

export const WithFooter = () => ({
  components: { Card, Button },
  template: `
    <Card>
      <template #title>Card with Footer</template>
      <p>This card has a footer section with a button.</p>
      <template #footer>
        <Button>Learn More</Button>
      </template>
    </Card>
  `,
});
