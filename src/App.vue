<script setup>
import { ref } from "vue";
import TheHeader from "./components/TheHeader.vue";
import TheMarkdown from "./components/TheMarkdown.vue";
import CollapsibleContent from "./layouts/CollapsibleContent.vue";
import { useMarkdownStore } from "./stores/useMarkdownStore";
const isMenuCollapsed = ref(true);

const store = useMarkdownStore();
store.populate();
</script>

<template>
  <CollapsibleContent :is-collapsed="isMenuCollapsed">
    <template v-slot:collapsible-content></template>

    <template v-slot:viewport>
      <TheHeader
        :is-menu-collapsed="isMenuCollapsed"
        @menu-toggle="() => (isMenuCollapsed = !isMenuCollapsed)" />

      <main class="h-[calc(100vh-56px)]">
        <TheMarkdown v-if="store.filename" />
      </main>
    </template>
  </CollapsibleContent>
</template>
