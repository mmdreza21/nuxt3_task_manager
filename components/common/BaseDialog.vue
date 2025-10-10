<script lang="ts" setup>
const props = defineProps<{
  title: string;
  width?: string;
  color?: string;
  maxWidth?: string;
}>();
const model = defineModel<boolean>();
</script>
<template>
  <v-dialog v-model="model" :width="width" :max-width="maxWidth || '700px'">
    <v-card class="pa-5 rounded-20" :color="color || '#292546F20'">
      <div class="d-flex align-center justify-space-between">
        <h5 class="text-center">{{ title }}</h5>
        <v-btn
          icon
          class="elevation-0 transparent"
          variant="plain"
          max-width="35px"
          max-height="35px"
          @click="model = false"
        >
          <v-icon icon="close-circle"></v-icon>
        </v-btn>
      </div>
      <v-divider class="my-1"></v-divider>
      <slot />
    </v-card>
  </v-dialog>
</template>
