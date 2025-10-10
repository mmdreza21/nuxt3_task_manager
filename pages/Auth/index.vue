<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
router.replace("/auth/login");
</script>
<template>
  <div class="auth-home">
    <h1>Welcome!</h1>
    <NuxtLink to="/auth/login">Login</NuxtLink>
    <NuxtLink to="/auth/register">Register</NuxtLink>
  </div>
</template>
