import type { Moment } from "jalali-moment";
import type { createVuetify } from "vuetify";

declare module "#app" {
  interface NuxtApp {
    $customFetch: $Fetch<unknown, NitroFetchRequest>;
    $jMoment: (d: string | number | Date | undefined) => Moment;
    $moment: (d: string | number | Date | undefined) => Moment;
    $vuetify: ReturnType<typeof createVuetify>;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $customFetch: $Fetch<unknown, NitroFetchRequest>;
    $jMoment: Moment;
    $moment: Moment;
    $vuetify: createVuetify;
  }
}

export {};
