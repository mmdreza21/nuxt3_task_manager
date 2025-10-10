<script>
export default {
  data() {
    return {};
  },
};
</script>

<template>
  <v-app>
    <div class="bg-login">
      <layout-header />
      <SharedSnakeBarNotife />
      <slot />
    </div>
  </v-app>
</template>
<style scoped>
.bg-login {
  background-image: url("/img/login/back.svg");
  background-size: cover;
  background-position: center;
}
</style>
