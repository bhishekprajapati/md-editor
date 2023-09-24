<script setup>
import TheMarkdownEditor from "./TheMarkdownEditor.vue";
import TheMarkdownPreviewer from "./TheMarkdownPreviewer.vue";
import { useMarkdownStore } from "../stores/useMarkdownStore";

const store = useMarkdownStore();

function onEditHandler(e) {
  store.fileContent = e.target.value;
}
</script>

<template>
  <section class="flex h-full">
    <div class="flex-1">
      <div class="relative h-full w-full pt-8">
        <div
          class="display-s absolute left-0 right-0 top-0 bg-cream px-4 py-2 font-medium dark:bg-black-800 dark:text-grey-700">
          MARKDOWN
        </div>
        <TheMarkdownEditor :value="store.fileContent" @input="onEditHandler" />
      </div>
    </div>
    <div class="flex-1 border-l-2 border-grey-600 dark:border-black-600">
      <div class="relative h-full w-full pt-8">
        <div
          class="display-s absolute left-0 right-0 top-0 bg-cream px-4 py-2 font-medium dark:bg-black-800 dark:text-grey-700">
          PREVIEW
        </div>
        <TheMarkdownPreviewer :code="store.fileContent" />
      </div>
    </div>
  </section>
</template>
