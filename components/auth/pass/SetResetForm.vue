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

const showPasswordRules = ref(false);
const showPass = ref(true);
const password = ref();
const emailState = useState<string>("email");
async function login() {
  if (showPasswordRules) {
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
}

const rules = {
  required: (value: string) => !!value || "الزامی.",
  counter: (value: string) =>
    (value && value.length >= 8) || "رمز عبور باید حداقل ۸ کاراکتر باشد",

  upperLowerCase: (value: string) => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])/;
    return pattern.test(value) || "رمز عبور باید حداقل شامل یک حرف بزرگ باشد";
  },
};
</script>

<template>
  <v-card color="transparent" flat class="">
    <v-snackbar
      location="top right"
      color="red"
      top
      :offset="[100, 20, 20, 20]"
      variant="outlined"
      v-model="snackbar"
      :timeout="3000"
      >اطلاعات وارد شده اشتباه است!</v-snackbar
    >
    <div
      class="w-100 h-100 d-flex align-start flex-column justify-space-between"
    >
      <VeeForm
        @submit.prevent="login"
        as="v-form"
        class="w-100 h-100 d-flex justify-space-between flex-column"
      >
        <v-card-title class="my-2 px-0 text-14px">
          <p>لطفا رمز عبور خود را وارد کنید</p>
        </v-card-title>
        <v-card height="100px" flat color="transparent">
          <v-text-field
            variant="outlined"
            class="rounded-xl w-100 my-2"
            density="compact"
            bg-color="gray500"
            v-model="password"
            hide-details
            :rules="[rules.required, rules.counter, rules.upperLowerCase]"
            :type="showPass ? 'password' : 'text'"
            placeholder="رمز عبور"
            name="رمز عبور"
            :append-inner-icon="!showPass ? 'mdi-eye-off' : 'mdi-eye'"
            @click:appendInner="showPass = !showPass"
            @blur="showPasswordRules = false"
            @focus="showPasswordRules = true"
          />
          <!-- <v-text-field
            variant="outlined"
            class="rounded-xl w-100"
            density="compact"
            @input="verifyPass"
            bg-color="gray500"
            v-model="rePassword"
            :type="showPass ? 'password' : 'text'"
            placeholder="تاییدیه رمز عبور "
            :append-inner-icon="!showPass ? 'mdi-eye-off' : 'mdi-eye'"
            @click:appendInner="showPass = !showPass"
          /> -->
        </v-card>
        <v-card v-show="showPasswordRules" flat dense color="transparent">
          <v-list-item>
            <v-list-item-icon>
              <v-icon v-if="rules.counter(password) == true" color="green">
                mdi-check-bold
              </v-icon>
              <v-icon v-else color="red"> mdi-close-thick </v-icon>
            </v-list-item-icon>
            <v-list-item-content> حداقل ۸ کاراکتر باشد </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon
                v-if="rules.upperLowerCase(password) == true"
                color="green"
              >
                mdi-check-bold
              </v-icon>
              <v-icon v-else color="red"> mdi-close-thick </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              ترکیبی از حروف کوچک و بزرگ باشد
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <!-- <span class="text-red" v-if="!verified">
          رمز عبور وارد شده با رمز عبور تاییدی مطابقت ندارد
        </span> -->
      </VeeForm>
      <v-card-action class="w-100 mt-3">
        <CommonPrimaryButton
          :loading="loading"
          :disabled="loading"
          width="100%"
          @click="login"
          text="ورود"
        />
      </v-card-action>
    </div>
  </v-card>
</template>
