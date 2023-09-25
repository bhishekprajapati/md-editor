<script setup>
import { inject } from "vue";
const isHidden = inject("isCollapsed");
const toggle = inject("toggle");
</script>

<template>
  <button
    type="button"
    class="hamburger"
    :class="isHidden ? '' : 'active'"
    @click="toggle">
    <span class="bar pointer-events-none"></span>
    <span class="bar pointer-events-none"></span>
    <span class="bar pointer-events-none"></span>
  </button>
</template>
