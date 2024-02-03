<script setup>
const { pending, data: files } = await useFiles();
</script>

<template>
  <section class="p-10">
    <header class="my-20 text-center">
      <h1 class="text-3xl font-bold">
        <p class="text-orange-400">Real time collaboration</p>
        <p>markdown editor</p>
      </h1>
    </header>
    <div
      v-if="!pending"
      class="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <NuxtLink to="/editor/new">
        <UButton variant="outline" class="flex flex-col justify-center p-8">
          <UIcon name="i-heroicons-plus" class="mb-4 scale-150" />
          New Document
        </UButton>
      </NuxtLink>
      <NuxtLink v-for="file in files" :to="`/editor/${file.id}`" :key="file.id">
        <UButton variant="outline" class="flex flex-col justify-center p-8">
          <UIcon name="i-heroicons-plus" class="mb-4 scale-150" />
          {{ file.name }}
        </UButton>
      </NuxtLink>
    </div>
    <Spinner v-else class="h-16 w-16 text-yellow-400" />
  </section>
</template>
