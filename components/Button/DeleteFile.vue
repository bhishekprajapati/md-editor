<script setup>
const store = useFileStore();
</script>

<template>
  <UButton
    v-if="store.file"
    icon="i-heroicons-trash"
    size="sm"
    color="red"
    square
    variant="outline"
    @click="store.onDelete"
    :disabled="store.isSaving || store.isLoading" />
</template>
