<script setup lang="ts">
interface ICardProps {
  width?: string;
  height?: string;
  maxHeight?: string;
  maxWidth?: string;
  minWidth?: string;
  minHeight?: string;
}
const { width, height } = defineProps<ICardProps>();
</script>

<template>
  <div
    v-bind="$attrs"
    class="bluredbg"
    :style="{ width, height, maxHeight, maxWidth, minWidth, minHeight }"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.bluredbg {
  background: rgba(20, 19, 47, 0.4);
  backdrop-filter: blur(11px);
  -webkit-backdrop-filter: blur(11px);
}
</style>
