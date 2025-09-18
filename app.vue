<script setup lang="ts">
await useAuthService().getUser();
// await useAsyncData('user', () => store.fetchUser().then(() => true))
const err = useError();
const handleError = () => {
  clearError({
    redirect: "/404",
  });
};

const nuxtApp = useNuxtApp();
const loading = ref(false);
nuxtApp.hook("page:start", (ctx) => {
  if (!useRoute().params.slug) {
    loading.value = true;
  }
});
nuxtApp.hook("page:finish", () => {
  loading.value = false;
});

//
</script>
<template>
  <NuxtLayout>
    <div v-if="loading" class="w-100 h-100">
      <v-card
        height="91vh"
        color="transparent"
        class="bluredbg-1 d-flex align-center justify-center w-100"
      >
        <v-progress-circular
          size="large"
          color="blue"
          indeterminate
        ></v-progress-circular>
      </v-card>
    </div>
    <div id="pages" class="">
      <NuxtPage id="pages" :class="loading ? 'hide' : ''" />
    </div>
  </NuxtLayout>
</template>

<style>
.hide {
  display: none !important;
}
</style>
