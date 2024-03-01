<script setup lang="ts">
const route = useRoute();
const isOpen = ref(false);
const isIndexPath = computed(() => route.path === "/");
</script>

<template>
  <div class="flex h-full items-center p-4">
    <UButton
      v-if="!isIndexPath"
      variant="link"
      size="xl"
      @click="isOpen = true"
      class="mr-2">
      <UIcon name="i-heroicons-bars-3" class="h-6 w-6" />
    </UButton>
    <IconLogo class="mr-12" />
    <div id="editor-actions"></div>
    <UiThemeToggle class="me-2 ms-auto" />
    <AuthState />
    <USlideover v-model="isOpen" side="left" class="w-[15%]"> </USlideover>
  </div>
</template>
