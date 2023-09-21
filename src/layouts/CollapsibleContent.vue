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
    <div class="viewport h-screen">
      <slot name="viewport"></slot>
    </div>
  </div>
</template>
