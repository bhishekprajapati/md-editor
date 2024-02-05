<script setup>
const { pending, data: files } = await useFetch("/api/files");
</script>

<template>
  <section v-if="!pending" class="p-16">
    <header class="mb-12 text-right">
      <UButton icon="i-heroicons-plus">New File</UButton>
    </header>
    <div class="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <FileCard v-for="file in files" :key="file.id" :data="file" />
    </div>
  </section>
  <Spinner v-else class="h-16 w-16 text-yellow-400" />
</template>
