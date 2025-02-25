import Button from './Button/Button.vue';
import Card from './Card/Card.vue';

export {
  Button,
  Card
};

export default {
  install(app) {
    app.component('Button', Button);
    app.component('Card', Card);
  }
};
