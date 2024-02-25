<script setup>
const route = useRoute();
const isIndexPath = computed(() => route.path === "/");

useHead({
  htmlAttrs: {
    lang: "en",
  },
});
const { $api, $ref } = useNuxtApp();
console.log($ref);
</script>

<template>
  <div :class="{ 'h-dvh w-dvw overflow-hidden': !isIndexPath }">
    <header
      class="h-16 border-b border-b-gray-200 bg-slate-100/90 backdrop-blur dark:border-b-gray-800 dark:bg-slate-950/95"
      :class="{ 'fixed left-0 right-0 top-0 z-50': isIndexPath }">
      <NuxtLoadingIndicator :height="2" />
      <UContainer v-if="isIndexPath">
        <Header />
      </UContainer>
      <Header v-else />
    </header>
    <main
      :class="{
        'h-[calc(100dvh-4rem)] bg-gray-50 dark:bg-slate-900': !isIndexPath,
        'mt-16': isIndexPath,
      }">
      <div class="relative" v-if="isIndexPath">
        <GridLines />
        <UContainer>
          <NuxtPage />
        </UContainer>
      </div>
      <NuxtPage v-else />
      <UNotifications />
    </main>
  </div>
</template>
