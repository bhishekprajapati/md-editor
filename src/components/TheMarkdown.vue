<script setup>
import TheMarkdownEditor from "./TheMarkdownEditor.vue";
import TheMarkdownPreviewer from "./TheMarkdownPreviewer.vue";
import IconEye from "./Icons/IconEye.vue";
import { useMarkdownStore } from "../stores/useMarkdownStore";
import { ref } from "vue";

const showPreview = ref(false);
const layout = ref(null);
const store = useMarkdownStore();

function onEditHandler(e) {
  store.fileContent = e.target.value;
}

function togglePreview() {
  showPreview.value = !showPreview.value;
  layout.value.classList.toggle("showPreview");
}
</script>

<template>
  <section class="relative h-full md:flex" ref="layout" id="layout">
    <button
      type="button"
      class="absolute right-4 top-4 z-50"
      @click="togglePreview">
      <IconEye class="pointer-events-none" :is-closed="showPreview" />
    </button>
    <div class="h-full md:flex-1">
      <div class="relative h-full w-full pt-8">
        <div
          class="display-s absolute left-0 right-0 top-0 bg-cream px-4 py-2 font-medium dark:bg-black-800 dark:text-grey-700">
          MARKDOWN
        </div>
        <TheMarkdownEditor :value="store.fileContent" @input="onEditHandler" />
      </div>
    </div>
    <div
      class="h-full transition-transform duration-200 md:flex-1 md:border-l-2 md:border-grey-600 md:dark:border-black-600">
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

<style scoped>
#layout.showPreview > div:last-child {
  @apply -translate-y-full  md:transform-none;
}

#layout.showPreview > :nth-child(2) {
  @apply md:!max-w-0;
}
</style>
