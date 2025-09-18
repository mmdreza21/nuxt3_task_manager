export default defineNuxtRouteMiddleware(async (to, from) => {
  await useAuthService().getUser();
  const auth = useAuthUser();
  if (!auth.getUserState.loggedIn && !auth.getUserState.user) {
    const route = useRoute();
    return navigateTo(`/login?noAccess=${route.fullPath}`);
  }
  // if (to.path !== '/dashboard') {
  //   return navigateTo('/dashboard')
  // }
});
