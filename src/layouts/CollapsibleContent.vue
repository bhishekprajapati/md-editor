<script setup>
const props = defineProps(["isCollapsed"]);
</script>

<template>
  <div class="overflow-hidden">
    <div class="collapsible" :class="isCollapsed ? '' : 'expand'">
      <div class="collapsible-content">
        <slot name="collapsible-content"></slot>
      </div>
    </div>
    <div class="h-screen">
      <slot name="sticky-content"></slot>
    </div>
  </div>
</template>
