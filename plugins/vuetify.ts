import "vuetify/styles";
import { createVuetify, type ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { defineNuxtPlugin } from "nuxt/app";
import "@mdi/font/css/materialdesignicons.css";

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    // 🌈 Primary System
    primary: "#3B82F6", // Blue 500
    primaryLight: "#60A5FA", // Blue 400
    primaryDark: "#1E40AF", // Blue 900
    secondary: "#64748B", // Slate 500
    accent: "#A855F7", // Purple accent

    // ✅ State Colors
    success: "#10B981", // Emerald 500
    info: "#38BDF8", // Sky 400
    warning: "#FBBF24", // Amber 400
    error: "#EF4444", // Red 500

    // ⚙️ Neutral Grays (for surfaces & text)
    white: "#FFFFFF",
    black: "#0F172A", // Very dark navy-black
    gray50: "#F9FAFB",
    gray100: "#F3F4F6",
    gray200: "#E5E7EB",
    gray300: "#D1D5DB",
    gray400: "#9CA3AF",
    gray500: "#6B7280",
    gray600: "#4B5563",
    gray700: "#374151",
    gray800: "#1F2937",
    gray900: "#111827",

    // 🧊 Backgrounds
    surface: "#F8FAFC", // Very light gray-blue surface
    background: "#EEF2F7", // Default app background
    cardBg: "rgba(255, 255, 255, 0.15)", // Glass card backgrounds
    border: "rgba(255, 255, 255, 0.25)", // Subtle borders

    // 💬 Custom use cases
    heading: "#1E293B",
    body: "#334155",
    inputBg: "rgba(255, 255, 255, 0.25)",
    overlay: "rgba(15, 23, 42, 0.6)", // dark glass overlay
  },
};

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    icons: {
      defaultSet: "mdi",
    },
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
