import datePicker, { PersianDate } from "@alireza-ab/vue3-persian-datepicker";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("DatePicker", datePicker);
});
