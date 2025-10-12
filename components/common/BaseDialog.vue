<script lang="ts" setup>
import { useDisplay } from "vuetify";
import { ref, watch, computed } from "vue";

const props = defineProps<{
  modelValue: boolean;
  title?: string;
  width?: string;
  color?: string;
  maxWidth?: string;
  icon?: { dark: string; light: string };
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const dialogModel = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => (dialogModel.value = val)
);
watch(dialogModel, (val) => emit("update:modelValue", val));

const display = useDisplay();
const isMobile = computed(() => display.mdAndDown.value);
</script>

<template>
  <v-dialog
    v-model="dialogModel"
    :max-width="maxWidth || '700px'"
    :fullscreen="isMobile"
    :hide-overlay="isMobile"
    transition="dialog-bottom-transition"
  >
    <div :class="isMobile ? 'dialog-wrapper' : ''">
      <v-card
        class="pa-6 rounded-16 glass-card"
        :class="isMobile ? 'bottom-card' : ''"
        color="transparent"
        elevation="0"
      >
        <!-- Header -->
        <div class="d-flex align-center justify-space-between">
          <div class="d-flex align-center justify-start">
            <span
              class="dialog-title mx-2 text-light"
              v-html="props.title"
            ></span>
          </div>

          <v-icon
            color="rgba(255,255,255,0.65)"
            class="cursor-pointer"
            @click="dialogModel = false"
          >
            mdi-close
          </v-icon>
        </div>

        <!-- Divider -->
        <v-divider class="my-4" color="rgba(255,255,255,0.2)" />

        <!-- Content -->
        <div class="dialog-content">
          <slot />
        </div>
      </v-card>
    </div>
  </v-dialog>
</template>

<style scoped>
.dialog-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  width: 100%;
  padding: 0;
  margin-bottom: 16px;
}

.bottom-card {
  width: 90%;
  max-width: 700px;
  margin: 0 auto;
  padding: 32px;
}

/* Typography */
.dialog-title {
  font-size: 18px;
  font-weight: 600;
}

/* Content Area */
.dialog-content {
  margin-top: 12px;
}

/* Optional fade-in animation for glass effect */
.glass-card {
  animation: fadeInGlass 0.4s ease-in-out;
}

@keyframes fadeInGlass {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
