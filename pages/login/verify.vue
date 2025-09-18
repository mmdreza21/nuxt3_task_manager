<script setup lang="ts">
const { status } = await useAsyncData<void>(
  "channelPosts",
  () => {
    return useAuthService().getToken();
  },
  { server: false, lazy: true }
);
const router = useRouter();
if (status.value === "success") {
  router.push("/");
} else {
  useNotification().fireNotification(
    "red",
    "ورود با شکست مواجه شد لطفا دوباره امتحان کنید!"
  );
  setTimeout(() => {
    router.push("/");
  }, 3000);
}
// onMo
</script>

<template>
  <v-card
    height="50vh"
    color="transparent"
    class="bluredbg-1 d-flex align-center justify-center w-100"
  >
    <!-- {{  }} -->
    <v-progress-circular
      size="large"
      color="blue"
      indeterminate
    ></v-progress-circular>
  </v-card>
</template>
