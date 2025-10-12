<script setup lang="ts">
let { snackbar, snackbarColor, snakeBarTexts, fireNotification } =
  useNotification();

const snake = ref(snackbar);
watch(
  () => snake,
  (val) => {
    snackbar = val;
  }
);
</script>

<template>
  <div>
    <!-- <b>
      {{ snake }}---{{ snackbar }}---{{ snackbarColor }}---------{{
        snakeBarTexts
      }}
    </b>
    <v-btn variant="elevated" @click="fireNotification('red', 'hi')"></v-btn> -->
    <v-snackbar
      location="top right"
      :color="snackbarColor"
      top
      :offset="[100, 20, 20, 20]"
      variant="elevated"
      v-model="snake"
      :timeout="3000"
    >
      <div class="d-flex align-center justify-center w-100 h-100">
        {{ snakeBarTexts }}
      </div>
    </v-snackbar>
  </div>
</template>
