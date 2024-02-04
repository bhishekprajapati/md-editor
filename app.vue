<script setup>
const route = useRoute();

useHead({
  htmlAttrs: {
    lang: "en",
  },
});
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout :name="route.path === '/' ? 'default' : 'app'">
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </div>
</template>
