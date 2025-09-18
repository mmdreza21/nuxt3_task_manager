export default defineNuxtRouteMiddleware((to, from) => {
  async function getUser() {
    await useAuthService().getUser();
  }
  getUser();
});
