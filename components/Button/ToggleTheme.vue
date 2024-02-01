<script setup>
import { onBeforeMount } from "vue";
import { useThemeStore } from "../stores/useThemeStore";
import IconSun from "./Icons/IconSun.vue";
import IconMoon from "./Icons/IconMoon.vue";

const store = useThemeStore();

onBeforeMount(() => {
  const pref = localStorage.getItem("theme");
  if (pref && pref === "light") {
    store.setLightMode();
    return;
  }

  store.setDarkMode();
});
</script>

<template>
  <span class="inline-block">
    <input
      v-model="store.isDarkMode"
      id="theme-toggler"
      type="checkbox"
      class="fixed -translate-x-[200vw] opacity-0 [&:checked+svg]:!fill-grey-900 [&:checked~label_span]:translate-x-6 [&:checked~svg:last-of-type]:!fill-white" />
    <IconSun
      class="mr-3 inline-block fill-white align-text-top transition-colors delay-100 duration-500" />
    <label
      class="mr-3 inline-flex h-6 w-12 cursor-pointer rounded-full bg-grey-800 p-[0.375rem]"
      for="theme-toggler">
      <span
        class="inline-block h-3 w-3 rounded-full bg-white transition-transform duration-500"></span>
    </label>
    <IconMoon
      class="inline-block fill-grey-900 align-text-top transition-colors delay-100 duration-500" />
  </span>
</template>
