export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthUser();
  if (auth.getUserState.loggedIn) {
    return navigateTo("/?loggedIn", {
      redirectCode: 301,
      external: true,
      replace: true,
    });
  }
});
