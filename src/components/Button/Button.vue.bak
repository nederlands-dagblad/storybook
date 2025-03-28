<template>
  <button
    :class="[
      'btn',
      variantClass,
      sizeClass,
      { 'opacity-50 cursor-not-allowed': disabled }
    ]"
    :disabled="disabled"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'white'].includes(value)
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    variantClass() {
      // Using static classes that Tailwind can detect
      return {
        'btn-primary': this.variant === 'primary',
        'btn-secondary': this.variant === 'secondary',
        'btn-white': this.variant === 'white'
      }
    },
    sizeClass() {
      // Size classes
      return {
        'btn-sm': this.size === 'sm',
        'btn-md': this.size === 'md',
        'btn-lg': this.size === 'lg'
      }
    }
  },
  methods: {
    onClick(event) {
      this.$emit('click', event)
    }
  }
}
</script>
