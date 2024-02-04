<script setup>
const store = useFileStore();
const route = useRoute();
const id = route.params.id;

onUnmounted(() => {
  store.$reset();
});
</script>

<template>
  <TheFile :id="id" />
</template>
