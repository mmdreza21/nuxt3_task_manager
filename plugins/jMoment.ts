import moment from "jalali-moment";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("jMoment", (d: string | number | Date | undefined) =>
    moment(d).locale("fa")
  );
});
