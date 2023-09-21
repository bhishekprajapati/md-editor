<script setup>
import { ref } from "vue";
import CollapsibleContent from "./layouts/CollapsibleContent.vue";
import TheHeader from "./components/TheHeader.vue";
import EditorMarkdown from "./components/EditorMarkdown.vue";
import PreviewMarkdown from "./components/PreviewMarkdown.vue";
import sampleMarkdownCode from "./sampleMarkdownCode";

const isMenuCollapsed = ref(true);
const markdownCode = ref(sampleMarkdownCode);
</script>

<template>
  <CollapsibleContent :is-collapsed="isMenuCollapsed">
    <template v-slot:collapsible-content></template>

    <template v-slot:sticky-content>
      <TheHeader
        :is-menu-collapsed="isMenuCollapsed"
        @menu-toggle="() => (isMenuCollapsed = !isMenuCollapsed)" />

      <main class="h-[calc(100vh-56px)]">
        <section class="flex h-full">
          <div class="flex-1">
            <div class="h-full w-full">
              <EditorMarkdown
                :value="markdownCode"
                @input="(e) => (markdownCode = e.target.value)" />
            </div>
          </div>
          <div
            class="scrollbar-none flex-1 overflow-y-auto border-l-2 border-grey-600">
            <PreviewMarkdown :code="markdownCode" />
          </div>
        </section>
      </main>
    </template>
  </CollapsibleContent>
</template>
