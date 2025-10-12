<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthService } from "~/composables/useAuthService";

const { fireNotification } = useNotification();
const authService = useAuthService();

const user = ref<{ name: string; email: string } | null>(null);
const loading = ref(false);
const passwordData = ref({
  oldPassword: "",
  newPassword: "",
});
const saving = ref(false);

const getUser = async () => {
  loading.value = true;
  try {
    const res = await authService.getProfile();
    user.value = res;
  } catch (err: any) {
    fireNotification(err.message || "Failed to load profile", "error");
  } finally {
    loading.value = false;
  }
};

const changePassword = async () => {
  if (!passwordData.value.oldPassword || !passwordData.value.newPassword) {
    fireNotification("Please fill all fields", "error");
    return;
  }

  saving.value = true;
  try {
    await authService.changePassword(passwordData.value);
    fireNotification("Password changed successfully", "success");
    passwordData.value = { oldPassword: "", newPassword: "" };
  } catch (err: any) {
    fireNotification(err.message || "Failed to change password", "error");
  } finally {
    saving.value = false;
  }
};
function logout() {
  const token = useCookie("Authorization");
  token.value = "";
  navigateTo("/auth/login");
}

onMounted(() => {
  getUser();
});
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
      max-width="500"
      width="100%"
    >
      <h1 class="text-h4 font-weight-bold mb-6 text-light">Profile</h1>

      <div v-if="user" class="text-light mb-8">
        <p class="text-body-1 mb-2"><strong>Name:</strong> {{ user.name }}</p>
        <p class="text-body-1"><strong>Email:</strong> {{ user.email }}</p>
      </div>

      <v-divider class="my-6"></v-divider>

      <h2 class="text-h6 mb-4 text-light">Change Password</h2>

      <v-form @submit.prevent="changePassword" class="d-flex flex-column gap-5">
        <v-text-field
          v-model="passwordData.oldPassword"
          label="Old Password"
          type="password"
          placeholder="Enter your current password"
          required
          class="glass-input"
        />

        <v-text-field
          v-model="passwordData.newPassword"
          label="New Password"
          type="password"
          placeholder="Enter a new password"
          required
          class="glass-input"
        />

        <v-btn type="submit" :loading="saving" class="glass-btn mt-3" block>
          Update Password
        </v-btn>

        <v-btn class="glass-btn-danger mt-4" size="large" block @click="logout">
          Logout
        </v-btn>
      </v-form>
    </v-card>
  </v-card>
</template>
