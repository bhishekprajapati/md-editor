<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size: "sm" | "md" | "lg";
  }>(),
  {
    size: "sm",
  },
);

function getSize(size: typeof props.size) {
  if (size === "sm") return "h-8 w-8";
  if (size === "md") return "h-12 w-12";
  if (size === "lg") return "h-16 w-16";
}
</script>

<template>
  <div
    :class="getSize(props.size)"
    class="inline-block animate-spin rounded-full border-2 border-b-2 border-b-orange-400 dark:border-slate-800 dark:border-b-orange-400"></div>
</template>
