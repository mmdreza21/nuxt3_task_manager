<script>
export default {
  data() {
    return {};
  },
};
</script>

<template>
  <v-app>
    <div class="d-flex flex-column">
      <v-main class="w-100">
        <slot />
      </v-main>
    </div>
  </v-app>
</template>
<style></style>
