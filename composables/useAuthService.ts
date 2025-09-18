import type { SuccessLogin, UserLoginData, UserType } from "~/types/UserTypes";

// "Golden Order" - ensuring secure cookies for the Elden Ring journey
export const useAuthService = () => {
  const backUrlCookie: Ref<string> = useCookie("backUrlCookie", {
    sameSite: "lax",
    secure: true,
    maxAge: 31536000,
  });

  const csrfToken: Ref<string> = useCookie("csrf_token", {
    sameSite: "lax",
    secure: false,
    maxAge: 31536000,
  });
  const AuthorizationCookies: Ref<string | null> = useCookie("Authorization", {
    sameSite: "lax",
    secure: false,
    maxAge: 31536000,
  });

  const config = useRuntimeConfig();

  const baseAuthUrl = config.public.BASEURL;
  // const baseAuthUrl = "https://api.cycfx.com";

  // const { fireNotification } = useNotification();

  class AuthService {
    // "Tarnished seeking the Elden Ring" - prepare for checking user authentication
    async getUser(): Promise<{ loggedIn: boolean; error: any }> {
      const AuthorizationCookies: Ref<string | null> =
        useCookie("Authorization");
      const userStore = useAuthUser();
      const res: { loggedIn: boolean; error: any } = {
        loggedIn: false,
        error: {},
      };
      try {
        // "Grace bestowed upon the Tarnished" - gathering user data from the backend
        const data = await useNuxtApp().$customFetch<UserType>(
          "/auth/login",
          {}
        );
        userStore.addUser(data.data);
        res.loggedIn = true;
        return res;
      } catch (error: any) {
        // "Fell by the hand of a demigod" - handling error in user fetch
        // AuthorizationCookies.value = null;
        res.error = error;
        res.loggedIn = false;
        return res;
      }
    }

    async loginWithPass(credentials: UserLoginData): Promise<any> {
      const data = await useNuxtApp().$customFetch<
        SuccessLogin | null | undefined
      >("/auth", { method: "POST", body: credentials });

      console.log(data);

      AuthorizationCookies.value = "Bearer " + data.accessToken;

      location.assign(backUrlCookie.value || "/");

      return { data };
    }

    // async loginWithOAuth(
    //   credentials: OAthReq
    // ): Promise<{ data: SuccessLogin | null | undefined; error: any }> {
    //   const { data, error } = await useAPIFetch<
    //     SuccessLogin | null | undefined
    //   >("/auth/login", { method: "POST", body: credentials });

    //   const res: { data: SuccessLogin | null | undefined; error: any } = {
    //     data: data.value,
    //     error,
    //   };

    //   return res;
    // }

    // async sendOtp(
    //   credentials: SendOtp
    // ): Promise<{ data: SuccessLogin | null | undefined; error: any }> {
    //   const { data, error } = await useAPIFetch<
    //     SuccessLogin | null | undefined
    //   >("/auth/otp", { method: "POST", body: credentials });

    //   const res: { data: SuccessLogin | null | undefined; error: any } = {
    //     data: data.value,
    //     error,
    //   };

    //   return res;
    // }

    // async loginWithOtp(
    //   credentials: UserOtpLoginData
    // ): Promise<{ data: SuccessLogin | null | undefined; error: any }> {
    //   const { data, error } = await useAPIFetch<
    //     SuccessLogin | null | undefined
    //   >("/auth/login", { method: "POST", body: credentials });

    //   const res: { data: SuccessLogin | null | undefined; error: any } = {
    //     data: data.value,
    //     error,
    //   };

    //   return res;
    // }

    //   loginProcess(method: Function): ILoginProcess {
    //     const authCookie: Ref<string> = useCookie("Authorization", {
    //       sameSite: "strict",
    //       secure: true,
    //       maxAge: 31536000,
    //     });

    //     const states = useState<LoginStates>("states");
    //     const state: Ref<string> = useState("state");
    //     const router = useRouter();
    //     const route = useRoute();

    //     const loading = ref(false);

    //     const emailState = useState<string>("email");

    //     async function login(credentials: LoginCredentials): Promise<void> {
    //       loading.value = true;
    //       try {
    //         const data = await method(credentials);
    //         if (data.error.value) {
    //           fireNotification("red", "اطلاعات وارد شده اشتباه است!");
    //         } else {
    //           authCookie.value = `${data.data?.token_type}  ${data.data?.access_token}`;
    //           await new Promise((resolve) => setTimeout(resolve, 1000));
    //           const userData = await useAuthService().getUser();
    //           if (userData.loggedIn) {
    //             router.push((route.query.redirectUrl as string) ?? "/");
    //           } else if (data.error.value) {
    //             fireNotification("red", "اطلاعات توکن اشتباه است");
    //           }
    //         }
    //       } catch (error: any) {
    //        console.error(error);
    //       } finally {
    //         loading.value = false;
    //       }
    //     }
    //     return {
    //       authCookie,
    //       states,
    //       state,
    //       loading,
    //       emailState,
    //       fireNotification,
    //       login,
    //     };
    //   }
  }
  return new AuthService();
};
