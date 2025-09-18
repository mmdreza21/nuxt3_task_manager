<script setup lang="ts">
import type { LoginStates } from "~/types/LoginTypes";
import type { SendOtp } from "~/types/UserTypes";

let state: Ref<string> = useState("state");
let states = useState<LoginStates>("states");

const snackbar: Ref<boolean> = ref(false);
const snackbarColor: Ref<string> = ref("red");
const snakeBarTexts: Ref<string> = ref("");
const loading = ref(false);
function callSnakeBar(snackbarColorProp: string, snakeBarTextsProp: string) {
  snackbar.value = true;
  snackbarColor.value = snackbarColorProp;
  snakeBarTexts.value = snakeBarTextsProp;
}

const emailState = useState<string>("email");
async function login() {
  loading.value = true;
  try {
    const credentials: SendOtp = {
      email: emailState.value,
    };
    const data = await useAuthService().sendOtp(credentials);
    if (!data.error.value) {
      callSnakeBar("blue", "otp برای شما ارسال شد");
      state.value = states.value.otp;
    }
  } catch (error: any) {
    console.error(error);
  } finally {
    loading.value = false;
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
      :color="snackbarColor"
      top
      :offset="[100, 20, 20, 20]"
      variant="outlined"
      v-model="snackbar"
      :timeout="3000"
      >{{ snakeBarTexts }}</v-snackbar
    >
    <div class="w-100">
      <v-card-title class="my-2 px-0 text-14px">
        <p>لطفا ایمیل خود را وارد کنید</p>
      </v-card-title>
      <VeeForm @submit.prevent="login" as="v-form" class="">
        <CommonTextField
          class="rounded-xl"
          bg-color="gray500"
          v-model="emailState"
          type="email"
          placeholder="ایمیل "
          name="ایمیل"
          rules="required|email"
        />
      </VeeForm>
      <v-card-action class="w-100 mt-10">
        <div
          class="d-flex flex-wrap jus align-center justify-center justify-sm-space-between mt-2 mb-12"
        >
          <v-btn variant="text" @click="state = states.loginEmail"
            >بازگشت به صفحه ورود</v-btn
          >
        </div>
        <CommonPrimaryButton width="100%" @click="login" text="ورود" />
      </v-card-action>
    </div>
  </v-card>
</template>
