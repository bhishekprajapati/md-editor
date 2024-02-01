<script setup>
import markdownIt from "markdown-it";
import sampleMd from "~/sample-md";

const value = useState("editor", () => sampleMd);

const options = {
  theme: "vs-dark",
};
const md = markdownIt("commonmark", {
  html: true,
  xhtmlOut: true,
  linkify: true,
  typographer: true,
});
</script>

<template>
  <div class="grid grid-cols-[1fr_auto_1fr]">
    <div>
      <MonacoEditor
        class="h-full w-full"
        v-model="value"
        :options="options"
        lang="markdown" />
    </div>
    <UDivider orientation="vertical" />
    <div>
      <section class="scrollbar-none dark:bg-black-900 h-full overflow-y-auto">
        <div
          class="markdown-preview px-5 py-4 md:px-6 md:py-[1.37rem]"
          v-html="md.render(value)"></div>
      </section>
    </div>
  </div>
</template>
