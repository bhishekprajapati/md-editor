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
      <div class="h-full w-full">
        <TheMarkdownEditor
          :value="markdownCode"
          @input="(e) => (markdownCode = e.target.value)" />
      </div>
    </div>
    <div
      class="flex-1 overflow-y-auto border-l-2 border-grey-600 scrollbar-none">
      <TheMarkdownPreviewer :code="markdownCode" />
    </div>
  </section>
</template>
