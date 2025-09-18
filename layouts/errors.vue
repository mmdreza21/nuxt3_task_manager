<script>
export default {
  data() {
    return {};
  },
};
</script>

<template>
  <v-app>
    <div class="bg">
      <v-locale-provider class="py-0" rtl>
        <SharedHeaderAppHeader />
        <SharedSnakeBarNotife />
        <v-main class="w-100">
          <slot />
        </v-main>
        <SharedFooter v-if="!$route.name.split('-').includes('gofteman')" />
      </v-locale-provider>
    </div>
  </v-app>
</template>
<style>
.bg {
  background-image: url("/img/home/newImeges/Homepage.svg");
  background-size: cover;
  background-position: center;
}
</style>
