<template>
  <div class="collapsed-card border rounded-lg shadow-sm overflow-hidden">
    <div 
      class="collapsed-card-header p-4 flex justify-between items-center cursor-pointer"
      @click="toggleCollapse"
    >
      <div class="font-medium text-lg">
        <slot name="header">{{ title }}</slot>
      </div>
      <div class="transform transition-transform" :class="{ 'rotate-180': !isCollapsed }">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </div>
    <div 
      v-show="!isCollapsed"
      class="collapsed-card-content p-4 border-t"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollapsedCard',
  props: {
    title: {
      type: String,
      default: 'Card Title'
    },
    collapsed: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isCollapsed: this.collapsed
    }
  },
  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
      this.$emit('toggle', this.isCollapsed);
    }
  },
  watch: {
    collapsed(newValue) {
      this.isCollapsed = newValue;
    }
  }
}
</script>
