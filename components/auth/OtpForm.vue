<script setup lang="ts">
import type { ILoginProcess, LoginStates } from "~/types/LoginTypes";
import type { UserLoginData, UserOtpLoginData } from "~/types/UserTypes";

const states = useState<LoginStates>("states");
const state: Ref<string> = useState("state");

onMounted(() => {
  init();
});

const emailState = useState<string>("email");
const otp = ref();

let { loading, login, fireNotification }: ILoginProcess =
  useAuthService().loginProcess(useAuthService().loginWithPass);
let snackbar = ref(false);

async function submit() {
  const credentials: UserOtpLoginData = {
    email: emailState.value,
    otp: otp.value,
  };
  login(credentials);
}

let timerInterval: any;
let timerRunning = false;
let secondsLeft = 0;

const timerDisplay = ref();

function startTimer(durationInSeconds: number) {
  reSendDis.value = true;
  let endTime = Date.now() + durationInSeconds * 1000;

  function updateTimer() {
    let timeLeft = Math.max(endTime - Date.now(), 0);
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    timerDisplay.value = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerRunning = false;
      reSendDis.value = false;
    }
  }

  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}

async function sendOtp() {
  const data = await useAuthService().sendOtp({ email: emailState.value });
  if (!data.error.value) {
    fireNotification("blue", `otp برای شما ارسال شد`);
  }
  try {
  } catch (error) {
    console.error(error);
  }
}

const reSendDis = ref(false);
function init() {
  if (!timerRunning) {
    sendOtp();
    secondsLeft = 1; // Set the timer duration in seconds (2 minutes in this case)
    startTimer(secondsLeft);
  } else {
    clearInterval(timerInterval);
    timerRunning = false;
  }
}
</script>

<template>
  <v-card color="transparent" flat class="">
    <div
      class="w-100 h-100 d-flex align-start flex-column justify-space-between"
    >
      <v-form @submit.prevent="submit" class="w-100">
        <v-card-title
          class="my-2 px-0 text-14px d-flex align-center justify-center flex-column"
        >
          <p>لطفا کد 5 رقمی ارسال شده را وارد نمایید</p>
          <v-otp-input dir="ltr" length="5" :model-value="otp"></v-otp-input>
        </v-card-title>
      </v-form>
      <v-card-action class="w-100">
        <div
          class="d-flex d-flex flex-wrap jus align-center justify-center justify-sm-space-between mb-10 mt-n4"
        >
          <v-btn :disabled="reSendDis" variant="text" @click="init"
            >ارسال مجدد
            <!-- {{ reSendDis }} -->
            <span v-if="reSendDis"> {{ timerDisplay }} </span>
          </v-btn>
          <v-btn variant="text" @click="state = states.password"
            >ورود با رمز عبور
          </v-btn>
        </div>
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
