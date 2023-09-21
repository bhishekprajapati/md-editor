<script setup>
import { ref } from "vue";
import TheHeader from "./components/TheHeader.vue";
import TheMarkdown from "./components/TheMarkdown.vue";
import CollapsibleContent from "./layouts/CollapsibleContent.vue";
const isMenuCollapsed = ref(true);
</script>

<template>
  <CollapsibleContent :is-collapsed="isMenuCollapsed">
    <template v-slot:collapsible-content></template>

    <template v-slot:viewport>
      <TheHeader
        :is-menu-collapsed="isMenuCollapsed"
        @menu-toggle="() => (isMenuCollapsed = !isMenuCollapsed)" />

      <main class="h-[calc(100vh-56px)]">
        <TheMarkdown />
      </main>
    </template>
  </CollapsibleContent>
</template>
