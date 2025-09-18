import "vuetify/styles";
import { createVuetify, type ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { defineNuxtPlugin } from "nuxt/app";

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: "#1976D2", // Vibrant blue
    primaryBlue: "#2196F3", // Standard blue
    lightBg: "#F9FAFB", // Light background
    grayLight: "#E5E7EB", // Light gray
    grayMid: "#9CA3AF", // Medium gray
    grayDark: "#4B5563", // Dark gray
    accent: "#FFC107", // Accent yellow
    success: "#4CAF50", // Green success
    error: "#F44336", // Bright red error
    warning: "#FF9800", // Warning orange
    info: "#03A9F4", // Info light blue
    heading: "#1F2937", // Dark heading text
    body: "#374151", // Body text
    stroke: "#D1D5DB", // Light stroke outline
    buttonBg: "#E0E0E0", // Button background
    inputBg: "#F3F4F6", // Input field background
    chatUser: "#E3F2FD", // Light blue user chat bubble
    chatAdmin: "#E8F5E9", // Light green admin chat bubble
    white: "#FFFFFF", // White
    black: "#000000", // Black
  },
};

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    theme: {
      defaultTheme: "lightTheme",
      themes: {
        lightTheme,
      },
    },
    components,
    directives,
  });
  app.vueApp.use(vuetify);
  return {
    provide: {
      vuetify,
    },
  };
});
