<script setup lang="ts">
import type { LoginStates } from "~/types/LoginTypes";
import type { UserLoginData } from "~/types/UserTypes";

let state: Ref<string> = useState("state");
let states = useState<LoginStates>("states");
let snackbar: Ref<boolean> = ref(false);
const emailState = useState<string>("email");

const email = ref();
async function login() {
  try {
    const credentials: UserLoginData = {
      email: email.value,
      password: "",
    };
    emailState.value = email.value;

    const data = await useAuthService().loginWithPass(credentials);

    if (data.error.value.statusCode === 401) {
      // user found
      state.value = states.value.password;
    } else if (data.error.value.statusCode === 403) {
      // inactive
    } else if (data.error.value.statusCode === 404) {
      // user not found
      snackbar.value = true;
      state.value = states.value.password;
    }
  } catch (error: any) {
    console.error(error);
  }
}
</script>

<template>
  <v-card
    color="transparent"
    flat
    class="d-flex align-center justify-space-between flex-column h-100"
  >
    <v-snackbar
      location="top right"
      color="red"
      top
      :offset="[100, 20, 20, 20]"
      variant="outlined"
      v-model="snackbar"
      :timeout="3000"
      >شما ثبت نام نکرده اید!</v-snackbar
    >
    <div class="w-100">
      <v-card-title class="my-2 px-0 text-14px">
        <p>لطفا ایمیل خود را وارد کنید</p>
      </v-card-title>
      <VeeForm v-slot="{ meta }" @submit.prevent="login" as="v-form" class="">
        <CommonTextField
          class="rounded-xl"
          bg-color="gray500"
          v-model="email"
          type="email"
          placeholder="ایمیل/شماره مبایل"
          name="ایمیل"
          rules="required|emailOrPhone"
        />
        <CommonPrimaryButton
          :disabled="!meta.valid"
          width="100%"
          @click="login"
          text="ورود"
          class="mt-8"
        />
      </VeeForm>
      <v-card-action class="w-100 mt-10">
        <div class="fade_rule my-6"></div>
        <AuthOAuthLogin />
      </v-card-action>
    </div>
  </v-card>
</template>

<style scoped>
.fade_rule {
  height: 1px;
  background-color: #e6e6e6;
  width: 100%;
  margin: 0 auto;
  background-image: -o-linear-gradient(to left instead of right);
  background-image: -moz-linear-gradient(
    left,
    #e6e6e6 1%,
    white 50%,
    #e6e6e6 99%
  );
  background-image: -webkit-linear-gradient(
    left,
    #e6e6e6 1%,
    white 50%,
    #e6e6e6 99%
  );
  background-image: -webkit-gradient(
    linear,
    right bottom,
    left bottom,
    color-stop(0.01, gray),
    color-stop(0.5, white),
    color-stop(0.9, gray)
  );
}
</style>
