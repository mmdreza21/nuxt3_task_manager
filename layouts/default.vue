<script setup lang="ts">
import { set } from "lodash";
import { ref } from "vue";

/* current background index */
const currentBg = ref(3);
const totalBgs = 10;

/* computed image URL */
const bgImage = computed(() => `/img/background/img${currentBg.value}.jpg`);

/* function to cycle backgrounds */
function nextBackground() {
  currentBg.value = (currentBg.value % totalBgs) + 1;
}
onMounted(() => {
  setTimeout(() => {
    nextBackground();
  }, 1);
});
</script>

<template>
  <v-app>
    <div
      class="bg-login"
      :style="{
        backgroundImage: `url('${bgImage}')`,
      }"
    >
      <LayoutHeader @change-bg="nextBackground" />
      <CommonSnakeBarNotife />
      <slot />
    </div>
  </v-app>
</template>

<style>
.bg-login {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-image 0.8s ease-in-out;
  min-height: 100vh;
  min-height: 100vh !important;
}
</style>
