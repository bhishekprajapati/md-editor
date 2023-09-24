<script setup>
import markdownIt from "markdown-it";
const props = defineProps(["code"]);
const md = markdownIt("commonmark", {
  html: true,
  xhtmlOut: true,
  linkify: true,
  typographer: true,
});
</script>

<template>
  <section class="h-full overflow-y-auto scrollbar-none dark:bg-black-900">
    <div
      class="markdown-preview px-5 py-4 md:px-6 md:py-[1.37rem]"
      v-html="md.render(props.code)"></div>
  </section>
</template>
