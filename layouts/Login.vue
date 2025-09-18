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
      <v-locale-provider rtl>
        <SharedSnakeBarNotife />

        <v-container fluid class="px-0 py-n1">
          <slot />
        </v-container>
      </v-locale-provider>
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
