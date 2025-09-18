import moment from "moment/min/moment-with-locales";

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      moment: (d: string | number | Date | undefined) => moment(d).locale("fa"),
    },
  };
});
