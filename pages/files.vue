<script setup>
const { pending, data: files } = await useFetch("/api/files");

definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <section v-if="!pending" class="p-16">
    <div v-if="!files?.length">
      <div
        class="rounded-md p-16 text-center outline-dashed outline-gray-200 dark:outline-slate-800">
        <div class="mb-2">
          <img src="/no-files-state.svg" class="mb-8 inline-block h-24 w-24" />
          <p class="text-2xl text-slate-950 dark:text-white">
            Looks empty here!
          </p>
        </div>
        <ULink
          to="/editor/new"
          class="bg-primary inline-flex items-center gap-x-2 rounded-full px-4 py-3 text-slate-950 shadow-xl">
          <UIcon name="i-heroicons-plus" /> New File
        </ULink>
      </div>
    </div>
    <div v-else>
      <header class="mb-12">
        <ULink
          to="/editor/new"
          class="inline-flex items-center gap-x-2 rounded-full bg-blue-200 px-4 py-3 text-slate-950 shadow">
          <UIcon name="i-heroicons-plus" /> New File
        </ULink>
      </header>
      <div class="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <FileCard v-for="file in files" :key="file.id" :data="file" />
      </div>
    </div>
  </section>
  <Spinner v-else class="h-16 w-16 text-yellow-400" />
</template>
