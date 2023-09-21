<script setup>
import { ref } from "vue";
import TheHeader from "./components/TheHeader.vue";
import CollapsibleContent from "./layouts/CollapsibleContent.vue";

const isMenuCollapsed = ref(true);
</script>

<template>
  <CollapsibleContent :is-collapsed="isMenuCollapsed">
    <template v-slot:collapsible-content></template>

    <template v-slot:sticky-content>
      <TheHeader
        :is-menu-collapsed="isMenuCollapsed"
        @menu-toggle="() => (isMenuCollapsed = !isMenuCollapsed)" />
    </template>
  </CollapsibleContent>
</template>
