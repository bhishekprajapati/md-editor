<script setup>
const props = defineProps(["isActive"]);
</script>

<template>
  <button type="button" class="hamburger" :class="isActive ? 'active' : ''">
    <span class="bar pointer-events-none"></span>
    <span class="bar pointer-events-none"></span>
    <span class="bar pointer-events-none"></span>
  </button>
</template>
