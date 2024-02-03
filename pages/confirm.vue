<script setup>
const user = useSupabaseUser();

watch(
  user,
  () => {
    if (user.value) {
      return navigateTo("/");
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="flex h-screen w-screen items-center justify-center">
    <UCard class="p-16 text-center">
      <UIcon class="mb-4 h-8 w-8 animate-spin" name="i-heroicons-arrow-path" />
      <div>Waiting for login...</div>
    </UCard>
  </div>
</template>
