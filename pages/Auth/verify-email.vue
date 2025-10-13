<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useUserService } from "~/composables/useUserService";
import { useNotification } from "~/composables/useNotification";

const status = ref<"loading" | "success" | "error">("loading");
const resendVerificationBtn = ref(true);

const route = useRoute();
const { fireNotification } = useNotification();
const userService = useUserService();

const token = route.query.token as string;
onMounted(async () => {
  if (!token) {
    status.value = "error";
    fireNotification("error", "Invalid or missing token.");
    return;
  }

  try {
    await userService.verifyEmail(token);
    status.value = "success";
    fireNotification("success", "Your email has been successfully verified!");
  } catch (error) {
    console.error(error);
    status.value = "error";
    fireNotification("error", "Verification link is invalid or expired.");
  }
});

const email = route.query.email as string;
async function resendVerification() {
  try {
    await userService.reSendVerificationEmail(email);
    resendVerificationBtn.value = false;
    // fireNotification("success", "Verification email sent successfully!");
    useRouter().push("/auth/login");
  } catch (error) {
    console.error(error);
    fireNotification("error", "Failed to resend verification email.");
  }
}
</script>

<template>
  <v-container
    class="h-90vh d-flex flex-column justify-center align-center text-center mt-16"
  >
    <!-- Loading State -->
    <v-card
      v-if="status === 'loading'"
      class="pa-6 text-center glass-card"
      elevation="6"
      width="500px"
    >
      <v-progress-circular indeterminate color="primary" size="64" />
      <p class="mt-4">Verifying your email...</p>
    </v-card>

    <!-- Success State -->
    <v-card
      v-else-if="status === 'success'"
      class="pa-6 text-center glass-card"
      elevation="6"
      width="500px"
    >
      <v-icon size="64" color="success">mdi-check-circle-outline</v-icon>
      <h2 class="mt-4">Email verified successfully 🎉</h2>
      <v-btn color="primary" class="mt-4" to="/auth/login"> Go to Login </v-btn>
    </v-card>

    <!-- Error State -->
    <v-card
      v-else-if="status === 'error'"
      class="pa-6 text-center glass-card"
      elevation="6"
      width="500px"
    >
      <v-icon size="64" color="error">mdi-alert-circle-outline</v-icon>
      <h2 class="mt-4">Invalid or expired verification link ❌</h2>
      <v-btn
        v-if="resendVerificationBtn"
        color="primary"
        class="mt-4"
        @click="resendVerification"
      >
        Resend Verification Email
      </v-btn>
    </v-card>
  </v-container>
</template>

<style scoped>
.h-90vh {
  min-height: 90vh;
}
</style>
