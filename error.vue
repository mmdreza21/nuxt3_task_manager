<template>
  <div class="w-100 bg-err">
    <v-container class="d-flex flex-column align-center justify-center">
      <p class="my-5">
        مشکلی پیش آمده است
        {{ error }}
        <a
          class="cursor-none"
          rel="noopener noreferrer"
          @mouseenter="handleError"
        >
          خانه
        </a>
      </p>
    </v-container>
  </div>
</template>
<script setup lang="ts">
const error = useError();
definePageMeta({
  validate({ params }) {
    return false;
  },
});
const handleError = () => {
  clearError({
    redirect: "/",
  });
  window.location.href = "/";
};
</script>

<style>
.bg-err {
  background-size: cover;
  background-position: center;
  height: 100vh;
}
</style>
