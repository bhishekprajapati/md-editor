<script setup>
import { ref, provide, readonly } from "vue";
import CollapsibleContent from "./CollapsibleContent.vue";

const isMenuCollapsed = ref(true);

function toggle() {
  isMenuCollapsed.value = !isMenuCollapsed.value;
}

provide("isCollapsed", readonly(isMenuCollapsed));
provide("toggle", toggle);
</script>

<template>
  <CollapsibleContent :is-collapsed="isMenuCollapsed">
    <template v-slot:collapsible-content>
      <div class="p-6">
        <slot name="nav"></slot>
      </div>
    </template>

    <template v-slot:viewport>
      <main class="h-dvh">
        <slot name="main"></slot>
      </main>
    </template>
  </CollapsibleContent>
</template>
