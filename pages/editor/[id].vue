<script setup>
const route = useRoute();
const id = route.params.id;
</script>

<template>
  <TheFile :id="id" />
</template>
