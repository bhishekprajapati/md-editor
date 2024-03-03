<script setup lang="ts">
const { $api } = useNuxtApp();
const query = await $api.files.list.useQuery({ page: 1 });

const files = computed(() => query.data.value?.files);
const isPending = computed(() => query.status.value === "pending");
const isEmptyList = computed(() => !!query.data.value?.files.length);
</script>

<template>
  <section v-if="!isPending" class="p-16">
    <div v-if="!isEmptyList">
      <div
        class="rounded-md p-16 text-center outline-dashed outline-2 outline-gray-200 dark:outline-slate-800">
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
        <UiCardFile v-for="file in files" :key="file.id" :file="file" />
      </div>
    </div>
  </section>
  <UiSpinner v-else size="md" />
</template>
