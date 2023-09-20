<script setup>
const props = defineProps(["htmlText"]);
</script>

<template>
  <section v-html="props.htmlText"></section>
</template>
