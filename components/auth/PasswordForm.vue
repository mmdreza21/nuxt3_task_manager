<script setup lang="ts">
import { useAuthService } from "#imports";
import type { ILoginProcess, LoginStates } from "~/types/LoginTypes";
import type { UserLoginData } from "~/types/UserTypes";

const states = useState<LoginStates>("states");
const state: Ref<string> = useState("state");

const emailState = useState<string>("email");
const password = ref();
const showPass = ref(false);

let { loading, login }: ILoginProcess = useAuthService().loginProcess(
  useAuthService().loginWithPass
);

function submit() {
  const credentials: UserLoginData = {
    email: emailState.value,
    password: password.value,
  };
  login(credentials);
}
</script>

<template>
  <v-card color="transparent" flat class="">
    <div
      class="w-100 h-100 d-flex align-start flex-column justify-space-between"
    >
      <VeeForm @submit.prevent="submit" as="v-form" class="w-100">
        <v-card-title class="my-2 px-0 text-14px">
          <p>لطفا رمز عبور خود را وارد کنید</p>
        </v-card-title>
        <CommonTextField
          class="rounded-xl"
          bg-color="gray500"
          v-model="password"
          :type="showPass ? 'password' : 'text'"
          placeholder="رمز عبور"
          name="رمز عبور"
          rules="required"
          :append-inner-icon="!showPass ? 'mdi-eye-off' : 'mdi-eye'"
          @click:appendInner="showPass = !showPass"
        />
      </VeeForm>
      <v-card-action class="w-100">
        <div
          class="d-flex d-flex flex-wrap jus align-center justify-center justify-sm-space-between mb-3 mt-5"
        >
          <v-btn variant="plain" @click="state = states.forgetPass"
            >رمز عبور خود را فراموش کرده اید ؟</v-btn
          >
          <v-btn
            variant="plain"
            class="border-bottom rounded-0"
            @click="state = states.otp"
            >ورود با رمز یکبار مصرف</v-btn
          >
        </div>
        <!-- todo test here if it works -->
        <CommonPrimaryButton
          :loading="loading"
          :disabled="loading"
          width="100%"
          @click="submit"
          text="ورود"
        />
      </v-card-action>
    </div>
  </v-card>
</template>
