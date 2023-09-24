<script setup>
import { watch, ref, onBeforeMount } from "vue";
import IconSun from "./Icons/IconSun.vue";
import IconMoon from "./Icons/IconMoon.vue";

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

onBeforeMount(() => {
  const pref = localStorage.getItem("theme");
  if (pref && pref === "light") isDarkMode.value = false;
  else isDarkMode.value = true;
});
</script>

<template>
  <span class="inline-block">
    <input
      v-model="isDarkMode"
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
