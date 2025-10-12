<script setup lang="ts">
const auth = useAuthUser();

const userState = computed(() => auth.getUserState);

// Option 2 — Destructure with reactivity (using storeToRefs)
// const { getUserState } = storeToRefs(useAuthUser());
</script>

<template>
  <div class="auth-section">
    <!-- Logged out -->
    <div v-if="!userState.loggedIn">
      <v-btn
        v-if="$vuetify.display.mdAndUp"
        text="Login | Sing Up"
        class="glass-btn"
        to="/auth/login"
      />
      <v-btn to="/auth/login" v-else variant="plain" class="glass-icon-btn">
        <v-icon>mdi-account-outline</v-icon>
      </v-btn>
    </div>

    <!-- Logged in -->
    <div v-else>
      <v-btn
        v-if="$vuetify.display.mdAndUp"
        to="/profile/info"
        :text="
          userState.user?.name
            ? userState.user.name
            : userState.user?.email
            ? userState.user.email.split('@')[0]
            : 'ناحیه کاربری'
        "
        class="glass-btn"
      />
      <v-btn to="/profile/info" v-else variant="plain" class="glass-icon-btn">
        <v-icon icon="user" type="outline" />
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.auth-section {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 🌫️ Frosted glass button style */
.glass-btn {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background: linear-gradient(
    135deg,
    rgba(25, 118, 210, 0.3),
    rgba(66, 165, 245, 0.25)
  );
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #fff !important;
  text-transform: none;
  font-weight: 600;
  border-radius: 12px;
  padding: 10px 24px;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(25, 118, 210, 0.2);
}

.glass-btn:hover {
  background: linear-gradient(135deg, #42a5f5, #1976d2);
  box-shadow: 0 0 35px rgba(25, 118, 210, 0.6);
  transform: translateY(-2px);
}

/* 👤 Icon-only version (mobile) */
.glass-icon-btn {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #fff !important;
  border-radius: 10px;
  transition: all 0.3s ease;
  padding: 8px 12px;
}

.glass-icon-btn:hover {
  background: rgba(66, 165, 245, 0.25);
  box-shadow: 0 0 25px rgba(66, 165, 245, 0.4);
}
</style>
