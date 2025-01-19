import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useThemeStore = defineStore("themes", () => {
  const isDarkMode = ref(false);

  watch(isDarkMode, (curr, _) => {
    if (curr) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      return;
    }

    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  });

  function toggle() {
    isDarkMode.value = !isDarkMode.value;
  }

  function setDarkMode() {
    isDarkMode.value = true;
  }

  function setLightMode() {
    isDarkMode.value = false;
  }

  function getTheme() {
    return isDarkMode.value ? "dark" : "light";
  }

  return {
    isDarkMode,
    toggle,
    setDarkMode,
    setLightMode,
    getTheme,
  };
});
