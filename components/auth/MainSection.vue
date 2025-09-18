<script setup lang="ts">
import type { LoginStates } from "@/types/LoginTypes";
import type { LocationQueryValue } from "vue-router";
const states: Ref<LoginStates> = useState<LoginStates>("states", () => {
  return {
    loginEmail: "loginEmail",
    otp: "otp",
    setReSetPass: "setReSetPass",
    forgetPass: "forgetPass",
    reset: "reset",
    password: "password",
  };
});
const notAllowedStates: string[] = [
  states.value.setReSetPass,
  states.value.setReSetPass,
  states.value.setReSetPass,
  states.value.otp,
  states.value.password,
];

const state: Ref<string> = useState("state", (): string => {
  return states.value.loginEmail;
});
const route = useRoute();
const router = useRouter();

watch(
  () => state.value,
  (newVal) => {
    router.push({ name: route.name as string, query: { state: newVal } });
  }
);
watch(
  () => route.query.state,
  (newVal: any) => {
    if (newVal) {
      if (
        !notAllowedStates.includes(newVal as string) &&
        useState("email").value
      ) {
        state.value = newVal;
      }
    } else {
      state.value = states.value.loginEmail;
    }
  },
  { immediate: true }
);
</script>
<template>
  <v-card
    color="transparent"
    flat
    height="100vh"
    width="100%"
    class="d-flex align-center justify-center flex-column"
  >
    <CommonLogoCyc />
    <v-card
      :min-width="$vuetify.display.mdAndDown ? '350px' : '480px'"
      max-width="350px"
      min-height="390px"
      color="#262546"
      class="my-10 py-2 d-flex justify-center rounded-xl flex-column"
    >
      <div class="mx-4 my-2 d-flex align-center justify-end">
        <v-btn
          :to="$route.query.redirectUrl as string || '/'"
          variant="plain"
          color="transparent"
          elevation="0"
          ><CommonIconsax class="text-gray100" icon="close-circle"
        /></v-btn>
      </div>
      <div class="d-flex align-center justify-center w-100">{{ state }}</div>
      <v-card-text class="d-flex flex-column justify-center">
        <AuthLoginEmailForm v-if="state === states.loginEmail" />
        <AuthOtpForm v-if="state === states.otp" />
        <AuthPasswordForm v-if="state === states.password" />
        <AuthPassForgetEmail v-if="state === states.forgetPass" />
        <AuthPassSetResetForm v-if="state === states.setReSetPass" />
      </v-card-text>
    </v-card>
  </v-card>
</template>

<style scoped></style>
