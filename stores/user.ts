import type { AuthStoreType, UserType } from "~/types/UserTypes";

export const useAuthUser = defineStore("AuthUser", {
  state(): AuthStoreType {
    return {
      user: null,
      loggedIn: false,
    };
  },

  getters: {
    getUserState(): AuthStoreType {
      return {
        user: this.user,
        loggedIn: this.loggedIn,
      };
    },
  },

  actions: {
    addUser(user: UserType) {
      this.user = user;
      this.loggedIn = true;
    },
  },
});
