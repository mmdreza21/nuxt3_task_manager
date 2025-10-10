<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthService } from "~/composables/useAuthService";

const email = ref("");
const name = ref("");
const password = ref("");
const confirmPassword = ref("");
const loading = ref(false);
const error = ref("");
const router = useRouter();

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = "Passwords do not match.";
    return;
  }

  loading.value = true;
  error.value = "";
  try {
    const authService = useAuthService();
    const data = await authService.signUp({
      email: email.value,
      name: name.value,
      password: password.value,
    });

    if (data) router.push("/auth/login");
  } catch (err: any) {
    error.value = err?.message || "Registration failed.";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-card
    min-height="100vh"
    color="transparent"
    variant="flat"
    class="w-100 h-100 d-flex justify-center align-center"
  >
    <v-card
      color="transparent"
      class="glass-card pa-10 text-center"
      elevation="12"
      max-width="440"
      width="100%"
    >
      <h1 class="text-h4 font-weight-bold mb-6 text-light">Register</h1>

      <v-form @submit.prevent="handleRegister" class="d-flex flex-column gap-5">
        <v-text-field
          v-model="name"
          label="Name"
          type="text"
          placeholder="Enter your Name"
          required
          class="glass-input"
        />
        <v-text-field
          v-model="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
          class="glass-input"
        />

        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          required
          class="glass-input"
        />

        <v-text-field
          v-model="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          required
          class="glass-input"
        />

        <v-btn type="submit" :loading="loading" class="glass-btn" block>
          Register
        </v-btn>
      </v-form>

      <p v-if="error" class="text-error mt-3">{{ error }}</p>

      <p class="text-light mt-4">
        Already have an account?
        <NuxtLink to="/auth/login" class="text-light font-weight-medium">
          Login here
        </NuxtLink>
      </p>
    </v-card>
  </v-card>
</template>

<style scoped>
.text-error {
  color: #ef4444;
}
</style>
