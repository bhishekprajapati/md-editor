<script setup>
import { ref } from "vue";
import TheMarkdownEditor from "./TheMarkdownEditor.vue";
import TheMarkdownPreviewer from "./TheMarkdownPreviewer.vue";
import sampleMarkdownCode from "../sampleMarkdownCode";

const markdownCode = ref(sampleMarkdownCode);
</script>

<template>
  <section class="flex h-full">
    <div class="flex-1">
      <div class="relative h-full w-full pt-8">
        <div
          class="display-s absolute left-0 right-0 top-0 bg-cream px-4 py-2 font-medium">
          MARKDOWN
        </div>
        <TheMarkdownEditor
          :value="markdownCode"
          @input="(e) => (markdownCode = e.target.value)" />
      </div>
    </div>
    <div class="flex-1 border-l-2 border-grey-600">
      <div class="relative h-full w-full pt-8">
        <div
          class="display-s absolute left-0 right-0 top-0 bg-cream px-4 py-2 font-medium">
          PREVIEW
        </div>
        <TheMarkdownPreviewer :code="markdownCode" />
      </div>
    </div>
  </section>
</template>
