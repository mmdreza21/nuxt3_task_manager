<script lang="ts" setup>
// import {
//   useTokenClient,
//   type AuthCodeFlowSuccessResponse,
//   type AuthCodeFlowErrorResponse,
// } from "vue3-google-signin";
// import type { OAthReq } from "~/types/UserTypes";

// let loginProses = useAuthService().loginProcess(
//   useAuthService().loginWithOAuth
// );

// const handleOnSuccess = async (response: AuthCodeFlowSuccessResponse) => {
//   await loginProses.login({ token: response.access_token });
// };

// const handleOnError = (errorResponse: AuthCodeFlowErrorResponse) => {
//   console.error("ERRor: ", errorResponse);
// };

// const { isReady, login } = useTokenClient({
//   onSuccess: handleOnSuccess,
//   onError: handleOnError,
//   // other options
// });
</script>

<template>
  <!-- <div class="">
    <v-btn
      block
      variant="tonal"
      @click="() => login()"
      :disabled="!isReady"
      :loading="loginProses.loading.value"
      ><img
        class="mx-2"
        height="20px"
        src="~/assets/icons/svgs/google.svg"
      />ادامه با گوگل
    </v-btn>
    <!-- <GoogleSignInButton block /> -->
  <!-- </div> -->
  -->
</template>

<style scoped></style>
