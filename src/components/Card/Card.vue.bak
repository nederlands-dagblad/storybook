<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <div v-if="$slots.image" class="w-full">
      <slot name="image"></slot>
    </div>
    <div class="p-4">
      <div v-if="$slots.title" class="font-bold text-xl mb-2">
        <slot name="title"></slot>
      </div>
      <div v-if="$slots.default">
        <slot></slot>
      </div>
      <div v-if="$slots.footer" class="mt-4 pt-3 border-t border-gray-200">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card'
}
</script>
